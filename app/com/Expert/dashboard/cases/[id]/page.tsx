"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, User, FileText, Phone, Calendar, Sparkles } from "lucide-react";

// بيانات الحالات المربوطة بالـ Client ID
const CASES = [
  {
    clientId: "CL01",
    id: "C-0041",
    clientName: "Layla Al-Hassan",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format",
    problemType: "Acne & Hyperpigmentation",
    sentAt: "Jul 15, 08:14",
    status: "new",
    age: 28,
    skinType: "Oily / Combination",
    phone: "+966 50 234 5678",
    notes: "Experiencing persistent cystic acne along the jawline for three months. Post-inflammatory hyperpigmentation visible on cheeks. Previously tried 2% salicylic acid — caused excessive dryness without clearing breakouts. No known allergies.",
    images: [
      { title: "Front Photo", url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop&auto=format" },
      { title: "Cheek Photo", url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format" },
      { title: "Detail View", url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop&auto=format" },
    ],
  },
  {
    clientId: "CL02",
    id: "C-0042",
    clientName: "Sara Mahmoud",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    problemType: "Dry Skin & Sensitivity",
    sentAt: "Jul 15, 09:32",
    status: "in-progress",
    age: 35,
    skinType: "Dry / Sensitive",
    phone: "+966 55 876 4321",
    notes: "Skin feels tight immediately after cleansing. Redness and flaking around nose and cheeks — worsens in air-conditioned environments. Reacts poorly to fragrance. Looking for a minimal, fragrance-free routine.",
    images: [
      { title: "Front Photo", url: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&h=600&fit=crop&auto=format" },
      { title: "Cheek Photo", url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop&auto=format" },
    ],
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
};

export default function CaseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // البحث عن الحالة سواء بالـ clientId أو بالـ caseId
  const currentCase = CASES.find((c) => c.clientId === id || c.id === id);

  if (!currentCase) {
    return (
      <div className="p-12 text-center text-[#8A9B89] font-sans">
        <p className="mb-4 text-base">لم يتم العثور على بيانات لهذه الحالة للعميل ({id}).</p>
        <button
          onClick={() => router.push("/com/Expert/dashboard/pending")}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3E1A] bg-white border border-[#E4EBE3] px-4 py-2 rounded-full hover:bg-[#1E3E1A] hover:text-white transition-colors"
        >
          <ChevronLeft size={14} /> Back to Pending Cases
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-[1500px] mx-auto font-sans text-[#1E3E1A]"
    >
      {/* زر العودة */}
      <button
        onClick={() => router.push("/com/Expert/dashboard/pending")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A9B89] hover:text-[#1E3E1A] mb-6 transition-colors group"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Pending Cases
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* الجزء الأيسر: بيانات العميل والصور */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* كارت معلومات العميل الشخصية */}
          <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl border border-[#E4EBE3] shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentCase.avatar} alt={currentCase.clientName} className="w-16 h-16 rounded-full object-cover border border-[#E4EBE3]" />
              <div>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-[#1E3E1A]" />
                  <h2 className="text-xl font-serif font-bold text-[#1E3E1A]">{currentCase.clientName}</h2>
                </div>
                <p className="text-xs text-[#5C6E5B] mt-1">{currentCase.age} years old · {currentCase.skinType}</p>
                <p className="text-xs text-[#8A9B89] mt-1 flex items-center gap-1">
                  <Phone size={12} /> {currentCase.phone}
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono bg-[#1E3E1A]/5 text-[#1E3E1A] px-3 py-1 rounded-full border border-[#1E3E1A]/10">
                {currentCase.id}
              </span>
              <p className="text-[11px] text-[#8A9B89] mt-2 flex items-center justify-end gap-1">
                <Calendar size={12} /> {currentCase.sentAt}
              </p>
            </div>
          </motion.div>

          {/* كارت ملاحظات العميل */}
          <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl border border-[#E4EBE3] shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B89] mb-3 flex items-center gap-2">
              <FileText size={14} /> Client Notes & Medical History
            </h3>
            <p className="text-[#5C6E5B] leading-relaxed text-sm bg-[#FAF8F5] p-4 rounded-xl border border-[#E4EBE3]/60">
              {currentCase.notes}
            </p>
          </motion.div>

          {/* كارت الصور المرفوعة */}
          <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl border border-[#E4EBE3] shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8A9B89] mb-4 flex items-center gap-2">
              <FileText size={14} /> Submitted Images ({currentCase.images.length} Photos)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentCase.images.map((img, index) => (
                <div key={index} className="border border-[#E4EBE3] rounded-xl p-3 bg-white">
                  <span className="text-[11px] font-semibold text-[#1E3E1A] mb-2 block">{img.title}</span>
                  <div className="aspect-square bg-[#FAF8F5] rounded-lg overflow-hidden border border-[#E4EBE3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* الجزء الأيمن: التوصيات والتشخيص */}
        <div className="lg:col-span-5">
          <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl border border-[#E4EBE3] shadow-sm sticky top-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#FAF8F5]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3E1A] flex items-center gap-2">
                <Sparkles size={16} className="text-[#4A6B53]" /> Expert Diagnosis & Prescription
              </h3>
              <span className="text-[11px] font-semibold text-[#5C6E5B] bg-[#1E3E1A]/5 px-2.5 py-1 rounded-full border border-[#1E3E1A]/10">
                {currentCase.problemType}
              </span>
            </div>
            
            <textarea
              className="w-full h-72 p-4 border border-[#E4EBE3] rounded-xl focus:outline-none focus:border-[#1E3E1A] focus:ring-1 focus:ring-[#1E3E1A] text-sm leading-relaxed text-[#1E3E1A] placeholder:text-[#A39E93] resize-none bg-[#FAF8F5]/50 transition-all mb-4"
              placeholder="اكتب التشخيص والتوصيات الطبية والروتين العلاجي المناسب للعميل هنا..."
              defaultValue={`Based on submitted images, ${currentCase.problemType.toLowerCase()} appears prominent...`}
            />
            
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => router.push("/com/Expert/dashboard/pending")}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#5C6E5B] hover:bg-[#FAF8F5] rounded-xl transition-colors border border-[#E4EBE3]"
              >
                Save Draft
              </button>
              <button 
                onClick={() => router.push("/com/Expert/dashboard/pending")}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#1E3E1A] text-white hover:bg-[#2c5927] rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <CheckCircle2 size={16} /> Send Diagnosis
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}