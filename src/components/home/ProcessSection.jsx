import { useEffect, useRef, useState } from 'react'
import SectionHeading from '../SectionHeading.jsx'
import { processSteps } from '../../data/site.js'

/* Inline CSS: navy section, heading stays fixed on the left while the steps
   reveal one by one on the right and a line fills as you scroll. */
const css = `
.process-section {
  --navy-900: #0a0a0a;
  --cream: #e6e6e6;
  --orange: #8e0e2c;
  --circle: 40px;
  padding: clamp(40px, 5vw, 72px) 0;
  color: var(--cream);
  background: var(--navy-900);
}
.process-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(32px, 6vw, 88px);
  align-items: start;
}

/* Left: stays in place while you scroll */
.process-side { position: sticky; top: 110px; }
.process-section h2 { margin: 8px 0 8px; color: var(--cream); font-size: clamp(1.6rem, 3vw, 2.3rem); line-height: 1.12; letter-spacing: -0.02em; }
.process-section .eyebrow,
.process-section .eyebrow--pill {
  color: var(--cream);
  font-weight: 600;
  letter-spacing: 0.08em;
  background: rgba(230, 230, 230, 0.08);
  border: 1px solid rgba(230, 230, 230, 0.25);
}
.process-section .eyebrow__dot { background: var(--orange); }
.process-section [class*='heading'] p,
.process-section .section-head__text { margin: 0; color: rgba(230, 230, 230, 0.75); font-size: 1rem; line-height: 1.55; }
.process-side .section-head,
.process-side [class*='heading'] { text-align: left; margin: 0; }

/* Right: timeline */
.timeline { position: relative; margin: 0; padding: 0; list-style: none; }
.timeline__track,
.timeline__fill {
  position: absolute;
  top: calc(var(--circle) / 2);
  left: calc(var(--circle) / 2 - 1px);
  width: 2px;
  border-radius: 2px;
}
.timeline__track { height: var(--track, 0px); background: rgba(230, 230, 230, 0.18); }
.timeline__fill { height: var(--fill, 0px); background: var(--orange); transition: height 0.12s linear; }

.tl-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding-bottom: 28px;
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.tl-step:last-child { padding-bottom: 0; }
.tl-step.is-visible { opacity: 0.5; transform: none; }
.tl-step.is-active { opacity: 1; }

.tl-step__circle {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: var(--circle);
  height: var(--circle);
  color: var(--cream);
  font-size: 0.88rem;
  font-weight: 800;
  background: var(--navy-900);
  border: 2px solid rgba(230, 230, 230, 0.4);
  border-radius: 50%;
  transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
.tl-step.is-done .tl-step__circle { color: var(--navy-900); background: var(--cream); border-color: var(--cream); }
.tl-step.is-active .tl-step__circle { color: #fff; background: var(--orange); border-color: var(--orange); transform: scale(1.12); box-shadow: 0 0 0 6px rgba(142, 14, 44, 0.22); }

.tl-step__body { padding-top: 2px; }
.tl-step h3 { margin: 0 0 4px; color: var(--cream); font-size: 1.08rem; font-weight: 700; line-height: 1.25; }
.tl-step p { margin: 0; max-width: 32rem; color: rgba(230, 230, 230, 0.75); font-size: 0.92rem; line-height: 1.5; }

@media (max-width: 900px) {
  .process-layout { grid-template-columns: 1fr; gap: 28px; }
  .process-side { position: static; }
}
@media (prefers-reduced-motion: reduce) {
  .tl-step { opacity: 1; transform: none; transition: none; }
  .timeline__fill { transition: none; }
}
`

export default function ProcessSection() {
  const listRef = useRef(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const list = listRef.current
      if (!list) return
      const items = Array.from(list.querySelectorAll('.tl-step'))
      if (items.length === 0) return

      const mid = window.innerHeight * 0.55
      const circle = items[0].querySelector('.tl-step__circle')?.offsetHeight ?? 40
      const lastCenter = items[items.length - 1].offsetTop + circle / 2
      const listTop = list.getBoundingClientRect().top
      const fill = Math.max(0, Math.min(lastCenter, mid - listTop - circle / 2))

      list.style.setProperty('--track', `${lastCenter}px`)
      list.style.setProperty('--fill', `${fill}px`)

      let visible = 0
      let active = -1
      items.forEach((item, index) => {
        const top = item.getBoundingClientRect().top
        if (top < window.innerHeight * 0.9) visible = index + 1
        if (top < mid) active = index
      })

      setVisibleCount((count) => (visible > count ? visible : count))
      setActiveIndex(active)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="section section--dark process-section" id="process">
      <style>{css}</style>
      <div className="container process-layout">
        <div className="process-side">
          <SectionHeading
            dark
            align="left"
            eyebrow="Process"
            eyebrowClass="eyebrow--pill"
            title="From first call to launch in 7 steps."
            text="Demos, reviews and written updates at every stage."
          />
        </div>

        <ol className="timeline" ref={listRef}>
          <span className="timeline__track" aria-hidden="true" />
          <span className="timeline__fill" aria-hidden="true" />
          {processSteps.map((step, index) => {
            const classes = ['tl-step']
            if (index < visibleCount) classes.push('is-visible')
            if (index < activeIndex) classes.push('is-done')
            if (index === activeIndex) classes.push('is-active')
            return (
              <li className={classes.join(' ')} key={step.number}>
                <span className="tl-step__circle" aria-hidden="true">
                  {step.number}
                </span>
                <div className="tl-step__body">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}