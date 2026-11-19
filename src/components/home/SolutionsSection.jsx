import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import { businessProblems } from '../../data/site.js'
import { useConsultation } from '../../context/consultationContext.js'

/* Inline CSS: restrained, editorial list. Navy on cream, hairline dividers, no decoration. */
const css = `
.solutions-section {
  --navy-900: #0a1a3d;
  --navy-800: #0d1f45;
  --ink-soft: rgba(10, 26, 61, 0.68);
  --line: rgba(10, 26, 61, 0.14);
  padding: clamp(36px, 5vw, 64px) 0;
  color: var(--navy-900);
  background: #f6f1e7;
  border-top: 1px solid rgba(10, 26, 61, 0.08);
}
.solutions-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(28px, 6vw, 80px);
  align-items: start;
}
.solutions-copy { position: sticky; top: 110px; }
.solutions-section h2 { margin: 6px 0 8px; color: var(--navy-900); font-size: clamp(1.5rem, 2.8vw, 2.1rem); line-height: 1.15; letter-spacing: -0.02em; }
.solutions-section .eyebrow { color: var(--navy-900); font-weight: 600; letter-spacing: 0.08em; }
.solutions-section .eyebrow__dot { background: var(--navy-900); }
.solutions-section [class*='heading'] p,
.solutions-section .section-head__text { margin: 0 0 16px; color: var(--ink-soft); font-size: 0.97rem; line-height: 1.5; }
.solutions-copy .section-head,
.solutions-copy [class*='heading'] { text-align: left; margin-bottom: 0; }
.solutions-copy > .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  color: #fff;
  font: inherit;
  font-weight: 600;
  background: var(--navy-900);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.18s ease;
}
.solutions-copy > .btn:hover { background: var(--navy-800); }

/* List */
.problem-list { border-top: 1px solid var(--line); }
.problem-row {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.3fr) auto;
  align-items: center;
  gap: 8px 24px;
  padding: 16px 8px;
  border-bottom: 1px solid var(--line);
  transition: background 0.18s ease;
}
.problem-row:hover { background: rgba(10, 26, 61, 0.04); }
.problem-row__problem { color: var(--navy-900); font-size: 0.98rem; font-weight: 600; line-height: 1.35; }
.problem-row__solution {
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.problem-row__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  color: var(--navy-900);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  background: none;
  border: 0;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: border-color 0.18s ease;
}
.problem-row__btn:hover { border-bottom-color: var(--navy-900); }
.problem-row__btn svg { transition: transform 0.18s ease; }
.problem-row__btn:hover svg { transform: translateX(3px); }

@media (max-width: 900px) {
  .solutions-grid { grid-template-columns: 1fr; }
  .solutions-copy { position: static; }
}
@media (max-width: 600px) {
  .problem-row { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }
  .problem-row__btn { margin-top: 4px; }
}
`

export default function SolutionsSection() {
  const { openConsultation } = useConsultation()

  return (
    <section
      className="section solutions-section"
      id="solutions"
      aria-labelledby="solutions-heading"
    >
      <style>{css}</style>
      <div className="container solutions-grid">
        <div className="solutions-copy">
          <SectionHeading
            eyebrow="Business solutions"
            id="solutions-heading"
            title="Start with the problem."
            text="The issues clients bring us most often, and how we resolve them."
          />
          <button type="button" className="btn" onClick={() => openConsultation()}>
            Talk to us <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="problem-list">
          {businessProblems.map((item, index) => (
            <Reveal className="problem-row" delay={index * 40} key={item.problem}>
              <span className="problem-row__problem">{item.problem}</span>
              <span className="problem-row__solution">{item.solution}</span>
              <button
                type="button"
                className="problem-row__btn"
                onClick={() => openConsultation({ service: item.link.label })}
              >
                {item.link.label} <ArrowRight size={14} aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}