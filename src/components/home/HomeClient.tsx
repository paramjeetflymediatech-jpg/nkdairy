'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import NumberTicker from '@/components/home/NumberTicker';
import FAQAccordion from '@/components/home/FAQAccordion';
import WelcomeSection from '@/components/home/WelcomeSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}


export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Animation (Timeline)
    const tl = gsap.timeline();

    // Animate text reveal
    const titleLines = heroTextRef.current?.querySelectorAll('h1 span.line') || [];
    tl.from(titleLines, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5
    })
      .from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .from('.hero-btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.6");
    // Continuous float animation for buttons
    gsap.to('.hero-btn', {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.2,
      delay: 2
    });

    // 3. Horizontal Scroll for Solutions (Desktop Only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (horizontalContainerRef.current && horizontalScrollRef.current) {
        const cards = gsap.utils.toArray('.solution-card');

        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalScrollRef.current,
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => "+=" + horizontalContainerRef.current!.offsetWidth,
          }
        });
      }
    });

    // 4. Why Choose Us Parallax & Pin
    if (whyChooseUsRef.current) {
      const listItems = whyChooseUsRef.current.querySelectorAll('li');

      gsap.from('.wcu-title, .wcu-desc', {
        scrollTrigger: {
          trigger: whyChooseUsRef.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(listItems, {
        scrollTrigger: {
          trigger: whyChooseUsRef.current,
          start: "top 60%",
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });

      // 3D Box / Image reveal
      gsap.from('.wcu-image', {
        scrollTrigger: {
          trigger: whyChooseUsRef.current,
          start: "top 65%",
        },
        scale: 0.8,
        opacity: 0,
        rotationY: 15,
        duration: 1.5,
        ease: "expo.out"
      });
    }



    // Card Hover Interactions setup
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.bg-image'), { scale: 1.1, duration: 0.8, ease: "power2.out" });
        gsap.to(card.querySelector('.card-arrow'), { x: 5, duration: 0.3 });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.bg-image'), { scale: 1, duration: 0.8, ease: "power2.out" });
        gsap.to(card.querySelector('.card-arrow'), { x: 0, duration: 0.3 });
      });
    });

    // Clientele Marquee Animation
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 50, // Increased duration to slow down movement
        repeat: -1,
      });
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/bg-video.webm" type="video/webm" />
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center mt-20">
          <h1 ref={heroTextRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg overflow-hidden flex flex-col items-center">
            <span className="line block relative overflow-hidden pb-2 leading-tight">DAIRY PROCESSING EQUIPMENT</span>
            <span className="line block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 pb-2 leading-tight">
              BEST QUALITY PRODUCTS
            </span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-light drop-shadow-md leading-relaxed">
            All kind of Khoya Mawa machine, Curd making machine, Butter churner, Cream seprator, Bulk milk cooler, Paneer press machine etc.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="hero-btn">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-sm font-semibold tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto">
                Explore Products <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/contact" className="hero-btn">
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-sm font-semibold tracking-wider w-full sm:w-auto backdrop-blur-sm">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="hero-scroll absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center p-2 relative">
            <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div> */}
      </section>

      {/* Welcome & Utilities Section */}
      <WelcomeSection />

      {/* Stats Section */}
      {/* <section ref={statsRef} className="bg-[#020617]/40 backdrop-blur-xl py-24 border-b border-white/10 relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-md">
                <NumberTicker value={25} suffix="+" />
              </h3>
              <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold">Years Experience</p>
            </div>
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-md">
                <NumberTicker value={50} suffix="+" />
              </h3>
              <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold">Countries Exported</p>
            </div>
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-md">
                <NumberTicker value={500} suffix="+" />
              </h3>
              <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold">Plants Installed</p>
            </div>
            <div className="stat-item">
              <h3 className="text-5xl font-bold text-white mb-2 drop-shadow-md">
                <NumberTicker value={100} suffix="%" />
              </h3>
              <p className="text-blue-400 uppercase tracking-widest text-xs font-semibold">Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Categories - Horizontal Scroll */}
      <section ref={horizontalScrollRef} className="bg-slate-50 min-h-screen flex flex-col justify-center relative z-20 lg:overflow-hidden py-20">
        <div className="container mx-auto px-6 md:px-12 mb-10 shrink-0">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">Industrial Solutions</h2>
              <p className="text-slate-600 max-w-xl text-lg">
                Comprehensive machinery portfolio covering every stage of the dairy manufacturing process.
              </p>
            </div>
            <Link href="/products" className="hidden md:flex text-blue-600 hover:text-blue-700 items-center gap-2 uppercase tracking-widest text-sm font-semibold transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Native scroll on mobile/tablet, hidden on desktop where GSAP takes over */}
        <div className="w-full flex-1 flex items-center pb-10 lg:pb-20 overflow-x-auto lg:overflow-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div ref={horizontalContainerRef} className="flex gap-6 lg:gap-8 px-6 md:px-12 lg:w-max h-[60vh] min-h-[400px]">
            {['Milk Processing', 'Paneer Plants', 'Storage Tanks', 'Evaporators', 'Dryers'].map((category, i) => (
              <div key={i} className="solution-card snap-center group relative overflow-hidden rounded-2xl w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[400px] h-full bg-white shadow-xl hover:shadow-2xl transition-shadow border border-gray-200 cursor-pointer shrink-0 flex flex-col">
                <div className="relative h-[55%] w-full overflow-hidden">
                  <div className="bg-image absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596229983446-24e525145cd5?q=80&w=800')] bg-cover bg-center transition-transform duration-700" />
                  <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>

                <div className="flex-1 p-8 flex flex-col justify-between bg-white relative z-20">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{category}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">State-of-the-art automated systems for high-capacity industrial production ensuring maximum yield and hygiene.</p>
                  </div>
                  <button className="flex items-center gap-2 text-blue-600 group-hover:text-blue-800 font-bold uppercase tracking-widest text-xs mt-6 transition-colors">
                    Explore Details <ArrowRight size={14} className="card-arrow" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientele Marquee */}
      <section className="bg-slate-50 py-24  overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest">Our Clientele</h2>
        </div>
        <div className="flex w-max" ref={marqueeRef}>
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex gap-6 md:gap-12 px-3 md:px-6 items-center justify-around">
              {[...Array(20)].map((_, i) => {
                const imgName = i === 19 ? 'image-20-1.jpg' : `image-${i + 1}.jpg`;
                return (
                  <div key={i} className="shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                    <img src={`/CLIENTELE/${imgName}`} alt={`Client ${i + 1}`} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>


      {/* News Section */}
      <section className="bg-white py-32 ">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 uppercase tracking-widest">In The News</h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8">
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
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm p-6 md:p-8 w-full md:w-1/4"
              >
                <img src={`/News/${news.img}`} alt={`News Outlet ${i + 1}`} className="max-w-full h-auto max-h-16 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials / Google Reviews */}
      <section className="bg-slate-50 py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 uppercase tracking-widest">Client Testimonials</h2>
            <div className="flex justify-center items-center gap-2">
              <span className="text-slate-600 font-semibold text-lg">Excellent</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-500 text-sm ml-2">Based on Google Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Operations Manager', text: 'NK Dairy provided us with exceptional milk processing equipment. The machinery is highly efficient and built to last. Their after-sales support is outstanding.' },
              { name: 'Anita Sharma', role: 'Director, Fresh Farms', text: 'We procured a complete paneer plant from them. The automation level is superb, and it has significantly improved our yield and hygiene standards.' },
              { name: 'Sandeep Singh', role: 'Plant Head', text: 'Highly professional team. They understood our custom requirements for storage tanks and delivered exactly what we needed within the timeline. Highly recommended.' }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-xs text-slate-500">{review.role}</p>
                  </div>
                  <div className="ml-auto">
                    {/* Google 'G' Logo SVG placeholder */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed text-sm italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />

    </div>
  );
}
