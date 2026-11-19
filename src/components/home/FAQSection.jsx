import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import SectionHeading from '../SectionHeading.jsx'
import FAQList from '../FAQList.jsx'
import { useConsultation } from '../../context/consultationContext.js'

export default function FAQSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section section--cream faq-section" id="faq">
      <div className="container faq-grid">
        <div className="faq-intro">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="The questions we hear before a project starts."
            text="If yours is not here, ask it directly. A short conversation is usually faster than another page of reading."
          />
          <button
            type="button"
            className="text-link"
            onClick={() => openConsultation()}
          >
            Ask your question <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        <FAQList />
      </div>
    </section>
  )
}
