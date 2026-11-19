const serviceOptionByTitle = {
  'Hardware Troubleshooting': 'Hardware Support',
  'Printer Support': 'Printer & Scanner Support',
  'Scanner Support': 'Printer & Scanner Support',
  'Network Setup & Troubleshooting': 'Network Support',
  'Software Installation & Upgrades': 'Other / Custom Requirements',
  'Data Backup & Recovery': 'Other / Custom Requirements',
  'Remote IT Support': 'Monthly IT Maintenance',
  'Website Design & Development': 'Website Development',
  'Custom Web Application Development': 'Web Application Development',
  'E-commerce Development': 'E-commerce Development',
  'SaaS Platform Development': 'Custom Software Development',
  'Custom Business Software': 'Custom Software Development',
  'API Development & Integration': 'Other / Custom Requirements',
  'Website Redesign & Bug Fixing': 'Website Maintenance',
  'Android App Development': 'Mobile App Development',
  'iOS App Development': 'Mobile App Development',
  'Cross-Platform App Development': 'Mobile App Development',
  'Business Application Development': 'Mobile App Development',
  'E-commerce Mobile Applications': 'Mobile App Development',
  'Mobile App Maintenance & Support': 'Mobile App Development',
  'AI Chatbot Development': 'AI Chatbot Development',
  'AI Voice Agents': 'AI Voice Agents',
  'WhatsApp Automation': 'WhatsApp Automation',
  'AI Agents & Assistants': 'AI Chatbot Development',
  'Workflow Automation': 'Workflow Automation',
  'Customer Support Automation': 'Workflow Automation',
  'Business Process Automation': 'Workflow Automation',
  'Third-Party API Integrations': 'Workflow Automation',
  'CRM Setup & Implementation': 'CRM Setup & Development',
  'Custom CRM Development': 'CRM Setup & Development',
  'CRM Workflow Automation': 'CRM Setup & Development',
  'Lead Generation Systems': 'Lead Generation',
  'Lead Capture & Qualification': 'Lead Generation',
  'Sales Pipeline Management': 'CRM Setup & Development',
  'Automated Email Follow-ups': 'Lead Generation',
  'Appointment Booking Automation': 'CRM Setup & Development',
  'Malware Detection & Removal': 'Cybersecurity',
  'Website Security': 'Cybersecurity',
  'Firewall & Web Protection': 'Cybersecurity',
  'Surveillance System Support': 'Other / Custom Requirements',
  'Website Maintenance': 'Website Maintenance',
  'Monthly IT Maintenance': 'Monthly IT Maintenance',
  'Cloud Backup & Recovery': 'Other / Custom Requirements',
  'System Monitoring & Updates': 'Monthly IT Maintenance',
}

const categoryDefaults = {
  'it-support': 'Hardware Support',
  'web-software': 'Website Development',
  'mobile-apps': 'Mobile App Development',
  'ai-automation': 'Workflow Automation',
  'crm-lead-generation': 'CRM Setup & Development',
  'cybersecurity-maintenance': 'Cybersecurity',
}

export function resolveServiceOption(requested, category, options) {
  if (!requested) return ''
  if (options.includes(requested)) return requested
  if (serviceOptionByTitle[requested]) return serviceOptionByTitle[requested]
  if (category && categoryDefaults[category]) return categoryDefaults[category]
  return 'Other / Custom Requirements'
}
