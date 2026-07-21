'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, Home, Compass, MessageSquare } from 'lucide-react';
import ProfileDialog from './ProfileDialog';
import CartDialog from '../shop/CartDialog'; // 1. استيراد نافذة السلة هنا

// إضافة الأيقونات لكل رابط لاستخدامها في شريط الموبايل السفلي
const navLinks = [
    { label: 'Home', href: '/com/Customer/dashboard/home', icon: Home },
    { label: 'Shop', href: '/com/Customer/dashboard/shop', icon: Compass },
    { label: 'Consult', href: '/com/Customer/dashboard/consult', icon: MessageSquare },
];

interface NavbarProps {
    cartCount?: number;
    onCartClick?: () => void;
    onProfileClick?: () => void;
}

export default function Navbar({ cartCount: externalCartCount, onCartClick, onProfileClick }: NavbarProps) {
    const pathname = usePathname();
    
    // حالات التحكم في فتح وقفل النوافذ (Modals State)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false); // حالة فتح/قفل السلة

    // حالة بيانات البروفايل (تُمرر للبروفايل للتعديل وللسلة للشحن)
    const [profile, setProfile] = useState({
        name: 'أحمد محمد',
        phone: '01234567890',
        address: 'القاهرة، مصر',
    });

    // منتجات تجريبية داخل السلة (يمكنك استبدالها لاحقاً بـ Context أو Redux أو Props)
    const [cartItems, setCartItems] = useState<{ id: string | number; name: string; price: number; qty: number }[]>([
        { id: 1, name: 'EcoGlow Organic Serum', price: 25.00, qty: 1 },
        { id: 2, name: 'Hydrating Face Cream', price: 18.50, qty: 2 },
    ]);

    // دالة تحديث كميات المنتجات داخل السلة (تم التعديل هنا لتستقبل string | number)
    const handleUpdateQty = (id: string | number, change: number) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id ? { ...item, qty: item.qty + change } : item
                )
                .filter((item) => item.qty > 0) // لو الكمية بقت 0 يتم حذف المنتج تلقائياً
        );
    };

    const internalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const cartCount = externalCartCount ?? internalCartCount;

    const handleCartClick = () => {
        if (onCartClick) {
            onCartClick();
        } else {
            setIsCartOpen(true);
        }
    };

    const handleProfileClick = () => {
        if (onProfileClick) {
            onProfileClick();
        } else {
            setIsProfileOpen(true);
        }
    };

    return (
        <>
            {/* ---------------------------------------------------- */}
            {/* أجهزة الكمبيوتر والشاشات الكبيرة (Desktop Navbar) */}
            {/* ---------------------------------------------------- */}
            <nav className="sticky top-0 z-40 bg-[#FAF8F5]/80 backdrop-blur-md border-b border-[#E4EBE3] hidden md:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/com/Customer/dashboard/home" className="text-2xl font-serif font-bold text-[#1E3E1A] tracking-wide">
                        EcoGlow
                    </Link>

                    <div className="relative w-full max-w-md mx-8">
                        <span className="absolute inset-y-0 left-4 flex items-center text-[#8A9B89]">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-[#F0EDE6] text-[#1E3E1A] placeholder-[#8A9B89] text-sm rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#6B8E73] transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link key={link.label} href={link.href} className="relative py-1 text-sm font-medium transition-colors text-[#5C6E5B] hover:text-[#1E3E1A]">
                                        {link.label}
                                        {isActive && (
                                            <motion.div layoutId="activeUnderline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E3E1A]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-4 border-l border-[#E4EBE3] pl-6 text-[#1E3E1A]">
                            {/* زر الحقيبة للدسك توب */}
                            <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                onClick={handleCartClick}
                                className="relative p-2 hover:bg-[#F0EDE6] rounded-full transition-colors"
                            >
                                <ShoppingBag size={22} />
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span 
                                            initial={{ scale: 0 }} 
                                            animate={{ scale: 1 }} 
                                            exit={{ scale: 0 }}
                                            className="absolute top-0 right-0 bg-[#D96B27] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                            
                            {/* زر البروفايل للدسك توب */}
                            <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                onClick={handleProfileClick}
                                className="p-2 hover:bg-[#F0EDE6] rounded-full transition-colors"
                            >
                                <User size={22} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ---------------------------------------------------- */}
            {/* الهواتف والأجهزة المحمولة (Mobile Bottom Navbar) */}
            {/* ---------------------------------------------------- */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E4EBE3] md:hidden px-4 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
                <div className="flex justify-around items-center h-14">
                    {/* روابط التنقل عبر الأيقونات للموبايل */}
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link 
                                key={link.label} 
                                href={link.href} 
                                className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${isActive ? 'text-[#1E3E1A]' : 'text-[#8A9B89] hover:text-[#1E3E1A]'}`}
                            >
                                <Icon size={20} className={isActive ? 'scale-110 text-[#1E3E1A]' : ''} />
                                <span className="text-[10px] mt-1 font-medium">{link.label}</span>
                            </Link>
                        );
                    })}

                    {/* زر السلة للموبايل */}
                    <button 
                        onClick={handleCartClick}
                        className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${isCartOpen ? 'text-[#1E3E1A]' : 'text-[#8A9B89] hover:text-[#1E3E1A]'} relative`}
                    >
                        <ShoppingBag size={20} className={isCartOpen ? 'scale-110 text-[#1E3E1A]' : ''} />
                        <span className="text-[10px] mt-1 font-medium">Cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-[#D96B27] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* زر فتح البروفايل للموبايل */}
                    <button 
                        onClick={handleProfileClick}
                        className={`flex flex-col items-center justify-center w-12 h-12 transition-colors ${isProfileOpen ? 'text-[#1E3E1A]' : 'text-[#8A9B89] hover:text-[#1E3E1A]'}`}
                    >
                        <User size={20} className={isProfileOpen ? 'scale-110 text-[#1E3E1A]' : ''} />
                        <span className="text-[10px] mt-1 font-medium">Profile</span>
                    </button>
                </div>
            </nav>

            {/* ---------------------------------------------------- */}
            {/* استدعاء المودالات في الأسفل وتغذيتها بالبيانات المربوطة */}
            {/* ---------------------------------------------------- */}
            
            {/* نافذة البروفايل */}
            {!onProfileClick && (
                <ProfileDialog 
                    isOpen={isProfileOpen} 
                    onClose={() => setIsProfileOpen(false)} 
                    profile={profile}
                    setProfile={setProfile}
                />
            )}

            {!onCartClick && (
                <CartDialog 
                    isOpen={isCartOpen} 
                    onClose={() => setIsCartOpen(false)} 
                    cartItems={cartItems} 
                    onUpdateQty={handleUpdateQty} 
                    userData={profile} 
                />
            )}
        </>
    );
}