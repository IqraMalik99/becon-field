import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import Reveal from '../Reveal.jsx'
import { useConsultation } from '../../context/consultationContext.js'

/* Inline CSS: sleek text-only About band, Inter typography, bright white text */
const css = `
.about-section {
  padding: clamp(40px, 5vw, 64px) 0;
  color: var(--white);
  background: #000000;
  border-top: 1px solid var(--line-light);
}
.about-inner {
  max-width: 52rem;
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
.about-location {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--white);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.about-location::before {
  content: '';
  width: 5px;
  height: 5px;
  background: var(--red);
  border-radius: 50%;
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
`

export default function AboutSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <style>{css}</style>
      <div className="container">
        <Reveal className="about-inner">
          <div className="about-topline">
            <span className="about-eyebrow">About Beaconsfield</span>
            <span className="about-location">USA based</span>
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
        </Reveal>
      </div>
    </section>
  )
}
