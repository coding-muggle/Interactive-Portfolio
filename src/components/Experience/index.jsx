import { useRef, useState } from 'react';
import { useReveal } from '../../hooks/index.js';
import { TIMELINE } from '../../data/index.js';

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(null);
  useReveal(sectionRef);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="experience" ref={sectionRef} aria-label="Experience and timeline">
      <div className="section-wrap">
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="label" style={{ marginBottom: 14 }}>Experience</div>
          <h2 className="section-title">Timeline</h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 7, top: 10, bottom: 10, width: 2,
            background: 'linear-gradient(to bottom, var(--cyan-dim), rgba(59,130,246,0.3) 60%, transparent)',
            borderRadius: 1,
          }} aria-hidden="true" />

          {TIMELINE.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`tl-item ${isOpen ? 'open' : ''} reveal`}
                style={{ marginBottom: 12 }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute', left: 0, top: 20, width: 16, height: 16,
                  borderRadius: '50%', background: item.color,
                  border: '3px solid var(--bg)',
                  boxShadow: `0 0 12px ${item.color}80`,
                  zIndex: 1,
                }} aria-hidden="true" />

                {/* Card */}
                <div
                  className="glass"
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => e.key === 'Enter' && toggle(i)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`tl-body-${i}`}
                  style={{
                    padding: '20px 26px', borderRadius: 12, cursor: 'pointer',
                    transition: 'var(--transition)',
                    borderColor: isOpen ? `${item.color}40` : undefined,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: item.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {item.type}
                      </span>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '7px 0 3px', letterSpacing: '-0.01em' }}>
                        {item.role}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mid)' }}>
                        {item.org}
                        {item.url && (
                          <>
                            {' | '}
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: 'var(--cyan)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                              {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>{item.date}</span>
                      <span style={{
                        color: item.color, fontSize: 14,
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                        transition: 'transform 0.3s',
                        display: 'inline-block',
                      }} aria-hidden="true">▸</span>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div className="tl-body" id={`tl-body-${i}`}>
                    <div style={{ paddingTop: 18, marginTop: 18, borderTop: '1px solid var(--border)' }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 16 }}>
                        {item.desc}
                      </p>
                      {item.bullets.length > 0 && <ul style={{ listStyle: 'none', marginBottom: 18, padding: 0 }}>
                        {item.bullets.map((b, bi) => (
                          <li key={bi} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', marginBottom: 10, paddingLeft: 18, position: 'relative', lineHeight: 1.7 }}>
                          <span style={{ position: 'absolute', left: 0, color: item.color, opacity: 0.7 }}>—</span>
                            {b}
                          </li>
                        ))}
                      </ul>}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                        {item.tech.map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
