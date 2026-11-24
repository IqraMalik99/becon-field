const serviceOptionByTitle = {
  'Hardware Troubleshooting': 'Hardware Support',
  'Network Setup & Troubleshooting': 'Network Support',
  'Software Installation & Upgrades': 'Software Installation & Upgrades',
  'Remote IT Support': 'Remote IT Support',
  'Website Design & Development': 'Website Development',
  'Custom Web Application Development': 'Web Application Development',
  'Custom Business Software': 'Custom Software Development',
  'API Development & Integration': 'API Development & Integration',
  'Cross-Platform App Development': 'Mobile App Development',
  'Business Application Development': 'Mobile App Development',
  'Mobile App Maintenance & Support': 'Mobile App Development',
  'AI Chatbot Development': 'AI Chatbot Development',
  'AI Voice Agents': 'AI Voice Agents',
  'AI Agents & Assistants': 'AI Chatbot Development',
  'Workflow Automation': 'Workflow Automation',
  'Malware Detection & Removal': 'Cybersecurity',
  'Website Security': 'Cybersecurity',
  'Monthly IT Maintenance': 'Monthly IT Maintenance',
  'System Monitoring & Updates': 'Monthly IT Maintenance',
}

const categoryDefaults = {
  'it-support': 'Hardware Support',
  'web-software': 'Website Development',
  'mobile-apps': 'Mobile App Development',
  'ai-automation': 'Workflow Automation',
  'cybersecurity-maintenance': 'Cybersecurity',
}

export function resolveServiceOption(requested, category, options) {
  if (!requested) return ''
  if (options.includes(requested)) return requested
  if (serviceOptionByTitle[requested]) return serviceOptionByTitle[requested]
  if (category && categoryDefaults[category]) return categoryDefaults[category]
  return 'Other / Custom Requirements'
}
