import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const restoreBehavior = () => {
      root.style.scrollBehavior = ''
    }

    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const link =
        event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const section = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!section) return

      event.preventDefault()
      window.history.pushState(null, '', hash)

      cancelAnimationFrame(frame)

      if (reduceMotion.matches) {
        restoreBehavior()
        section.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }

      const startY = window.scrollY
      const targetY = section.getBoundingClientRect().top + startY
      const distance = targetY - startY

      if (Math.abs(distance) < 2) {
        restoreBehavior()
        return
      }

      root.style.scrollBehavior = 'auto'
      const duration = Math.min(1000, Math.max(480, Math.abs(distance) * 0.5))
      const ease = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      let startTime

      const step = (now) => {
        if (startTime === undefined) startTime = now
        const progress = Math.min((now - startTime) / duration, 1)
        window.scrollTo(0, startY + distance * ease(progress))

        if (progress < 1) {
          frame = requestAnimationFrame(step)
        } else {
          frame = 0
          restoreBehavior()
        }
      }

      frame = requestAnimationFrame(step)
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      restoreBehavior()
    }
  }, [])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Home />
      </main>
      <Footer />
    </div>
  )
}
