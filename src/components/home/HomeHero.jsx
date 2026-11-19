import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import ConsultationForm from '../ConsultationForm.jsx'
import { serviceCategories } from '../../data/services.js'

const heroPoints = [
  'Free consultation',
  'Senior engineers',
  'Support after launch',
]

/* Inline CSS: navy blue theme + glassmorphism form (also styles the modal form) */
const css = `
:root {
  --cream: #f6f1e7;
  --cream-deep: #ece4d3;
  --navy-950: #040a18;
  --navy-900: #0a1a3d;
  --navy-800: #0d1f45;
  --navy-700: #14306a;
  --ink: #0a1a3d;
  --ink-soft: rgba(10, 26, 61, 0.72);
  --text-soft: rgba(226, 234, 255, 0.78);
}

/* No gap between navbar and banner: any space shows the same cream */
html, body, #root { background: var(--cream); }

/* ---------- HERO (cream, clean) ---------- */
.hero {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: clamp(40px, 5vw, 64px) 0 clamp(56px, 8vw, 96px);
  color: var(--ink);
  background: var(--cream);
}
.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
}
.hero__copy .eyebrow { color: var(--navy-700); font-weight: 600; letter-spacing: 0.08em; }
.hero__copy .eyebrow__dot { background: var(--navy-900); }
.hero__copy h1 {
  margin: 14px 0 16px;
  font-size: clamp(2.4rem, 5.4vw, 4.2rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.hero__lead {
  max-width: 34rem;
  font-size: clamp(1.02rem, 1.4vw, 1.2rem);
  line-height: 1.6;
  color: var(--ink-soft);
}
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin: 28px 0 24px; }
.hero__actions .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.hero__actions .btn--primary {
  color: #fff;
  background: var(--navy-900);
  border: 1px solid var(--navy-900);
  box-shadow: 0 10px 24px rgba(10, 26, 61, 0.25);
}
.hero__actions .btn--primary:hover { background: var(--navy-800); transform: translateY(-2px); }
.hero__actions .btn--ghost {
  color: var(--navy-900);
  background: transparent;
  border: 1.5px solid var(--navy-900);
}
.hero__actions .btn--ghost:hover { background: rgba(10, 26, 61, 0.07); transform: translateY(-2px); }
.hero__points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--ink-soft);
  font-size: 0.95rem;
}
.hero__points li { display: inline-flex; align-items: center; gap: 8px; }
.hero__points svg { color: var(--navy-900); }

/* ---------- GLASS FORM: shared (popup, navy surface) ---------- */
.glass-form {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 22px;
  box-shadow: 0 24px 60px rgba(2, 8, 30, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  color: #fff;
}
.contact-form.glass-form { padding: 0; background: transparent; border: 0; box-shadow: none; backdrop-filter: none; }
.modal__dialog.glass-form { background: rgba(10, 26, 61, 0.88); }

.modal__head h2 { margin: 8px 0 6px; font-size: 1.5rem; color: #fff; }
.modal__head p { color: var(--text-soft); font-size: 0.95rem; line-height: 1.5; }
.glass-form .eyebrow { color: #f6f1e7; }

.glass-form .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.glass-form .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.glass-form label { color: rgba(255, 255, 255, 0.9); font-size: 0.85rem; font-weight: 500; }
.glass-form .req { color: #f1d9a0; }

.glass-form input,
.glass-form select,
.glass-form textarea {
  width: 100%;
  padding: 12px 14px;
  color: #fff;
  font: inherit;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}
.glass-form input::placeholder,
.glass-form textarea::placeholder { color: rgba(226, 234, 255, 0.5); }
.glass-form input:focus,
.glass-form select:focus,
.glass-form textarea:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: #f6f1e7;
  box-shadow: 0 0 0 3px rgba(246, 241, 231, 0.2);
}
.glass-form select option { color: #fff; background: var(--navy-900); }
.glass-form input[type='date'],
.glass-form input[type='time'] { color-scheme: dark; }

.glass-form .has-error input,
.glass-form .has-error select { border-color: #ff7a8a; }
.glass-form .field-error { color: #ff9aa6; font-size: 0.82rem; margin: 0; }

.glass-form .form-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0 12px;
  padding: 0;
  color: #f6f1e7;
  font: inherit;
  font-size: 0.9rem;
  background: none;
  border: 0;
  cursor: pointer;
}
.glass-form .form-more[aria-expanded='true'] .form-more__chevron { transform: rotate(180deg); }

.glass-form .contact-submit {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  color: var(--navy-900);
  font-weight: 600;
  background: #f6f1e7;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}
.glass-form .contact-submit:hover:not(:disabled) { transform: translateY(-2px); background: #fff; }
.glass-form .contact-submit:disabled { opacity: 0.7; cursor: progress; }

.glass-form .form-note { margin: 12px 0 0; color: rgba(226, 234, 255, 0.6); font-size: 0.8rem; text-align: center; }
.glass-form .form-alert { margin-bottom: 12px; padding: 12px 14px; color: #ffd5da; background: rgba(255, 90, 110, 0.14); border: 1px solid rgba(255, 122, 138, 0.4); border-radius: 12px; font-size: 0.9rem; }
.glass-form .form-alert a { color: #fff; }
.glass-form .request-notice { display: flex; gap: 8px; margin-bottom: 12px; padding: 10px 12px; color: var(--text-soft); background: rgba(246, 241, 231, 0.1); border-radius: 12px; font-size: 0.9rem; }
.hp-field { position: absolute; left: -9999px; }

/* ---------- HOME HERO FORM: small, cream-white transparent glass ---------- */
.hero__form {
  width: 100%;
  max-width: 400px;
  justify-self: end;
  padding: 20px 22px;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  box-shadow: 0 18px 44px rgba(10, 26, 61, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}
.hero__form .hero-form__head { margin-bottom: 12px; }
.hero__form .hero-form__head h2 { margin: 0 0 4px; font-size: 1.2rem; color: var(--ink); }
.hero__form .hero-form__head p { font-size: 0.85rem; line-height: 1.45; color: var(--ink-soft); }
.hero__form label { color: var(--ink); font-size: 0.8rem; }
.hero__form .req { color: #b4452f; }
.hero__form .field { gap: 4px; margin-bottom: 9px; }
.hero__form input,
.hero__form select,
.hero__form textarea {
  padding: 9px 12px;
  font-size: 0.9rem;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(10, 26, 61, 0.2);
  border-radius: 10px;
}
.hero__form input::placeholder,
.hero__form textarea::placeholder { color: rgba(10, 26, 61, 0.45); }
.hero__form input:focus,
.hero__form select:focus,
.hero__form textarea:focus {
  background: #fff;
  border-color: var(--navy-900);
  box-shadow: 0 0 0 3px rgba(10, 26, 61, 0.14);
}
.hero__form select option { color: var(--ink); background: #fff; }
.hero__form input[type='date'],
.hero__form input[type='time'] { color-scheme: light; }
.hero__form .form-more { color: var(--navy-700); font-size: 0.84rem; margin-bottom: 9px; }
.hero__form .field-error { color: #b4452f; }
.hero__form .has-error input,
.hero__form .has-error select { border-color: #b4452f; }
.hero__form .form-alert { color: #7a2a1b; background: rgba(180, 69, 47, 0.1); border-color: rgba(180, 69, 47, 0.35); }
.hero__form .form-alert a { color: var(--navy-900); }
.hero__form .contact-submit {
  padding: 11px 16px;
  font-size: 0.92rem;
  border-radius: 10px;
  color: #fff;
  background: var(--navy-900);
  box-shadow: 0 8px 20px rgba(10, 26, 61, 0.25);
}
.hero__form .contact-submit:hover:not(:disabled) { background: var(--navy-800); }
.hero__form .form-note { margin-top: 9px; font-size: 0.74rem; color: rgba(10, 26, 61, 0.6); }

/* ---------- CAPABILITY STRIP: dark navy, cream text ---------- */
.cap-strip {
  color: var(--cream);
  background: var(--navy-900);
  border-top: 1px solid rgba(246, 241, 231, 0.12);
  border-bottom: 1px solid rgba(246, 241, 231, 0.12);
}
.cap-strip .cap-strip__inner { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; padding: 18px 0; }
.cap-strip .cap-strip__label { color: var(--cream) !important; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; }
.cap-strip ul { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 0; padding: 0; list-style: none; font-size: 0.92rem; }
.cap-strip li,
.cap-strip li * { color: var(--cream) !important; opacity: 1 !important; }
.cap-strip li { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; }
.cap-strip li svg { color: var(--cream) !important; }

/* ---------- MOBILE ---------- */
@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; }
  .hero__form { justify-self: stretch; max-width: 460px; }
}
@media (max-width: 520px) {
  .glass-form .form-row { grid-template-columns: 1fr; }
  .hero__actions .btn { width: 100%; justify-content: center; }
}
`

export default function HomeHero() {
  return (
    <>
      <style>{css}</style>

      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--onDark">
              <span className="eyebrow__dot" aria-hidden="true" />
              IT Support · Software · AI Automation
            </p>
            <h1>Tech that just works.</h1>
            <p className="hero__lead">
              We build your software, automate the busywork, and fix IT problems fast.
            </p>
            <div className="hero__actions">
              <a href="#hero-form" className="btn btn--primary">
                Book a Free Consult <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a href="#services" className="btn btn--ghost hero__consultation-btn">
                See Services
              </a>
            </div>
            <ul className="hero__points">
              {heroPoints.map((point) => (
                <li key={point}>
                  <Check size={16} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__form glass-form" id="hero-form">
            <div className="hero-form__head">
              <h2>Get Your Free Consultation</h2>
              <p>
                Tell us a little about your project. We'll reply soon if it's a good fit.
              </p>
            </div>
            <ConsultationForm
              idPrefix="hero"
              compact
              submitLabel="Book My Free Consult"
            />
          </div>
        </div>
      </section>

      <div className="cap-strip">
        <div className="container cap-strip__inner">
          <span className="cap-strip__label">What we cover</span>
          <ul>
            {serviceCategories.map((category) => (
              <li key={category.slug}>
                <Check size={14} aria-hidden="true" />
                {category.shortName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}