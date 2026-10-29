import { useRef, useState } from 'react';
import { useReveal } from '../../hooks/index.js';
import { ALL_SKILLS } from '../../data/index.js';

const FILTERS = ['All', ...Object.keys(ALL_SKILLS)];

// Simple built-in icons for skills that have no brand logo
const GLYPHS = {
  api: (
    <path d="M9 4C7 4 6.5 5 6.5 7v2.5C6.5 11 5.5 12 4 12c1.5 0 2.5 1 2.5 2.5V17c0 2 .5 3 2.5 3M15 4c2 0 2.5 1 2.5 3v2.5c0 1.5 1 2.5 2.5 2.5-1.5 0-2.5 1-2.5 2.5V17c0 2-.5 3-2.5 3"
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  print: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8h18M10 8v4h4V8M12 12v2" strokeLinecap="round" />
      <path d="M8 18h8l-1-3H9z" />
    </g>
  ),
};

function SkillIcon({ name, color, icon, wide, glyph }) {
  const box = {
    height: 52, width: wide ? 112 : 52, borderRadius: 10, flexShrink: 0,
    background: '#eef2f6', padding: wide ? '0 10px' : 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
  if (glyph) {
    return (
      <div style={{ ...box, color }} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="100%" height="100%">{GLYPHS[glyph]}</svg>
      </div>
    );
  }
  return (
    <div style={box}>
      <img src={icon} alt={`${name} logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useReveal(sectionRef);

  const filtered = Object.entries(ALL_SKILLS).filter(
    ([cat]) => activeFilter === 'All' || activeFilter === cat
  );

  return (
    <section id="about" ref={sectionRef} aria-label="About me">
      <div className="section-wrap">

        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="label" style={{ marginBottom: 14 }}>About</div>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="reveal grid-2" style={{ gap: 40, marginBottom: 96 }}>
          <div className="glass" style={{ padding: '40px 44px' }}>
            <p style={{ fontSize: 15, lineHeight: 2.0, color: 'var(--text)', marginBottom: 22 }}>
              I'm a mechatronics engineering student driven by the integration of mechanical systems, electronics, and intelligent software. I thrive building things that cross traditional engineering disciplines such as autonomous machines, embedded controllers, and full-stack tools that solve real problems.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.95, color: 'var(--text-mid)', marginBottom: 22 }}>
              My work spans precision CAD modeling and PCB layout to full-stack web apps and closed-loop control systems. I own the full product lifecycle, from concept through prototyping, testing, and deployment.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.95, color: 'var(--text-mid)' }}>
              Outside the lab I explore competitive robotics, open-source hardware, and game design. Welcome to my portfolio.
            </p>
          </div>

          <div className="glass" style={{ padding: '40px 44px' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 16, color: 'var(--text)', marginBottom: 28, letterSpacing: '-0.01em' }}>
              Core Strengths
            </div>
            {[
              { label: 'Mechanical Design & CAD',     sub: 'SolidWorks · Onshape · Fusion 360' },
              { label: 'Embedded Systems & Firmware', sub: 'C / C++ · ESP32 · STM32 · FreeRTOS' },
              { label: 'PCB Design & Electronics',    sub: 'KiCad · 4- and 6-layer boards · Mixed-signal' },
              { label: 'Web Development',             sub: 'React · JavaScript · REST APIs' },
              { label: '3D Printing & Fabrication',   sub: 'FDM · Calibration · End-to-end' },
            ].map(({ label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', marginTop: 8, flexShrink: 0, opacity: 0.6 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Tools */}
        <div>
          <div className="reveal" style={{ marginBottom: 40 }}>
            <div className="label" style={{ marginBottom: 16 }}>Skills & Tools</div>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 32 }}>
              Technical Skills
            </h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {FILTERS.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} aria-pressed={activeFilter === f}
                  style={{
                    padding: '8px 20px', borderRadius: 100,
                    border: '1px solid ' + (activeFilter === f ? 'rgba(77,201,255,0.45)' : 'var(--border)'),
                    background: activeFilter === f ? 'rgba(77,201,255,0.08)' : 'transparent',
                    color: activeFilter === f ? 'var(--text)' : 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
                    cursor: 'pointer', transition: 'var(--transition)', textTransform: 'uppercase',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.map(([category, skills]) => (
            <div key={category} className="reveal" style={{ marginBottom: 52 }}>
              <div style={{
                fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700,
                color: 'var(--text-mid)', letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border)',
              }}>
                {category}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass"
                    onMouseOver={e => { e.currentTarget.style.borderColor = skill.color + '44'; e.currentTarget.style.background = skill.color + '08'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.background = ''; }}
                    style={{
                      padding: '22px 16px', borderRadius: 12,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13,
                      cursor: 'default', transition: 'var(--transition)', textAlign: 'center',
                    }}
                  >
                    <SkillIcon {...skill} />
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', lineHeight: 1.4 }}>
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
