import { faqs } from '../data/site.js'

export default function FAQList({ items = faqs }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} name="faq" open={index === 0}>
          <summary>
            <span>{item.question}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
