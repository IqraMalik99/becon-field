import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import Logo from './Logo.jsx'
import { serviceCategories } from '../data/services.js'
import { site } from '../data/site.js'
import { useConsultation } from '../context/consultationContext.js'

const year = new Date().getFullYear()

/* Inline CSS: solid navy footer + glass "Start a project" card */
const css = `
.site-footer {
  color: rgba(226, 234, 255, 0.78);
  background: #0a1a3d;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
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

/* Email addresses */
.site-footer .footer-emails { display: grid; gap: 7px; margin: 4px 0 18px; }
.site-footer .footer-emails__label {
  color: rgba(226, 234, 255, 0.55);
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
  color: #fff;
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
}
.site-footer .footer-emails a:hover { color: #ffd9a8; border-bottom-color: #ffd9a8; }
.site-footer .footer-emails svg { flex: none; color: #f6a35c; }

.site-footer h3 {
  margin: 0 0 14px;
  color: #fff;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.site-footer ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
.site-footer a { color: rgba(226, 234, 255, 0.78); text-decoration: none; transition: color 0.18s ease; }
.site-footer a:hover { color: #fff; }

/* Glass card */
.site-footer .footer-col--cta {
  padding: 20px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  box-shadow: 0 20px 50px rgba(2, 8, 30, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
.site-footer .footer-col--cta p { margin: 0 0 16px; font-size: 0.92rem; line-height: 1.55; }
.site-footer .footer-col--cta .btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  color: #0a1a3d;
  font-weight: 600;
  background: #f6f1e7;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.site-footer .footer-col--cta .btn:hover { transform: translateY(-2px); background: #fff; }

.site-footer .footer-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: clamp(24px, 3vw, 36px);
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  color: rgba(226, 234, 255, 0.6);
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
              IT support, software development, AI automation, and business systems — one
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
              <li>
                <a href="#top">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#solutions">Solutions</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <a href="#services">{category.shortName}</a>
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
              className="btn btn--primary btn--sm"
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
            IT support &middot; Software &middot; AI automation &middot; Business systems
          </p>
        </div>
      </div>
    </footer>
  )
}