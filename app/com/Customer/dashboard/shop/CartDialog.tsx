'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, User, Phone } from 'lucide-react';

export default function CartDialog({ isOpen, onClose, cartItems = [], onUpdateQty, userData }: any) {
  const total = cartItems.reduce((acc: number, item: any) => acc + (item.price * item.qty), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* تعديل الـ z-index هنا لـ z-40 عشان ما يغطيش على أزرار السلة */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" 
          />
          
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#FAF8F5] z-50 p-6 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-bold text-[#1E3E1A]">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-[#E4EBE3] rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4PR">
              {cartItems.length === 0 ? (
                <p className="text-sm text-[#8A9B89] text-center py-8">Your cart is empty.</p>
              ) : (
                cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-[#E4EBE3] pb-4">
                    <div className="text-sm font-semibold text-[#1E3E1A]">{item.name}</div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-6 h-6 rounded-full bg-[#E4EBE3] flex items-center justify-center text-[#1E3E1A] font-bold hover:bg-[#d8e0d7] transition-colors">-</button>
                      <span className="text-sm font-bold w-4 text-center text-[#1E3E1A]">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-6 h-6 rounded-full bg-[#E4EBE3] flex items-center justify-center text-[#1E3E1A] font-bold hover:bg-[#d8e0d7] transition-colors">+</button>
                      <span className="text-sm font-bold ml-2 text-[#1E3E1A]">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* عرض بيانات المستخدم التلقائية المربوطة بالـ State */}
            <div className="mt-4 pt-4 border-t border-[#1E3E1A] space-y-4">
              <div className="flex justify-between text-lg font-bold mb-2 text-[#1E3E1A]">
                <span>Total:</span> 
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-[#E4EBE3] space-y-2">
                <p className="text-[10px] font-bold uppercase text-[#8A9B89]">Shipping To:</p>
                {/* استخدام الأمان (?. || "—") لضمان عدم حدوث خطأ أثناء تحديث البيانات */}
                <div className="flex items-center gap-2 text-sm text-[#1E3E1A] font-medium"><User size={14} className="text-[#8A9B89]" /> {userData?.name || "—"}</div>
                <div className="flex items-center gap-2 text-sm text-[#1E3E1A] font-medium"><Phone size={14} className="text-[#8A9B89]" /> {userData?.phone || "—"}</div>
                <div className="flex items-center gap-2 text-sm text-[#1E3E1A] font-medium"><MapPin size={14} className="text-[#8A9B89]" /> {userData?.address || "—"}</div>
              </div>

              <button className="w-full bg-[#1E3E1A] text-white py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#2D5A28] transition-colors">
                Confirm & Send Order
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}