import itSupport from './categories/it-support.js'
import webSoftware from './categories/web-software.js'
import mobileApps from './categories/mobile-apps.js'
import aiAutomation from './categories/ai-automation.js'
import cybersecurity from './categories/cybersecurity-maintenance.js'

export const serviceCategories = [
  itSupport,
  webSoftware,
  mobileApps,
  aiAutomation,
  cybersecurity,
]

export const allServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    ...service,
    categorySlug: category.slug,
    categoryName: category.name,
    categoryShortName: category.shortName,
  })),
)

export function getCategory(slug) {
  return serviceCategories.find((category) => category.slug === slug)
}

export function getService(categorySlug, serviceSlug) {
  const category = getCategory(categorySlug)
  if (!category) return null
  const service = category.services.find((item) => item.slug === serviceSlug)
  return service ? { ...service, category } : null
}

export const contactServiceOptions = [
  'Hardware Support',
  'Network Support',
  'Software Installation & Upgrades',
  'Remote IT Support',
  'Website Development',
  'Web Application Development',
  'Custom Software Development',
  'API Development & Integration',
  'Mobile App Development',
  'AI Chatbot Development',
  'AI Voice Agents',
  'Workflow Automation',
  'Cybersecurity',
  'Monthly IT Maintenance',
  'Other / Custom Requirements',
]

export const consultationTimes = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
]
