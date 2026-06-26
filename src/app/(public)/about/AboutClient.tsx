'use client';

import { useRef } from 'react';
import { Award, Shield, Target, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import FAQAccordion from '@/components/home/FAQAccordion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  { q: "What is the price of dairy processing equipment in India?", a: "Dairy processing equipment price in India depends on the machine type, capacity, and automation level. Small machines used by startups and small dairy units are usually affordable. For large-scale production, high-capacity machines with a high automation level may cost more." },
  { q: "Are small khoya machines available for home use?", a: "Yes, there are small machines for home use as well. It can be used to make khoya, rabri, basundi, condensed milk and other sweets. It generally processes 5-10 litres of milk per batch. It requires minimal manual effort." },
  { q: "How to choose the right capacity of dairy processing equipment?", a: "The capacity of dairy processing equipment should match your daily milk production. For example, if you process 200 litres of milk, then choose equipment which is designed for 200-300 litres. It will handle peak production without overloading." },
  { q: "What is the list of essential dairy processing equipment?", a: "Dairy processing equipment list usually includes milk pasteurizers, cream pasteurizers, juice pasteurizers, cream separators, butter churners, homogenizers, milk storage plant, milk cooler, paneer pressers, milk packaging machines and Khoya/Mawa machine and curd/yoghurt making machine." },
  { q: "How much power is required for these machines to run?", a: "Well, these machines are able to function on a 1HP motor, which only requires a single-phase power supply of 220- 240 volts." },
  { q: "How often should I clean the dairy processing equipment?", a: "It depends on your production scale; generally, they are meant to be cleaned after every production cycle, with raw milk tanks emptied and sanitized at least every 72 hours to maintain hygiene and prevent bacterial contamination." },
  { q: "What should I check before paying for any dairy processing equipment?", a: "Do check the warranty, installation support, spare parts availability, future maintenance costs and material quality, which should be a Food-grade stainless steel (SS 304 and SS 316)." },
  { q: "For how long does dairy processing equipment usually last?", a: "The durability of such equipment is aligned with proper maintenance and cleaning. These equipment can last for 10-15 years or more." },
  { q: "What are the qualities of these machines?", a: "The machines are usually made from high-quality stainless steel. It ensures hygiene, corrosion resistance, and durability. They are valuable for automatic stirring mechanisms and can be adjusted manually with heating controls." },
  { q: "How to choose the right dairy equipment manufacturer in India?", a: "To choose the right manufacturer, ensure they offer high-quality, durable equipment with reliable after-sales support and warranties. Check their industry reputation, client reviews, and compliance with food safety standards." }
];

export default function AboutClient() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!mainRef.current) return;

    // 1. Hero Animations
    const tlHero = gsap.timeline();
    tlHero.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" })
          .from(".hero-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

    // 2. Story Animations
    gsap.from(".story-img", {
      x: -50, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".story-section", start: "top 80%" }
    });
    
    gsap.from(".story-text > *", {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
      scrollTrigger: { trigger: ".story-section", start: "top 75%" }
    });

    // 3. Values Animations
    gsap.fromTo(".value-card", 
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".values-section", start: "top 80%" },
        clearProps: "all"
      }
    );

    // 4. FAQ Animation
    gsap.from(".faq-container", {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: ".faq-section", start: "top 85%" }
    });

  }, { scope: mainRef });

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden" ref={mainRef}>

      {/* 1. Immersive Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#0d1b2e] text-white overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#00b4d8] blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0077b6] blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wider uppercase text-white/90">Who We Are</span>
            </div>

            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              Pioneering <span className="text-[#00b4d8]">Dairy Technology</span>
            </h1>

            <p className="hero-desc text-lg md:text-xl text-white/80 leading-relaxed font-medium max-w-3xl mx-auto">
              NK Dairy Equipments is a team of qualified technocrats with an engineering background, supported by skilled technicians and craftsmen. We engineer, manufacture, and export high-capacity dairy processing plants that set global standards for efficiency.
            </p>
          </div>
        </div>

        {/* Curved Bottom Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.26,199.39,101.4Z" className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      {/* 2. Our Story & Manufacturing Excellence */}
      <section className="story-section py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Image/Graphic Side */}
            <div className="story-img w-full lg:w-5/12 relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,119,182,0.15)] flex items-center justify-center p-8 border-4 border-white group">
                {/* Background Image */}
                <Image 
                  src="/processing-tank-placeholder.png" 
                  alt="Manufacturing Excellence" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-[#0d1b2e]/80 group-hover:bg-[#0d1b2e]/70 transition-colors duration-500"></div>
                
                <div className="relative z-10 text-center mt-8">
                  <div className="w-28 h-28 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30 shadow-xl">
                    <Award className="text-[#00b4d8]" size={50} />
                  </div>
                  <h3 className="text-4xl font-extrabold text-white mb-2 drop-shadow-md">20+</h3>
                  <p className="text-xl text-[#00b4d8] font-bold tracking-wider uppercase drop-shadow-md">Years Of Excellence</p>
                </div>
              </div>

              {/* Floating Element */}
              <div className="absolute -bottom-8 -right-8 md:-right-12 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="bg-cyan-50 p-3 rounded-full text-[#00b4d8]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Trusted by</p>
                  <p className="font-bold text-[#0d1b2e]">500+ Clients</p>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="story-text w-full lg:w-7/12">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#0d1b2e] tracking-tight leading-tight">
                Our Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-[#00b4d8]">Excellence</span>
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-medium">
                <p>
                  It is monitored by an energetic woman <strong className="text-[#0d1b2e]">Mrs. Himpreet Kaur</strong>. Under her able leadership, the firm has installed and executed many projects in Milk Processing Plants. Her mindset of suggesting exact requirements to the Client and appropriate machinery for the Plant has proved the Projects quite successful, achieving required rated capacity.
                </p>
                <p>
                  Due to this, many of our Clients have repeated their orders for expansion of Plant Capacity. We have a full-fledged Workshop for fabrication, as well as an up-to-date machine shop for precision machining. Our skilled workers are quite confident to take up any assignment of setting up a complete Milk Processing Plant.
                </p>
                <p>
                  We follow N.D.D.B. norms and fabricate the equipment as per the guidance of our qualified engineers. We have separate teams to work on-site, for site fabrication, installation of equipment/machinery, piping, and its commissioning. A cordial relationship with the Client on-site helps in troubleshooting any difficulty to the satisfaction of the Client.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0d1b2e] hover:bg-[#0077b6] text-white px-8 py-4 rounded-full font-bold tracking-widest text-sm transition-all shadow-lg hover:shadow-[0_10px_20px_rgba(0,119,182,0.3)] hover:-translate-y-1 uppercase group">
                  Get in Touch
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (Features) */}
      <section className="values-section py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1b2e] mb-4 uppercase tracking-widest">Why Choose Us</h2>
            <div className="w-24 h-1 bg-[#00b4d8] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Uncompromising Quality', desc: 'SS 304/316 food-grade construction ensuring supreme hygiene.' },
              { icon: Target, title: 'Precision Engineering', desc: 'CNC fabricated components designed for exact tolerances.' },
              { icon: Users, title: 'Turnkey Execution', desc: 'End-to-end project management, from design to installation.' },
              { icon: Award, title: 'Global Standards', desc: 'ISO 9001:2015 & CE Certified machinery for global markets.' }
            ].map((item, i) => (
              <div key={i} className="value-card h-full">
                <div className="group bg-slate-50 border border-gray-100 p-8 rounded-3xl text-center hover:bg-[#0d1b2e] transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-default h-full">
                  <div className="w-20 h-20 bg-white shadow-md rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                    <item.icon className="text-[#0077b6] group-hover:text-[#00b4d8] transition-colors duration-500" size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#0d1b2e] group-hover:text-white transition-colors duration-500">{item.title}</h3>
                  <p className="text-gray-500 group-hover:text-white/80 transition-colors duration-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="faq-section py-20 md:py-32 bg-slate-50 border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="faq-container max-w-7xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,119,182,0.05)] border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0d1b2e] tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 font-medium text-lg">Everything you need to know about our dairy processing equipment.</p>
            </div>

            <FAQAccordion
              title=""
              subtitle=""
              noWrapper={true}
              data={faqs.map(f => ({ question: f.q, answer: f.a }))}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
