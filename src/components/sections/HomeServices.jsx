import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import CategoryIcon from '../CategoryIcon.jsx'
import { serviceCategories, allServices } from '../../data/services.js'
import { getServiceIcon } from '../../data/serviceIcons.js'
import { useConsultation } from '../../context/consultationContext.js'

/* Inline CSS: dark grey section, silver cards, red primary CTA only */
const css = `
.onepage-services {
  --navy-900: #f5f5f5;
  --navy-800: #c8c8c8;
  --ink-soft: rgba(245, 245, 245, 0.7);
  padding: clamp(48px, 6vw, 84px) 0;
  color: var(--ink);
  background: var(--surface);
  border-top: 1px solid var(--line-light);
}
.onepage-services .section-head { max-width: 40rem; margin: 0 auto clamp(28px, 4vw, 44px); text-align: center; }
.onepage-services .eyebrow { color: var(--silver); font-weight: 600; letter-spacing: 0.08em; }
.onepage-services .eyebrow__dot { background: var(--red); }
.onepage-services h2 { margin: 10px 0 10px; color: var(--ink); font-size: clamp(1.7rem, 3.4vw, 2.5rem); line-height: 1.12; letter-spacing: -0.02em; }
.onepage-services .text-accent { color: var(--silver); text-decoration: underline; text-decoration-thickness: 3px; text-underline-offset: 6px; text-decoration-color: rgba(200, 200, 200, 0.3); }
.onepage-services .section-head__text { margin: 0; color: var(--ink-soft); font-size: 1rem; line-height: 1.55; }

/* ---- Category cards ---- */
.svc-cats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.svc-cat {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 16px 16px;
  background: var(--surface-2);
  border: 1px solid var(--line-light);
  border-radius: 16px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}
.svc-cat:hover { transform: translateY(-3px); border-color: rgba(200, 200, 200, 0.5); box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35); }
.svc-cat.is-active { border-color: var(--silver); box-shadow: 0 0 0 2px rgba(200, 200, 200, 0.35); }
.svc-cat__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  color: var(--silver);
  background: rgba(200, 200, 200, 0.1);
  border-radius: 12px;
}
.svc-cat__name { margin: 6px 0 0; color: var(--ink); font-size: 1.02rem; font-weight: 700; line-height: 1.25; }
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
.svc-cat__meta { margin: 0; color: var(--silver); font-size: 0.78rem; font-weight: 600; opacity: 0.75; }
.svc-cat__actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 6px; }
.svc-cat .svc-view {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  color: var(--silver);
  font-size: 0.82rem;
  font-weight: 600;
  background: var(--surface-3);
  border: 1px solid var(--line-light);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease;
}
.svc-cat .svc-view:hover { background: rgba(200, 200, 200, 0.2); color: var(--white); }
.svc-caret { transition: transform 0.18s ease; }
.svc-caret.is-open { transform: rotate(180deg); }
.svc-cat .text-link {
  padding: 0;
  color: var(--silver);
  font-size: 0.8rem;
  font-weight: 600;
  background: none;
  border: 0;
  border-bottom: 1px solid rgba(200, 200, 200, 0.3);
  cursor: pointer;
}
.svc-cat .text-link:hover { color: var(--white); border-bottom-color: var(--white); }

/* ---- Services panel (opens under the cards) ---- */
.svc-panel { margin-top: 20px; padding: 20px; background: var(--surface-2); border: 1px solid var(--line-light); border-radius: 18px; }
.svc-panel__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.svc-panel__title { margin: 0; color: var(--ink); font-size: 1.1rem; }
.svc-panel__close { padding: 6px 12px; color: var(--silver); font-size: 0.82rem; font-weight: 600; background: transparent; border: 1.5px solid rgba(200, 200, 200, 0.35); border-radius: 999px; cursor: pointer; }
.svc-panel__close:hover { border-color: var(--silver); color: var(--white); }
.sp-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.sp-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  text-align: left;
  color: var(--ink);
  font: inherit;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid var(--line-light);
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}
.sp-card:hover { transform: translateY(-2px); border-color: rgba(200, 200, 200, 0.5); background: rgba(255, 255, 255, 0.07); }
.sp-card__icon { display: grid; place-items: center; width: 34px; height: 34px; background: rgba(200, 200, 200, 0.1); border-radius: 10px; color: var(--silver); }
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
.sp-card__cta { display: inline-flex; align-items: center; gap: 5px; margin-top: auto; padding-top: 4px; font-size: 0.78rem; font-weight: 700; color: var(--silver); }

.svc-all { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 28px; text-align: center; }
.svc-all .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: var(--red);
  border: 1px solid var(--red);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;
}
.svc-all .btn:hover { background: var(--red-hover); transform: translateY(-2px); }
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
          <p className="section-head__text">IT support, software, mobile apps, AI and security.</p>
        </div>

        <div className="svc-cats">
          {serviceCategories.map((category) => {
            const isOpen = active === category.slug
            return (
              <article
                className={`svc-cat${isOpen ? ' is-active' : ''}`}
                key={category.slug}
              >
                <span className="svc-cat__icon" aria-hidden="true">
                  <CategoryIcon name={category.icon} size={24} />
                </span>
                <h3 className="svc-cat__name">{category.name}</h3>
                <p className="svc-cat__text">{category.tagline}</p>
                <p className="svc-cat__meta">{category.services.length} services</p>
                <div className="svc-cat__actions">
                  <button
                    type="button"
                    className="btn btn--sm svc-view"
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
                    Ask about this
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
                      <Icon size={18} weight="duotone" color="currentColor" />
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
            className="btn"
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
