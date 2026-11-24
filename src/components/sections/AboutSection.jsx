import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import Reveal from '../Reveal.jsx'
import { useConsultation } from '../../context/consultationContext.js'
import { whyUs } from '../../data/site.js'

/* Inline CSS: jet-black section, white text, red primary button */
const css = `
.about-section {
  --navy-900: #ffffff;
  --navy-800: #ffffff;
  --ink-soft: #ffffff;
  padding: clamp(56px, 7vw, 96px) 0;
  color: var(--ink);
  background: var(--dark);
  border-top: 1px solid var(--line-light);
}
.about-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 88px);
  align-items: start;
}
.about-section .eyebrow { color: var(--white); font-weight: 600; letter-spacing: 0.08em; }
.about-section .eyebrow__dot { background: var(--red); }
.about-section h2 {
  margin: 8px 0 14px;
  color: var(--white);
  font-size: clamp(1.7rem, 3.2vw, 2.4rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
}
.about-section .text-accent-bright {
  color: var(--white);
  text-decoration: underline;
  text-decoration-color: var(--red);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
.about-section__copy > p:not(.eyebrow) {
  margin: 0;
  max-width: 31rem;
  color: var(--ink-soft);
  font-size: 1rem;
  line-height: 1.65;
}
.about-section__copy .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 22px;
  color: var(--white);
  font: inherit;
  font-weight: 600;
  background: var(--red);
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(142, 14, 44, 0.24);
  transition: transform 0.18s ease, background 0.18s ease;
}
.about-section__copy .btn:hover { background: var(--red-hover); transform: translateY(-2px); }

.about-section__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 34px;
  padding-top: 24px;
  border-top: 1px solid var(--line-light);
}
.about-stat__num { display: block; color: var(--white); font-size: 1.6rem; font-weight: 800; line-height: 1; }
.about-stat__label { display: block; margin-top: 6px; color: var(--ink-soft); font-size: 0.76rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }

.about-section__list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.about-item {
  overflow: hidden;
  background: var(--surface-2);
  border: 1px solid var(--line-light);
  border-radius: 14px;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.about-item:hover { border-color: #ffffff; }
.about-item.is-open { background: #1a1a1a; border-color: #ffffff; }
.about-item__trigger {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px;
  color: var(--white);
  font: inherit;
  text-align: left;
  background: transparent;
  border: 0;
  cursor: pointer;
}
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
.about-item__title { flex: 1; color: var(--white); font-size: 0.98rem; font-weight: 700; line-height: 1.3; }
.about-item__caret { flex-shrink: 0; color: var(--white); transition: transform 0.22s ease; }
.about-item.is-open .about-item__caret { transform: rotate(180deg); }
.about-item__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.24s ease; }
.about-item.is-open .about-item__panel { grid-template-rows: 1fr; }
.about-item__panel-inner { overflow: hidden; }
.about-item__panel p {
  margin: 0;
  padding: 0 14px 6px 58px;
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}
.about-item__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 14px 58px;
  padding: 0;
  color: var(--white);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: gap 0.18s ease, border-color 0.18s ease;
}
.about-item__link:hover { gap: 10px; border-bottom-color: var(--white); }

@media (max-width: 900px) {
  .about-section__grid { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .about-section__stats { gap: 18px; }
  .about-item__panel p, .about-item__link { padding-left: 14px; margin-left: 0; }
}
`

export default function AboutSection() {
  const { openConsultation } = useConsultation()
  const [open, setOpen] = useState(0)

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <style>{css}</style>
      <div className="container about-section__grid">
        <Reveal className="about-section__copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            About us
          </p>
          <h2 id="about-heading">
            A small senior team. <span className="text-accent-bright">No middlemen.</span>
          </h2>
          <p>
            One team for IT support, software, mobile, AI and security. You talk directly to the
            people doing the work, get a written scope and budget up front, and we stay on after
            launch.
          </p>
          <button type="button" className="btn" onClick={() => openConsultation()}>
            Talk to our team <ArrowRight size={17} aria-hidden="true" />
          </button>

          <div className="about-section__stats">
            <div className="about-stat">
              <span className="about-stat__num">5</span>
              <span className="about-stat__label">Service areas</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">1</span>
              <span className="about-stat__label">Senior team</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">0</span>
              <span className="about-stat__label">Middlemen</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="ul" className="about-section__list" delay={80}>
          {whyUs.map((item, index) => {
            const isOpen = open === index
            return (
              <li className={`about-item${isOpen ? ' is-open' : ''}`} key={item.title}>
                <button
                  type="button"
                  className="about-item__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`about-panel-${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="about-section__icon" aria-hidden="true">
                    <Check size={16} />
                  </span>
                  <span className="about-item__title">{item.title}</span>
                  <CaretDown className="about-item__caret" size={16} aria-hidden="true" />
                </button>
                <div className="about-item__panel" id={`about-panel-${index}`}>
                  <div className="about-item__panel-inner">
                    <p>{item.text}</p>
                    <button
                      type="button"
                      className="about-item__link"
                      onClick={() => openConsultation({ details: item.title })}
                    >
                      Discuss this <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
