// app/com/Expert/dashboard/pending/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, AlertCircle, Calendar, User } from 'lucide-react';

// 1. تصحيح المسار للذهاب إلى مجلد home المجاور
import { incomingCases } from '../home/casesData';

// 2. تعريف الـ Type هنا لكي لا يعترض TypeScript
interface Case {
  id: string;
  clientName: string;
  problemType: string;
  status: string;
  receivedDate: string;
}

export default function PendingCasesPage() {
  const router = useRouter();

  // فلترة الحالات لتظهر فقط الحالات التي تحتاج مراجعة (Pending) أو قيد العمل (In-Progress)
  const pendingCases = incomingCases.filter(
    (item) => item.status === 'Pending' || item.status === 'In-Progress'
  );

  // إعدادات أنميشن القائمة (Stagger effect) لتعطي مظهر احترافي عند الدخول
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="p-8">
      {/* الترويسة العليا */}
      <div className="mb-6 md:mb-8">
        <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#8A9B89]">
          Awaiting Action — الحالات المعلقة
        </span>
        <h2 className="text-2xl md:text-3xl font-serif text-[#1E3E1A] mt-1">Pending Cases</h2>
        <p className="text-xs md:text-sm text-[#5C6E5B] mt-1">
          You have <span className="text-[#D96B27] font-semibold">{pendingCases.length} cases</span> that require your clinical diagnosis.
        </p>
      </div>

      {/* القائمة الذكية المخصصة للموبايل والويب معاً */}
      {pendingCases.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white rounded-2xl p-8 text-center border border-[#E4EBE3] text-[#6B7C6A]"
        >
          <AlertCircle className="mx-auto text-[#8A9B89] mb-2" size={32} />
          <p className="text-sm">Great job! No pending cases at the moment.</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {pendingCases.map((item: Case) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -2, backgroundColor: '#FAFBF9' }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push(`/com/Expert/dashboard/cases/${item.id}`)}
              className="bg-white p-4 md:p-5 rounded-2xl border border-[#E4EBE3] shadow-sm cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all relative overflow-hidden group"
            >
              {/* خط تجميلي جانبي يظهر نوع الحالة */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E2B747]" />

              {/* القسم الأيسر: معلومات المريض ونوع المشكلة */}
              <div className="flex items-start gap-3 pl-2">
                <div className="w-9 h-9 rounded-xl bg-[#FAFBF9] border border-[#E4EBE3] flex items-center justify-center text-[#1E3E1A] shrink-0 mt-0.5">
                  <User size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-[#1E3E1A]">{item.clientName}</h3>
                    <span className="text-[10px] text-[#8A9B89] bg-[#F4F7F3] px-2 py-0.5 rounded-md font-mono">
                      {item.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A5D49] mt-1 font-medium">{item.problemType}</p>
                  
                  {/* تاريخ استلام الحالة */}
                  <div className="flex items-center gap-1 text-[11px] text-[#8A9B89] mt-2">
                    <Calendar size={12} />
                    <span>Received: {item.receivedDate}</span>
                  </div>
                </div>
              </div>

              {/* القسم الأيمن: شارة الحالة وزر الانتقال */}
              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F0F4EF]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2B747] animate-pulse" />
                  <span className="text-xs font-semibold text-[#A47E1F] bg-[#E2B747]/10 px-2.5 py-1 rounded-full">
                    {item.status}
                  </span>
                </div>
                
                <div className="text-[#8A9B89] group-hover:text-[#1E3E1A] transition-colors group-hover:translate-x-1 transition-transform hidden sm:block">
                  <ChevronRight size={18} />
                </div>
                
                {/* زر مخصص للموبايل فقط */}
                <span className="sm:hidden text-xs font-bold text-[#1E3E1A] flex items-center gap-0.5">
                  Review Case <ChevronRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}