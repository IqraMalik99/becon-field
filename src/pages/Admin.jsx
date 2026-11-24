import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowClockwise } from '@phosphor-icons/react/dist/csr/ArrowClockwise'
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { CalendarBlank } from '@phosphor-icons/react/dist/csr/CalendarBlank'
import { CheckCircle } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { Clock } from '@phosphor-icons/react/dist/csr/Clock'
import { ClockCounterClockwise } from '@phosphor-icons/react/dist/csr/ClockCounterClockwise'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { Eye } from '@phosphor-icons/react/dist/csr/Eye'
import { EyeSlash } from '@phosphor-icons/react/dist/csr/EyeSlash'
import { LockKey } from '@phosphor-icons/react/dist/csr/LockKey'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { Phone } from '@phosphor-icons/react/dist/csr/Phone'
import { SealCheck } from '@phosphor-icons/react/dist/csr/SealCheck'
import { SignOut } from '@phosphor-icons/react/dist/csr/SignOut'
import { Trash } from '@phosphor-icons/react/dist/csr/Trash'
import { Tray } from '@phosphor-icons/react/dist/csr/Tray'
import { WarningCircle } from '@phosphor-icons/react/dist/csr/WarningCircle'
import { X } from '@phosphor-icons/react/dist/csr/X'

const TOKEN_KEY = 'mta_admin_token'

const FILTERS = [
  { id: 'pending', label: 'Pending' },
  { id: 'reviewed', label: 'Reviewed' },
  { id: 'all', label: 'All' },
]

const LOGIN_HIGHLIGHTS = [
  'Review, reply and track every enquiry in one place.',
  'Mark leads as reviewed once they are handled.',
  'Stored safely in your MongoDB database.',
]

async function api(path, { token, method = 'GET', body } = {}) {
  const response = await fetch(path, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    // Non-JSON response.
  }

  if (!response.ok) {
    const error = new Error(data?.error || `Request failed (${response.status})`)
    error.status = response.status
    throw error
  }
  return data
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function formatFull(value) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString()
}

function relativeTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  const diff = Date.now() - date.getTime()
  const minute = 60_000
  const hour = 3_600_000
  const day = 86_400_000
  if (diff < minute) return 'just now'
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`
  if (diff < day) return `${Math.floor(diff / hour)}h ago`
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function initials(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return `${first}${last}`.toUpperCase()
}

function hueFromString(value = '') {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) % 360
  return hash
}

const css = `
.admin {
  --bg: #000000;
  --surface: #0a0a0a;
  --surface-2: #0a0a0a;
  --line: rgba(255, 255, 255, 0.10);
  --line-strong: rgba(255, 255, 255, 0.20);
  --ink: #ffffff;
  --muted: rgba(255, 255, 255, 0.66);
  --faint: rgba(255, 255, 255, 0.44);
  --accent: #ffffff;
  --accent-strong: #d6d6d6;
  --accent-ink: #0a0a0a;
  --green: #ffffff;
  --blue: rgba(255, 255, 255, 0.78);
  --red: #ff5c66;
  min-height: 100vh;
  color: var(--ink);
  background: var(--bg);
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.admin *, .admin *::before, .admin *::after { box-sizing: border-box; }

/* The site's base styles add a fixed-header offset to <body>; drop it while
   the admin panel is mounted so the panel starts flush at the top. */
html:has(.admin),
body:has(.admin) { padding-top: 0; background: #000000; }

.brand { display: inline-flex; align-items: center; flex-shrink: 0; }
.brand__logo {
  display: block;
  width: 132px;
  height: auto;
  object-fit: contain;
  border: 0;
  border-radius: 0;
  outline: 0;
  background: transparent;
  box-shadow: none;
}
.login-aside .brand__logo { width: 150px; }

/* ---------------------------------------------------------------- login */
.admin--login { padding: 10px clamp(16px, 4vw, 40px) 36px; }
.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 9px;
}
.admin-back:hover { color: var(--ink); background: rgba(255, 255, 255, 0.06); }

.login-shell {
  width: min(820px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
}
.login-aside {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 28px 26px;
  border-right: 1px solid var(--line);
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(255, 255, 255, 0.05), transparent 62%),
    var(--surface-2);
}
.login-aside h2 { margin: 4px 0 0; color: var(--ink); font-size: 1.32rem; letter-spacing: -0.02em; }
.login-aside > p { margin: 0; color: var(--muted); font-size: 0.88rem; line-height: 1.5; }
.login-aside ul { list-style: none; display: grid; gap: 9px; margin: 6px 0 0; padding: 0; }
.login-aside li { display: flex; align-items: flex-start; gap: 8px; color: var(--muted); font-size: 0.84rem; line-height: 1.45; }
.login-aside li svg { flex: none; margin-top: 2px; color: var(--accent-strong); }

.login-form { padding: 28px 26px; background: var(--surface); }
.login-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  color: var(--accent-ink);
  background: var(--accent);
  border-radius: 12px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
}
.login-form h1 { margin: 0 0 5px; color: var(--ink); font-size: 1.22rem; letter-spacing: -0.01em; }
.login-form > p { margin: 0 0 16px; color: var(--muted); font-size: 0.85rem; line-height: 1.45; }
.login-form label { display: block; margin-bottom: 6px; color: var(--muted); font-size: 0.78rem; font-weight: 600; }
.field { position: relative; margin-bottom: 12px; }
.field input {
  width: 100%;
  padding: 9px 40px 9px 12px;
  color: var(--ink);
  font: inherit;
  background: var(--surface-2);
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input:focus { border-color: var(--accent-strong); box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.10); }
.field__toggle {
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: var(--muted);
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.field__toggle:hover { color: var(--ink); background: rgba(255, 255, 255, 0.06); }
.login-submit { width: 100%; justify-content: center; padding: 10px 16px; font-weight: 700; }

/* ---------------------------------------------------------------- shell */
.topbar {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 9px clamp(16px, 4vw, 40px);
  border-bottom: 1px solid var(--line);
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(14px);
}
.topbar__actions { display: flex; gap: 7px; }

.wrap { max-width: 1120px; margin: 0 auto; padding: 14px clamp(16px, 4vw, 40px) 32px; }

.page-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.page-head h1 { margin: 0; color: var(--ink); font-size: clamp(1.35rem, 2.6vw, 1.7rem); letter-spacing: -0.025em; }
.page-head p { margin: 4px 0 0; color: var(--muted); font-size: 0.86rem; }
.pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 11px;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--line-strong);
  border-radius: 999px;
}
.pill i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-strong);
  animation: pulse 1.9s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.35); }
  70% { box-shadow: 0 0 0 7px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

/* ---------------------------------------------------------------- stats */
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
.stat {
  position: relative;
  padding: 12px 14px 14px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.stat:hover { transform: translateY(-2px); border-color: var(--line-strong); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5); }
.stat__icon { display: grid; place-items: center; width: 32px; height: 32px; margin-bottom: 10px; border-radius: 9px; color: #ffffff; background: rgba(255, 255, 255, 0.06); }
.stat--pending .stat__icon { color: #ffffff; background: rgba(255, 255, 255, 0.12); }
.stat--reviewed .stat__icon { color: #ffffff; background: rgba(255, 255, 255, 0.16); }
.stat--total .stat__icon { color: var(--muted); background: rgba(255, 255, 255, 0.06); }
.stat__value { color: var(--ink); font-size: 1.7rem; font-weight: 800; line-height: 1; letter-spacing: -0.02em; }
.stat__label { margin-top: 5px; color: var(--muted); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
.stat__bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; opacity: 0.85; }
.stat--pending .stat__bar { background: linear-gradient(90deg, rgba(255, 255, 255, 0.55), transparent); }
.stat--reviewed .stat__bar { background: linear-gradient(90deg, var(--green), transparent); }
.stat--total .stat__bar { background: linear-gradient(90deg, var(--blue), transparent); }

/* ---------------------------------------------------------------- toolbar */
.toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 12px; }
.tabs { display: inline-flex; gap: 3px; padding: 3px; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; }
.tabs button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  color: var(--muted);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  background: transparent;
  border: 0;
  border-radius: 9px;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}
.tabs button:hover { color: var(--ink); }
.tabs button.is-active { color: #ffffff; background: rgba(255, 255, 255, 0.14); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.20); }
.tabs .count { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 5px; font-size: 0.68rem; border-radius: 999px; background: rgba(255, 255, 255, 0.08); color: var(--muted); }
.tabs button.is-active .count { background: rgba(255, 255, 255, 0.18); color: #ffffff; }

.search { position: relative; flex: 1 1 220px; max-width: 320px; margin-left: auto; }
.search > svg { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--faint); }
.search input {
  width: 100%;
  padding: 8px 32px;
  color: var(--ink);
  font: inherit;
  font-size: 0.84rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.search input:focus { border-color: var(--line-strong); box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06); }
.search input::placeholder { color: var(--faint); }
.search__clear {
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  color: var(--muted);
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}
.search__clear:hover { color: var(--ink); background: rgba(255, 255, 255, 0.06); }

/* ---------------------------------------------------------------- list */
.list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.lead {
  padding: 13px 16px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  animation: rise 0.32s ease both;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.lead:hover { border-color: var(--line-strong); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5); }
@keyframes rise { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }

.lead__top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #4a4a4a, #262626);
  border-radius: 11px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
}
.lead__id { flex: 1; min-width: 0; }
.lead__id h2 { margin: 0; color: var(--ink); font-size: 1rem; letter-spacing: -0.01em; }
.lead__sub { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 5px; }
.lead__service { color: var(--muted); font-size: 0.8rem; }
.lead__time { flex: none; color: var(--faint); font-size: 0.76rem; white-space: nowrap; }

.badge { display: inline-flex; align-items: center; gap: 5px; padding: 2px 8px; font-size: 0.66rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 999px; }
.badge i { width: 5px; height: 5px; border-radius: 50%; }
.badge--pending { color: #ffffff; background: rgba(255, 255, 255, 0.08); border: 1px solid var(--line-strong); }
.badge--pending i { background: var(--accent-strong); }
.badge--reviewed { color: #ffffff; background: rgba(255, 255, 255, 0.12); border: 1px solid var(--line-strong); }
.badge--reviewed i { background: #ffffff; }

.lead__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 18px; margin: 0 0 10px; padding-top: 11px; border-top: 1px dashed var(--line); }
.lead__grid > div { min-width: 0; }
.lead__grid dt { display: flex; align-items: center; gap: 6px; margin: 0; color: var(--faint); font-size: 0.68rem; letter-spacing: 0.06em; text-transform: uppercase; }
.lead__grid dd { margin: 4px 0 0; color: #ffffff; font-size: 0.88rem; word-break: break-word; }
.lead__grid a { color: #ffffff; text-decoration: underline; text-decoration-color: rgba(255, 255, 255, 0.45); text-underline-offset: 2px; }
.lead__grid a:hover { color: var(--accent-strong); }

.lead__details {
  margin: 0 0 10px;
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.86rem;
  line-height: 1.45;
  white-space: pre-wrap;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-left: 3px solid var(--line-strong);
  border-radius: 10px;
}
.lead__actions { display: flex; flex-wrap: wrap; gap: 7px; }

/* ---------------------------------------------------------------- buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  color: var(--ink);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, filter 0.15s ease;
}
.btn:hover:not(:disabled) { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.38); }
.btn:disabled { opacity: 0.5; cursor: default; }
.btn--primary { color: var(--accent-ink); background: var(--accent); border-color: var(--accent); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45); }
.btn--primary:hover:not(:disabled) { background: var(--accent-strong); border-color: var(--accent-strong); filter: none; }
.btn--danger { color: var(--red); background: rgba(255, 92, 102, 0.06); border-color: rgba(255, 92, 102, 0.28); }
.btn--danger:hover:not(:disabled) { background: rgba(255, 92, 102, 0.14); border-color: rgba(255, 92, 102, 0.45); }
.btn--ghost { background: transparent; border-color: transparent; }
.btn--ghost:hover:not(:disabled) { background: rgba(255, 255, 255, 0.06); border-color: transparent; }

/* ---------------------------------------------------------------- states */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 10px 12px;
  margin-bottom: 12px;
  color: #ffffff;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  border-left: 3px solid var(--red);
  border-radius: 11px;
}
.alert svg { flex: none; margin-top: 1px; }

.empty {
  display: grid;
  place-items: center;
  gap: 5px;
  padding: 38px 20px;
  text-align: center;
  color: var(--muted);
  background: var(--surface);
  border: 1px dashed var(--line-strong);
  border-radius: 16px;
}
.empty__icon { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 6px; color: #ffffff; background: rgba(255, 255, 255, 0.10); border-radius: 14px; }
.empty h3 { margin: 0; color: var(--ink); font-size: 1rem; }
.empty p { margin: 0; font-size: 0.85rem; }

.skeleton {
  height: 96px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: linear-gradient(100deg, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.09) 50%, rgba(255, 255, 255, 0.05) 70%);
  background-size: 220% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

@media (max-width: 760px) {
  .login-shell { grid-template-columns: 1fr; }
  .login-aside { display: none; }
  .login-form { padding: 24px 20px; }
}
@media (max-width: 680px) {
  .stats { grid-template-columns: 1fr; }
  .lead__grid { grid-template-columns: 1fr; }
  .search { max-width: none; margin-left: 0; }
  .topbar__actions .btn span { display: none; }
}
`

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [leads, setLeads] = useState([])
  const [counts, setCounts] = useState({ all: 0, pending: 0, reviewed: 0 })
  const [filter, setFilter] = useState('pending')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [busyId, setBusyId] = useState('')

  const loadLeads = useCallback(async (status, authToken) => {
    if (!authToken) return
    setLoading(true)
    setLoadError('')
    try {
      const data = await api(`/api/admin/leads?status=${encodeURIComponent(status)}`, {
        token: authToken,
      })
      setLeads(data.leads || [])
      setCounts(data.counts || { all: 0, pending: 0, reviewed: 0 })
    } catch (error) {
      if (error.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY)
        setToken('')
      } else {
        setLoadError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Fetching on mount/login is intentional; state updates happen after await.
    // oxlint-disable-next-line react/set-state-in-effect
    if (token) loadLeads(filter, token)
  }, [token, filter, loadLeads])

  const visibleLeads = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return leads
    return leads.filter((lead) =>
      [lead.name, lead.email, lead.phone, lead.service, lead.details].some((value) =>
        String(value || '').toLowerCase().includes(term),
      ),
    )
  }, [leads, query])

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoggingIn(true)
    setLoginError('')
    try {
      const data = await api('/api/admin/login', { method: 'POST', body: { password } })
      sessionStorage.setItem(TOKEN_KEY, data.token)
      setPassword('')
      setToken(data.token)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      await api('/api/admin/logout', { method: 'POST', token })
    } catch {
      // Ignore; the local session is cleared regardless.
    }
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setLeads([])
  }

  const changeStatus = async (lead, status) => {
    setBusyId(lead.id)
    setLoadError('')
    try {
      await api(`/api/admin/leads/${lead.id}`, { method: 'PATCH', token, body: { status } })
      await loadLeads(filter, token)
    } catch (error) {
      setLoadError(error.message)
    } finally {
      setBusyId('')
    }
  }

  const removeLead = async (lead) => {
    if (!window.confirm(`Delete the request from ${lead.name}? This cannot be undone.`)) return
    setBusyId(lead.id)
    setLoadError('')
    try {
      await api(`/api/admin/leads/${lead.id}`, { method: 'DELETE', token })
      await loadLeads(filter, token)
    } catch (error) {
      setLoadError(error.message)
    } finally {
      setBusyId('')
    }
  }

  if (!token) {
    return (
      <div className="admin admin--login">
        <style>{css}</style>
        <a className="admin-back" href="/">
          <ArrowLeft size={16} weight="bold" aria-hidden="true" /> Back to site
        </a>

        <div className="login-shell">
          <aside className="login-aside">
            <span className="brand">
              <img className="brand__logo" src="/images/logo.png" alt="Beaconsfield" />
            </span>
            <h2>Consultation inbox</h2>
            <p>Every request from the website lands here, so nothing slips through.</p>
            <ul>
              {LOGIN_HIGHLIGHTS.map((item) => (
                <li key={item}>
                  <SealCheck size={18} weight="fill" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <form className="login-form" onSubmit={handleLogin}>
            <span className="login-icon" aria-hidden="true">
              <LockKey size={24} weight="fill" />
            </span>
            <h1>Admin sign in</h1>
            <p>Enter the admin password to open the inbox.</p>

            <label htmlFor="admin-password">Password</label>
            <div className="field">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                autoFocus
                required
              />
              <button
                type="button"
                className="field__toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlash size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </div>

            {loginError && (
              <p className="alert" role="alert">
                <WarningCircle size={18} weight="fill" aria-hidden="true" />
                {loginError}
              </p>
            )}

            <button type="submit" className="btn btn--primary login-submit" disabled={loggingIn}>
              {loggingIn ? 'Checking…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <style>{css}</style>

      <header className="topbar">
        <span className="brand">
          <img className="brand__logo" src="/images/logo.png" alt="Beaconsfield" />
        </span>
        <div className="topbar__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => loadLeads(filter, token)}
            disabled={loading}
          >
            <ArrowClockwise size={16} weight="bold" aria-hidden="true" />
            <span>Refresh</span>
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
            <SignOut size={16} weight="bold" aria-hidden="true" />
            <span>Sign out</span>
          </button>
        </div>
      </header>

      <main className="wrap">
        <div className="page-head">
          <div>
            <h1>Leads</h1>
            <p>
              {counts.pending} pending · {counts.all} total
            </p>
          </div>
          {counts.pending > 0 && (
            <span className="pill">
              <i aria-hidden="true" />
              {counts.pending} awaiting review
            </span>
          )}
        </div>

        <section className="stats">
          <article className="stat stat--pending">
            <span className="stat__icon" aria-hidden="true">
              <ClockCounterClockwise size={20} weight="bold" />
            </span>
            <div className="stat__value">{counts.pending}</div>
            <div className="stat__label">Pending review</div>
            <span className="stat__bar" aria-hidden="true" />
          </article>
          <article className="stat stat--reviewed">
            <span className="stat__icon" aria-hidden="true">
              <CheckCircle size={20} weight="fill" />
            </span>
            <div className="stat__value">{counts.reviewed}</div>
            <div className="stat__label">Reviewed</div>
            <span className="stat__bar" aria-hidden="true" />
          </article>
          <article className="stat stat--total">
            <span className="stat__icon" aria-hidden="true">
              <Tray size={20} weight="bold" />
            </span>
            <div className="stat__value">{counts.all}</div>
            <div className="stat__label">Total leads</div>
            <span className="stat__bar" aria-hidden="true" />
          </article>
        </section>

        <div className="toolbar">
          <div className="tabs" role="tablist" aria-label="Filter leads">
            {FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={filter === option.id}
                className={filter === option.id ? 'is-active' : ''}
                onClick={() => setFilter(option.id)}
              >
                {option.label}
                <span className="count">{counts[option.id] ?? 0}</span>
              </button>
            ))}
          </div>

          <label className="search">
            <MagnifyingGlass size={17} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email or service"
              aria-label="Search leads"
            />
            {query && (
              <button
                type="button"
                className="search__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={14} weight="bold" aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        {loadError && (
          <div className="alert" role="alert">
            <WarningCircle size={18} weight="fill" aria-hidden="true" />
            {loadError}
          </div>
        )}

        {loading ? (
          <ul className="list" aria-hidden="true">
            <li className="skeleton" />
            <li className="skeleton" />
            <li className="skeleton" />
          </ul>
        ) : visibleLeads.length === 0 ? (
          <div className="empty">
            <span className="empty__icon" aria-hidden="true">
              <Tray size={28} weight="duotone" />
            </span>
            <h3>{query ? 'No matching leads' : `No ${filter === 'all' ? '' : `${filter} `}leads yet`}</h3>
            <p>
              {query
                ? 'Try a different search term.'
                : 'New consultation requests will appear here automatically.'}
            </p>
          </div>
        ) : (
          <ul className="list">
            {visibleLeads.map((lead) => (
              <li key={lead.id} className="lead">
                <div className="lead__top">
                  <span
                    className="avatar"
                    style={{ '--hue': String(hueFromString(lead.email || lead.name)) }}
                    aria-hidden="true"
                  >
                    {initials(lead.name)}
                  </span>
                  <div className="lead__id">
                    <h2>{lead.name}</h2>
                    <div className="lead__sub">
                      <span className={`badge badge--${lead.status}`}>
                        <i aria-hidden="true" />
                        {lead.status}
                      </span>
                      <span className="lead__service">{lead.service}</span>
                    </div>
                  </div>
                  <time className="lead__time" dateTime={lead.createdAt} title={formatFull(lead.createdAt)}>
                    {relativeTime(lead.createdAt)}
                  </time>
                </div>

                <dl className="lead__grid">
                  <div>
                    <dt>
                      <EnvelopeSimple size={14} aria-hidden="true" /> Email
                    </dt>
                    <dd>
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <Phone size={14} aria-hidden="true" /> Phone
                    </dt>
                    <dd>{lead.phone || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt>
                      <CalendarBlank size={14} aria-hidden="true" /> Preferred
                    </dt>
                    <dd>{[lead.date, lead.time].filter(Boolean).join(' · ') || 'Flexible'}</dd>
                  </div>
                  <div>
                    <dt>
                      <Clock size={14} aria-hidden="true" /> Received
                    </dt>
                    <dd>{formatDate(lead.createdAt)}</dd>
                  </div>
                </dl>

                {lead.details && <p className="lead__details">{lead.details}</p>}

                <div className="lead__actions">
                  {lead.status === 'pending' ? (
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => changeStatus(lead, 'reviewed')}
                      disabled={busyId === lead.id}
                    >
                      <CheckCircle size={16} weight="fill" aria-hidden="true" /> Mark reviewed
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => changeStatus(lead, 'pending')}
                      disabled={busyId === lead.id}
                    >
                      <ClockCounterClockwise size={16} aria-hidden="true" /> Move to pending
                    </button>
                  )}

                  <a
                    className="btn"
                    href={`mailto:${lead.email}?subject=${encodeURIComponent(
                      `Re: your consultation request — ${lead.service}`,
                    )}`}
                  >
                    <EnvelopeSimple size={16} aria-hidden="true" /> Reply
                  </a>

                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => removeLead(lead)}
                    disabled={busyId === lead.id}
                  >
                    <Trash size={16} aria-hidden="true" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
