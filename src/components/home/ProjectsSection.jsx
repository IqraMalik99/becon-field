import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import { useConsultation } from '../../context/consultationContext.js'

const projects = [
  {
    image: '/images/projects/ai-support.webp',
    alt: 'Support team reviewing customer questions',
    tags: 'AI · Customer support',
    title: 'AI assistant that answers from your own documents',
    text: 'Trained on approved content. Hands over to a real person when it is unsure.',
    service: 'AI Chatbot Development',
    cta: 'Get a quote',
  },
  {
    image: '/images/projects/crm-pipeline.webp',
    alt: 'Pipeline reporting on a laptop dashboard',
    tags: 'CRM · Lead operations',
    title: 'One pipeline for every enquiry',
    text: 'Forms, calls and messages land in one place, tracked and assigned to an owner.',
    service: 'Lead Generation Systems',
    cta: 'Free audit',
  },
  {
    image: '/images/projects/mobile-field.webp',
    alt: 'Mobile app used by a field team',
    tags: 'Mobile · Field operations',
    title: 'Offline-ready app for teams on site',
    text: 'Keeps working without signal, then syncs with the office when back online.',
    service: 'Mobile App Development',
    cta: 'Get started',
  },
]

/* Inline CSS: cream section, white cards, navy text, orange tag chip */
const css = `
.projects-section {
  --navy-900: #0a1a3d;
  --navy-800: #0d1f45;
  --ink-soft: rgba(10, 26, 61, 0.68);
  padding: clamp(48px, 6vw, 84px) 0;
  color: var(--navy-900);
  background: #f6f1e7;
  border-top: 1px solid rgba(10, 26, 61, 0.08);
}
.projects-section h2 { color: var(--navy-900); letter-spacing: -0.02em; }
.projects-section .eyebrow { color: var(--navy-900); font-weight: 600; letter-spacing: 0.08em; }
.projects-section .eyebrow__dot { background: var(--navy-900); }
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
  background: #fff;
  border: 1px solid rgba(10, 26, 61, 0.12);
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(10, 26, 61, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.project-card:hover { transform: translateY(-4px); border-color: var(--navy-900); box-shadow: 0 18px 38px rgba(10, 26, 61, 0.14); }

.project-card__visual { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #e4dccb; }
.project-card__visual img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.project-card:hover .project-card__visual img { transform: scale(1.04); }
.project-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 11px;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: var(--navy-900);
  border-radius: 999px;
}

.project-card__body { display: flex; flex: 1; flex-direction: column; gap: 8px; padding: 18px 18px 18px; }
.project-card__tags {
  align-self: flex-start;
  margin: 0;
  padding: 3px 10px;
  color: #b45309;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(232, 114, 12, 0.12);
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
  color: #fff;
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--navy-900);
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.18s ease, gap 0.18s ease;
}
.project-card__cta:hover { background: var(--navy-800); gap: 12px; }
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
                  width="640"
                  height="420"
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