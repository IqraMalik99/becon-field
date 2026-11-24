import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Quotes } from '@phosphor-icons/react/dist/csr/Quotes'
import SectionHeading from '../SectionHeading.jsx'
import { useConsultation } from '../../context/consultationContext.js'

export default function TestimonialsSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section section--cream testimonials-section">
      <div className="container testimonials-grid">
        <SectionHeading
          eyebrow="Client testimonials"
          title="Real feedback, published with permission."
          text="We would rather show nothing than invent a quote. When clients agree to be named, their feedback and the work behind it will appear here."
        />

        <figure className="testimonial-card">
          <Quotes size={30} aria-hidden="true" className="testimonial-card__quote" />
          <blockquote>
            <p>
              Every project we deliver is covered by a written scope, a clear point of
              contact, and support after launch. If you would like to speak to a client
              about work similar to yours, ask us during your consultation and we will
              arrange it where we have permission to do so.
            </p>
          </blockquote>
          <figcaption>
            <span>BeaconsFields</span>
            <span>Our commitment to how references are shared</span>
          </figcaption>
          <button
            type="button"
            className="text-link"
            onClick={() => openConsultation()}
          >
            Ask for references <ArrowRight size={15} aria-hidden="true" />
          </button>
        </figure>
      </div>
    </section>
  )
}
