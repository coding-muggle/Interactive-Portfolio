import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Fade/slide in every `.reveal` child once the section scrolls into view ──
export function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const els = ref.current.querySelectorAll('.reveal');
      if (!els.length) return;

      gsap.fromTo(
        els,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);
}
