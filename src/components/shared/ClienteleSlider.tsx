'use client';

import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* 
const allClients = [
  'dandy-shadow-logo-slide-10.webp', 'dendairy-logo-slide.webp', 'mother-dairy-logo-slide-33.webp', 'nature-delight-logo-slide.webp',
  'heritage-logo-slide-23.webp', 'amul-logo-slide-2.webp', 'apte-logo-slide-4.webp', 'dairy-power-logo-slide.webp', 'dinshaws-logo-slide-13.webp', 'govind-logo-slide-18.webp', 'sakas-logo-slide.webp',
  'keventer-logo-slide-28.webp', 'dairy-top-logo-slide.webp', 'milky-fresh-logo-slide.webp', 'shakti-logo-slide.webp',
  'rajkot-milk-producer-slide-logo.webp', 'rm-group-logo-slide.webp', 'sangam-milk-producer-logo-slide-40.webp', 'sr-thorat-dairy-logo-slide-42.webp',
  'nova-dairy-product-logo-slide.webp', 'tropolite-logo-slide.webp', 'shri-vijaya-vishakha-milk-producer-logo-slide.webp', 'baskin-robbins-logo-slide-6.webp',
  'mars-logo-slide-31.webp', 'pran-logo-slide-38.webp', 'epic-foods-logo-slide-16.webp', 'harraj-agro-foods-logo-slide.webp',
  'hindustan-food-limited-logo-slide-24.webp', 'britannia-logo-slide-47.webp', 'gulf-union-food-logo-slide-20.webp', 'rich-life-logo-slide.webp',
  'symega-logo-slide.webp', 'campa-cola-logo-slide.webp', 'mkc-logo-slide.webp', 'devyani-logo-slide-12.webp',
  'hap-logo-slide-22.webp', 'daima-logo-slide.webp', 'srini-logo-slide.webp', 'hamdard-logo-slide-21.webp',
  'parle-agro-pvt-ltd-logo-slide-36.webp', 'sab-logo-slide.webp', 'desai-bandhu-logo-slide.webp', 'newgen-agro-logo-slide.webp',
  'clarion-logo-slide.webp', 'loreal-logo-slide-29.webp', 'omniactive-logo-slide.webp', 'gsk-logo-slide-19.webp',
  'pepsico-logo-slide.webp', 'adinath-agro-logo-slide.webp', 'food-steps-logo-slide.webp',
  'danone-logo-slide.webp', 'gayatri-logo-slide.webp', 'hatsun-logo-slide.webp', 'itc-limited-logo-slide-27.webp',
  'ananda-logo-slide-3.webp', 'banas-dairy-logo-slide-5.webp', 'countryside-logo-slide-51.webp', 'godrej-jersey-logo-slide.webp',
  'dodla-logo-slide-14.webp', 'graviss-logo-slide.webp', 'jammu-and-kashmir-milk-producer-logo-slide.webp', 'the-kuthe-group-logo-slide.webp',
  'mazoon-logo-slide-32.webp', 'mulkanur-logo-slide.webp', 'parag-logo-slide-35.webp', 'richs-logo-slide.webp',
  'sabar-dairy-logo-slide.webp', 'schreiber-dynamix-logo-slider-41.webp', 'sonai-doodh-logo-slide.webp', 'srinidhi-logo-slide.webp',
  'suruchi-dairy-product-logo-slide.webp', 'vijaya-logo-slide-46.webp', 'vadilal-logo-slide-44.webp', 'swami-logo-slide.webp',
  'bombay-sweets-logo-slide.webp', 'tasty-bite-logo-slide-43.webp', 'dabur-logo-slide-9.webp', 'amrapali-logo-slide.webp',
  'chitale-agro-logo-slide.webp', 'eggway-logo-slide-15.webp', 'renuka-logo-slide.webp', 'sahyadri-logo-slide-48.webp',
  'xobu-foods-and-beverages-logo-slide-50.webp', 'id-fresh-logo-slide-49.webp', 'malas-logo-slide-30.webp', 'green-valley-logo-slide.webp',
  'mann-ventures-logo-slide.webp', 'pj-corp-logo-slide.webp', 'hpmc-logo-slide-25.webp', 'mohammed-riaz-logo-slide.webp',
  'sepoy-and-c9-logo-slide.webp', 'varun-beverages-logo-slide-45.webp', 'fruitex-agro-logo-slide-17.webp', 'regal-logo-slide-39.webp',
  'vanitycase-logo-slide.webp', 'abbott-logo-slide-1.webp', 'martik-pharma-logo-slide.webp', 'punjab-agro-logo-slide.webp',
]; 
*/

const newClients = [
  'image-1.jpg', 'image-2.jpg', 'image-3.jpg', 'image-4.jpg', 'image-5.jpg',
  'image-6.jpg', 'image-7.jpg', 'image-8.jpg', 'image-9.jpg', 'image-10.jpg',
  'image-11.jpg', 'image-12.jpg', 'image-13.jpg', 'image-14.jpg', 'image-15.jpg',
  'image-16.jpg', 'image-17.jpg', 'image-18.jpg', 'image-19.jpg', 'image-20-1.jpg'
];

const SPEED = 0.7;
const JUMP = 440;

export default function ClienteleSlider() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const raf1 = useRef<number>(0);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick1 = () => {
      if (!paused.current && row1Ref.current) {
        row1Ref.current.scrollLeft += SPEED;
        const half = row1Ref.current.scrollWidth / 2;
        if (row1Ref.current.scrollLeft >= half) row1Ref.current.scrollLeft -= half;
      }
      raf1.current = requestAnimationFrame(tick1);
    };

    raf1.current = requestAnimationFrame(tick1);

    return () => {
      cancelAnimationFrame(raf1.current);
    };
  }, []);

  const manualScroll = (dir: 'left' | 'right') => {
    // Pause auto-scroll so smooth scroll isn't immediately overridden
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    const delta = dir === 'right' ? JUMP : -JUMP;
    row1Ref.current?.scrollBy({ left: delta, behavior: 'smooth' });

    // Resume after smooth scroll finishes (~500 ms)
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, 600);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white border-y border-gray-50">

      {/* Bright glowing background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#00b4d8]/20 via-[#0077b6]/10 to-transparent rounded-full blur-[80px] -z-0"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-gradient-to-l from-[#00b4d8]/10 to-transparent rounded-full blur-[60px] -z-0"></div>

      {/* ── Heading ── */}
      <div className="text-center mb-16 px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0077b6]">Our Network</span>
        </div>
        <h2 className="text-[#0d1b2e] font-extrabold text-3xl md:text-5xl uppercase tracking-widest mb-4">
          Our Clients
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Customization is the key to win the hearts of customers and we hold that key to our heart.
        </p>
      </div>

      {/* ── Dense Logo Grid ── */}
      <div className="container mx-auto px-6 lg:px-12 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 items-center justify-items-center">
          {newClients.map((img, idx) => (
            <div
              key={`client-${idx}`}
              className="w-full flex items-center justify-center p-2 group transition-all duration-300 hover:scale-110"
            >
              <img
                src={`/CLIENTELE/${img}`}
                alt="Client Logo"
                className="max-w-[120px] md:max-w-[160px] max-h-[80px] object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
