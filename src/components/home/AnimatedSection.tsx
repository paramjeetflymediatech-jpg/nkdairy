'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AnimatedSection({ 
  children, 
  className = "",
  delay = 0,
  staggerChildren = false,
  playOnLoad = false
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
  staggerChildren?: boolean;
  playOnLoad?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Define target elements for animation
    const targets = staggerChildren 
      ? gsap.utils.toArray(containerRef.current.children) 
      : containerRef.current;

    gsap.fromTo(targets, 
      { 
        opacity: 0, 
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: delay,
        stagger: staggerChildren ? 0.15 : 0,
        scrollTrigger: playOnLoad ? undefined : {
          trigger: containerRef.current,
          start: "top 90%", // Trigger slightly earlier
          toggleActions: "play none none reverse",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
