export function localToday() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function validateConsultation({ name, email, service, date }) {
  const errors = {}

  if (!String(name ?? '').trim()) {
    errors.name = 'Please enter your name.'
  }

  const trimmedEmail = String(email ?? '').trim()
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!service) {
    errors.service = 'Please choose a service.'
  }

  if (date && date < localToday()) {
    errors.date = 'Choose today or a future date.'
  }

  return errors
}

export function createConsultationPayload(data, service, details) {
  const countryCode = String(data.countryCode ?? '').trim()
  const digits = String(data.phone ?? '').replace(/\D/g, '')
  const phone = digits ? `${countryCode}${digits}` : ''

  return {
    name: String(data.name ?? '').trim(),
    email: String(data.email ?? '').trim(),
    phone,
    service,
    date: String(data.date ?? ''),
    time: String(data.time ?? ''),
    details,
  }
}

export async function sendConsultation(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = `Contact request failed with status ${response.status}`
    try {
      const data = await response.json()
      if (data?.error) message = data.error
    } catch {
      // Response was not JSON; keep the status-based message.
    }
    throw new Error(message)
  }

  return { mode: 'endpoint' }
}
