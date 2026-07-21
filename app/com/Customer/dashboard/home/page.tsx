'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Star, Plus, Heart, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { heroData, categories, bestsellers, quizBannerData } from './data';
import Navbar from './Navbar';

// تم تحديد نوع Variants صراحةً حلًا لخطأ TypeScript أثناء الـ build
const fadeInContainer: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15 
    } 
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      duration: 0.8 
    } 
  }
};

export default function CustomerHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="bg-[#F0EDE6] rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-start z-10 order-2 lg:order-1"
          >
            <span className="bg-white/80 backdrop-blur-sm border border-[#E4EBE3] text-[#5C6E5B] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide">
              🍃 {heroData.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1E3E1A] leading-[1.15] mb-6 whitespace-pre-line">
              {heroData.title}
            </h1>
            <p className="text-[#5C6E5B] text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
              {heroData.description}
            </p>
            <Link href="/com/Customer/dashboard/shop" className="w-full sm:w-auto">
              <motion.button 
                type="button"
                whileHover={{ scale: 1.03, backgroundColor: '#152C12' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#1E3E1A] text-white font-medium px-6 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-colors group text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                {heroData.buttonText}
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 h-[250px] sm:h-[450px] w-full relative rounded-2xl overflow-hidden order-1 lg:order-2"
          >
            <Image 
              src={heroData.image} 
              alt="EcoGlow Premium Hero" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center" 
            />
          </motion.div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E3E1A]">Shop by Category</h2>
          <Link href="/com/Customer/dashboard/shop" className="text-xs sm:text-sm font-semibold text-[#5C6E5B] hover:text-[#1E3E1A] flex items-center gap-1 transition-colors">
            View all <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div 
          variants={fadeInContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }} 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((cat) => (
            <Link href="/com/Customer/dashboard/shop" key={cat.id} className="block">
              <motion.div 
                variants={fadeInUp} 
                whileHover={{ y: -6 }} 
                className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] bg-white shadow-sm border border-[#E4EBE3]"
              >
                <Image 
                  src={cat.image} 
                  alt={cat.title} 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                  <span className="text-white font-medium text-sm sm:text-base tracking-wide drop-shadow-sm">{cat.title}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* 3. BESTSELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1E3E1A]">Bestsellers</h2>
          <Link href="/com/Customer/dashboard/shop" className="text-xs sm:text-sm font-semibold text-[#5C6E5B] hover:text-[#1E3E1A] flex items-center gap-1 transition-colors">
            See all <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div 
          variants={fadeInContainer} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, margin: "-100px" }} 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {bestsellers.map((prod) => (
            <motion.div key={prod.id} variants={fadeInUp} className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E4EBE3] shadow-sm flex flex-col justify-between group relative">
              <div>
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
                  <Image 
                    src={prod.image} 
                    alt={prod.name} 
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover" 
                  />
                  {prod.badge && (
                    <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white z-10 shadow-sm ${prod.badge === 'Bestseller' ? 'bg-[#1E3E1A]' : 'bg-[#D96B27]'}`}>
                      {prod.badge}
                    </span>
                  )}
                  <motion.button 
                    type="button"
                    whileTap={{ scale: 0.85 }} 
                    aria-label="Add to wishlist"
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-neutral-100 text-[#5C6E5B] hover:text-red-500 transition-colors"
                  >
                    <Heart size={15} />
                  </motion.button>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1E3E1A] line-clamp-1 mb-1">{prod.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(prod.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-[10px] sm:text-xs text-[#8A9B89] font-medium">({prod.reviewsCount})</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#F0F4EF]">
                <span className="text-sm sm:text-base font-mono font-bold text-[#1E3E1A]">${prod.price}</span>
                <motion.button 
                  type="button"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="bg-[#1E3E1A]/5 hover:bg-[#1E3E1A] text-[#1E3E1A] hover:text-white transition-colors duration-300 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. QUIZ BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="bg-[#6B8E73] text-white rounded-[2rem] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left z-10 max-w-xl">
            <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-white/20">
              <Image 
                src={quizBannerData.image} 
                alt="Quiz Icon" 
                fill
                sizes="64px"
                className="object-cover" 
              />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md mb-2 inline-block">{quizBannerData.badge}</span>
              <h2 className="text-2xl sm:text-3xl font-serif mb-2 leading-tight">{quizBannerData.title}</h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{quizBannerData.description}</p>
            </div>
          </div>
          <Link href="/com/Customer/dashboard/consult" className="w-full md:w-auto block">
            <motion.button 
              type="button"
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }} 
              className="bg-white text-[#1E3E1A] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-sm shrink-0 w-full md:w-auto transition-transform group cursor-pointer"
            >
              {quizBannerData.buttonText} →
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}