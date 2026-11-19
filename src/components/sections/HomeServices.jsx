import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import CategoryIcon from '../CategoryIcon.jsx'
import { serviceCategories, allServices } from '../../data/services.js'
import { getServiceIcon } from '../../data/serviceIcons.js'
import { useConsultation } from '../../context/consultationContext.js'

/* Edit these to match your real offers. They rotate across the category cards. */
const OFFERS = [
  { label: '40% off', tone: 'green' }, // discounts show in green
  { label: 'Free audit', tone: 'orange' },
  { label: '30% off', tone: 'green' },
  { label: 'Free quote', tone: 'orange' },
]

/* Inline CSS: small cards, 4 per row, same navy as the home banner */
const css = `
.onepage-services {
  --navy-900: #0a1a3d;
  --navy-800: #0d1f45;
  --ink-soft: rgba(10, 26, 61, 0.68);
  padding: clamp(48px, 6vw, 84px) 0;
  color: var(--navy-900);
  background: #fbf9f4;
  border-top: 1px solid rgba(10, 26, 61, 0.08);
}
.onepage-services .section-head { max-width: 40rem; margin: 0 auto clamp(28px, 4vw, 44px); text-align: center; }
.onepage-services .eyebrow { color: var(--navy-900); font-weight: 600; letter-spacing: 0.08em; }
.onepage-services .eyebrow__dot { background: var(--navy-900); }
.onepage-services h2 { margin: 10px 0 10px; color: var(--navy-900); font-size: clamp(1.7rem, 3.4vw, 2.5rem); line-height: 1.12; letter-spacing: -0.02em; }
.onepage-services .text-accent { color: var(--navy-900); text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 6px; text-decoration-color: rgba(10, 26, 61, 0.25); }
.onepage-services .section-head__text { margin: 0; color: var(--ink-soft); font-size: 1rem; line-height: 1.55; }

/* ---- 4 small cards per row ---- */
.svc-cats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.svc-cat {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 16px 16px;
  background: #fff;
  border: 1px solid rgba(10, 26, 61, 0.12);
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(10, 26, 61, 0.05);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.svc-cat:hover { transform: translateY(-3px); border-color: var(--navy-900); box-shadow: 0 14px 30px rgba(10, 26, 61, 0.12); }
.svc-cat.is-active { border-color: var(--navy-900); box-shadow: 0 0 0 2px var(--navy-900); }
.svc-cat__badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 3px 9px;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: #e8720c;
  box-shadow: 0 4px 10px rgba(232, 114, 12, 0.35);
  border-radius: 999px;
}
.svc-cat__badge--green { background: #1e9e57; box-shadow: 0 4px 10px rgba(30, 158, 87, 0.35); }
.svc-cat__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  color: var(--navy-900);
  background: rgba(10, 26, 61, 0.07);
  border-radius: 12px;
}
.svc-cat__name { margin: 6px 0 0; color: var(--navy-900); font-size: 1.02rem; font-weight: 700; line-height: 1.25; }
.svc-cat__text {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.86rem;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.svc-cat__meta { margin: 0; color: var(--navy-900); font-size: 0.78rem; font-weight: 600; opacity: 0.7; }
.svc-cat__actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 6px; }
.svc-cat .btn--primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  background: var(--navy-900);
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease;
}
.svc-cat .btn--primary:hover { background: var(--navy-800); }
.svc-caret { transition: transform 0.18s ease; }
.svc-caret.is-open { transform: rotate(180deg); }
.svc-cat .text-link {
  padding: 0;
  color: var(--navy-900);
  font-size: 0.8rem;
  font-weight: 600;
  background: none;
  border: 0;
  border-bottom: 1.5px solid rgba(10, 26, 61, 0.3);
  cursor: pointer;
}
.svc-cat .text-link:hover { border-bottom-color: var(--navy-900); }

/* ---- Services panel (opens under the cards) ---- */
.svc-panel { margin-top: 20px; padding: 20px; background: #fff; border: 1px solid rgba(10, 26, 61, 0.12); border-radius: 18px; }
.svc-panel__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.svc-panel__title { margin: 0; color: var(--navy-900); font-size: 1.1rem; }
.svc-panel__close { padding: 6px 12px; color: var(--navy-900); font-size: 0.82rem; font-weight: 600; background: transparent; border: 1.5px solid rgba(10, 26, 61, 0.3); border-radius: 999px; cursor: pointer; }
.svc-panel__close:hover { border-color: var(--navy-900); }
.sp-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.sp-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  text-align: left;
  color: var(--navy-900);
  font: inherit;
  background: #fbf9f4;
  border: 1px solid rgba(10, 26, 61, 0.1);
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}
.sp-card:hover { transform: translateY(-2px); border-color: var(--navy-900); background: #fff; }
.sp-card__icon { display: grid; place-items: center; width: 34px; height: 34px; background: rgba(10, 26, 61, 0.07); border-radius: 10px; }
.sp-card__title { font-size: 0.92rem; font-weight: 700; line-height: 1.25; }
.sp-card__text {
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sp-card__cta { display: inline-flex; align-items: center; gap: 5px; margin-top: auto; padding-top: 4px; font-size: 0.78rem; font-weight: 700; }

.svc-all { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 28px; text-align: center; }
.svc-all .btn--dark {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  color: #fff;
  font-weight: 600;
  background: var(--navy-900);
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
}
.svc-all .btn--dark:hover { background: var(--navy-800); transform: translateY(-2px); }
.svc-all__note { margin: 0; color: var(--ink-soft); font-size: 0.9rem; }

@media (max-width: 1100px) {
  .svc-cats, .sp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 560px) {
  .svc-cats, .sp-grid { grid-template-columns: 1fr; }
}
`

export default function HomeServices() {
  const { openConsultation } = useConsultation()
  const [active, setActive] = useState(null) // category slug, 'all', or null

  const toggle = (slug) => setActive((current) => (current === slug ? null : slug))

  const activeCategory = serviceCategories.find((category) => category.slug === active)
  const panelServices =
    active === 'all' ? allServices : activeCategory ? activeCategory.services : []
  const panelTitle = active === 'all' ? `All ${allServices.length} services` : activeCategory?.name

  return (
    <section className="section onepage-services" id="services" aria-labelledby="services-heading">
      <style>{css}</style>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            What we do
          </p>
          <h2 id="services-heading">
            Everything your business needs, <span className="text-accent">from one team.</span>
          </h2>
          <p className="section-head__text">IT support, software, AI and business systems.</p>
        </div>

        <div className="svc-cats">
          {serviceCategories.map((category, index) => {
            const isOpen = active === category.slug
            const offer = OFFERS[index % OFFERS.length]
            return (
              <article
                className={`svc-cat${isOpen ? ' is-active' : ''}`}
                key={category.slug}
              >
                <span className={`svc-cat__badge svc-cat__badge--${offer.tone}`}>
                  {offer.label}
                </span>
                <span className="svc-cat__icon" aria-hidden="true">
                  <CategoryIcon name={category.icon} size={24} />
                </span>
                <h3 className="svc-cat__name">{category.name}</h3>
                <p className="svc-cat__text">{category.tagline}</p>
                <p className="svc-cat__meta">{category.services.length} services</p>
                <div className="svc-cat__actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => toggle(category.slug)}
                    aria-expanded={isOpen}
                    aria-controls="svc-panel"
                  >
                    {isOpen ? 'Hide' : 'View'}
                    <CaretDown
                      size={14}
                      aria-hidden="true"
                      className={`svc-caret${isOpen ? ' is-open' : ''}`}
                    />
                  </button>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => openConsultation({ service: category.shortName })}
                  >
                    Get {offer.label.toLowerCase()}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {active && (
          <div className="svc-panel" id="svc-panel">
            <div className="svc-panel__head">
              <h3 className="svc-panel__title">{panelTitle}</h3>
              <button type="button" className="svc-panel__close" onClick={() => setActive(null)}>
                Close
              </button>
            </div>
            <div className="sp-grid">
              {panelServices.map((service) => {
                const Icon = getServiceIcon(service.slug)
                return (
                  <button
                    type="button"
                    key={service.slug}
                    className="sp-card"
                    onClick={() => openConsultation({ service: service.title })}
                    aria-label={`Get started with ${service.title}`}
                  >
                    <span className="sp-card__icon" aria-hidden="true">
                      <Icon size={18} weight="duotone" color="#0a1a3d" />
                    </span>
                    <span className="sp-card__title">{service.title}</span>
                    <span className="sp-card__text">{service.summary}</span>
                    <span className="sp-card__cta">
                      Get started
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="svc-all">
          <button
            type="button"
            className="btn btn--dark"
            onClick={() => toggle('all')}
          >
            {active === 'all' ? 'Hide all services' : `See all ${allServices.length} services`}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="svc-all__note">Not sure what you need? Tell us the problem.</p>
        </div>
      </div>
    </section>
  )
}