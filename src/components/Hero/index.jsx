import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const TITLES = [
  'Mechatronics Engineering Student',
  'Hardware & PCB Designer',
  'Embedded Systems Developer',
  'CAD Designer',
];

function TypewriterTitle() {
  const [displayed, setDisplayed] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    const current = TITLES[titleIdx];
    let timeout;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1800);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 35);
      } else {
        setTitleIdx((i) => (i + 1) % TITLES.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, titleIdx]);

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 'clamp(13px, 1.6vw, 17px)',
      color: 'var(--cyan)',
      letterSpacing: '0.04em',
      minHeight: '1.6em',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    }}>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: 2,
        height: '1.1em',
        background: 'var(--cyan)',
        marginLeft: 3,
        animation: 'blink 1s step-end infinite',
        opacity: 0.8,
        borderRadius: 1,
      }} />
    </div>
  );
}

export default function HeroSection() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.13, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '100px',
        paddingBottom: '100px',
        overflow: 'hidden',
      }}
      aria-label="Home"
    >
      {/* Bottom fade into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(to bottom, transparent, var(--bg))',
        pointerEvents: 'none', zIndex: 2,
      }} aria-hidden="true" />

      {/* Centered content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          padding: '0 24px', maxWidth: 640,
        }}
      >
        {/* Profile photo */}
        <div style={{
          width: 148, height: 148,
          borderRadius: '50%',
          border: '2px solid rgba(126,184,212,0.25)',
          background: 'rgba(126,184,212,0.05)',
          marginBottom: 36,
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 40px rgba(126,184,212,0.08)',
          flexShrink: 0,
        }}>
          <img
            src="/images/profile.jpg"
            alt="Zaid Anagreh"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Label */}
        <div className="label" style={{ marginBottom: 14 }}>
          Mechatronics Engineering Portfolio
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--font-head)',
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: 18,
        }}>
          Zaid Anagreh
        </h1>
        <TypewriterTitle />

        {/* Value prop */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(12px, 1.3vw, 14px)',
          color: 'var(--text-mid)',
          lineHeight: 1.9,
          marginTop: 22,
          marginBottom: 36,
          maxWidth: 480,
        }}>
          I am a second year mechatronics engineering student building integrated hardware along with software systems,
          from mechanical design and PCB layout to embedded firmware and intelligent software.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#projects" className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Projects →
          </a>
          <a href="#contact-me" className="btn-ghost"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact-me')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        pointerEvents: 'none',
      }} aria-hidden="true">
        <svg
          width="28"
          height="44"
          viewBox="0 0 28 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: 'rgbGlow 3s linear infinite' }}
        >
          {/* Mouse body */}
          <rect x="1.5" y="1.5" width="25" height="37" rx="12.5" stroke="#a0adb8" strokeWidth="2.5"/>
          {/* Scroll wheel */}
          <rect x="12" y="7" width="4" height="8" rx="2" fill="#a0adb8"/>
          {/* Chevrons */}
          <polyline points="7,48 14,55 21,48" stroke="#a0adb8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="7,54 14,61 21,54" stroke="#a0adb8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}