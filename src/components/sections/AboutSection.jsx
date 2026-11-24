import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import Reveal from '../Reveal.jsx'
import { useConsultation } from '../../context/consultationContext.js'

const points = [
  'One senior team from first call to launch',
  'Written scope and budget before work starts',
  'Maintainable code and clear documentation',
  'Support that continues after go-live',
]

/* Inline CSS: compact, flat, photo-led About section with bright white text */
const css = `
.about-section {
  padding: clamp(48px, 6vw, 72px) 0;
  color: var(--white);
  background: #000000;
  border-top: 1px solid var(--line-light);
}
.about-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: center;
}

.about-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(72%) contrast(1.05);
  transition: filter 0.4s ease, transform 0.5s ease;
}
.about-media__frame {
  overflow: hidden;
  aspect-ratio: 4 / 3.1;
  background: var(--surface-2);
  border: 1px solid var(--line-light);
  border-radius: 18px;
}
.about-media:hover img { filter: grayscale(0%); transform: scale(1.03); }
.about-media__caption { margin: 10px 0 0; color: var(--white); font-size: 0.78rem; }

.about-copy .eyebrow { color: var(--white); font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
.about-copy .eyebrow__dot { background: var(--red); }
.about-copy h2 {
  margin: 10px 0 12px;
  color: var(--white);
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.about-copy .text-accent-bright {
  color: var(--white);
  text-decoration: underline;
  text-decoration-color: var(--red);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
.about-copy__lead { max-width: 36rem; margin: 0; color: var(--white); font-size: 0.96rem; line-height: 1.65; }

.about-points { display: grid; gap: 7px; margin: 18px 0 0; padding: 0; list-style: none; }
.about-points li { display: flex; align-items: flex-start; gap: 10px; color: var(--white); font-size: 0.9rem; line-height: 1.4; }
.about-points svg { flex: none; margin-top: 2px; color: var(--white); }

.about-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 18px 0 22px;
  padding: 14px 0;
  border-top: 1px solid var(--line-light);
  border-bottom: 1px solid var(--line-light);
}
.about-stat { display: flex; align-items: baseline; gap: 8px; }
.about-stat__num { color: var(--white); font-size: 1.5rem; font-weight: 800; line-height: 1; }
.about-stat__label { color: var(--white); font-size: 0.74rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; }

.about-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  color: var(--white);
  font: inherit;
  font-weight: 700;
  background: var(--red);
  border: 1px solid var(--red);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease, gap 0.18s ease;
}
.about-cta:hover { background: var(--red-hover); border-color: var(--red-hover); transform: translateY(-2px); gap: 12px; }

@media (max-width: 860px) {
  .about-section__grid { grid-template-columns: 1fr; }
  .about-media__frame { aspect-ratio: 16 / 9; }
}
`

export default function AboutSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <style>{css}</style>
      <div className="container about-section__grid">
        <Reveal className="about-media">
          <div className="about-media__frame">
            <img
              src="/images/about-team.jpg"
              alt="Senior team collaborating around a table"
              decoding="async"
            />
          </div>
          <p className="about-media__caption">Direct access to the people doing the work.</p>
        </Reveal>

        <Reveal className="about-copy" delay={80}>
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            About Beaconsfield
          </p>
          <h2 id="about-heading">
            Small senior team. <span className="text-accent-bright">No middlemen.</span>
          </h2>
          <p className="about-copy__lead">
            One team for IT support, software, mobile, AI and security. You get a written scope,
            clear costs and support that continues after launch.
          </p>

          <ul className="about-points">
            {points.map((point) => (
              <li key={point}>
                <Check size={15} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat__num">5</span>
              <span className="about-stat__label">Service areas</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">19</span>
              <span className="about-stat__label">Services</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">0</span>
              <span className="about-stat__label">Middlemen</span>
            </div>
          </div>

          <button type="button" className="about-cta" onClick={() => openConsultation()}>
            Talk to our team <ArrowRight size={17} aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
