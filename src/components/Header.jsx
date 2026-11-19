
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from './Logo.jsx'
import { navItems } from '../data/site.js'
import { useConsultation } from '../context/consultationContext.js'

const css = `
.site-header,
.site-header.is-scrolled {
  background: #F6F1E7;
  border: none;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.site-header .header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 76px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.site-header img {
  height: 46px;
  width: auto;
  object-fit: contain;
  border: none;
  box-shadow: none;
}

.site-header .nav-link {
  color: #0A1A3D;
  font-weight: 600;
  transition: color 0.2s ease;
}

.site-header .nav-link:hover {
  color: #2563EB;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.site-header .header-phone {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0A1A3D;
  background: transparent;
  border: none;
  box-shadow: none;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.site-header .header-phone:hover {
  color: #2563EB;
  transform: translateY(-1px);
}

.site-header button.header-cta {
  color: #F6F1E7;
  font-weight: 600;
  background: #0A1A3D;
  border: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: background 0.2s ease;
}

.site-header button.header-cta:hover {
  background: #18396B;
  color: #F6F1E7;
}

/* Floating WhatsApp button */
.fab--whatsapp {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 60;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  background: rgba(37, 211, 102, 0.16);
  border: none;
  border-radius: 50%;
  box-shadow: none;
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  transition: transform 0.18s ease, background 0.18s ease;
}

.fab--whatsapp:hover {
  transform: translateY(-3px) scale(1.05);
  background: rgba(37, 211, 102, 0.28);
}
`

export default function Header() {
  const { openConsultation } = useConsultation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeAll = () => setMobileOpen(false)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className="site-header">
      <style>{css}</style>

      <div className="container header-inner">
        <Logo />

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className="nav-link"
              onClick={closeAll}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href="https://wa.me/+17066420459"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--sm header-cta header-phone"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#25d366"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            +1 706-642-0459
          </a>

          <button
            type="button"
            className="btn btn--primary btn--sm header-cta"
            onClick={() => {
              closeAll()
              openConsultation()
            }}
          >
            Free Consult
          </button>
        </div>
      </div>

      {createPortal(
        <a
          className="fab--whatsapp"
          href="https://wa.me/17066420459"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="#25d366"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>,
        document.body,
      )}

      {mobileOpen &&
        createPortal(
          <>
            <button
              type="button"
              className="mobile-nav__backdrop"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />

            <div className="mobile-nav" id="mobile-nav">
              <nav className="mobile-nav__inner" aria-label="Mobile">
                {navItems.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    className="mobile-nav__link"
                    onClick={closeAll}
                  >
                    {item.label}
                  </a>
                ))}

                <button
                  type="button"
                  className="btn btn--primary mobile-nav__cta"
                  onClick={() => {
                    closeAll()
                    openConsultation()
                  }}
                >
                  Book Free Consult - 50% Off
                </button>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </header>
  )
}
