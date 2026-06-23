'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, ShieldCheck, Factory, CheckCircle2, ChevronDown, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ClienteleSlider from '@/components/shared/ClienteleSlider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    company: 'Nestlé',
    logo: '/CLIENTELE/image-6.jpg',
    text: [
      'Partnering with NK Dairy Equipments LLP has significantly elevated our production capabilities. Their state-of-the-art processing solutions and deep understanding of the dairy and food industry have made them an invaluable partner.',
      'Their team consistently delivers high-quality equipment on time, ensuring our high standards for safety and efficiency are always met without compromise.'
    ],
  },
  {
    company: 'Nandini (KMF)',
    logo: '/CLIENTELE/image-2.jpg',
    text: [
      'We have relied on NK Dairy Equipments LLP for our dairy processing needs, and they have consistently delivered flawlessly engineered solutions. Their technical expertise is unmatched in the industry.',
      'From installation to post-sales support, their team demonstrates exceptional commitment to our operational success.'
    ],
  },
  {
    company: 'Aavin',
    logo: '/CLIENTELE/image-3.jpg',
    text: [
      'The custom processing lines provided by NK Dairy Equipments LLP have helped us streamline our operations while maintaining the utmost hygiene and quality standards required for our milk products.',
      'Their turn-key project execution is brilliant, taking all the stress off our shoulders and delivering a perfect plant.'
    ],
  },
  {
    company: 'Vijaya Dairy (Telangana)',
    logo: '/CLIENTELE/image-1.jpg',
    text: [
      'NK Dairy Equipments LLP understood our complex requirements perfectly and delivered a highly efficient, compact milk processing plant. Their ability to innovate within tight floor spaces is remarkable.',
      'We highly recommend them for their precision engineering and excellent site coordination during installation.'
    ],
  },
  {
    company: 'NDRI (National Dairy Research Institute)',
    logo: '/CLIENTELE/image-5.jpg',
    text: [
      'For our specialized research applications, we require equipment that offers unparalleled precision and reliability. NK Dairy Equipments LLP delivered exactly that, helping us advance our dairy technology research.',
      'Their engineers are highly knowledgeable and a pleasure to collaborate with.'
    ],
  },
  {
    company: 'KOMUL',
    logo: '/CLIENTELE/image-4.jpg',
    text: [
      'Upgrading our facilities with NK Dairy Equipments LLP has been a smooth and highly rewarding experience. Their automated systems have reduced our manual overhead and increased our daily throughput significantly.',
    ],
  }
];

function TestimonialsCarousel() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#f8f9fa] relative overflow-hidden">
      
      {/* Decorative Background Quote */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[300px] text-gray-50 leading-none font-serif opacity-50 z-0 select-none">
        &ldquo;
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-4 MainHeading">
            Client <span className="text-[#0077b6]">Testimonials</span>
          </h2>
          <p className="text-[#64748b] text-lg font-medium">
            Here's What Our Customers Have to Say About Us
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[1400px]">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ nextEl: '.testi-next', prevEl: '.testi-prev' }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="py-8 px-4"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_40px_rgba(0,119,182,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,119,182,0.12)] transition-all duration-300 h-full min-h-[420px] flex flex-col relative group">
                  
                  {/* Absolute smaller quote mark */}
                  <div className="absolute top-6 right-8 text-6xl text-[#00b4d8] font-serif leading-none opacity-10 group-hover:opacity-20 transition-opacity">
                    &rdquo;
                  </div>

                  {/* Logo Box */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 mb-8 flex-shrink-0">
                    <img
                      src={t.logo}
                      alt={t.company}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    <h5 className="text-xl font-bold mb-4 text-[#0d1b2e] line-clamp-1">
                      {t.company}
                    </h5>
                    <div className="space-y-3 flex-1">
                      <p className="text-gray-600 leading-relaxed text-base italic line-clamp-[7]">
                        "{t.text[0]}"
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev / Next Buttons */}
          <button
            aria-label="Previous testimonial"
            className="testi-prev hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full items-center justify-center transition-all border border-gray-100 shadow-lg text-[#0077b6] hover:bg-[#0077b6] hover:text-white hover:scale-110 z-20 group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <button
            aria-label="Next testimonial"
            className="testi-next hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full items-center justify-center transition-all border border-gray-100 shadow-lg text-[#0077b6] hover:bg-[#0077b6] hover:text-white hover:scale-110 z-20 group"
          >
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

const stripHtml = (html: string) => {
  if (!html) return '';
  // Basic regex to strip tags and decode common entities
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
};

export default function HomeClient({
  initialProducts = [],
  initialIndustries = []
}: {
  initialProducts?: any[];
  initialIndustries?: any[];
}) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP Products Section Refs
  const productsSectionRef = useRef<HTMLElement>(null);
  const productsTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (productsTrackRef.current && productsSectionRef.current) {
      const track = productsTrackRef.current;

      // Entrance animation for header
      gsap.from(".products-header", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsSectionRef.current,
          start: "top 80%",
        }
      });

      // Horizontal Scroll for desktop, simple scroll on mobile is handled by CSS, we only animate if enough width
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const scrollWidth = track.scrollWidth - window.innerWidth + 100;
        if (scrollWidth > 0) {
          gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: productsSectionRef.current,
              pin: true,
              scrub: 1,
              start: "center center",
              end: () => `+=${scrollWidth}`,
              invalidateOnRefresh: true,
            }
          });
        }
      });

      // Stagger entrance for cards
      gsap.from(".gsap-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsTrackRef.current,
          start: "top 85%",
        }
      });
    }
  }, { scope: productsSectionRef });

  const segments = initialIndustries && initialIndustries.length > 0
    ? initialIndustries
    : [
      { name: 'Dairy', image: '/segments/dairy.png', slug: 'dairy' },
      { name: 'Fruits & Vegetables', image: '/segments/fruits.png', slug: 'fruits-vegetables' },
      { name: 'Food', image: '/segments/food.png', slug: 'food' },
      { name: 'Cosmetics', image: '/segments/cosmetics.png', slug: 'cosmetics' },
      { name: 'Beverages', image: '/segments/beverages.png', slug: 'beverages' },
      { name: 'Allied Industry', image: '/segments/allied.png', slug: 'allied-industry' },
    ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* 1. Static Modern Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gray-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#00b4d8]/10 blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#0077b6]/10 blur-3xl z-0"></div>

        <div className="w-full max-w-[1440px] mx-auto px-6 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-20 items-center">

            {/* Left Content */}
            <div className="w-full xl:pr-8">
             
              <h1 className="text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold text-[#0d1b2e] leading-[1.1] mb-6 drop-shadow-sm">
                Complete Processing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-[#00b4d8]">Solutions</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                Tailormade Process Equipment for Dairy, Food, and Beverage Industries. From farm to processing plant, we deliver excellence at every step.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <button className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#00b4d8] hover:to-[#0077b6] text-white px-8 py-4 rounded-full font-bold tracking-widest transition-all shadow-lg shadow-[#00b4d8]/30 hover:shadow-[#00b4d8]/50 hover:-translate-y-1 flex items-center gap-2">
                    EXPLORE SOLUTIONS
                    <ArrowRight size={18} />
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="bg-white text-[#0077b6] border-2 border-[#0077b6] hover:bg-gray-50 px-8 py-4 rounded-full font-bold tracking-widest transition-all hover:-translate-y-1">
                    GET A QUOTE
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mt-16 pt-8 border-t border-gray-200">
                <div>
                  <h4 className="text-3xl md:text-4xl font-extrabold text-[#0077b6]">500+</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-bold tracking-wider mt-1 uppercase">Clients</p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-extrabold text-[#0077b6]">25+</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-bold tracking-wider mt-1 uppercase">Years</p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-extrabold text-[#0077b6]">18+</h4>
                  <p className="text-xs md:text-sm text-gray-500 font-bold tracking-wider mt-1 uppercase">States</p>
                </div>
              </div>
            </div>

            {/* Right Image/Composition */}
            <div className="relative mt-16 lg:mt-0">
              {/* Decorative blob behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-[#00b4d8]/20 to-[#0077b6]/20 rounded-full blur-3xl z-0 animate-blob"></div>

              <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,119,182,0.15)] border-4 border-white">
                <img
                  src="/gallery-banner.png"
                  alt="Dairy Processing Plant Equipment"
                  className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 md:bottom-10 md:-left-12 bg-white p-4 md:p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-100 z-20 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0077b6] to-[#00b4d8] flex items-center justify-center text-white shadow-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <p className="text-sm md:text-base font-extrabold text-[#0d1b2e]">Highest Standard</p>
                  <p className="text-xs md:text-sm text-[#0077b6] font-semibold">Quality Tested</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Business Segments Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Clean Dotted Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#0d1b2e 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Subtle glowing orbs for extra "clean" interest */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-100 blur-3xl"></div>
          <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-4 tracking-tight">
              Industries <span className="text-[#0077b6]">We Serve</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              Precision Engineering for the World's Most Demanding Industries
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {segments.map((seg, i) => (
              <Link key={i} href={`/industries/${seg.slug}`} className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] md:aspect-auto md:h-[350px] block shadow-[0_10px_30px_rgba(13,27,46,0.08)] hover:shadow-[0_20px_40px_rgba(0,119,182,0.15)] transition-all duration-500 border-4 border-white">
                {/* Background Image */}
                <img 
                  src={`${seg.image}?v=new`}
                  alt={seg.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/90 via-[#0d1b2e]/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out drop-shadow-md">
                    {seg.name}
                  </h3>
                  {/* Animated Arrow/Button */}
                  <div className="flex items-center gap-2 text-[#00b4d8] font-bold opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 delay-75 ease-out">
                    <span className="uppercase tracking-widest text-xs">Explore Solutions</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Company Introduction */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f8f9fa] skew-x-12 translate-x-32 z-0 hidden lg:block"></div>
        
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] group border-8 border-white">
                <img 
                  src="/processing-tank-placeholder.png" 
                  alt="NK Dairy Equipment Manufacturing" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/60 to-transparent"></div>
              </div>
              
              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,119,182,0.15)] flex flex-col items-center justify-center border border-gray-50 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                <span className="text-4xl font-extrabold text-[#0077b6] mb-1">20+</span>
                <span className="text-sm font-bold text-[#0d1b2e] uppercase tracking-wider text-center leading-tight">Years of<br/>Excellence</span>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-[#0077b6]">Who We Are</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2e] mb-6 tracking-tight leading-tight">
                Pioneering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-[#00b4d8]">Dairy Technology</span>
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 font-medium mb-10">
                <p>
                  NK Dairy Equipments is a leading manufacturer of comprehensive machinery portfolios covering every stage of the dairy and food manufacturing process. We provide technologically advanced, energy-efficient, and tailormade solutions.
                </p>
                <p className="text-slate-500">
                  From Khoya Mawa machines, Curd making machines, to Bulk milk coolers and complete Pasteurization Plants, our equipment meets the highest global standards for hygiene and automation.
                </p>
              </div>
              
              <Link href="/about" className="inline-flex items-center gap-3 bg-[#0d1b2e] hover:bg-[#0077b6] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
                Discover Our Story
                <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Products Horizontal Scroll (GSAP) */}
      <section
        className="py-24 bg-[#f8f9fa] overflow-hidden relative home-product-slider"
        ref={productsSectionRef}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-12 relative">

          {/* Header */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 z-10 text-center md:text-left products-header">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-4 MainHeading">
                Our <span className="text-[#0077b6]">Plants</span>
              </h2>
              <p className="text-[#64748b] text-lg font-medium productSubtitle max-w-2xl">
                Discover Our Technologically Advanced Food Processing Machines
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <Link href="/products">
                <button className="bg-white text-[#0077b6] border border-gray-200 hover:border-[#0077b6] px-8 py-3 rounded-full font-bold tracking-widest transition-all hover:shadow-lg shadow-sm text-sm">
                  VIEW ALL PRODUCTS
                </button>
              </Link>
            </div>
          </div>

          {/* GSAP Horizontal Scroll Wrapper */}
          <div className="w-full relative z-0 overflow-x-auto lg:overflow-visible pb-12 snap-x snap-mandatory lg:snap-none hide-scrollbar">
            <div className="flex gap-8 w-max px-4 lg:px-0" ref={productsTrackRef}>
              {initialProducts.map((product, i) => {
                let imageUrl = 'https://images.unsplash.com/photo-1596229983446-24e525145cd5?q=80&w=800';
                if (product.images) {
                  try {
                    const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                    if (Array.isArray(parsed) && parsed.length > 0) imageUrl = parsed[0];
                  } catch (e) { }
                }

                return (
                  <div key={i} className="w-[300px] md:w-[400px] shrink-0 gsap-card snap-center">
                    <Link href={`/products/${product.slug}`} className="block h-full card-link group">
                      <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,119,182,0.12)] transition-all duration-300">
                        {/* Image Background Container */}
                        <div className="bg-gradient-to-b from-gray-50 to-white p-6 flex justify-center items-center h-[280px] relative border-b border-gray-50">
                          <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div className="p-6 md:p-8 flex flex-col flex-1 relative bg-white">
                          <h5
                            className="text-xl font-bold text-[#0d1b2e] mb-3 group-hover:text-[#0077b6] transition-colors overflow-hidden"
                            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                          >
                            {product.name}
                          </h5>
                          <p
                            className="text-gray-500 text-sm mb-6 leading-relaxed overflow-hidden"
                            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                          >
                            {product.heroSubtitle || stripHtml(product.description) || 'Explore our technologically advanced and highly efficient processing solutions.'}
                          </p>
                          <div className="mt-auto pt-4 border-t border-gray-100">
                            <span className="inline-flex items-center gap-2 text-[#0077b6] font-bold tracking-widest text-sm uppercase group-hover:text-[#00b4d8] transition-colors">
                              Explore Plant
                              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* 6. Testimonials */}
      <TestimonialsCarousel />

      {/* 7. Clientele & News */}
      <ClienteleSlider />

      <section className="bg-slate-50 py-24 overflow-hidden">
        {/* News & Updates */}
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-[#323373] mb-12 uppercase tracking-widest">News & Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: 'logo1-1.jpg', link: 'https://www.thehansindia.com/business/engineering-the-backbone-of-indias-dairy-processing-sector-1061882' },
              { img: 'logo2.png', link: 'https://www.freepressjournal.in/latest-news/from-small-beginnings-to-global-projects-nk-dairy-equipments-llps-journey' },
              { img: 'logo3-2.jpg', link: 'https://www.dailyexcelsior.com/how-nk-dairy-equipments-llp-is-supporting-modern-dairy-processing-through-integrated-solutions/' },
            ].map((news, i) => (
              <a
                key={i}
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-8 border border-gray-100 h-32"
              >
                <img src={`/News/${news.img}`} alt={`News Outlet ${i + 1}`} className="max-w-full h-auto max-h-16 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
