import ConsultationForm from '../ConsultationForm.jsx'

const steps = [
  { title: 'We review your request', text: 'We look at your problem and the service you chose.' },
  { title: 'We confirm a time', text: 'A short call at a slot that suits you.' },
  { title: 'You get a written plan', text: 'Scope, timeline and price before anything starts.' },
]

/* Inline CSS: compact navy section, cream text, form + short "what happens next" */
const css = `
.contact-section {
  --navy-900: var(--surface);
  --cream: #ffffff;
  padding: clamp(36px, 5vw, 64px) 0;
  color: #ffffff;
  background: var(--navy-900);
  border-top: 1px solid rgba(230, 230, 230, 0.1);
}
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: clamp(28px, 6vw, 80px);
  align-items: start;
}
.contact-heading { margin-bottom: 18px; }
.contact-heading h2 { margin: 0 0 6px; color: #ffffff; font-size: clamp(1.5rem, 2.8vw, 2.1rem); line-height: 1.15; letter-spacing: -0.02em; }
.contact-heading p { margin: 0; color: #ffffff; font-size: 0.97rem; line-height: 1.5; }

/* Form: self-contained glass card with cream text (overrides any blue from older styles) */
.contact-section .contact-form.glass-form {
  max-width: 520px;
  padding: 22px;
  color: #ffffff;
  background: rgba(230, 230, 230, 0.07);
  border: 1px solid rgba(230, 230, 230, 0.2);
  border-radius: 18px;
  box-shadow: 0 18px 44px rgba(2, 8, 30, 0.45), inset 0 1px 0 rgba(230, 230, 230, 0.18);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}
.contact-section .contact-form .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.contact-section .contact-form .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.contact-section .contact-form label { color: #ffffff !important; font-size: 0.85rem; font-weight: 500; }
.contact-section .contact-form .req { color: #ffffff !important; }
.contact-section .contact-form input,
.contact-section .contact-form select,
.contact-section .contact-form textarea {
  width: 100%;
  padding: 11px 13px;
  color: #ffffff !important;
  font: inherit;
  background: rgba(230, 230, 230, 0.08) !important;
  border: 1px solid rgba(230, 230, 230, 0.28);
  border-radius: 10px;
  outline: none;
}
.contact-section .contact-form input::placeholder,
.contact-section .contact-form textarea::placeholder { color: #ffffff !important; }
.contact-section .contact-form input:focus,
.contact-section .contact-form select:focus,
.contact-section .contact-form textarea:focus {
  border-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(230, 230, 230, 0.18);
}
.contact-section .contact-form select option { color: var(--ink); background: var(--surface-2); }
.contact-section .contact-form input[type='date'] { color-scheme: dark; }
.contact-section .contact-form .form-more { color: #ffffff !important; background: none; border: 0; padding: 0; margin: 0 0 12px; font: inherit; font-size: 0.88rem; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.contact-section .contact-form .field-error { color: #ffffff !important; font-size: 0.82rem; margin: 0; }
.contact-section .contact-form .has-error input,
.contact-section .contact-form .has-error select { border-color: #ff8a98; }
.contact-section .contact-form .form-alert { color: #ffffff !important; background: rgba(255, 90, 110, 0.14); border: 1px solid rgba(255, 122, 138, 0.4); border-radius: 10px; padding: 10px 12px; margin-bottom: 12px; font-size: 0.88rem; }
.contact-section .contact-form .form-alert a { color: #ffffff !important; }
.contact-section .contact-form .contact-submit {
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 18px;
  color: var(--white) !important;
  font-weight: 600;
  background: var(--red) !important;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
}
.contact-section .contact-form .contact-submit:hover:not(:disabled) { background: var(--red-hover) !important; }
.contact-section .contact-form .form-note { margin: 12px 0 0; color: #ffffff !important; font-size: 0.8rem; text-align: center; }
.hp-field { position: absolute; left: -9999px; }

.contact-aside { padding-top: clamp(0px, 5vw, 64px); }
.contact-aside__label {
  margin: 0 0 14px;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.contact-steps { margin: 0; padding: 0; list-style: none; border-top: 1px solid rgba(230, 230, 230, 0.16); }
.contact-steps li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(230, 230, 230, 0.16);
}
.contact-steps li > span { min-width: 28px; color: #ffffff; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.04em; }
.contact-steps h3 { margin: 0 0 2px; color: #ffffff; font-size: 1rem; font-weight: 600; line-height: 1.3; }
.contact-steps p { margin: 0; color: #ffffff; font-size: 0.9rem; line-height: 1.45; }

@media (max-width: 900px) {
  .contact-grid { grid-template-columns: 1fr; }
  .contact-aside { padding-top: 0; }
  .contact-section .contact-form.glass-form { max-width: none; }
}
@media (max-width: 520px) {
  .contact-section .contact-form .form-row { grid-template-columns: 1fr; }
}
`

export default function ContactSection() {
  return (
    <section
      className="section section--dark contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <style>{css}</style>
      <div className="container contact-grid">
        <div className="contact-main">
          <div className="contact-heading">
            <h2 id="contact-heading">Book a free consultation.</h2>
            <p>Tell us about your project. We reply soon if it&apos;s a good fit.</p>
          </div>

          <ConsultationForm
            idPrefix="contact"
            submitLabel="Book My Free Consultation"
            className="glass-form"
          />
        </div>

        <aside className="contact-aside" aria-label="What happens next">
          <p className="contact-aside__label">What happens next</p>
          <ol className="contact-steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}