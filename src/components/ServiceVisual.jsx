import ItSupportVisual from './visuals/ItSupportVisual.jsx'
import WebSoftwareVisual from './visuals/WebSoftwareVisual.jsx'
import MobileAppsVisual from './visuals/MobileAppsVisual.jsx'
import AiAutomationVisual from './visuals/AiAutomationVisual.jsx'
import CrmVisual from './visuals/CrmVisual.jsx'
import SecurityVisual from './visuals/SecurityVisual.jsx'

const visualMap = {
  'it-support': ItSupportVisual,
  'web-software': WebSoftwareVisual,
  'mobile-apps': MobileAppsVisual,
  'ai-automation': AiAutomationVisual,
  'crm-lead-generation': CrmVisual,
  'cybersecurity-maintenance': SecurityVisual,
}

const labels = {
  'it-support': 'Illustration of a monitored workstation and server connected over a network',
  'web-software': 'Illustration of a website interface and code editor',
  'mobile-apps': 'Illustration of a mobile application with notifications',
  'ai-automation': 'Illustration of an AI assistant connected to business systems',
  'crm-lead-generation': 'Illustration of a CRM pipeline with contact records',
  'cybersecurity-maintenance': 'Illustration of a protected system behind a shield',
}

export default function ServiceVisual({ category, className = '' }) {
  const Visual = visualMap[category] ?? ItSupportVisual
  return (
    <svg
      className={`service-visual ${className}`.trim()}
      viewBox="0 0 560 400"
      role="img"
      aria-label={labels[category] ?? 'Service illustration'}
      focusable="false"
    >
      <Visual />
    </svg>
  )
}
