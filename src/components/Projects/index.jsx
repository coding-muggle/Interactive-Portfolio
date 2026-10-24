import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReveal } from '../../hooks/index.js';
import { PROJECTS } from '../../data/index.js';

// ── Image gallery: up to 3 images, first one large ───────
function Gallery({ images, title, onOpen }) {
  const shown = images.slice(0, 3);
  if (!shown.length) return null;
  return (
    <div className={`gallery gallery-${shown.length}`}>
      {shown.map((src, i) => (
        <button key={src} type="button" className="gallery-item" onClick={() => onOpen(i)}
          aria-label={`Enlarge image ${i + 1} of ${shown.length}`}>
          <img src={src} alt={`${title} — image ${i + 1}`} loading="lazy" />
        </button>
      ))}
    </div>
  );
}

// ── Project modal ─────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(null);
  const images = project.images.slice(0, 3);

  // Escape closes the enlarged image first, then the modal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (imgIdx !== null) setImgIdx(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [imgIdx, onClose]);

  // Lock page scroll while the modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  const sections = [
    { label: 'What?', text: project.what },
    { label: 'How?', text: project.how },
    { label: 'Results', text: project.results },
  ];

  return (
    <div
      className="modal-backdrop open"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 16 }}>
          <div>
            <div className="label" style={{ marginBottom: 10, color: project.color }}>{project.subtitle}</div>
            <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{project.title}</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mid)', marginTop: 8 }}>{project.role}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-mid)', cursor: 'pointer', padding: '6px 14px', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 11, flexShrink: 0 }}
            aria-label="Close project details"
          >
            ESC ✕
          </button>
        </div>

        <Gallery images={images} title={project.title} onOpen={setImgIdx} />

        {sections.map(({ label, text }) => (
          <div key={label} className="case-section" style={{ borderLeftColor: project.color }}>
            <div className="label" style={{ color: project.color, marginBottom: 8 }}>{label}</div>
            <p>{text}</p>
          </div>
        ))}

        <div style={{ marginTop: 28 }}>
          <div className="label" style={{ marginBottom: 12 }}>Tools & Technologies</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tools.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>

        {project.links?.length > 0 && (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            {project.links.map(({ label, url }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                {label} ↗
              </a>
            ))}
          </div>
        )}

        {/* Portal to <body>: the modal's transform would otherwise trap this fixed overlay inside it */}
        {imgIdx !== null && createPortal(
          <div className="lightbox" onClick={() => setImgIdx(null)} role="dialog" aria-label="Enlarged image">
            <img
              src={images[imgIdx]}
              alt={`${project.title} — image ${imgIdx + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <div className="lightbox-nav" onClick={(e) => e.stopPropagation()}>
                {images.map((src, i) => (
                  <button key={src} type="button" onClick={() => setImgIdx(i)}
                    className={i === imgIdx ? 'active' : ''} aria-label={`Show image ${i + 1}`} />
                ))}
              </div>
            )}
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}

// ── Projects section ──────────────────────────────────────
export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [modal, setModal] = useState(null);
  useReveal(sectionRef);

  return (
    <section id="projects" ref={sectionRef} aria-label="Projects">
      <div className="section-wrap">
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="label" style={{ marginBottom: 14 }}>Projects</div>
          <h2 className="section-title">Selected Work</h2>
        </div>

        {/* Layout (mobile swipe row / desktop grid) lives in .projects-row in global.css */}
        <div className="projects-row" role="list">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="proj-card reveal"
              role="listitem"
              onClick={() => setModal(proj)}
              onKeyDown={(e) => e.key === 'Enter' && setModal(proj)}
              tabIndex={0}
              aria-label={`${proj.title} — click to view details`}
            >
              {proj.featured && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em',
                  color: proj.color, border: `1px solid ${proj.color}50`,
                  padding: '3px 8px', borderRadius: 4,
                }}>
                  FEATURED
                </div>
              )}

              {/* Color accent bar */}
              <div style={{ width: 32, height: 3, borderRadius: 2, background: proj.color, marginBottom: 18, boxShadow: `0 0 10px ${proj.color}60` }} />

              <div style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.01em' }}>
                {proj.title}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: proj.color, marginBottom: 14, letterSpacing: '0.08em', opacity: 0.85 }}>
                {proj.subtitle}
              </div>
              <p className="proj-summary">{proj.what}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                {proj.tools.slice(0, 4).map(t => (
                  <span key={t} style={{
                    fontSize: 11, padding: '3px 8px', borderRadius: 4,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                    color: 'var(--text-dim)', fontFamily: 'var(--font-mono)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
