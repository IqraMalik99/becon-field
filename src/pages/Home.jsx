import HomeHero from '../components/home/HomeHero.jsx'
import HomeServices from '../components/sections/HomeServices.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import ProjectsSection from '../components/home/ProjectsSection.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'

export default function Home() {
  return (
    <>
      <div id="top" />
      <HomeHero />
      <HomeServices />
      <AboutSection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
    </>
  )
}
