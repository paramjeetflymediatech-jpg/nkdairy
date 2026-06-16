'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function NumberTicker({
  value,
  duration = 2,
  className = "",
  suffix = ""
}: {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!numberRef.current) return;

    gsap.to(numberRef.current, {
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      innerHTML: value,
      duration: duration,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      onUpdate: function () {
        if (numberRef.current) {
          // ensure formatting if needed, GSAP handles snap but we add suffix
          numberRef.current.innerText = Math.round(Number(this.targets()[0].innerHTML)) + suffix;
        }
      }
    });
  }, { scope: numberRef });

  return (
    <span ref={numberRef} className={className}>
      0{suffix}
    </span>
  );
}
