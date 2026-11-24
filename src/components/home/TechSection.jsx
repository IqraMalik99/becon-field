import SectionHeading from '../SectionHeading.jsx'
import { techGroups } from '../../data/site.js'

/* Inline CSS: compact solid navy section, cream text, small glass groups */
const css = `
.tech-section {
  --navy-900: #0a0a0a;
  --cream: #e6e6e6;
  padding: clamp(32px, 4vw, 52px) 0;
  color: var(--cream);
  background: var(--navy-900);
  border-top: 1px solid rgba(230, 230, 230, 0.1);
}
.tech-section h2 { margin: 6px 0 4px; color: var(--cream); font-size: clamp(1.4rem, 2.8vw, 2rem); line-height: 1.15; letter-spacing: -0.02em; }
.tech-section .eyebrow,
.tech-section .eyebrow--pill {
  color: var(--cream);
  font-weight: 600;
  letter-spacing: 0.08em;
  background: rgba(230, 230, 230, 0.08);
  border: 1px solid rgba(230, 230, 230, 0.25);
}
.tech-section .eyebrow__dot { background: #8e0e2c; }
.tech-section [class*='heading'],
.tech-section .section-head { margin-bottom: 0; }
.tech-section [class*='heading'] p,
.tech-section .section-head__text { margin: 0; color: rgba(230, 230, 230, 0.72); font-size: 0.95rem; }

.tech-chips {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: clamp(18px, 3vw, 26px);
}
.tech-chip {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 14px 16px;
  background: rgba(230, 230, 230, 0.06);
  border: 1px solid rgba(230, 230, 230, 0.16);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
}
.tech-chip:hover { background: rgba(230, 230, 230, 0.1); border-color: rgba(230, 230, 230, 0.4); transform: translateY(-2px); }
.tech-chip__label {
  color: var(--silver);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.tech-chip__items { display: flex; flex-wrap: wrap; gap: 6px; }
.tech-tag {
  padding: 3px 10px;
  color: var(--cream);
  font-size: 0.8rem;
  font-weight: 500;
  background: rgba(230, 230, 230, 0.09);
  border-radius: 999px;
}

@media (max-width: 900px) { .tech-chips { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .tech-chips { grid-template-columns: 1fr; } }
`

export default function TechSection() {
  return (
    <section className="section section--dark tech-section" id="tech">
      <style>{css}</style>
      <div className="container">
        <SectionHeading
          dark
       
          title="Tools that fit the problem."
          text="Chosen for reliability and easy long-term support."
        />

        <div className="tech-chips">
          {techGroups.map((group) => (
            <div className="tech-chip" key={group.label}>
              <span className="tech-chip__label">{group.label}</span>
              <span className="tech-chip__items">
                {group.items.map((item) => (
                  <span className="tech-tag" key={item}>
                    {item}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}