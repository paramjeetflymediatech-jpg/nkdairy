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

const testimonials = [
  {
    company: 'RJ Corp Limited',
    logo: '/image-clients/rj-crop-testimonial.webp',
    text: [
      'Mr. Ravindra & Mr. Rajendra of NK Dairy Equipments LLP have worked with us for over 7 years now and we are delighted with the work carried out so far. Our company RJ Corp Limited & Group companies — Sameer Agriculture, Devyani Food Industries, Varun Food & Beverages Ltd established in India & abroad are into the business of Food, Beverages & Dairy. These companies function under the brand names of PEPSI, Cream bell, Daima, Fresh Dairy, Ole Spring, etc.',
      'Where high-quality work with precision and dedication is required, NK Dairy Equipments LLP always stands out. They are responsible for providing high-quality processing equipment. NK Dairy Equipments LLP understands the high standards that our company has and is most efficient in delivering well within time limits. I would highly recommend working with them.',
    ],
  },
  {
    company: 'Dodla Dairy',
    logo: '/image-clients/Dodla-Dairy-testimonial.webp',
    text: [
      'NK Dairy Equipments LLP is a well-organized engineering company with a line of technocrats to execute our dairy projects on a turn-key basis with a lot of commitment and sense of responsibility. We appreciate their technological up-gradation work, consistency, best-in-class performance, and workmanship.',
    ],
  },
  {
    company: 'Hatsun Agro Product Ltd.',
    logo: '/image-clients/Hatsun-testimonial.webp',
    text: [
      'NK Dairy Equipments LLP meet the customer requirement in a systematic way of working. They ensure to supply quality material, consistently meeting the delivery schedules, and complete the projects on time as per their commitment.',
    ],
  },
  {
    company: 'ITC-Limited',
    logo: '/image-clients/ITC-limited-testimonial.webp',
    text: [
      'NK Dairy Equipments LLP understood our requirements and delivered a perfectly engineered process solution to us for the beverage manufacturing plant in Bangalore, India. The system is compact and easily expandable and flexible. The compact footprint of equipment has saved critical floor space in the Brownfield project.',
      'Our company had given challenging timelines to NK Dairy Equipments LLP at the time of awarding the contract. NK Dairy Equipments LLP has professionally managed the project as well as all agencies involved to fast track the project. NK Dairy Equipments LLP is one who has all expertise under one roof.',
    ],
  },
  {
    company: 'Dabur India',
    logo: '/image-clients/dabur-india-testimonial.webp',
    text: [
      'We acknowledge the sincere efforts, hard work, flawless site coordination, consistent progress on daily activities and delivery of quality work done by the team on site. The NK Dairy Equipments LLP\' Project team has shown exceptional commitment towards every support needed by us throughout the project.',
      'Thanks again for being such an amazing partner to work with. We are excited to work together in the upcoming phase IV work for the Aseptic PET line juice backend system.',
    ],
  },
  {
    company: 'Varun Beverages Limited, DRC',
    logo: '/image-clients/varun-beverages-testimonial.webp',
    text: [
      'We have been working with NK Dairy Equipments LLP for the past 10-12 years and they have understood our needs and requirements and provided us with meticulously designed process solutions each time.',
      'We acknowledge the sincere efforts, hard work, flawless site coordination, consistent progress on daily activities and delivery of quality work done by Installation team on site.',
    ],
  },
  {
    company: 'Hamdard',
    logo: '/image-clients/humdard-testimonial.webp',
    text: [
      'We wanted to expand our business into the milk-based beverages and fusion drinks line. The team at NK Dairy Equipments LLP, with just product information, helped set up an entire plant. Other companies suggested having multiple lines for multiple products, but NK Dairy Equipments LLP suggested doing it all in a single processing line. It ultimately saved us on resources.',
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
        <h2 className="text-3xl md:text-4xl font-bold text-center uppercase tracking-widest mb-2" style={{ color: '#323373' }}>
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
                <h5 className="font-bold text-center text-sm hidden md:block" style={{ color: '#323373' }}>{t.company}</h5>
              </div>

              {/* Right — Text */}
              <div className="flex-1">
                <h5 className="text-xl font-bold mb-4" style={{ color: '#323373' }}>{t.company}</h5>
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
            <ChevronLeft size={20} color="#323373" />
          </button>
          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next testimonial"
            className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(18,126,159,0.1)', border: '2px solid rgba(18,126,159,0.4)' }}
          >
            <ChevronRight size={20} color="#323373" />
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
                background: i === active ? '#323373' : '#cbd5e1',
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
  const swiperPrevRef = useRef<HTMLDivElement>(null);
  const swiperNextRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      image: '/gallery-banner.png',
      title: 'Complete Processing Solutions',
      subtitle: 'Tailormade Process Equipment for Dairy, Food, and Beverage Industries.'
    },
    {
      image: '/processing-tank-placeholder.png',
      title: 'Advanced Processing Tanks',
      subtitle: 'High-grade SS 304 and SS 316 tanks for hygienic milk processing.'
    },
    {
      image: '/milking-machine-placeholder.png',
      title: 'State-of-the-Art Milking Systems',
      subtitle: 'Efficient, safe, and automated milking machinery for modern dairy farms.'
    },
    {
      image: '/dairy-farm-placeholder.png',
      title: 'End-to-End Dairy Solutions',
      subtitle: 'From farm to processing plant, we deliver excellence at every step.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out z-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          </div>
        ))}

        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-[#0d7293]/40 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-slate-900/50 z-0"></div>

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-[#f3b216] scale-125' : 'bg-white/50 hover:bg-white'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 mt-16 transition-opacity duration-500">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl transition-all duration-700 ease-in-out">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 font-light drop-shadow-md max-w-3xl mx-auto transition-all duration-700 ease-in-out delay-100">
            {heroSlides[currentSlide].subtitle}
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#323373] mb-3 uppercase tracking-widest">Business Segments</h2>
          <p className="text-slate-500 mb-16 font-medium text-lg">Explore the Innovative Possibilities Beyond Imagination</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
            {segments.map((seg, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center mb-4 overflow-hidden group-hover:border-[#323373] group-hover:shadow-xl transition-all duration-300 relative">
                  {/* Real icons/images should be placed here, using standard lucide icon for demo */}
                  <Factory size={32} className="text-[#323373] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-[#323373] transition-colors">{seg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Company Introduction */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-[#323373] mb-8 uppercase tracking-widest">About NK Dairy Equipments</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">
            NK Dairy Equipments is a leading manufacturer of comprehensive machinery portfolios covering every stage of the dairy and food manufacturing process. We provide technologically advanced, energy-efficient, and tailormade solutions.
          </p>
          <p className="text-slate-500 leading-relaxed mb-10">
            From Khoya Mawa machines, Curd making machines, to Bulk milk coolers and complete Pasteurization Plants, our equipment meets the highest global standards for hygiene and automation.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-[#323373] font-bold uppercase tracking-widest hover:text-[#f3b216] transition-colors border-b-2 border-transparent hover:border-[#f3b216] pb-1">
            Read More About Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 4. Our Products Carousel (Swiper JS) */}
      <section className="py-24 bg-[#f8f9fa] overflow-hidden relative home-product-slider">
        <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 items-center lg:items-stretch relative">

          {/* Arrow Box Product Slider */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center arrow-box-product-slider z-10 text-center lg:text-left pr-0 lg:pr-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#323373] mb-4 MainHeading">
              Our Products
            </h2>
            <p className="text-[#64748b] text-lg font-medium mb-10 productSubtitle">
              Discover Our Technologically Advanced Food Processing Machines
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <div
                ref={swiperPrevRef}
                className="w-14 h-14 rounded-full border-2 border-[#323373] text-[#323373] hover:bg-[#323373] hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-110 z-20 shadow-sm swiper-slide-button swiper-button-prev"
              >
                <ChevronLeft size={28} />
              </div>
              <div
                ref={swiperNextRef}
                className="w-14 h-14 rounded-full border-2 border-[#323373] text-[#323373] hover:bg-[#323373] hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-110 z-20 shadow-sm swiper-slide-button swiper-button-next"
              >
                <ChevronRight size={28} />
              </div>
            </div>
          </div>

          {/* Swiper Slider Wrapper */}
          <div className="w-full lg:w-2/3 lg:-mr-[30vw] relative z-0 card-wrapper">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1.2}
              loop={initialProducts.length > 3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3.2 }
              }}
              navigation={{
                prevEl: swiperPrevRef.current,
                nextEl: swiperNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = swiperPrevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = swiperNextRef.current;
              }}
              className="!pb-12 !pt-8 !px-4"
            >
              {initialProducts.map((product, i) => {
                let imageUrl = 'https://images.unsplash.com/photo-1596229983446-24e525145cd5?q=80&w=800';
                if (product.images) {
                  try {
                    const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                    if (Array.isArray(parsed) && parsed.length > 0) imageUrl = parsed[0];
                  } catch (e) { }
                }

                return (
                  <SwiperSlide key={i} className="!h-auto card-item">
                    <Link href={`/products/${product.slug}`} className="block h-full card-link group">
                      <div className="bg-[#323373] rounded-2xl overflow-hidden h-full flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(18,126,159,0.3)] transition-all duration-300 product-info-box">
                        {/* Image Background Container */}
                        <div className="bg-white p-6 pb-8 flex justify-center items-center h-64 relative gray-bg-box">
                          <img src={imageUrl} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 home-product-img" />
                        </div>

                        <div className="p-8 flex flex-col flex-1 text-center items-center bg-[#323373] relative">
                          {/* SVG triangle to create the angle effect if needed, omitted for modern clean look */}
                          <h5 className="text-xl font-bold text-white mb-3 line-clamp-2 productName">{product.name}</h5>
                          <p className="text-white/80 text-sm mb-6 line-clamp-3 productDesc">{product.description}</p>

                          <div className="mt-auto">
                            <button className="inline-flex items-center gap-2 text-[#323373] bg-white hover:bg-[#f3b216] hover:text-white px-6 py-3 rounded-full font-bold tracking-widest text-sm transition-colors uppercase readBtn group/btn shadow-md">
                              Read more
                              <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us (Split Layout) */}
      <section className="py-24 bg-slate-50 border-y border-gray-100">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Bullet Points */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#323373] mb-8 uppercase tracking-widest">Why NK Dairy Equipments?</h2>
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
              <Link href="/videos" className="inline-flex items-center gap-2 text-white bg-[#323373] hover:bg-blue-500 px-6 py-3 rounded font-bold tracking-widest uppercase transition-colors shadow-md">
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
                    className={`w-full flex items-center justify-between p-4 font-bold text-left transition-colors ${activeAccordion === i ? 'bg-[#323373] text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100'}`}
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
