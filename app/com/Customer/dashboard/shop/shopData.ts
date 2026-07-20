/**
 * 📝 واجهة تعريف المنتج (Product Interface)
 * تحدد هذه الواجهة نوع البيانات وشروطها لكل منتج مضاف في المتجر لضمان عدم حدوث أخطاء برمجية.
 */
export interface Product {
  id: string;          // معرف فريد للمنتج (رقم نصي)
  name: string;        // اسم المنتج باللغة الإنجليزية كما يظهر في الواجهة
  price: number;       // سعر المنتج (رقم عشري أو صحيح)
  category: "skin" | "hair"; // القسم: إما عناية بالبشرة (skin) أو عناية بالشعر (hair)
  concern: "brightening" | "dry" | "sensitive" | "oily" | "aging"; // نوع المشكلة التي يعالجها المنتج
  badge?: "Bestseller" | "New" | "Fan Favorite" | "Top Rated" | ""; // شارة اختيارية تظهر أعلى المنتج
  rating: number;      // التقييم الإجمالي للمنتج من 5 نجوم (مثال: 4.8)
  reviews: number;     // عدد المراجعات والتقييمات المكتوبة من العملاء
  image: string;       // رابط الصورة الخاصة بالمنتج من Unsplash أو أي مصدر خارجي
  description: string; // وصف تفصيلي يشرح فوائد المنتج للعميل
}

/**
 * 🗂️ قاعدة بيانات المنتجات (PRODUCTS)
 * مصفوفة تحتوي على تفاصيل المنتجات الثمانية لعلامة EcoGlow التجارية.
 */
export const PRODUCTS: Product[] = [
  { 
    id: "1", 
    name: "Botanical Vitamin C Serum", 
    price: 38.0, 
    category: "skin", 
    concern: "brightening", 
    badge: "Bestseller", // شارة: الأكثر مبيعاً
    rating: 4.8, 
    reviews: 124, 
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    description: "Our signature botanical complex is combined with 15% pure Vitamin C to dramatically brighten uneven skin tone, fade dark spots, and support natural collagen production."
    // التوضيح: سيروم فيتامين سي بتركيز 15% لتفتيح البشرة، توحيد اللون، وإخفاء البقع الداكنة.
  },
  { 
    id: "2", 
    name: "Rose Hip Facial Oil", 
    price: 45.0, 
    category: "skin", 
    concern: "dry", 
    badge: "New", // شارة: منتج جديد
    rating: 4.6, 
    reviews: 89, 
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    description: "100% organic cold-pressed rosehip seed oil. Extremely rich in fatty acids and vitamins to deeply nourish dry, damaged skin barriers and deliver a radiant organic glow."
    // التوضيح: زيت بذور الورد العضوي النقي 100% المعصور على البارد، مخصص لتغذية البشرة الجافة وإصلاح حاجز البشرة المتضرر.
  },
  { 
    id: "3", 
    name: "Aloe & Oat Moisture Cream", 
    price: 32.0, 
    category: "skin", 
    concern: "dry", 
    badge: "", 
    rating: 4.9, 
    reviews: 203, 
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
    description: "A soothing lightweight moisture barrier cream made of clinical-grade aloe vera and colloidal oatmeal to calm dry patches and reduce skin flaking instantly."
    // التوضيح: كريم مرطب خفيف الوزن بخلاصة الألوفيرا والشوفان الغروي لتهدئة الجفاف وتقشر البشرة فوراً.
  },
  { 
    id: "4", 
    name: "Green Tea Balancing Toner", 
    price: 28.0, 
    category: "skin", 
    concern: "oily", 
    badge: "", 
    rating: 4.5, 
    reviews: 156, 
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
    description: "Formulated with pure Jeju green tea leaves, this refreshing toner balances sebum production, tightens enlarged pores, and hydrates oily and combination skin types."
    // التوضيح: تونر منعش بأوراق الشاي الأخضر لموازنة الإفرازات الدهنية، تضييق المسام الواسعة وترطيب البشرة الدهنية والمختلطة.
  },
  { 
    id: "5", 
    name: "Chamomile Repair Eye Cream", 
    price: 35.0, 
    category: "skin", 
    concern: "aging", 
    badge: "", 
    rating: 4.7, 
    reviews: 97, 
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80",
    description: "Gently targets fine lines, crow's feet, and morning puffiness with chamomile flower extracts and plant-based squalane for bright, rested-looking eyes."
    // التوضيح: كريم لإصلاح محيط العين بمستخلصات البابونج والسكوالان النباتي لمحاربة التجاعيد والانتفاخات الصباحية.
  },
  { 
    id: "6", 
    name: "Turmeric Glow Clay Mask", 
    price: 30.0, 
    category: "skin", 
    concern: "brightening", 
    badge: "", 
    rating: 4.8, 
    reviews: 178, 
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
    description: "An antioxidant-rich kaolin clay mask packed with organic turmeric extract and crushed seeds to gently exfoliate dead skin cells for an immediate natural luminosity."
    // التوضيح: قناع طين الكاولين الغني بمضادات الأكسدة ومستخلص الكركم العضوي لتقشير الخلايا الميتة وإعطاء نضارة فورية.
  },
  { 
    id: "7", 
    name: "Argan Silk Hair Elixir", 
    price: 42.0, 
    category: "hair", 
    concern: "dry", 
    badge: "Fan Favorite", // شارة: المفضل لدى المعجبين
    rating: 4.9, 
    reviews: 144, 
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80",
    description: "Transform dry, frizzy hair into liquid silk. Infused with cold-pressed Moroccan argan oil to repair split ends, shield from heat damage, and restore natural shine."
    // التوضيح: إكسير الحرير للشعر بزيت الأركان المغربي لإصلاح الأطراف المتقصفة، الحماية من الحرارة وإعادة اللمعان للشعر الجاف.
  },
  { 
    id: "8", 
    name: "Jojoba Deep Cleansing Balm", 
    price: 36.0, 
    category: "skin", 
    concern: "sensitive", 
    badge: "Top Rated", // شارة: الأعلى تقييماً
    rating: 4.9, 
    reviews: 211, 
    image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80",
    description: "A decadent balm-to-oil cleanser that melts away waterproof sunscreen, stubborn makeup, and impurities without stripping sensitive skin's protective lipid layer."
    // التوضيح: بلسم منظف عميق بزيت الجوجوبا يذيب المكياج المقاوم للماء والشوائب دون إلحاق الضرر بالطبقة الواقية للبشرة الحساسة.
  }
];