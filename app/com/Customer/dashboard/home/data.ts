
export const navLinks = [
  { label: 'Home', href: '/com/Customer/dashboard/home' },
  { label: 'Shop', href: '/com/Customer/dashboard/shop' },
  { label: 'Consult', href: '/com/Customer/dashboard/consult' },
  { label: 'Dashboard', href: '/com/Customer/dashboard' },
];

export interface Category {
  id: string;
  title: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: 'Bestseller' | 'New';
}

export const heroData = {
  badge: "100% Organic & Certified",
  title: "Your Skin\nDeserves\nPure Nature",
  description: "Handcrafted from the finest botanical ingredients. Clean beauty that works in harmony with your skin.",
  buttonText: "ابدأ رحلة العناية ببشرتك",
  // 🔽 قمت بتحديث هذا الرابط برابط صورة مستقر وفائق الدقة ومناسب جداً للبراند 🔽
  image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop" 
};
export interface Category {
  id: string;
  title: string;
  image: string;
}

export const categories: Category[] = [
  { 
    id: '1', 
    title: 'Skincare', 
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23F0EDE6'/><circle cx='200' cy='250' r='100' fill='%236B8E73' opacity='0.15'/><path d='M170 210 Q200 180, 230 210 Q260 240, 200 310 Q140 240, 170 210 Z' fill='%231E3E1A' opacity='0.7'/></svg>" 
  },
  { 
    id: '2', 
    title: 'Hair Care', 
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23EBE7DD'/><circle cx='200' cy='250' r='100' fill='%23E2B747' opacity='0.15'/><path d='M160 200 C160 200, 180 180, 200 230 C220 280, 240 200, 240 200 C240 200, 250 260, 200 290 C150 320, 160 200, 160 200 Z' fill='%231E3E1A' opacity='0.7'/></svg>" 
  },
  { 
    id: '3', 
    title: 'Body', 
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23F2EFE9'/><circle cx='200' cy='250' r='100' fill='%236B8E73' opacity='0.15'/><path d='M200 180 L230 250 L170 250 Z M170 260 H230 V300 H170 Z' fill='%231E3E1A' opacity='0.7'/></svg>" 
  },
  { 
    id: '4', 
    title: 'Serums', 
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23ECE8DF'/><circle cx='200' cy='250' r='100' fill='%23E2B747' opacity='0.15'/><path d='M185 170 H215 V190 H185 Z M170 200 Q200 190, 230 200 V300 Q200 325, 170 300 Z' fill='%231E3E1A' opacity='0.7'/></svg>" 
  }
];

export const bestsellers: Product[] = [
  {
    id: 'p1',
    name: 'Botanical Vitamin C Serum',
    price: 38,
    rating: 5,
    reviewsCount: 124,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=500&auto=format&fit=crop',
    badge: 'Bestseller'
  },
  {
    id: 'p2',
    name: 'Rose Hip Facial Oil',
    price: 45,
    rating: 5,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500&auto=format&fit=crop',
    badge: 'New'
  },
  {
    id: 'p3',
    name: 'Aloe & Oat Moisture Cream',
    price: 32,
    rating: 5,
    reviewsCount: 203,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'p4',
    name: 'Green Tea Balancing Toner',
    price: 28,
    rating: 5,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=500&auto=format&fit=crop'
  }
];

export const quizBannerData = {
  badge: "Free • Takes 2 minutes",
  title: "Discover Your Skin Story",
  description: "Answer a few questions and receive a personalized routine crafted by our certified experts — completely free.",
  buttonText: "Take the Free Skin Quiz",
  image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=200&auto=format&fit=crop"
};