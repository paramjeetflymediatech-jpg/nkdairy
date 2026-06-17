'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, ShieldCheck, Factory, CheckCircle2, ChevronDown, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ClienteleSlider from '@/components/shared/ClienteleSlider';

const testimonials = [
  {
    company: 'RJ Corp Limited',
    logo: '/image-clients/rj-crop-testimonial.webp',
    text: [
      'Mr. Ravindra & Mr. Rajendra of Neologic Engineers have worked with us for over 7 years now and we are delighted with the work carried out so far. Our company RJ Corp Limited & Group companies — Sameer Agriculture, Devyani Food Industries, Varun Food & Beverages Ltd established in India & abroad are into the business of Food, Beverages & Dairy. These companies function under the brand names of PEPSI, Cream bell, Daima, Fresh Dairy, Ole Spring, etc.',
      'Where high-quality work with precision and dedication is required, Neologic Engineers always stands out. They are responsible for providing high-quality processing equipment. Neologic Engineers understands the high standards that our company has and is most efficient in delivering well within time limits. I would highly recommend working with them.',
    ],
  },
  {
    company: 'Dodla Dairy',
    logo: '/image-clients/Dodla-Dairy-testimonial.webp',
    text: [
      'Neologic Engineers is a well-organized engineering company with a line of technocrats to execute our dairy projects on a turn-key basis with a lot of commitment and sense of responsibility. We appreciate their technological up-gradation work, consistency, best-in-class performance, and workmanship.',
    ],
  },
  {
    company: 'Hatsun Agro Product Ltd.',
    logo: '/image-clients/Hatsun-testimonial.webp',
    text: [
      'Neologic Engineers meet the customer requirement in a systematic way of working. They ensure to supply quality material, consistently meeting the delivery schedules, and complete the projects on time as per their commitment.',
    ],
  },
  {
    company: 'ITC-Limited',
    logo: '/image-clients/ITC-limited-testimonial.webp',
    text: [
      'Neologic Engineers understood our requirements and delivered a perfectly engineered process solution to us for the beverage manufacturing plant in Bangalore, India. The system is compact and easily expandable and flexible. The compact footprint of equipment has saved critical floor space in the Brownfield project.',
      'Our company had given challenging timelines to Neologic Engineers at the time of awarding the contract. Neologic Engineers has professionally managed the project as well as all agencies involved to fast track the project. Neologic Engineers is one who has all expertise under one roof.',
    ],
  },
  {
    company: 'Dabur India',
    logo: '/image-clients/dabur-india-testimonial.webp',
    text: [
      'We acknowledge the sincere efforts, hard work, flawless site coordination, consistent progress on daily activities and delivery of quality work done by the team on site. The Neologic Engineers\' Project team has shown exceptional commitment towards every support needed by us throughout the project.',
      'Thanks again for being such an amazing partner to work with. We are excited to work together in the upcoming phase IV work for the Aseptic PET line juice backend system.',
    ],
  },
  {
    company: 'Varun Beverages Limited, DRC',
    logo: '/image-clients/varun-beverages-testimonial.webp',
    text: [
      'We have been working with Neologic Engineers for the past 10-12 years and they have understood our needs and requirements and provided us with meticulously designed process solutions each time.',
      'We acknowledge the sincere efforts, hard work, flawless site coordination, consistent progress on daily activities and delivery of quality work done by Installation team on site.',
    ],
  },
  {
    company: 'Hamdard',
    logo: '/image-clients/humdard-testimonial.webp',
    text: [
      'We wanted to expand our business into the milk-based beverages and fusion drinks line. The team at Neologic Engineers, with just product information, helped set up an entire plant. Other companies suggested having multiple lines for multiple products, but Neologic Engineers suggested doing it all in a single processing line. It ultimately saved us on resources.',
    ],
  },
];

function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number) => {
    setActive((idx + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(active + 1), 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);

  const t = testimonials[active];

  return (
    <section style={{ background: '#ffffff', padding: '5rem 0' }}>
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-widest mb-2" style={{ color: '#127e9f' }}>
          Testimonials
        </h2>
        <p className="text-center mb-12 text-lg" style={{ color: '#64748b' }}>
          Here&apos;s What Our Customers Have to Say About Us
        </p>

        <div className="relative max-w-5xl mx-auto">
          {/* Slide */}
          <div className="rounded-2xl p-8 md:p-12" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">

              {/* Left — Logo */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3" style={{ minWidth: '160px' }}>
                <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center shadow-xl p-4">
                  <img
                    src={t.logo}
                    alt={t.company}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h5 className="font-bold text-center text-sm hidden md:block" style={{ color: '#127e9f' }}>{t.company}</h5>
              </div>

              {/* Right — Text */}
              <div className="flex-1">
                <h5 className="text-xl font-bold mb-4" style={{ color: '#127e9f' }}>{t.company}</h5>
                {t.text.map((para, i) => (
                  <p key={i} className="mb-3 leading-relaxed" style={{ color: '#475569', fontSize: '0.97rem' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Previous testimonial"
            className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(18,126,159,0.1)', border: '2px solid rgba(18,126,159,0.4)' }}
          >
            <ChevronLeft size={20} color="#127e9f" />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next testimonial"
            className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(18,126,159,0.1)', border: '2px solid rgba(18,126,159,0.4)' }}
          >
            <ChevronRight size={20} color="#127e9f" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? '28px' : '10px',
                height: '10px',
                background: i === active ? '#127e9f' : '#cbd5e1',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeClient({ initialProducts = [] }: { initialProducts?: any[] }) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    '/gallery-banner.png',
    '/processing-tank-placeholder.png',
    '/milking-machine-placeholder.png',
    '/dairy-farm-placeholder.png',
    'https://images.unsplash.com/photo-1596229983446-24e525145cd5?q=80&w=1920', // High-quality industrial plant
    'https://images.unsplash.com/photo-1565191564757-4ed0ba385614?q=80&w=1920' // Manufacturing/processing plant
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const segments = [
    { name: 'Dairy', icon: '/logo.png' }, // placeholder
    { name: 'Fruits & Vegetables', icon: '/logo.png' },
    { name: 'Food', icon: '/logo.png' },
    { name: 'Cosmetics', icon: '/logo.png' },
    { name: 'Beverages', icon: '/logo.png' },
    { name: 'Allied Industry', icon: '/logo.png' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* 1. Hero Banner with Image Slider */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Background Slider */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out z-0 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Dairy Machinery ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          </div>
        ))}

        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-[#0d7293]/40 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-slate-900/50 z-0"></div>
        
        {/* Slider Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#f3b216] scale-125' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center max-w-5xl px-6 mt-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
            Complete Processing Solutions
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-light drop-shadow-md max-w-3xl mx-auto">
            Tailormade Process Equipment for Dairy, Food, and Beverage Industries.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <button className="bg-[#f3b216] hover:bg-yellow-500 text-slate-900 px-8 py-4 rounded font-bold tracking-widest transition-colors shadow-lg">
                EXPLORE SOLUTIONS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Business Segments Grid */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#127e9f] mb-3 uppercase tracking-widest">Business Segments</h2>
          <p className="text-slate-500 mb-16 font-medium text-lg">Explore the Innovative Possibilities Beyond Imagination</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {segments.map((seg, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#127e9f] group-hover:shadow-xl transition-all duration-300 relative">
                  {/* Real icons/images should be placed here, using standard lucide icon for demo */}
                  <Factory size={32} className="text-[#127e9f] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-[#127e9f] transition-colors">{seg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Company Introduction */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-[#127e9f] mb-8 uppercase tracking-widest">About NK Dairy Equipments</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
            NK Dairy Equipments is a leading manufacturer of comprehensive machinery portfolios covering every stage of the dairy and food manufacturing process. We provide technologically advanced, energy-efficient, and tailormade solutions.
          </p>
          <p className="text-slate-500 leading-relaxed mb-10">
            From Khoya Mawa machines, Curd making machines, to Bulk milk coolers and complete Pasteurization Plants, our equipment meets the highest global standards for hygiene and automation.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-[#127e9f] font-bold uppercase tracking-widest hover:text-[#f3b216] transition-colors border-b-2 border-transparent hover:border-[#f3b216] pb-1">
            Read More About Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. Our Products Carousel (Snap Scroll) */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#127e9f] mb-3 uppercase tracking-widest">Our Products</h2>
          <p className="text-slate-500 text-lg font-medium">Discover Our Technologically Advanced Processing Machines</p>
        </div>

        <div className="w-full flex overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-6 md:px-12 gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {initialProducts.map((product, i) => {
            let imageUrl = 'https://images.unsplash.com/photo-1596229983446-24e525145cd5?q=80&w=800';
            if (product.images) {
              try {
                const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                if (Array.isArray(parsed) && parsed.length > 0) imageUrl = parsed[0];
              } catch (e) {}
            }

            return (
              <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col">
                <div className="h-[250px] relative bg-gray-50 overflow-hidden">
                  <img src={imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <div className="p-8 flex flex-col flex-1 border-t border-gray-50">
                  {product.category && (
                    <span className="text-[#f3b216] text-xs font-bold uppercase tracking-widest mb-2 block">
                      {product.category.name}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-[#127e9f] transition-colors">{product.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{product.description}</p>
                  <Link href={`/products/${product.slug}`} className="inline-flex items-center justify-center w-full bg-gray-50 hover:bg-[#127e9f] text-slate-700 hover:text-white py-3 rounded font-bold uppercase tracking-widest text-xs transition-colors">
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Why Choose Us (Split Layout) */}
      <section className="py-24 bg-slate-50 border-y border-gray-100">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Bullet Points */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#127e9f] mb-8 uppercase tracking-widest">Why NK Dairy Equipments?</h2>
            <div className="space-y-6">
              {[
                { title: 'Technologically Advanced', desc: 'Our machines feature state-of-the-art automation for maximum yield and minimum waste.' },
                { title: 'FSSAI & Global Compliance', desc: 'Designed keeping strict hygienic engineering guidelines and sanitary standards in mind.' },
                { title: 'Tailormade Solutions', desc: 'We don’t just sell equipment; we customize full plant layouts based on your specific requirements.' },
                { title: 'ISO Certified Manufacturing', desc: 'Manufactured in our modern facility guaranteeing strict quality control at every step.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <CheckCircle2 className="text-[#f3b216]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
               <Link href="/videos" className="inline-flex items-center gap-2 text-white bg-[#127e9f] hover:bg-blue-800 px-6 py-3 rounded font-bold tracking-widest uppercase transition-colors shadow-md">
                 <Play size={18} fill="currentColor" /> Watch Corporate Video
               </Link>
            </div>
          </div>

          {/* Right Side: Accordions */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Commitments</h3>
            <div className="space-y-4">
              {[
                { title: 'Comprehensive Services', icon: Settings, content: 'We offer end-to-end services from initial consultation, 3D plant layout design, manufacturing, on-site installation, to extensive after-sales support and maintenance.' },
                { title: 'Uncompromising Quality', icon: ShieldCheck, content: 'Quality is embedded in our DNA. Every component undergoes rigorous testing to ensure it meets our exacting standards before it ever reaches your facility.' },
                { title: 'Global Execution', icon: Factory, content: 'With successful installations across multiple countries, we have the logistical and technical capability to execute turnkey projects worldwide.' },
              ].map((acc, i) => (
                <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                    className={`w-full flex items-center justify-between p-4 font-bold text-left transition-colors ${activeAccordion === i ? 'bg-[#127e9f] text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center gap-3">
                      <acc.icon size={20} className={activeAccordion === i ? 'text-white' : 'text-[#f3b216]'} />
                      {acc.title}
                    </span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${activeAccordion === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${activeAccordion === i ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 text-slate-600 bg-white border-t border-gray-100">
                      {acc.content}
                    </div>
                  </div>
                </div>
              ))}
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
          <h2 className="text-3xl font-bold text-[#127e9f] mb-12 uppercase tracking-widest">News & Updates</h2>
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
