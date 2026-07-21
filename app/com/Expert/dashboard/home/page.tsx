// app/com/Expert/dashboard/home/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Clock, ChevronRight, SlidersHorizontal, Download, CheckCircle, Star } from 'lucide-react';
import { incomingCases, Case } from './casesData';

export default function ExpertDashboard() {
  const router = useRouter();

  // تحديد نوع Variants يحل مشكلة type: 'spring' مع TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* الهيدر العلوي */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8A9B89]">Wednesday, July 15, 2026</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E3E1A] mt-1">Good morning, Nadia.</h2>
          <p className="text-xs sm:text-sm text-[#5C6E5B] mt-1">
            You have <span className="text-[#D96B27] font-semibold">3 new</span> and <span className="font-semibold text-[#D29E1E]">1 in-progress</span> cases awaiting your review.
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          className="w-full md:w-auto flex items-center justify-center gap-2 border border-[#C2CDC1] bg-white hover:bg-[#F1F4F0] px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <Download size={14} /> Export Report
        </motion.button>
      </div>

      {/* الكروت الإحصائية */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* كرت 1 */}
        <motion.div variants={itemVariants} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4EBE3] shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center text-[#8A9B89] uppercase tracking-wider text-[10px] font-bold">
            <span>Pending Cases</span>
            <div className="p-1.5 bg-[#FFF9E6] text-[#D29E1E] rounded-full"><Clock size={16} /></div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif text-[#1E3E1A] mt-4 mb-2">3</div>
          <p className="text-xs text-[#8A9B89]">Awaiting first review</p>
        </motion.div>

        {/* كرت 2 */}
        <motion.div variants={itemVariants} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4EBE3] shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center text-[#8A9B89] uppercase tracking-wider text-[10px] font-bold">
            <span>Diagnosed Today</span>
            <div className="p-1.5 bg-[#EAF7EC] text-[#2FA84E] rounded-full"><CheckCircle size={16} /></div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif text-[#1E3E1A] mt-4 mb-2">1</div>
          <p className="text-xs text-[#8A9B89]">Cases completed</p>
        </motion.div>

        {/* كرت 3 */}
        <motion.div variants={itemVariants} className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4EBE3] shadow-sm relative overflow-hidden sm:col-span-2 md:col-span-1">
          <div className="flex justify-between items-center text-[#8A9B89] uppercase tracking-wider text-[10px] font-bold">
            <span>Client Rating</span>
            <div className="p-1.5 bg-[#FFF2E6] text-[#E67E22] rounded-full"><Star size={16} fill="currentColor" /></div>
          </div>
          <div className="flex items-baseline gap-1 mt-4 mb-2">
            <span className="text-3xl sm:text-4xl font-serif text-[#1E3E1A]">4.9</span>
            <span className="text-sm text-[#8A9B89]">/ 5</span>
          </div>
        </motion.div>
      </motion.div>

      {/* قسم الحالات الواردة */}
      <div className="bg-white rounded-2xl border border-[#E4EBE3] shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#E4EBE3] flex justify-between items-center">
          <div>
            <h3 className="text-base font-serif text-[#1E3E1A]">Incoming Cases</h3>
          </div>
          <button className="flex items-center gap-2 border border-[#C2CDC1] hover:bg-[#F8F9F6] px-3 py-1.5 rounded-xl text-xs font-semibold text-[#4A5D49]">
            <SlidersHorizontal size={14} /> Filter
          </button>
        </div>

        {/* عرض الشاشات المتوسطة والكبيرة (Table View) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-[#E4EBE3] text-[10px] uppercase tracking-wider text-[#7A8B79] font-bold">
                <th className="py-3 px-6">Case ID</th>
                <th className="py-3 px-6">Client</th>
                <th className="py-3 px-6">Problem Type</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4EF]">
              {incomingCases.map((item: Case) => (
                <motion.tr 
                  key={item.id}
                  whileHover={{ backgroundColor: '#FAFBF9', x: 5 }}
                  onClick={() => router.push(`/com/Expert/dashboard/cases/${item.id}`)}
                  className="cursor-pointer transition-colors"
                >
                  <td className="py-4 px-6 text-xs font-medium text-[#7A8B79]">{item.id}</td>
                  <td className="py-4 px-6 text-xs font-bold text-[#1E3E1A]">{item.clientName}</td>
                  <td className="py-4 px-6 text-xs text-[#4A5D49]">{item.problemType}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#EAF7EC] text-[#2FA84E] inline-block">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#A4B3A3]"><ChevronRight size={16} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* عرض الشاشات الصغيرة/الهواتف (Card View) */}
        <div className="block md:hidden divide-y divide-[#F0F4EF]">
          {incomingCases.map((item: Case) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push(`/com/Expert/dashboard/cases/${item.id}`)}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#FAFBF9] transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-[#7A8B79]">{item.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#EAF7EC] text-[#2FA84E]">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1E3E1A]">{item.clientName}</h4>
                <p className="text-xs text-[#4A5D49]">{item.problemType}</p>
              </div>
              <div className="text-[#A4B3A3]">
                <ChevronRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}