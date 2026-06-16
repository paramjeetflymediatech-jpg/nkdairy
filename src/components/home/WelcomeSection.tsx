'use client';

import React, { useRef, MouseEvent } from 'react';
import { ThumbsUp, Medal, Users, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Interactive 3D Tilt Component
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1500,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 1
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default function WelcomeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animations for Welcome Section
    gsap.from(".welcome-text-card", {
      scrollTrigger: {
        trigger: ".welcome-section",
        start: "top 70%",
      },
      y: 100,
      z: -200,
      opacity: 0,
      rotationX: -15,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(".welcome-image", {
      scrollTrigger: {
        trigger: ".welcome-section",
        start: "top 70%",
      },
      x: 100,
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // Reveal animations for Utilities Section
    const utilTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".utilities-section",
        start: "top 60%",
      }
    });

    utilTimeline
      .from(".util-image-1", { y: 150, opacity: 0, duration: 1, ease: "back.out(1.2)" })
      .from(".util-image-2", { y: 150, opacity: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.7")
      .from(".util-text", { x: 50, opacity: 0, duration: 1 }, "-=1");

    // Reveal for Stats
    gsap.from(".stat-box", {
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 85%",
      },
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "back.out(1.5)"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden bg-slate-50 relative z-20">
      
      {/* Decorative background gradients (Light Mode) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[120px]"></div>
      </div>

      {/* PART 1: Welcome Section */}
      <section className="welcome-section relative z-10 py-12 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative">
            
            {/* Welcome Text Content */}
            <div className="welcome-text-card w-full lg:w-1/2 relative z-20 lg:pr-12">
              <h4 className="text-blue-600 font-bold tracking-widest text-xs md:text-sm mb-4 uppercase drop-shadow-sm">
                Dairy Equipment Company For The Success Of Dairy Business
              </h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 mb-6 leading-tight drop-shadow-sm">
                Welcome to NK Dairy Equipments
              </h2>
              <div className="text-slate-600 space-y-6 leading-relaxed font-light text-sm md:text-base">
                <p>
                  We are running a dairy equipment company located at Aurangabad, Near Radha Swami Sat sang Bhawan, Radaur Road, Yamuna Nagar, Haryana which is certified with ISO:9001:2015. Here, at NK Dairy Equipments we focus on quality management which is associated with dairy machines such as automatic milking machines, Packaging machines, cream separator and butter manufacturing unit, Milk Cooler and Analyzer, Paneer and ghee making machines, and so on.
                </p>
                <p>
                  We offer Dairy Equipment for the clients, which are manufactured with consideration and accuracy. Our products are well-renowned for offering high performance even in tough and serious conditions. In addition, we deliver our products at the proper time with careful considerations.
                </p>
              </div>
            </div>

            {/* 3D Tilting Image */}
            <div className="welcome-image w-full lg:w-3/5 relative z-10">
              <TiltCard>
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <img 
                    src="/dairy-farm-placeholder.png" 
                    alt="NK Dairy Farm" 
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  {/* Inner glow for depth */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none"></div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* PART 2: Utilities Section */}
      <section className="utilities-section relative z-10 py-12 lg:py-20">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left 3D Overlapping Images */}
            <div className="w-full lg:w-1/2 relative perspective-[2000px]">
              <div className="flex gap-4 lg:gap-6 relative z-10">
                <div className="util-image-1 w-1/2 pt-8">
                  <TiltCard>
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-gray-100 relative">
                      <img src="/milking-machine-placeholder.png" alt="Milking Machine" className="w-full h-full object-cover" />
                    </div>
                  </TiltCard>
                </div>
                <div className="util-image-2 w-1/2 pb-8">
                  <TiltCard>
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-gray-100 relative">
                      <img src="/processing-tank-placeholder.png" alt="Processing Tank" className="w-full h-full object-cover" />
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="util-text w-full lg:w-1/2 relative z-20 lg:pl-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 mb-8 leading-tight drop-shadow-sm">
                Utilities and Uses of Dairy Plant
              </h2>
              <div className="text-slate-600 space-y-6 leading-relaxed font-light text-sm md:text-base">
                <p>
                  Dairy farming is so popular from past many decades. But at that time the framers did all the works with their hands whereas these days dairy equipments are available with the latest technology to make your work easier. These equipments also include dairy machines which are additionally known as milking machines. With the advancements in technology, Indian dairy farming is also developed. And in recent days, Indian dairy is on peak all over the world because of the best quality dairy products.
                </p>
                <p>
                  In dairy farming, milk processing units play an imperative role in order to make dairy products such as cheese, yogurt, cream, butter, lassi, and ghee. These all the operations are done with the help of dairy equipments include-:
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PART 3: 3D Stats Boxes (Light) */}
      <section className="stats-section relative z-30 pb-16 lg:pb-24">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            <div className="stat-box">
              <TiltCard className="h-full">
                <div className="h-full bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-xl rounded-3xl p-10 border border-white flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:shadow-blue-200 transition-shadow">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-200">
                    <Medal size={40} className="text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-slate-900 text-2xl font-bold mb-4">20 Years of Excellence</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">We hold two decades of experience that can be highly favorable for you.</p>
                </div>
              </TiltCard>
            </div>

            <div className="stat-box lg:mt-8">
              <TiltCard className="h-full">
                <div className="h-full bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-xl rounded-3xl p-10 border border-white flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:shadow-cyan-200 transition-shadow">
                  <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-cyan-200">
                    <Users size={40} className="text-cyan-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-slate-900 text-2xl font-bold mb-4">Experienced & Trained</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">We have an experienced team of workers dedicated to providing the best.</p>
                </div>
              </TiltCard>
            </div>

            <div className="stat-box lg:mt-16">
              <TiltCard className="h-full">
                <div className="h-full bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-xl rounded-3xl p-10 border border-white flex flex-col items-center text-center shadow-xl hover:shadow-2xl hover:shadow-indigo-200 transition-shadow">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-indigo-200">
                    <Award size={40} className="text-indigo-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-slate-900 text-2xl font-bold mb-4">100+ Industry Awards</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">We have won many awards for our commitment and dedication to the industry.</p>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
