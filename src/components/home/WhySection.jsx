import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import { whyUs } from '../../data/site.js'
import { useConsultation } from '../../context/consultationContext.js'
// eslint-disable-next-line no-unused-vars
const _whySection = null

export default function WhySection() {
  const { openConsultation } = useConsultation()
  return (
    <section className="section section--cream why-section">
      <div className="container why-grid">
        <div className="why-copy">
          <SectionHeading
            eyebrow="Why Beaconsfield"
            title="Technical depth, without the usual agency distance."
            text="Small enough that the person who scopes your work stays close to it — broad enough to handle the infrastructure, software, and automation around it."
          />
          <button
            type="button"
            className="btn btn--dark"
            onClick={() => openConsultation()}
          >
            Book Free Consult - 50% Off <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="why-list">
          {whyUs.map((item, index) => (
            <Reveal className="why-item" delay={index * 50} key={item.title}>
              <span className="why-item__icon" aria-hidden="true">
                <Check size={16} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
