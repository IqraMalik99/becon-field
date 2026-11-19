import HomeHero from '../components/home/HomeHero.jsx'
import HomeServices from '../components/sections/HomeServices.jsx'
import SolutionsSection from '../components/home/SolutionsSection.jsx'
import ProjectsSection from '../components/home/ProjectsSection.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import TechSection from '../components/home/TechSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import FAQSection from '../components/home/FAQSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import CTABand from '../components/CTABand.jsx'

export default function Home() {
  return (
    <>
      <div id="top" />
      <HomeHero />
      <HomeServices />
      <SolutionsSection />
      <div className="desktop-only">
        <ProjectsSection />
      </div>
      <ProcessSection />
      <AboutSection />
      <div className="desktop-only">
        <TechSection />
      </div>
      <div className="desktop-only">
        <TestimonialsSection />
      </div>
      <FAQSection />
      <ContactSection />
      <CTABand />
    </>
  )
}