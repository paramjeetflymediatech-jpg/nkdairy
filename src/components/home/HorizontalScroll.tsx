'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HorizontalScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const sections = gsap.utils.toArray(containerRef.current.children);
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        // snap: 1 / (sections.length - 1),
        end: () => "+=" + containerRef.current!.offsetWidth
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div ref={containerRef} className="flex h-full w-max">
        {children}
      </div>
    </section>
  );
}
