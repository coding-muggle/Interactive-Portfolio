import { useEffect, useRef, useState } from 'react';

// ── Custom neon cursor ─────────────────────────────────────
export function Cursor() {
  const outer = useRef(null);
  const inner = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (inner.current) {
        inner.current.style.left = e.clientX + 'px';
        inner.current.style.top = e.clientY + 'px';
      }
    };
    let raf;
    const tick = () => {
      lerped.current.x += (pos.current.x - lerped.current.x) * 0.11;
      lerped.current.y += (pos.current.y - lerped.current.y) * 0.11;
      if (outer.current) {
        outer.current.style.left = lerped.current.x + 'px';
        outer.current.style.top = lerped.current.y + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', move, { passive: true });
    tick();
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-outer" ref={outer} aria-hidden="true" />
      <div id="cursor-inner" ref={inner} aria-hidden="true" />
    </>
  );
}

// ── Star / particle canvas background ────────────────────
export function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], raf;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const makeStars = () => {
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() * 0.001;

      // Nebula blobs (very subtle)
      const grd1 = ctx.createRadialGradient(W * 0.25, H * 0.3, 0, W * 0.25, H * 0.3, W * 0.35);
      grd1.addColorStop(0, 'rgba(37,99,235,0.04)');
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, W, H);

      const grd2 = ctx.createRadialGradient(W * 0.78, H * 0.65, 0, W * 0.78, H * 0.65, W * 0.3);
      grd2.addColorStop(0, 'rgba(77,201,255,0.03)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach((s) => {
        const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190,225,255,${alpha})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    makeStars();
    draw();

    const onResize = () => { resize(); makeStars(); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas id="star-canvas" ref={canvasRef} aria-hidden="true" />;
}

// ── Navigation ────────────────────────────────────────────
const NAV = ['Home', 'About', 'Education', 'Projects', 'Experience', 'Contact Me'];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 48px',
          background: scrolled ? 'rgba(3,7,15,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(77,201,255,0.08)' : 'none',
          transition: 'all 0.4s',
        }}
      >
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 15, color: 'var(--cyan)', letterSpacing: '0.05em' }}>
          &lt;Zaid Anagreh's Portfolio&gt;
        </div>
        <div className="desktop-nav" style={{ display: 'flex', gap: 36 }}>
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase().replace(/\s/g, '-')}`} className="nav-link"
              onClick={(e) => { e.preventDefault(); goto(n.toLowerCase().replace(/\s/g, '-')); }}>
              {n}
            </a>
          ))}
        </div>
        <button className="hamburger btn-ghost" style={{ padding: '8px 16px' }}
          onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
          MENU
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button onClick={() => setMobileOpen(false)} aria-label="Close menu"
          style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'var(--text-mid)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.15em' }}>
          ✕ CLOSE
        </button>
        {NAV.map((n) => (
          <a key={n} href={`#${n.toLowerCase().replace(/\s/g, '-')}`} className="nav-link"
            onClick={(e) => { e.preventDefault(); goto(n.toLowerCase().replace(/\s/g, '-')); }}>
            {n}
          </a>
        ))}
      </div>
    </>
  );
}
