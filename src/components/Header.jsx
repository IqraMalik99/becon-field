import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from './Logo.jsx'
import { navItems, site } from '../data/site.js'
import { useConsultation } from '../context/consultationContext.js'

const phone = '+1 (501) 251-8031'
const phoneHref = 'tel:+15012518031'

const css = `
.site-header,
.site-header.is-scrolled {
  background: rgba(var(--dark-rgb), 0.94);
  border-bottom: 1px solid rgba(200, 200, 200, 0.12);
  box-shadow: none;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
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
  color: var(--silver);
  font-weight: 600;
  transition: color 0.2s ease;
}

.site-header .nav-link:hover {
  color: var(--white);
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
  color: var(--silver);
  background: transparent;
  border: none;
  box-shadow: none;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.site-header .header-phone:hover {
  color: var(--white);
  transform: translateY(-1px);
}

.site-header .header-phone svg {
  color: var(--silver);
}

.site-header button.header-cta {
  color: var(--white);
  font-weight: 600;
  border: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: background 0.2s ease;
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
          <a href={phoneHref} className="btn btn--sm header-cta header-phone">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.88a16 16 0 0 0 6 6l1.24-1.24a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            {phone}
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
        <div className="fab-dock" aria-label="Contact options">
          <a
            className="fab-dock__call"
            href={phoneHref}
            aria-label="Call us"
            title={`Call ${phone}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.88a16 16 0 0 0 6 6l1.24-1.24a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email us"
            title={`Email ${site.email}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
          </a>
        </div>,
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
                  Book Free Consult
                </button>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </header>
  )
}
