import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import ConsultationForm from '../ConsultationForm.jsx'
import { serviceCategories } from '../../data/services.js'

const heroPoints = [
  'Free consultation',
  'Senior engineers',
  'Support after launch',
]

/* Inline CSS: dark grey hero + silver glassmorphism form (also styles the modal form) */
const css = `
:root {
  --cream: #ffffff;
  --navy-950: var(--dark);
  --navy-900: var(--surface);
  --navy-800: var(--surface);
  --navy-700: var(--surface);
  --ink: #ffffff;
  --ink-soft: #ffffff;
  --text-soft: #ffffff;
}

html, body, #root { background: var(--dark); }

/* ---------- HERO (solid black, silver text) ---------- */
.hero {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: clamp(40px, 5vw, 64px) 0 clamp(56px, 8vw, 96px);
  color: var(--ink);
  background: var(--dark);
}
.hero__copy .eyebrow { color: var(--silver); font-weight: 600; letter-spacing: 0.08em; }
.hero__copy .eyebrow__dot { background: var(--red); }
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
  background: var(--red);
  border: 1px solid var(--red);
  box-shadow: 0 10px 24px rgba(142, 14, 44, 0.28);
}
.hero__actions .btn--primary:hover { background: var(--red-hover); transform: translateY(-2px); }
.hero__actions .btn--ghost {
  color: var(--silver);
  background: rgba(200, 200, 200, 0.04);
  border: 1.5px solid rgba(200, 200, 200, 0.5);
}
.hero__actions .btn--ghost:hover { background: rgba(200, 200, 200, 0.12); color: var(--white); transform: translateY(-2px); }
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
.hero__points svg { color: var(--silver); }

/* ---------- GLASS FORM: shared (popup, dark surface) ---------- */
.glass-form {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(200, 200, 200, 0.2);
  border-radius: 22px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  color: #fff;
}
.contact-form.glass-form { padding: 0; background: transparent; border: 0; box-shadow: none; backdrop-filter: none; }
.modal__dialog.glass-form { background: rgba(var(--surface-rgb), 0.96); }

.modal__head h2 { margin: 8px 0 6px; font-size: 1.5rem; color: #fff; }
.modal__head p { color: var(--text-soft); font-size: 0.95rem; line-height: 1.5; }
.glass-form .eyebrow { color: var(--silver); }

.glass-form .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.glass-form .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.glass-form label { color: #ffffff; font-size: 0.85rem; font-weight: 500; }
.glass-form .req { color: #ffffff; }

.glass-form input,
.glass-form select,
.glass-form textarea {
  width: 100%;
  padding: 12px 14px;
  color: #fff;
  font: inherit;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(200, 200, 200, 0.24);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}
.glass-form input::placeholder,
.glass-form textarea::placeholder { color: #ffffff; }
.glass-form input:focus,
.glass-form select:focus,
.glass-form textarea:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--silver);
  box-shadow: 0 0 0 3px rgba(200, 200, 200, 0.16);
}
.glass-form select option { color: #fff; background: var(--navy-900); }
.glass-form input[type='date'],
.glass-form input[type='time'] { color-scheme: dark; }

.glass-form .has-error input,
.glass-form .has-error select { border-color: #ff7a8a; }
.glass-form .field-error { color: #ffffff; font-size: 0.82rem; margin: 0; }

.glass-form .form-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0 12px;
  padding: 0;
  color: var(--silver);
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
  color: #fff;
  font-weight: 600;
  background: var(--red);
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}
.glass-form .contact-submit:hover:not(:disabled) { transform: translateY(-2px); background: var(--red-hover); }
.glass-form .contact-submit:disabled { opacity: 0.7; cursor: progress; }

.glass-form .form-note { margin: 12px 0 0; color: #ffffff; font-size: 0.8rem; text-align: center; }
.glass-form .form-alert { margin-bottom: 12px; padding: 12px 14px; color: #ffffff; background: rgba(142, 14, 44, 0.14); border: 1px solid rgba(142, 14, 44, 0.38); border-radius: 12px; font-size: 0.9rem; }
.glass-form .form-alert a { color: #fff; }
.glass-form .request-notice { display: flex; gap: 8px; margin-bottom: 12px; padding: 10px 12px; color: var(--text-soft); background: rgba(200, 200, 200, 0.09); border-radius: 12px; font-size: 0.9rem; }
.hp-field { position: absolute; left: -9999px; }

/* ---------- HOME HERO FORM: small dark glass card ---------- */
.hero__form {
  width: 100%;
  max-width: 400px;
  justify-self: end;
  padding: 20px 22px;
  color: var(--ink);
  background: rgba(var(--surface-rgb), 0.82);
  border: 1px solid rgba(200, 200, 200, 0.24);
  border-radius: 18px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}
.hero__form .hero-form__head { margin-bottom: 12px; }
.hero__form .hero-form__head h2 { margin: 0 0 4px; font-size: 1.2rem; color: var(--ink); }
.hero__form .hero-form__head p { font-size: 0.85rem; line-height: 1.45; color: var(--ink-soft); }
.hero__form label { color: var(--ink); font-size: 0.8rem; }
.hero__form .req { color: #ffffff; }
.hero__form .field { gap: 4px; margin-bottom: 9px; }
.hero__form input,
.hero__form select,
.hero__form textarea {
  padding: 9px 12px;
  font-size: 0.9rem;
  color: var(--ink);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(200, 200, 200, 0.2);
  border-radius: 10px;
}
.hero__form input::placeholder,
.hero__form textarea::placeholder { color: #ffffff; }
.hero__form input:focus,
.hero__form select:focus,
.hero__form textarea:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--silver);
  box-shadow: 0 0 0 3px rgba(200, 200, 200, 0.14);
}
.hero__form select option { color: var(--ink); background: var(--navy-900); }
.hero__form input[type='date'],
.hero__form input[type='time'] { color-scheme: dark; }
.hero__form .form-more { color: var(--silver); font-size: 0.84rem; margin-bottom: 9px; }
.hero__form .field-error { color: #ffffff; }
.hero__form .has-error input,
.hero__form .has-error select { border-color: #ff7a8a; }
.hero__form .form-alert { color: #ffffff; background: rgba(142, 14, 44, 0.12); border-color: rgba(142, 14, 44, 0.35); }
.hero__form .form-alert a { color: var(--ink); }
.hero__form .contact-submit {
  padding: 11px 16px;
  font-size: 0.92rem;
  border-radius: 10px;
  color: #fff;
  background: var(--red);
  box-shadow: 0 8px 20px rgba(142, 14, 44, 0.25);
}
.hero__form .contact-submit:hover:not(:disabled) { background: var(--red-hover); }
.hero__form .form-note { margin-top: 9px; font-size: 0.74rem; color: #ffffff; }

/* ---------- CAPABILITY STRIP: dark surface, silver text ---------- */
.cap-strip {
  color: #ffffff;
  background: var(--surface);
  border-top: 1px solid rgba(230, 230, 230, 0.12);
  border-bottom: 1px solid rgba(230, 230, 230, 0.12);
}
.cap-strip .cap-strip__inner { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; padding: 18px 0; }
.cap-strip .cap-strip__label { color: var(--silver) !important; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; }
.cap-strip ul { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 0; padding: 0; list-style: none; font-size: 0.92rem; }
.cap-strip li,
.cap-strip li * { color: var(--silver) !important; opacity: 1 !important; }
.cap-strip li { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; }
.cap-strip li svg { color: var(--silver) !important; }

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
