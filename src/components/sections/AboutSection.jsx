import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import Reveal from '../Reveal.jsx'
import { useConsultation } from '../../context/consultationContext.js'

/* Inline CSS: minimal flat About band, bright white text, red CTA */
const css = `
.about-section {
  padding: clamp(40px, 5vw, 60px) 0;
  color: var(--white);
  background: #000000;
  border-top: 1px solid var(--line-light);
}
.about-copy { max-width: 46rem; }
.about-copy .eyebrow { color: var(--white); font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
.about-copy .eyebrow__dot { background: var(--red); }
.about-copy h2 {
  margin: 8px 0 10px;
  color: var(--white);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.about-copy .text-accent-bright {
  color: var(--white);
  text-decoration: underline;
  text-decoration-color: var(--red);
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
}
.about-copy__lead { margin: 0; color: var(--white); font-size: 0.94rem; line-height: 1.6; }
.about-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 11px 18px;
  color: var(--white);
  font: inherit;
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
        <Reveal className="about-copy">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            About Beaconsfield
          </p>
          <h2 id="about-heading">
            Small senior team. <span className="text-accent-bright">No middlemen.</span>
          </h2>
          <p className="about-copy__lead">
            One team for IT support, software, mobile, AI and security — with clear scope, honest
            costs and support after launch.
          </p>
          <button type="button" className="about-cta" onClick={() => openConsultation()}>
            Talk to our team <ArrowRight size={17} aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
