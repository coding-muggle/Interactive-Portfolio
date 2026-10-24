import { useRef, useState } from 'react';
import { useReveal } from '../../hooks/index.js';

const SOCIALS = [
  { name: 'GitHub',   url: 'https://github.com/coding-muggle',          icon: '⌨', hint: 'github.com/coding-muggle' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/zaid-anagreh/', icon: '▣', hint: 'www.linkedin.com/in/zaid-anagreh/' },
];

function validate(form) {
  const e = {};
  if (!form.name.trim()) e.name = 'Name is required';
  if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
  if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
  return e;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  useReveal(sectionRef);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setErrors({});
    setServerError('');
    setSending(true);

    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) throw new Error(data.error || 'Failed to send');

      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch {
      setServerError('Could not send message. Please try again, or email me directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact-me" ref={sectionRef} aria-label="Contact me">
      <div className="section-wrap" style={{ paddingBottom: 160 }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="label" style={{ marginBottom: 14 }}>Contact</div>
          <h2 className="section-title">Let's Build Something</h2>
        </div>

        <div className="grid-2 reveal" style={{ gap: 48, alignItems: 'start' }}>
          {/* Form */}
          <div className="glass scan-box" style={{ padding: '44px 40px', borderRadius: 14, borderColor: 'rgba(77,201,255,0.14)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '36px 0' }} role="status" aria-live="polite">
                <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 700, color: 'var(--cyan)', marginBottom: 12 }}>
                  Message Transmitted
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-mid)' }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="contact-name" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.18em', marginBottom: 8, textTransform: 'uppercase' }}>
                    Name
                  </label>
                  <input id="contact-name" className="neo-input" type="text" placeholder="Your Name"
                    value={form.name} onChange={set('name')} autoComplete="name" aria-required="true"
                    aria-describedby={errors.name ? 'err-name' : undefined} />
                  {errors.name && <div id="err-name" role="alert" style={{ color: '#ef4444', fontSize: 11, marginTop: 6, fontFamily: 'var(--font-mono)' }}>{errors.name}</div>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="contact-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.18em', marginBottom: 8, textTransform: 'uppercase' }}>
                    Email
                  </label>
                  <input id="contact-email" className="neo-input" type="email" placeholder="your@email.com"
                    value={form.email} onChange={set('email')} autoComplete="email" aria-required="true"
                    aria-describedby={errors.email ? 'err-email' : undefined} />
                  {errors.email && <div id="err-email" role="alert" style={{ color: '#ef4444', fontSize: 11, marginTop: 6, fontFamily: 'var(--font-mono)' }}>{errors.email}</div>}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label htmlFor="contact-msg" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.18em', marginBottom: 8, textTransform: 'uppercase' }}>
                    Message
                  </label>
                  <textarea id="contact-msg" className="neo-input" rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message} onChange={set('message')} aria-required="true"
                    style={{ resize: 'vertical', minHeight: 120 }}
                    aria-describedby={errors.message ? 'err-msg' : undefined} />
                  {errors.message && <div id="err-msg" role="alert" style={{ color: '#ef4444', fontSize: 11, marginTop: 6, fontFamily: 'var(--font-mono)' }}>{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={sending}
                  style={{ width: '100%', justifyContent: 'center', fontSize: 12, letterSpacing: '0.18em', opacity: sending ? 0.7 : 1 }}
                >
                  {sending ? 'Sending…' : 'Send Message →'}
                </button>

                {serverError && (
                  <div role="alert" style={{ color: '#ef4444', fontSize: 11, marginTop: 10, fontFamily: 'var(--font-mono)' }}>
                    {serverError}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Info card */}
            <div className="glass" style={{ padding: '28px 30px', borderRadius: 12 }}>
              <div className="label" style={{ marginBottom: 18 }}>Get In Touch</div>
              {[
                { label: 'Email', value: 'zaidanagreh1@gmail.com', icon: '✉' },
                { label: 'Location', value: 'Woodstock, Ontario, Canada', icon: '◎' },
                { label: 'Status', value: 'Open to internships & co-ops', icon: '◉' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--cyan)', fontSize: 16, marginTop: 1, opacity: 0.7 }}>{icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.15em', marginBottom: 4, textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="glass" style={{ padding: '28px 30px', borderRadius: 12 }}>
              <div className="label" style={{ marginBottom: 16 }}>Socials</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SOCIALS.map(({ name, url, icon, hint }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                    aria-label={`${name} — ${hint}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 13, padding: '11px 16px',
                      borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border)', textDecoration: 'none',
                      transition: 'var(--transition)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan-dim)'; e.currentTarget.style.background = 'rgba(77,201,255,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  >
                    <span style={{ color: 'var(--cyan)', fontSize: 15, opacity: 0.7 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', marginBottom: 2 }}>{name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>{hint}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: 12 }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              download
              className="btn-primary"
              style={{ textAlign: 'center', justifyContent: 'center', borderColor: 'rgba(59,130,246,0.6)', color: 'var(--blue-soft)' }}
              aria-label="Download resume PDF"
            >
              ↓ Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '26px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
      }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.05em' }}>
          &lt; Z.A &gt;
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>
          Built with React · Three.js · GSAP · {new Date().getFullYear()}
        </div>
      </footer>
    </section>
  );
}
