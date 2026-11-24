import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import Reveal from '../Reveal.jsx'
import { useConsultation } from '../../context/consultationContext.js'

/* Inline CSS: sleek two-column About band, Inter typography, bright white text */
const css = `
.about-section {
  padding: clamp(40px, 5vw, 64px) 0;
  color: var(--white);
  background: var(--dark);
  border-top: 1px solid var(--line-light);
}
.about-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  align-items: center;
  gap: clamp(28px, 5vw, 72px);
  width: 100%;
  font-family: var(--font);
}
.about-topline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-bottom: 16px;
}
.about-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.about-eyebrow::before {
  content: '';
  width: 22px;
  height: 2px;
  background: var(--red);
  border-radius: 2px;
}
.about-section h2 {
  margin: 0 0 12px;
  color: var(--white);
  font-family: var(--font);
  font-size: clamp(1.5rem, 2.8vw, 2.15rem);
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.035em;
}
.about-copy {
  margin: 0;
  color: var(--white);
  font-size: 0.98rem;
  line-height: 1.7;
}
.about-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 11px 18px;
  color: var(--white);
  font-family: var(--font);
  font-size: 0.92rem;
  font-weight: 700;
  background: var(--red);
  border: 1px solid var(--red);
  border-radius: 11px;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease, gap 0.18s ease;
}
.about-cta:hover { background: var(--red-hover); border-color: var(--red-hover); transform: translateY(-2px); gap: 12px; }

.about-points {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0;
  padding: 2px 0 2px 20px;
  list-style: none;
  border-left: 1px solid var(--line-light);
}
.about-points li {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  color: var(--white);
  font-size: 0.93rem;
  font-weight: 500;
  line-height: 1.5;
}
.about-points svg {
  flex: 0 0 auto;
  margin-top: 3px;
  color: var(--red);
}

@media (max-width: 680px) {
  .about-inner { grid-template-columns: 1fr; }
  .about-points { padding-left: 0; border-left: 0; }
}
`

export default function AboutSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <style>{css}</style>
      <div className="container">
        <Reveal className="about-inner">
          <div className="about-copy-col">
            <div className="about-topline">
              <span className="about-eyebrow">About Beaconsfield</span>
            </div>
            <h2 id="about-heading">Cyber &amp; tech, working since 2024.</h2>
            <p className="about-copy">
              Beaconsfield is a technology and cybersecurity company. We help businesses secure their
              systems, build software, and keep IT running — with clear scope, honest costs, and
              support after launch.
            </p>
            <button type="button" className="about-cta" onClick={() => openConsultation()}>
              Talk to our team <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>

          <ul className="about-points" aria-label="Why Beaconsfield">
            <li>
              <Check size={18} weight="bold" aria-hidden="true" />
              <span>Cyber &amp; tech since 2024</span>
            </li>
            <li>
              <Check size={18} weight="bold" aria-hidden="true" />
              <span>Clear scope and honest costs</span>
            </li>
            <li>
              <Check size={18} weight="bold" aria-hidden="true" />
              <span>Support after launch</span>
            </li>
            <li>
              <Check size={18} weight="bold" aria-hidden="true" />
              <span>US-based company</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
