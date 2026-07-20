'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Package, MapPin, Phone, Save, Edit2, CheckCircle } from 'lucide-react';

const previousOrders = [
  { id: '#ORD-789', date: 'Oct 12, 2025', status: 'Delivered', total: '$45.00' },
  { id: '#ORD-456', date: 'Sep 28, 2025', status: 'Delivered', total: '$120.00' },
];

export default function ProfileDialog({ isOpen, onClose, profile = {}, setProfile }: any) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* تعديل الـ z-index هنا ليكون z-40 عشان ينزل تحت القائمة وما يحجبش الضغطات */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-[#1E3E1A]/40 backdrop-blur-sm z-40"
          />
          {/* القائمة هنا z-50 عشان تطلع فوق الخلفية تماماً وتكون قابلة للتفاعل */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#FAF8F5] shadow-2xl z-50 p-6 border-l border-[#E4EBE3] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-[#1E3E1A]">Profile</h2>
              <button onClick={onClose} className="p-2 hover:bg-[#E4EBE3] rounded-full transition-colors"><X size={20} /></button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E4EBE3] shadow-sm mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[#1E3E1A]">Personal Info</h3>
                <button onClick={() => setIsEditing(!isEditing)} className="text-[#6B8E73] hover:text-[#1E3E1A]">
                  {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { icon: User, label: 'Name', name: 'name' },
                  { icon: Phone, label: 'Phone', name: 'phone' },
                  { icon: MapPin, label: 'Address', name: 'address' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-2 bg-[#F0EDE6] rounded-lg h-fit"><item.icon size={16} className="text-[#1E3E1A]" /></div>
                    <div className="w-full">
                      <p className="text-[10px] uppercase tracking-wider text-[#8A9B89]">{item.label}</p>
                    {isEditing ? (
                        <input 
                          name={item.name} 
                          value={profile?.[item.name] || ""} 
                          // استخدام (prev) يضمن إن الـ React ياخد أحدث State بدون مشاكل الـ Closures وتظهر الكتابة فوراً
                          onChange={(e) => setProfile((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))} 
                          className="w-full bg-transparent border-b border-[#1E3E1A] outline-none text-[#1E3E1A] font-medium" 
                        />
                        ) : (
                        <p className="text-[#1E3E1A] font-medium">{profile?.[item.name] || ""}</p>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#1E3E1A] mb-4 flex items-center gap-2">
                <Package size={18} /> Order History
              </h3>
              <div className="space-y-3">
                {previousOrders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-2xl border border-[#E4EBE3] flex justify-between items-center hover:border-[#6B8E73] transition-colors">
                    <div>
                      <p className="font-bold text-[#1E3E1A]">{order.id}</p>
                      <p className="text-[11px] text-[#8A9B89]">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#1E3E1A]">{order.total}</p>
                      <span className="flex items-center gap-1 text-[10px] text-[#2D5A28]"><CheckCircle size={10} /> {order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}