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

/* Form: clean silver panel styled in pages.css */
.contact-section .contact-form {
  max-width: 520px;
}

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
  .contact-section .contact-form { max-width: none; }
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