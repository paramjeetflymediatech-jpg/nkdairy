'use client';

import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const allClients = [
  'dandy-shadow-logo-slide-10.webp', 'dendairy-logo-slide.webp', 'mother-dairy-logo-slide-33.webp', 'nature-delight-logo-slide.webp',
  'heritage-logo-slide-23.webp', 'amul-logo-slide-2.webp', 'apte-logo-slide-4.webp', 'brookside-logo-slide.webp',
  'dairy-power-logo-slide.webp', 'dinshaws-logo-slide-13.webp', 'govind-logo-slide-18.webp', 'sakas-logo-slide.webp',
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
    <section style={{ backgroundColor: '#2e4b73', paddingTop: '5rem', paddingBottom: '5rem' }}>

      {/* ── Heading ── */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '0 1.5rem' }}>
        <h2 style={{ color: 'white', fontWeight: 800, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
          Our Clients
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
          Customization is the key to win the hearts of customers and we hold that key to our heart.
        </p>
      </div>

      {/* ── Slider with side buttons ── */}
      <div className="relative px-0 md:px-14">

        {/* Left Arrow */}
        <button
          onClick={() => manualScroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex"
          style={{
            position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: '44px', height: '44px', borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.12)',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronLeft size={22} color="#fff" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => manualScroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex"
          style={{
            position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: '44px', height: '44px', borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.12)',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <ChevronRight size={22} color="#fff" />
        </button>

        {/* ── Row 1 scrolls LEFT ── */}
        <div
          ref={row1Ref}
          style={{
            display: 'flex',
            overflowX: 'hidden',
          }}
        >
          {[...allClients, ...allClients].map((img, idx) => (
            <div
              key={`r1-${idx}`}
              style={{
                minWidth: '150px', width: '150px', height: '120px',
                margin: '0 12px', flexShrink: 0,
                backgroundColor: '#fff', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              }}
            >
              <img
                src={`/image-clients/${img}`}
                alt="Client Logo"
                style={{ maxWidth: '110px', maxHeight: '90px', objectFit: 'contain' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
