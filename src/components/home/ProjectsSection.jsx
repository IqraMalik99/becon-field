import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import { useConsultation } from '../../context/consultationContext.js'

const projects = [
  {
    image: '/images/projects/ai-support.jpg',
    alt: 'Support team collaborating around a table',
    tags: 'AI · Customer support',
    title: 'AI assistant that answers from your own documents',
    text: 'Trained on approved content. Hands over to a real person when it is unsure.',
    service: 'AI Chatbot Development',
    cta: 'Get a quote',
  },
  {
    image: '/images/projects/web-dashboard.jpg',
    alt: 'Analytics dashboard on a laptop screen',
    tags: 'Software · Internal tools',
    title: 'One dashboard for everyday operations',
    text: 'A custom web app that replaces spreadsheets with one clear view of the work.',
    service: 'Web Application Development',
    cta: 'Get a quote',
  },
  {
    image: '/images/projects/mobile-field.jpg',
    alt: 'Team using laptops to coordinate field work',
    tags: 'Mobile · Field operations',
    title: 'Offline-ready app for teams on site',
    text: 'Keeps working without signal, then syncs with the office when back online.',
    service: 'Mobile App Development',
    cta: 'Get started',
  },
]

/* Inline CSS: one full grey band with silver graphics */
const css = `
.projects-section {
  --navy-900: #f5f5f5;
  --navy-800: #c8c8c8;
  --ink-soft: rgba(245, 245, 245, 0.72);
  padding: clamp(48px, 6vw, 84px) 0;
  color: var(--ink);
  background: #1e1e1e;
  border-top: 1px solid rgba(200, 200, 200, 0.18);
  border-bottom: 1px solid rgba(200, 200, 200, 0.18);
}
.projects-section h2 { color: var(--navy-900); letter-spacing: -0.02em; }
.projects-section .eyebrow { color: var(--navy-900); font-weight: 600; letter-spacing: 0.08em; }
.projects-section .eyebrow__dot { background: var(--red); }
.projects-section [class*='heading'] p,
.projects-section .section-head__text { color: var(--ink-soft); }

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: clamp(24px, 4vw, 40px);
}
.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #141414;
  border: 1px solid rgba(200, 200, 200, 0.2);
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.project-card:hover { transform: translateY(-4px); border-color: rgba(200, 200, 200, 0.55); box-shadow: 0 18px 38px rgba(0, 0, 0, 0.45); }

.project-card__visual { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #0f0f0f; }
.project-card__visual img { display: block; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05) brightness(0.9); transition: transform 0.4s ease, filter 0.4s ease; }
.project-card:hover .project-card__visual img { transform: scale(1.04); filter: grayscale(0.35) contrast(1.02) brightness(0.98); }
.project-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 11px;
  color: var(--silver);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: #242424;
  border: 1px solid rgba(200, 200, 200, 0.22);
  border-radius: 999px;
}

.project-card__body { display: flex; flex: 1; flex-direction: column; gap: 8px; padding: 18px 18px 18px; }
.project-card__tags {
  align-self: flex-start;
  margin: 0;
  padding: 3px 10px;
  color: var(--silver);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(200, 200, 200, 0.12);
  border-radius: 999px;
}
.project-card__body h3 { margin: 4px 0 0; color: var(--navy-900); font-size: 1.12rem; line-height: 1.25; }
.project-card__body p:not(.project-card__tags) { margin: 0; color: var(--ink-soft); font-size: 0.92rem; line-height: 1.5; }

.project-card__cta {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 8px;
  margin-top: auto;
  padding: 9px 16px;
  color: var(--silver);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  background: #242424;
  border: 1px solid rgba(200, 200, 200, 0.25);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease, gap 0.18s ease;
}
.project-card__cta:hover { background: rgba(200, 200, 200, 0.18); color: #ffffff; gap: 12px; }
.project-card__body .project-card__cta { margin-top: 10px; }

.project-note { max-width: 40rem; margin: 28px auto 0; color: var(--ink-soft); font-size: 0.85rem; text-align: center; }

@media (max-width: 960px) {
  .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .project-grid { grid-template-columns: 1fr; }
}
`

export default function ProjectsSection() {
  const { openConsultation } = useConsultation()

  return (
    <section className="section projects-section" id="work">
      <style>{css}</style>
      <div className="container">
        <SectionHeading
          eyebrow="Featured projects"
          title="What our work looks like."
          text="Examples of the problems we build for. These are solution blueprints, not client case studies."
        />

        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal
              as="article"
              className="project-card"
              delay={index * 60}
              key={project.title}
            >
              <div className="project-card__visual">
                <img
                  src={project.image}
                  alt={project.alt}
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
               
              </div>
              <div className="project-card__body">
                <p className="project-card__tags">{project.tags}</p>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <button
                  type="button"
                  className="project-card__cta"
                  onClick={() => openConsultation({ service: project.service })}
                >
                  {project.cta} <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="project-note">
          Client names and results are shared only with permission. Ask us for relevant
          examples.
        </p>
      </div>
    </section>
  )
}