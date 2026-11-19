import itSupport from './categories/it-support.js'
import webSoftware from './categories/web-software.js'
import mobileApps from './categories/mobile-apps.js'
import aiAutomation from './categories/ai-automation.js'
import crmLeadGeneration from './categories/crm-lead-generation.js'
import cybersecurity from './categories/cybersecurity-maintenance.js'

export const serviceCategories = [
  itSupport,
  webSoftware,
  mobileApps,
  aiAutomation,
  crmLeadGeneration,
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
  'Printer & Scanner Support',
  'Network Support',
  'Website Development',
  'Web Application Development',
  'E-commerce Development',
  'Mobile App Development',
  'Custom Software Development',
  'AI Chatbot Development',
  'AI Voice Agents',
  'Workflow Automation',
  'WhatsApp Automation',
  'CRM Setup & Development',
  'Lead Generation',
  'Cybersecurity',
  'Website Maintenance',
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
