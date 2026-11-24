import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
import Reveal from '../Reveal.jsx'
import { useConsultation } from '../../context/consultationContext.js'
import { whyUs } from '../../data/site.js'

/* Inline CSS: photo-led split layout, red accents, bright white text */
const css = `
.about-section {
  position: relative;
  overflow: hidden;
  padding: clamp(64px, 8vw, 112px) 0;
  color: var(--white);
  background: #000000;
  border-top: 1px solid var(--line-light);
  isolation: isolate;
}
.about-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(circle at 8% 6%, rgba(142, 14, 44, 0.18), transparent 32%),
    radial-gradient(circle at 94% 94%, rgba(196, 18, 58, 0.1), transparent 28%);
}

.about-head { max-width: 54rem; margin-bottom: clamp(32px, 5vw, 56px); }
.about-section .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  color: var(--white);
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.about-section .eyebrow__dot {
  width: 8px;
  height: 8px;
  background: var(--red);
  border-radius: 50%;
  box-shadow: 0 0 0 5px rgba(142, 14, 44, 0.18);
}
.about-section h2 {
  margin: 0;
  color: var(--white);
  font-size: clamp(2rem, 4.4vw, 3.35rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}
.about-section .text-accent-bright { position: relative; display: inline-block; color: var(--white); }
.about-section .text-accent-bright::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 4px;
  background: var(--red);
  border-radius: 999px;
}
.about-head__lead {
  max-width: 44rem;
  margin: 20px 0 0;
  color: var(--white);
  font-size: clamp(1rem, 1.6vw, 1.12rem);
  line-height: 1.65;
}
.about-head__cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 24px;
  padding: 13px 24px;
  color: var(--white);
  font: inherit;
  font-weight: 700;
  background: var(--red);
  border: 1px solid var(--red);
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 14px 30px rgba(142, 14, 44, 0.28);
  transition: background 0.18s ease, transform 0.18s ease, gap 0.18s ease;
}
.about-head__cta:hover { background: var(--red-hover); border-color: var(--red-hover); transform: translateY(-2px); gap: 13px; }

.about-section__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: clamp(28px, 5vw, 64px);
  align-items: start;
}

/* Photo collage */
.about-media { position: relative; min-height: clamp(380px, 42vw, 520px); }
.about-media__primary {
  position: relative;
  overflow: hidden;
  width: 86%;
  aspect-ratio: 4 / 4.7;
  background: var(--surface-2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 26px;
}
.about-media__primary img,
.about-media__secondary img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.45s ease, transform 0.55s ease;
}
.about-media__primary img { filter: grayscale(62%) contrast(1.06); }
.about-media__secondary img { filter: grayscale(78%) contrast(1.08); }
.about-media:hover .about-media__primary img,
.about-media:hover .about-media__secondary img { filter: grayscale(0%); transform: scale(1.035); }
.about-media__primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.88), transparent 58%);
}
.about-media__badge {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2;
  padding: 7px 12px;
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--red);
  border-radius: 999px;
  box-shadow: 0 8px 22px rgba(142, 14, 44, 0.3);
}
.about-media__caption { position: absolute; left: 22px; right: 22px; bottom: 22px; z-index: 2; }
.about-media__caption strong { display: block; color: var(--white); font-size: 1.08rem; line-height: 1.25; }
.about-media__caption span { display: block; margin-top: 5px; color: var(--white); font-size: 0.8rem; }
.about-media__secondary {
  position: absolute;
  right: 0;
  bottom: 40px;
  z-index: 3;
  overflow: hidden;
  width: 46%;
  aspect-ratio: 1 / 1;
  background: var(--surface-2);
  border: 4px solid #000000;
  border-radius: 20px;
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.65);
}
.about-media__tag {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 4;
  padding: 7px 11px;
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  background: rgba(10, 10, 10, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

/* Mission + reasons */
.about-copy__mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  margin-bottom: 20px;
  color: var(--white);
  background: var(--red);
  border-radius: 14px;
  box-shadow: 0 10px 26px rgba(142, 14, 44, 0.3);
}
.about-copy__label {
  margin: 0 0 10px;
  color: var(--white);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.about-copy__title {
  margin: 0;
  max-width: 24ch;
  color: var(--white);
  font-size: clamp(1.5rem, 2.7vw, 2.1rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
}
.about-copy__body {
  margin: 14px 0 0;
  color: var(--white);
  font-size: 0.96rem;
  line-height: 1.62;
}
.about-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 22px 0 26px;
}
.about-stat {
  padding: 14px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
}
.about-stat__num { display: block; color: var(--white); font-size: clamp(1.6rem, 3vw, 2.1rem); font-weight: 800; line-height: 1; }
.about-stat__label { display: block; margin-top: 7px; color: var(--white); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }

.about-reasons {
  padding: clamp(18px, 2.4vw, 26px);
  background: linear-gradient(180deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
}
.about-reasons__head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.about-reasons__head h3 { margin: 0; color: var(--white); font-size: 1rem; font-weight: 800; }
.about-reasons__count { padding: 5px 11px; color: var(--white); font-size: 0.74rem; font-weight: 700; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 999px; }
.about-section__list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.about-item {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 13px;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.about-item:hover { border-color: rgba(255, 255, 255, 0.55); transform: translateX(3px); }
.about-item.is-open { background: #1a1a1a; border-color: rgba(255, 255, 255, 0.62); }
.about-item.is-open::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 3px; background: var(--red); }
.about-item__trigger { display: flex; align-items: center; gap: 13px; width: 100%; padding: 14px 15px; color: var(--white); font: inherit; text-align: left; background: transparent; border: 0; cursor: pointer; }
.about-item__num { flex-shrink: 0; color: var(--white); font-size: 0.78rem; font-weight: 800; letter-spacing: 0.06em; }
.about-item__title { flex: 1; color: var(--white); font-size: 0.94rem; font-weight: 700; line-height: 1.3; }
.about-item__caret { flex-shrink: 0; color: var(--white); transition: transform 0.22s ease; }
.about-item.is-open .about-item__caret { transform: rotate(180deg); }
.about-item__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.26s ease; }
.about-item.is-open .about-item__panel { grid-template-rows: 1fr; }
.about-item__panel-inner { overflow: hidden; }
.about-item__panel p { margin: 0; padding: 0 15px 7px 42px; color: var(--white); font-size: 0.87rem; line-height: 1.55; }
.about-item__link { display: inline-flex; align-items: center; gap: 6px; margin: 0 0 14px 42px; padding: 0; color: var(--white); font: inherit; font-size: 0.8rem; font-weight: 800; background: transparent; border: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.45); cursor: pointer; transition: gap 0.18s ease, border-color 0.18s ease; }
.about-item__link:hover { gap: 10px; border-bottom-color: var(--white); }

@media (max-width: 960px) {
  .about-section__grid { grid-template-columns: 1fr; }
  .about-head { margin-bottom: 32px; }
  .about-media { min-height: 440px; }
}
@media (max-width: 560px) {
  .about-media { min-height: 380px; }
  .about-media__primary { width: 90%; }
  .about-media__secondary { width: 48%; bottom: 32px; }
  .about-stats { grid-template-columns: 1fr; }
  .about-item__panel p, .about-item__link { padding-left: 15px; margin-left: 0; }
}
`

export default function AboutSection() {
  const { openConsultation } = useConsultation()
  const [open, setOpen] = useState(0)

  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <style>{css}</style>
      <div className="container">
        <Reveal className="about-head">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            About Beaconsfield
          </p>
          <h2 id="about-heading">
            Built by engineers who stay.{' '}
            <span className="text-accent-bright">No handoffs. No theatre.</span>
          </h2>
          <p className="about-head__lead">
            One senior team for IT support, software, mobile, AI and security. You talk directly to
            the people doing the work, get a written scope and budget up front, and we stay on after
            launch.
          </p>
          <button type="button" className="about-head__cta" onClick={() => openConsultation()}>
            Talk to our team <ArrowRight size={17} aria-hidden="true" />
          </button>
        </Reveal>

        <div className="about-section__grid">
          <Reveal className="about-media">
            <div className="about-media__primary">
              <img
                src="/images/about-team.jpg"
                alt="Senior team collaborating around a table"
                decoding="async"
              />
              <span className="about-media__badge">One senior team</span>
              <div className="about-media__caption">
                <strong>Direct access, every step.</strong>
                <span>From first call to steady state.</span>
              </div>
            </div>
            <div className="about-media__secondary">
              <img
                src="/images/about-work.jpg"
                alt="Engineers working together on a project"
                decoding="async"
              />
              <span className="about-media__tag">Built to last</span>
            </div>
          </Reveal>

          <div className="about-copy-wrap">
            <Reveal className="about-copy">
              <span className="about-copy__mark" aria-hidden="true">
                <Sparkle size={22} weight="fill" />
              </span>
              <p className="about-copy__label">Our mission</p>
              <p className="about-copy__title">Technology should help, not hinder.</p>
              <p className="about-copy__body">
                We scope clearly, build carefully and support what we ship. No vendor maze, no
                surprise invoices — just one accountable team from the first call to steady state.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat__num">5</span>
                  <span className="about-stat__label">Service areas</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat__num">1</span>
                  <span className="about-stat__label">Senior team</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat__num">0</span>
                  <span className="about-stat__label">Middlemen</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="about-reasons" delay={80}>
              <div className="about-reasons__head">
                <h3>Why teams choose us</h3>
                <span className="about-reasons__count">{whyUs.length} reasons</span>
              </div>
              <ul className="about-section__list">
                {whyUs.map((item, index) => {
                  const isOpen = open === index
                  return (
                    <li className={`about-item${isOpen ? ' is-open' : ''}`} key={item.title}>
                      <button
                        type="button"
                        className="about-item__trigger"
                        aria-expanded={isOpen}
                        aria-controls={`about-panel-${index}`}
                        onClick={() => setOpen(isOpen ? -1 : index)}
                      >
                        <span className="about-item__num" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="about-item__title">{item.title}</span>
                        <CaretDown className="about-item__caret" size={16} aria-hidden="true" />
                      </button>
                      <div className="about-item__panel" id={`about-panel-${index}`}>
                        <div className="about-item__panel-inner">
                          <p>{item.text}</p>
                          <button
                            type="button"
                            className="about-item__link"
                            onClick={() => openConsultation({ details: item.title })}
                          >
                            Discuss this <ArrowRight size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
