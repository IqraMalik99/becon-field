import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import { useConsultation } from '../../context/consultationContext.js'
import { whyUs } from '../../data/site.js'

/* Inline CSS: dark section, silver text, red primary button */
const css = `
.about-section {
  --navy-900: #f5f5f5;
  --navy-800: #c8c8c8;
  --ink-soft: rgba(245, 245, 245, 0.72);
  padding: clamp(32px, 4vw, 52px) 0;
  color: var(--ink);
  background: var(--dark);
  border-top: 1px solid var(--line-light);
}
.about-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 6vw, 80px);
  align-items: center;
}
.about-section .eyebrow { color: var(--silver); font-weight: 600; letter-spacing: 0.08em; }
.about-section .eyebrow__dot { background: var(--red); }
.about-section h2 {
  margin: 8px 0 10px;
  color: var(--ink);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
}
.about-section .text-accent-bright {
  color: var(--silver);
  text-decoration: underline;
  text-decoration-color: var(--red);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
.about-section__copy p { margin: 0 0 6px; max-width: 30rem; color: var(--ink-soft); font-size: 0.97rem; line-height: 1.6; }
.about-section__copy .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 11px 20px;
  color: var(--white);
  font: inherit;
  font-weight: 600;
  background: var(--red);
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(142, 14, 44, 0.2);
  transition: transform 0.18s ease, background 0.18s ease;
}
.about-section__copy .btn:hover { background: var(--red-hover); transform: translateY(-2px); }

.about-section__list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.about-section__list li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 11px 14px;
  background: var(--surface-2);
  border: 1px solid var(--line-light);
  border-radius: 14px;
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.about-section__list li:hover { transform: translateX(4px); border-color: rgba(200, 200, 200, 0.5); }
.about-section__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  color: var(--white);
  background: var(--red);
  border-radius: 50%;
}
.about-section__list h3 { margin: 0 0 2px; color: var(--ink); font-size: 1rem; font-weight: 700; line-height: 1.25; }
.about-section__list p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.85rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 900px) {
  .about-section__grid { grid-template-columns: 1fr; }
}
`

export default function AboutSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <style>{css}</style>
      <div className="container about-section__grid">
        <div className="about-section__copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            About us
          </p>
          <h2 id="about-heading">
            A small senior team. <span className="text-accent-bright">No middlemen.</span>
          </h2>
          <p>
            One team for IT support, software, mobile, AI and security. You talk directly to the
            people doing the work, get a written scope and budget up front, and we stay on
            after launch.
          </p>
          <button type="button" className="btn" onClick={() => openConsultation()}>
            Talk to our team <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <ul className="about-section__list">
          {whyUs.map((item) => (
            <li key={item.title}>
              <span className="about-section__icon" aria-hidden="true">
                <Check size={16} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
