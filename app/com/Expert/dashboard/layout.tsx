'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Clock, Users, Settings, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // قيم افتراضية قبل التحميل
  const [expertName, setExpertName] = useState('Dr. Nadia Al-Zahra');
  const [expertSpecialty, setExpertSpecialty] = useState('Skin Specialist');
  const [expertImage, setExpertImage] = useState('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150');

  const loadProfileData = () => {
    const savedName = localStorage.getItem('expert_name');
    const savedSpecialty = localStorage.getItem('expert_specialty');
    const savedImage = localStorage.getItem('expert_image');

    if (savedName) setExpertName(savedName);
    if (savedSpecialty) setExpertSpecialty(savedSpecialty);
    if (savedImage) setExpertImage(savedImage);
  };

  useEffect(() => {
    loadProfileData();

    // مستمع للتحديث الفوري عند الضغط على Save
    window.addEventListener('profileUpdated', loadProfileData);
    return () => window.removeEventListener('profileUpdated', loadProfileData);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9F6] text-[#2C3E2B] font-sans relative">
      
      {/* 1. Header الشاشات الصغيرة (Mobile Header) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#EAEFE9] border-b border-[#D8E0D7] flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1E3E1A] rounded-br-xl rounded-tl-xl flex items-center justify-center text-white font-bold text-sm">
            EG
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-wider uppercase text-[#1E3E1A]">EcoGlow</h1>
            <p className="text-[9px] text-[#6B7C6A] tracking-widest uppercase">Expert Portal</p>
          </div>
        </div>

        {/* زر القائمة (3 شرط) */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-[#1E3E1A] rounded-lg hover:bg-[#DCE3DC] transition-colors"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* 2. خلفية مظللة عند فتح القائمة على الموبايل (Backdrop) */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity"
        />
      )}

      {/* 3. القائمة الجانبية (Sidebar) */}
      <aside 
        className={`
          w-64 bg-[#EAEFE9] border-r border-[#D8E0D7] flex flex-col justify-between p-4 fixed h-full z-40 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 top-0 left-0
        `}
      >
        <div>
          {/* الشعار - يظهر في الديسك توب ويختفي في الموبايل لمنع التكرار */}
          <div className="hidden md:flex items-center gap-2 px-2 py-4 mb-6">
            <div className="w-8 h-8 bg-[#1E3E1A] rounded-br-xl rounded-tl-xl flex items-center justify-center text-white font-bold">EG</div>
            <div>
              <h1 className="text-sm font-bold tracking-wider uppercase text-[#1E3E1A]">EcoGlow</h1>
              <p className="text-[10px] text-[#6B7C6A] tracking-widest uppercase">Expert Portal</p>
            </div>
          </div>

          {/* زر إغلاق صريح داخل القائمة للموبايل */}
          <div className="flex md:hidden justify-between items-center mb-6 pt-2 px-2">
            <span className="text-xs font-semibold text-[#6B7C6A] uppercase tracking-wider">Navigation</span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-[#1E3E1A]">
              <X size={20} />
            </button>
          </div>

          {/* روابط التنقل */}
          <nav className="space-y-1">
            <Link 
              href="/com/Expert/dashboard/home" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#DCE3DC] text-[#4A5D49] transition-all"
            >
              <LayoutDashboard size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link 
              href="/com/Expert/dashboard/pending" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl text-[#4A5D49] hover:bg-[#DCE3DC] transition-all"
            >
              <div className="flex items-center gap-3"><Clock size={18} /> <span className="text-sm font-medium">Pending Cases</span></div>
              <span className="text-xs bg-[#E2B747]/20 text-[#A47E1F] font-bold px-2 py-0.5 rounded-full">3</span>
            </Link>
            <Link 
              href="/com/Expert/dashboard/clients" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-[#4A5D49] hover:bg-[#DCE3DC] transition-all"
            >
              <Users size={18} /> <span className="text-sm font-medium">My Clients</span>
            </Link>
            <Link 
              href="/com/Expert/dashboard/settings" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl text-[#4A5D49] hover:bg-[#DCE3DC] transition-all"
            >
              <Settings size={18} /> <span className="text-sm font-medium">Settings</span>
            </Link>
          </nav>
        </div>

        {/* بروفايل الطبيب المتغير أسفل القائمة */}
        <div className="flex items-center gap-3 p-2 bg-[#DCE3DC] rounded-xl">
          <img 
            src={expertImage} 
            alt={expertName} 
            className="w-10 h-10 rounded-full object-cover border border-white bg-white flex-shrink-0" 
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-[#1E3E1A] truncate">{expertName}</h4>
            <p className="text-[10px] text-[#6B7C6A] truncate">{expertSpecialty}</p>
          </div>
        </div>
      </aside>

      {/* 4. محتوى الصفحة الرئيسي (Main Content) */}
      <main className="flex-1 ml-0 md:ml-64 pt-16 md:pt-0 min-h-screen transition-all">
        {children}
      </main>
    </div>
  );
}