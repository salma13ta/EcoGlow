// app/com/Expert/dashboard/settings/page.tsx
'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, Camera } from 'lucide-react';

const DEFAULT_NAME = 'Dr. Nadia Al-Zahra';
const DEFAULT_SPECIALTY = 'Skin & Dermatology Specialist';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150';

function readInitialSettings() {
  if (typeof window === 'undefined') {
    return { name: DEFAULT_NAME, specialty: DEFAULT_SPECIALTY, image: DEFAULT_IMAGE };
  }

  return {
    name: localStorage.getItem('expert_name') || DEFAULT_NAME,
    specialty: localStorage.getItem('expert_specialty') || DEFAULT_SPECIALTY,
    image: localStorage.getItem('expert_image') || DEFAULT_IMAGE,
  };
}

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(() => readInitialSettings().name);
  const [specialty, setSpecialty] = useState(() => readInitialSettings().specialty);
  const [image, setImage] = useState(() => readInitialSettings().image);

  // دالة التعامل مع رفع صورة جديدة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result); // حفظ الصورة كـ Base64 لتخزينها في localStorage
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // حفظ جميع البيانات الجديدة في المتصفح
    localStorage.setItem('expert_name', name);
    localStorage.setItem('expert_specialty', specialty);
    localStorage.setItem('expert_image', image);

    // إطلاق الحدث لتحديث القائمة الجانبية فوراً
    const event = new Event('profileUpdated');
    window.dispatchEvent(event);

    alert('تم حفظ التعديلات بنجاح! 🎉');
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A9B89]">Configuration — الإعدادات</span>
        <h2 className="text-3xl font-serif text-[#1E3E1A] mt-1">Settings</h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#E4EBE3] shadow-sm p-6 space-y-6"
      >
        {/* قسم الصورة الشخصية مع إمكانية الضغط والتغيير */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B89] mb-3">Profile</h3>
          <div className="flex items-center gap-4">
            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="relative w-16 h-16 rounded-full border border-[#C2CDC1] cursor-pointer overflow-hidden group bg-gray-100 flex items-center justify-center"
            >
              <img src={image} alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} />
              </div>
            </div>
            
            {/* مدخل ملف مخفي */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />

            <div>
              <h4 className="text-sm font-bold text-[#1E3E1A]">{name}</h4>
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="text-xs text-[#1E3E1A] font-semibold underline mt-1 hover:text-[#2d5c27]"
              >
                Change photo
              </button>
            </div>
          </div>
        </div>

        {/* حقول المدخلات القابلة للتعديل بالكامل */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A9B89] mb-1">Display Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAFBF9] border border-[#E4EBE3] rounded-xl text-xs focus:outline-none focus:border-[#1E3E1A] transition-colors font-medium text-[#1E3E1A]" 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8A9B89] mb-1">Specialty</label>
            <input 
              type="text" 
              value={specialty} 
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAFBF9] border border-[#E4EBE3] rounded-xl text-xs focus:outline-none focus:border-[#1E3E1A] transition-colors font-medium text-[#1E3E1A]" 
            />
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="pt-4 border-t border-[#F0F4EF] flex justify-end">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="bg-[#1E3E1A] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#152B12] transition-colors flex items-center gap-2"
          >
            <Save size={14} /> Save Changes
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}