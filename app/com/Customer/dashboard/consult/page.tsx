"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, Check, Camera, Leaf, UploadCloud, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CONCERNS, SKIN_TYPES } from "./data";

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  
  // حفظ ملفات الصور المرفوعة
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [cheekPhoto, setCheekPhoto] = useState<File | null>(null);

  // مراجع الـ Input لفتح اختيار الملفات
  const frontInputRef = useRef<HTMLInputElement>(null);
  const cheekInputRef = useRef<HTMLInputElement>(null);

  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "cheek") => {
    if (e.target.files && e.target.files[0]) {
      if (type === "front") setFrontPhoto(e.target.files[0]);
      if (type === "cheek") setCheekPhoto(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedConcern(null);
    setSelectedSkinType(null);
    setFrontPhoto(null);
    setCheekPhoto(null);
    setNotes("");
    setSubmitted(false);
    router.push("/com/Customer/dashboard/home");
  };

  // شروط التحقق لمنع تخطي الخطوات بدون إدخال البيانات
  const isStep1Valid = selectedConcern !== null && selectedSkinType !== null;
  const isStep2Valid = frontPhoto !== null && cheekPhoto !== null;

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1E3E1A] font-sans antialiased selection:bg-[#1E3E1A]/10 pb-36 md:pb-16">
      
      {/* سياق محتوى الصفحة الرئيسي */}
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          
          {submitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-16 text-center"
            >
              <div className="w-20 h-20 bg-[#4A6B53]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-[#4A6B53]" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#1E3E1A] mb-3">Request Received!</h2>
              <p className="text-sm text-[#5C6E5B] max-w-sm mx-auto leading-relaxed mb-8">
                Your skin profile has been safely shared with our certified experts. You'll receive your personalized routine inside your dashboard within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="bg-[#1E3E1A] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#2c5927] shadow-md transition-colors"
              >
                View My Dashboard
              </motion.button>
            </motion.div>
          ) : (
            
            <motion.div key="form-steps">
              {/* زر العودة */}
              <button
                onClick={() => step > 1 ? setStep(step - 1) : router.push("/com/Customer/dashboard/home")}
                className="flex items-center gap-1.5 text-sm font-medium text-[#8A9B89] hover:text-[#1E3E1A] mb-8 transition-colors group"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back
              </button>

              {/* خط الخطوات العلوي الأنيق */}
              <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative px-4">
                <div className="absolute top-4 left-6 right-6 h-[1px] bg-[#E4EBE3] z-0" />
                {[1, 2, 3].map((s) => (
                  <div key={s} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        s < step
                          ? "bg-[#1E3E1A] text-white"
                          : s === step
                          ? "bg-[#1E3E1A] text-white ring-4 ring-[#1E3E1A]/10"
                          : "bg-[#EAE6DC] text-[#A39E93]"
                      }`}
                    >
                      {s < step ? <Check size={14} strokeWidth={2.5} /> : s}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                
                {/* الخطوة الأولى: المشكلة ونوع البشرة */}
                {step === 1 && (
                  <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1E3E1A] text-center mb-2">
                      What's your main concern?
                    </h1>
                    <p className="text-sm text-[#8A9B89] text-center mb-10">
                      Select your primary skin concern and type to get started.
                    </p>

                    <motion.div variants={containerVariants} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {CONCERNS.map((c) => (
                        <motion.button
                          key={c.id}
                          variants={itemVariants}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedConcern(c.id)}
                          className={`p-5 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                            selectedConcern === c.id
                              ? "border-[#1E3E1A] bg-white shadow-sm ring-1 ring-[#1E3E1A]"
                              : "border-[#E4EBE3] bg-white/60 hover:border-[#1E3E1A]/40"
                          }`}
                        >
                          <span className="text-3xl filter drop-shadow-sm select-none">{c.emoji}</span>
                          <span className="text-sm font-semibold text-[#1E3E1A]">{c.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>

                    <div className="mb-10">
                      <h3 className="text-sm font-bold text-[#1E3E1A] mb-4">Skin type</h3>
                      <div className="flex flex-wrap gap-2.5">
                        {SKIN_TYPES.map((t) => (
                          <motion.button
                            key={t}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedSkinType(t)}
                            className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all ${
                              selectedSkinType === t
                                ? "border-[#1E3E1A] bg-[#1E3E1A]/5 text-[#1E3E1A] ring-1 ring-[#1E3E1A]"
                                : "border-[#E4EBE3] bg-white/80 text-[#5C6E5B] hover:border-[#1E3E1A]/30"
                            }`}
                          >
                            {t}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={isStep1Valid ? { scale: 1.01 } : {}}
                      whileTap={isStep1Valid ? { scale: 0.99 } : {}}
                      disabled={!isStep1Valid}
                      onClick={() => setStep(2)}
                      className={`w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        isStep1Valid 
                          ? "bg-[#1E3E1A] text-white hover:bg-[#2c5927] shadow-md cursor-pointer" 
                          : "bg-[#D1CFC7] text-white opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                )}

                {/* الخطوة الثانية: رفع الصور الفعلي مع تشغيل الكاميرا والملفات */}
                {step === 2 && (
                  <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <h1 className="font-serif text-3xl font-bold text-[#1E3E1A] mb-2">Upload skin photos</h1>
                    <p className="text-sm text-[#8A9B89] mb-8">
                      Please upload both photos to help our experts accurately analyze your skin.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {/* حقل رفع الصورة الأمامية */}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={frontInputRef}
                        onChange={(e) => handlePhotoChange(e, "front")} 
                      />
                      <div
                        onClick={() => frontInputRef.current?.click()}
                        className={`aspect-square rounded-2xl border-2 border-dashed bg-white/60 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all group ${
                          frontPhoto ? "border-[#1E3E1A] bg-white" : "border-[#E4EBE3] hover:border-[#1E3E1A]/50"
                        }`}
                      >
                        {frontPhoto ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-[#1E3E1A]/10 flex items-center justify-center text-[#1E3E1A] mb-3">
                              <ImageIcon size={20} />
                            </div>
                            <span className="text-xs font-bold text-[#1E3E1A] truncate max-w-full">{frontPhoto.name}</span>
                            <span className="text-[11px] text-[#8A9B89] mt-1">Tap to change</span>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] group-hover:bg-[#1E3E1A]/5 flex items-center justify-center border border-[#E4EBE3] mb-3 transition-colors">
                              <Camera size={18} className="text-[#8A9B89] group-hover:text-[#1E3E1A]" />
                            </div>
                            <span className="text-xs font-bold text-[#1E3E1A]">Front Face Photo</span>
                            <span className="text-[11px] text-[#8A9B89] mt-1">Click to take photo or upload</span>
                          </>
                        )}
                      </div>

                      {/* حقل رفع صورة الخد */}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={cheekInputRef}
                        onChange={(e) => handlePhotoChange(e, "cheek")} 
                      />
                      <div
                        onClick={() => cheekInputRef.current?.click()}
                        className={`aspect-square rounded-2xl border-2 border-dashed bg-white/60 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all group ${
                          cheekPhoto ? "border-[#1E3E1A] bg-white" : "border-[#E4EBE3] hover:border-[#1E3E1A]/50"
                        }`}
                      >
                        {cheekPhoto ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-[#1E3E1A]/10 flex items-center justify-center text-[#1E3E1A] mb-3">
                              <ImageIcon size={20} />
                            </div>
                            <span className="text-xs font-bold text-[#1E3E1A] truncate max-w-full">{cheekPhoto.name}</span>
                            <span className="text-[11px] text-[#8A9B89] mt-1">Tap to change</span>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-[#FAF8F5] group-hover:bg-[#1E3E1A]/5 flex items-center justify-center border border-[#E4EBE3] mb-3 transition-colors">
                              <Camera size={18} className="text-[#8A9B89] group-hover:text-[#1E3E1A]" />
                            </div>
                            <span className="text-xs font-bold text-[#1E3E1A]">Left Cheek Photo</span>
                            <span className="text-[11px] text-[#8A9B89] mt-1">Click to take photo or upload</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#1E3E1A]/5 border border-[#1E3E1A]/10 rounded-2xl p-4 flex items-start gap-3 mb-8">
                      <Leaf size={16} className="text-[#1E3E1A] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#5C6E5B] leading-relaxed">
                        Your photos are encrypted and reviewed strictly by our specialists.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(1)} className="px-6 py-3.5 border border-[#E4EBE3] rounded-full text-xs font-bold uppercase tracking-wider text-[#5C6E5B] bg-white/60 hover:bg-white transition-colors">Back</button>
                      <button 
                        disabled={!isStep2Valid}
                        onClick={() => setStep(3)} 
                        className={`flex-1 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                          isStep2Valid ? "bg-[#1E3E1A] text-white hover:bg-[#2c5927]" : "bg-[#D1CFC7] text-white opacity-60 cursor-not-allowed"
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* الخطوة الثالثة: الملاحظات والمراجعة */}
                {step === 3 && (
                  <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit">
                    <h1 className="font-serif text-3xl font-bold text-[#1E3E1A] mb-2">Anything else to share?</h1>
                    <p className="text-sm text-[#8A9B89] mb-6">
                      Tell us about your current routine, allergies, or specific goals.
                    </p>

                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. I am allergic to synthetic fragrances..."
                      className="w-full h-32 bg-white/80 border border-[#E4EBE3] rounded-2xl px-4 py-3.5 text-sm text-[#1E3E1A] placeholder:text-[#A39E93] outline-none focus:border-[#1E3E1A] focus:ring-1 focus:ring-[#1E3E1A] transition-all resize-none mb-6"
                    />

                    {/* كارت ملخص مراجعة البيانات قبل الإرسال النهائي */}
                    <div className="bg-white rounded-2xl p-5 border border-[#E4EBE3] mb-8 space-y-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#8A9B89] border-b border-[#FAF8F5] pb-2 mb-1">Profile Summary</h4>
                      {[
                        ["Main concern", selectedConcern ? CONCERNS.find(c => c.id === selectedConcern)?.label : "—"],
                        ["Skin type", selectedSkinType ?? "—"],
                        ["Photos uploaded", frontPhoto && cheekPhoto ? "2 of 2 Photos Ready" : "Missing photos"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between text-sm">
                          <span className="text-[#8A9B89] font-medium">{label}</span>
                          <span className="font-bold text-[#1E3E1A] capitalize">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setStep(2)} className="px-6 py-3.5 border border-[#E4EBE3] rounded-full text-xs font-bold uppercase tracking-wider text-[#5C6E5B] bg-white/60 hover:bg-white transition-colors">Back</button>
                      <button onClick={() => setSubmitted(true)} className="flex-1 bg-[#1E3E1A] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#2c5927] shadow-md transition-all">Submit Consultation</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}