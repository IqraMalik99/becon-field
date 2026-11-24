import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import Logo from './Logo.jsx'
import { serviceCategories } from '../data/services.js'
import { navItems, site } from '../data/site.js'
import { useConsultation } from '../context/consultationContext.js'

const year = 2024

/* Inline CSS: solid black footer + silver glass "Start a project" card */
const css = `
.site-footer {
  color: #ffffff;
  background: var(--dark);
  border-top: 1px solid rgba(200, 200, 200, 0.12);
  padding: clamp(32px, 4vw, 52px) 0 20px;
}
.site-footer .footer-top {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.9fr 1.2fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
}
.site-footer .footer-brand p { margin: 16px 0; line-height: 1.6; font-size: 0.95rem; max-width: 26rem; }
.site-footer .footer-art { display: block; width: 100%; max-width: 160px; height: auto; margin-top: 14px; opacity: 0.95; }

/* Email and phone contact options */
.site-footer .footer-emails { display: grid; gap: 7px; margin: 4px 0 18px; }
.site-footer .footer-emails__label {
  color: #ffffff;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.site-footer .footer-emails a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding-bottom: 1px;
  color: var(--silver);
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(200, 200, 200, 0.24);
}
.site-footer .footer-emails a:hover { color: var(--white); border-bottom-color: var(--white); }
.site-footer .footer-emails svg { flex: none; color: var(--silver); }

.site-footer h3 {
  margin: 0 0 14px;
  color: var(--white);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.site-footer ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
.site-footer a { color: #ffffff; text-decoration: none; transition: color 0.18s ease; }
.site-footer a:hover { color: var(--white); }

/* Glass card */
.site-footer .footer-col--cta {
  padding: 20px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(200, 200, 200, 0.16);
  border-radius: 20px;
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);
}
.site-footer .footer-col--cta p { margin: 0 0 16px; font-size: 0.92rem; line-height: 1.55; }
.site-footer .footer-col--cta .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  color: var(--white);
  font-weight: 600;
  background: var(--red);
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
}
.site-footer .footer-col--cta .btn:hover { transform: translateY(-2px); background: var(--red-hover); }

.site-footer .footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: clamp(24px, 3vw, 36px);
  padding-top: 16px;
  border-top: 1px solid rgba(200, 200, 200, 0.12);
  font-size: 0.85rem;
  color: #ffffff;
}
.site-footer .footer-bottom p { margin: 0; }

@media (max-width: 960px) {
  .site-footer .footer-top { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .site-footer .footer-top { grid-template-columns: 1fr; }
}
`

export default function Footer() {
  const { openConsultation } = useConsultation()

  return (
    <footer className="site-footer">
      <style>{css}</style>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              IT support, software development, AI automation, and technical systems — one
              partner for the technology that runs your business.
            </p>
            <div className="footer-emails">
              <span className="footer-emails__label">Email us</span>
              <a href={`mailto:${site.email}`}>
                <EnvelopeSimple size={16} aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.to}>
                  <a href={item.to}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <a href="#services">{category.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--cta">
            <h3>Start a project</h3>
            <p>
              Tell us what is slowing your business down and we will suggest a sensible next step.
            </p>
            <button
              type="button"
              className="btn btn--sm"
              onClick={() => openConsultation()}
            >
              Talk to us <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="footer-bottom__note">
            {serviceCategories.map((category) => category.shortName).join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  )
}
