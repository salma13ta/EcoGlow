'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, AlertCircle, Calendar, User } from 'lucide-react';

// استيراد بيانات الحالات من المجلد المجاور
import { incomingCases } from '../home/casesData';

// تعريف واجهة البيانات لمنع أخطاء TypeScript
interface Case {
  id: string;
  clientName: string;
  problemType: string;
  status: string;
  receivedDate: string;
}

export default function PendingCasesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // فلترة الحالات المعلقة والتصفية حسب البحث
  const pendingCases = (incomingCases as Case[]).filter(
    (item) =>
      (item.status === 'Pending' || item.status === 'In-Progress') &&
      (item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.problemType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // إعدادات أنميشن القائمة (Stagger effect)
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
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto font-sans text-[#1E3E1A]">
      {/* الترويسة العليا */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#8A9B89]">
            Awaiting Action — الحالات المعلقة
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1E3E1A] mt-1">Pending Cases</h2>
          <p className="text-xs md:text-sm text-[#5C6E5B] mt-1">
            You have <span className="text-[#D96B27] font-semibold">{pendingCases.length} cases</span> requiring your clinical diagnosis.
          </p>
        </div>

        {/* شريط البحث وتصفيات الصفحة */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B89]" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search client, case ID..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E4EBE3] rounded-xl focus:outline-none focus:border-[#1E3E1A] transition-all text-[#1E3E1A] placeholder:text-[#A39E93]"
            />
          </div>
          <button className="p-2.5 bg-white border border-[#E4EBE3] rounded-xl text-[#1E3E1A] hover:bg-[#FAFBF9] transition-colors shrink-0">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* قائمة الحالات */}
      {pendingCases.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white rounded-2xl p-12 text-center border border-[#E4EBE3] text-[#6B7C6A]"
        >
          <AlertCircle className="mx-auto text-[#8A9B89] mb-3" size={36} />
          <p className="text-sm font-medium">No pending cases found matching your search.</p>
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
              {/* شريط جانبي ملون لتمييز الحالة */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E2B747]" />

              {/* تفاصيل العميل والمشكلة */}
              <div className="flex items-start gap-3.5 pl-2">
                <div className="w-10 h-10 rounded-xl bg-[#FAFBF9] border border-[#E4EBE3] flex items-center justify-center text-[#1E3E1A] shrink-0 mt-0.5">
                  <User size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-[#1E3E1A]">{item.clientName}</h3>
                    <span className="text-[10px] text-[#8A9B89] bg-[#F4F7F3] px-2 py-0.5 rounded-md font-mono">
                      {item.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A5D49] mt-1 font-medium">{item.problemType}</p>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8A9B89] mt-2">
                    <Calendar size={12} />
                    <span>Received: {item.receivedDate}</span>
                  </div>
                </div>
              </div>

              {/* شارة الحالة وزر الاستعراض */}
              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F0F4EF]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2B747] animate-pulse" />
                  <span className="text-xs font-semibold text-[#A47E1F] bg-[#E2B747]/10 px-2.5 py-1 rounded-full border border-[#E2B747]/20">
                    {item.status}
                  </span>
                </div>
                
                <div className="text-[#8A9B89] group-hover:text-[#1E3E1A] group-hover:translate-x-1 transition-all hidden sm:block">
                  <ChevronRight size={18} />
                </div>
                
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