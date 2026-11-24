import nodemailer from 'nodemailer'
import { saveLead } from './db.js'

// Every consultation request is delivered to both inboxes.
const DEFAULT_TO = ['im4356927@gmail.com', 'Info@beacons-field.com']

function parseRecipients(value) {
  const list = String(value ?? '')
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean)
  return list.length ? list : [...DEFAULT_TO]
}

function readConfig(env = {}) {
  const port = Number(env.SMTP_PORT || 465)
  return {
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    to: parseRecipients(env.CONTACT_TO),
  }
}

function fail(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Validate the submitted payload. Returns a normalised lead, or `null`
 * when the honeypot field is filled (a bot submission).
 */
export function normalizeLead(payload = {}) {
  const { name, email, phone, service, date, time, details, website } = payload

  if (website) return null

  if (!String(name ?? '').trim() || !String(email ?? '').trim() || !String(service ?? '').trim()) {
    throw fail('Please provide your name, email, and the service you need.', 400)
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    throw fail('Please provide a valid email address.', 400)
  }

  return {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone ?? '').trim(),
    service: String(service).trim(),
    date: String(date ?? '').trim(),
    time: String(time ?? '').trim(),
    details: String(details ?? '').trim(),
  }
}

function buildMessage(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone || 'Not provided'],
    ['Service required', lead.service],
    ['Preferred date', lead.date || 'Flexible'],
    ['Preferred time', lead.time || 'Flexible'],
  ]

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Project details:',
    lead.details || 'Not provided',
  ].join('\n')

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0;color:#0a1a3d;">${escapeHtml(
          label,
        )}</th><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;line-height:1.5;">
      <h2 style="margin:0 0 12px;color:#0a1a3d;">New free consultation request</h2>
      <table style="border-collapse:collapse;font-size:14px;">${htmlRows}</table>
      <h3 style="margin:18px 0 6px;color:#0a1a3d;">Project details</h3>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(lead.details || 'Not provided')}</p>
    </div>
  `

  return { text, html }
}

function firstName(name) {
  return String(name ?? '')
    .trim()
    .split(/\s+/)[0] || 'there'
}

function buildCustomerMessage(lead) {
  const supportEmail = 'Info@beacons-field.com'
  const supportPhone = '+1 (501) 251-8031'
  const rows = [
    ['Service', lead.service],
    ['Preferred date', lead.date || 'Flexible'],
    ['Preferred time', lead.time || 'Flexible'],
  ]

  const text = [
    `Hi ${firstName(lead.name)},`,
    '',
    'Thanks for reaching out to Beaconsfield. We have received your consultation request and our team is reviewing the details you shared.',
    '',
    `We will get back to you shortly at the email address you provided. If your request is urgent, you can call us at ${supportPhone}.`,
    '',
    'Request summary:',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'We assure you that we will keep things clear, simple, and handled with care.',
    '',
    'Best regards,',
    'Beaconsfield',
    supportEmail,
    supportPhone,
  ].join('\n')

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:5px 12px 5px 0;color:#555555;font-weight:700;">${escapeHtml(
          label,
        )}</th><td style="padding:5px 0;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  const html = `
    <div style="background:#f4f4f4;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
        <div style="background:#000000;padding:16px 24px;">
          <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.01em;">Beaconsfield</span>
        </div>
        <div style="height:3px;background:#8e0e2c;"></div>
        <div style="padding:24px;color:#111111;font-size:14px;line-height:1.65;">
          <p style="margin:0 0 14px;font-size:16px;font-weight:700;">Hi ${escapeHtml(
            firstName(lead.name),
          )},</p>
          <p style="margin:0 0 12px;">
            Thanks for reaching out to Beaconsfield. We have received your consultation request and
            our team is reviewing the details you shared.
          </p>
          <p style="margin:0 0 12px;">
            We will get back to you shortly at the email address you provided. If your request is
            urgent, you can call us at
            <a href="tel:+15012518031" style="color:#8e0e2c;">${supportPhone}</a>.
          </p>
          <p style="margin:0 0 8px;font-weight:700;">Request summary</p>
          <table style="border-collapse:collapse;font-size:13px;margin-bottom:14px;">${htmlRows}</table>
          <p style="margin:0 0 12px;">
            We assure you that we will keep things clear, simple, and handled with care.
          </p>
          <p style="margin:0;">Best regards,<br /><strong>Beaconsfield</strong></p>
        </div>
        <div style="background:#0a0a0a;padding:14px 24px;color:#ffffff;font-size:12px;line-height:1.6;">
          <a href="mailto:${supportEmail}" style="color:#ffffff;">${supportEmail}</a>
          &nbsp;·&nbsp;
          <a href="tel:+15012518031" style="color:#ffffff;">${supportPhone}</a>
        </div>
      </div>
    </div>
  `

  return { text, html }
}

export async function sendCustomerAcknowledgement(lead, env = process.env) {
  const config = readConfig(env)
  if (!config.user || !config.pass) return false

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })

  const { text, html } = buildCustomerMessage(lead)

  await transporter.sendMail({
    from: `"Beaconsfield" <${config.user}>`,
    to: lead.email,
    replyTo: `"Beaconsfield" <${config.user}>`,
    subject: 'We have received your request — Beaconsfield',
    text,
    html,
  })

  return true
}

export async function sendLeadEmail(lead, env = process.env) {
  const config = readConfig(env)
  if (!config.user || !config.pass) {
    throw fail('Email is not configured yet. Set SMTP_USER and SMTP_PASS in your .env file.', 500)
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })

  const { text, html } = buildMessage(lead)

  await transporter.sendMail({
    from: `"Beaconsfield" <${config.user}>`,
    to: config.to,
    replyTo: `"${lead.name}" <${lead.email}>`,
    subject: `Free consultation request — ${lead.service}`,
    text,
    html,
  })

  return true
}

/**
 * Validate a consultation request, persist it to MongoDB and email it.
 * Either channel succeeding counts as success so no lead is lost; only
 * when both fail does this throw.
 */
export async function sendContactMessage(payload = {}, env = process.env) {
  const lead = normalizeLead(payload)
  if (!lead) return { ok: true, skipped: true }

  let saved = false
  try {
    await saveLead(env, lead)
    saved = true
  } catch (error) {
    console.error('[db] could not save lead:', error.message)
  }

  let emailed = false
  let emailError = null
  try {
    await sendLeadEmail(lead, env)
    emailed = true
  } catch (error) {
    emailError = error
    console.error('[email] could not send lead:', error.message)
  }

  let acknowledged = false
  try {
    acknowledged = await sendCustomerAcknowledgement(lead, env)
  } catch (error) {
    console.error('[email] could not send acknowledgement:', error.message)
  }

  if (!saved && !emailed) {
    throw emailError || fail('Could not save or send the request.', 502)
  }

  return { ok: true, saved, emailed, acknowledged }
}
