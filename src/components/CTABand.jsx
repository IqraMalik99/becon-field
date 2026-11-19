import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { useConsultation } from '../context/consultationContext.js'

export default function CTABand({
  title = "Let's build something remarkable together.",
  text = 'Tell us where the business is headed. We will map the technology that gets it there — support, software, automation, or all three.',
  primaryLabel = 'Book Free Consult - 50% Off',
  secondaryLabel = 'Explore Our Services',
  secondaryTo = '#services',
}) {
  const { openConsultation } = useConsultation()

  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <p className="eyebrow eyebrow--pill">
          <span className="eyebrow__dot" aria-hidden="true" />
          Start with a conversation
        </p>
        <h2>{title}</h2>
        <p className="cta-band__text">{text}</p>
        <div className="cta-band__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => openConsultation()}
          >
            {primaryLabel} <ArrowRight size={17} aria-hidden="true" />
          </button>
          <a href={secondaryTo} className="btn btn--ghost">
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
