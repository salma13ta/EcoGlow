"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../home/Navbar";
import CartDialog from "./CartDialog";
import ProfileDialog from "../home/ProfileDialog";
import { Product, PRODUCTS } from "../shop/shopData";

type ViewMode = "grid" | "detail";

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const [userProfile, setUserProfile] = useState({
    name: 'Ahmed Mohamed',
    phone: '01012345678',
    address: 'Mansoura, Egypt'
  });

  const [cartItems, setCartItems] = useState<{ id: string | number; name: string; qty: number; price: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddToCart = (product: Product, count: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + count } : item);
      return [...prev, { id: product.id, name: product.name, qty: count, price: product.price }];
    });
    triggerToast(`Added ${count} ${product.name} to cart! 🛍️`);
  };

  const updateQty = (id: string | number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setQty(1);
    setViewMode("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1E3E1A] font-sans antialiased pb-16 relative" dir="ltr">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3E1A] text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-lg border border-[#4A6B53] transition-all animate-bounce">
          {toastMessage}
        </div>
      )}

      <Navbar 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onProfileClick={() => setIsProfileOpen(true)} 
      />

      <CartDialog 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onUpdateQty={updateQty}
        userData={userProfile} 
      />

      <ProfileDialog 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        profile={userProfile}
        setProfile={setUserProfile}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {viewMode === "grid" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-3xl font-serif font-bold mb-8">The Collection</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((p) => (
                <div key={p.id} onClick={() => handleViewProduct(p)} className="bg-white rounded-2xl p-4 border border-[#E4EBE3] cursor-pointer group">
                  <div className="aspect-square overflow-hidden rounded-xl mb-4 bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-sm font-bold truncate">{p.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-bold">${p.price.toFixed(2)}</span>
                    <button onClick={(e) => handleAddToCart(p, 1, e)} className="bg-[#1E3E1A] text-white text-[10px] px-4 py-2 rounded-full hover:bg-[#2c5927] transition-colors">ADD</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => setViewMode("grid")} className="mb-8 flex items-center gap-2 text-xs font-bold uppercase text-[#8A9B89] hover:text-[#1E3E1A] transition-colors"><ChevronLeft size={14} /> Back</button>
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedProduct?.image} className="w-full h-full object-cover" alt={selectedProduct?.name} />
              </div>
              <div>
                <h1 className="text-4xl font-serif mb-4">{selectedProduct?.name}</h1>
                <p className="mb-8 text-[#5C6E5B] leading-relaxed">{selectedProduct?.description}</p>
                <button onClick={() => selectedProduct && handleAddToCart(selectedProduct, qty)} className="bg-[#1E3E1A] text-white py-3 px-8 rounded-full font-bold hover:bg-[#2c5927] transition-colors">
                  Add to Cart · ${(selectedProduct!.price * qty).toFixed(2)}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}