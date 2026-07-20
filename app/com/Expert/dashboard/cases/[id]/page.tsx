"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

// 1. الداتا المرفوعة من قبلك (ربطنا الـ Client ID ببيانات الحالة)
const CASES = [
  {
    clientId: "CL01", // ربط مباشر بالـ ID اللي جاي من الجدول
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
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop&auto=format",
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
      "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=600&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop&auto=format",
    ],
  }
];

// أنيميشن الظهور الاحترافي
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

  // البحث عن الحالة سواء بالـ clientId أو بالـ caseId لضمان ظهور البيانات في الحالتين
  const currentCase = CASES.find((c) => c.clientId === id || c.id === id);

  // لو مفيش داتا متطابقة ميعملش كرش
  if (!currentCase) {
    return (
      <div className="p-8 text-center text-gray-400">
        لم يتم العثور على بيانات لهذه الحالة العميل ({id}).
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* الجزء الأيسر: بيانات العميل والصور */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* كارت معلومات العميل الشخصية */}
        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
          <img src={currentCase.avatar} alt={currentCase.clientName} className="w-16 h-16 rounded-full object-cover border" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{currentCase.clientName}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{currentCase.age} years old · {currentCase.skinType}</p>
            <p className="text-xs text-gray-400 mt-1">{currentCase.phone}</p>
          </div>
        </motion.div>

        {/* كارت ملاحظات العميل */}
        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Client Notes</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{currentCase.notes}</p>
        </motion.div>

        {/* كارت الصور المرفوعة */}
        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Submitted Images — {currentCase.images.length} Photos</h3>
          <div className="grid grid-cols-3 gap-4">
            {currentCase.images.map((img, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden bg-gray-50 border">
                <img src={img} alt="Submitted" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* الجزء الأيمن: التوصيات والتشخيص */}
      <div className="lg:col-span-5">
        <motion.div variants={cardVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Expert Diagnosis & Recommendations</h3>
            <span className="text-xs text-gray-400">{currentCase.problemType}</span>
          </div>
          
          <textarea
            className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1e3d2f] text-sm leading-relaxed text-gray-700 resize-none bg-gray-50/30"
            placeholder="اكتب التشخيص والتوصيات الطبية هنا للعميل..."
            defaultValue={`Based on submitted images, ${currentCase.problemType.toLowerCase()} appears prominent...`}
          />
          
          <div className="mt-4 flex justify-end gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              Save Draft
            </button>
            <button className="px-5 py-2 text-sm font-medium bg-[#1e3d2f] text-white hover:bg-[#152c22] rounded-lg transition-colors shadow-sm">
              Send Diagnosis
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}