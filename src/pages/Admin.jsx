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
import { Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
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
  --bg: #f4f6fa;
  --surface: #ffffff;
  --surface-2: #f7f9fc;
  --line: #e6e9f0;
  --line-strong: #d3d9e6;
  --ink: #101a2e;
  --muted: #5b6880;
  --faint: #8a94a8;
  --accent: #f6a35c;
  --accent-strong: #ea8b3c;
  --accent-ink: #3a1e04;
  --green: #12a06a;
  --blue: #2563eb;
  --red: #e5484d;
  min-height: 100vh;
  color: var(--ink);
  background:
    radial-gradient(80% 60% at 100% 0%, rgba(246, 163, 92, 0.10), transparent 60%),
    var(--bg);
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.admin *, .admin *::before, .admin *::after { box-sizing: border-box; }

/* The site's base styles add a fixed-header offset to <body>; drop it while
   the admin panel is mounted so the panel starts flush at the top. */
html:has(.admin),
body:has(.admin) { padding-top: 0; background: #f4f6fa; }

.brand { display: inline-flex; align-items: center; gap: 11px; }
.brand__mark {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  color: var(--accent-ink);
  background: linear-gradient(135deg, #ffd9a8, var(--accent));
  border-radius: 11px;
  box-shadow: 0 8px 18px rgba(246, 163, 92, 0.35);
}
.brand__text { display: flex; flex-direction: column; line-height: 1.2; }
.brand__text strong { color: var(--ink); font-size: 0.94rem; letter-spacing: -0.01em; }
.brand__text small { color: var(--muted); font-size: 0.76rem; }

/* ---------------------------------------------------------------- login */
.admin--login { padding: 14px clamp(16px, 4vw, 40px) 60px; }
.admin-back {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  color: var(--muted);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 10px;
}
.admin-back:hover { color: var(--ink); background: rgba(16, 26, 46, 0.05); }

.login-shell {
  width: min(880px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 26px 60px rgba(16, 26, 46, 0.12);
}
.login-aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 36px;
  border-right: 1px solid var(--line);
  background:
    radial-gradient(120% 120% at 0% 0%, rgba(246, 163, 92, 0.18), transparent 62%),
    linear-gradient(160deg, #fff9f2, #ffffff);
}
.login-aside h2 { margin: 6px 0 0; color: var(--ink); font-size: 1.5rem; letter-spacing: -0.02em; }
.login-aside > p { margin: 0; color: var(--muted); font-size: 0.92rem; line-height: 1.6; }
.login-aside ul { list-style: none; display: grid; gap: 12px; margin: 10px 0 0; padding: 0; }
.login-aside li { display: flex; align-items: flex-start; gap: 10px; color: #33415c; font-size: 0.9rem; line-height: 1.5; }
.login-aside li svg { flex: none; margin-top: 2px; color: var(--green); }

.login-form { padding: 40px 36px; background: var(--surface); }
.login-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  color: var(--accent-ink);
  background: linear-gradient(135deg, #ffd9a8, var(--accent));
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(246, 163, 92, 0.32);
}
.login-form h1 { margin: 0 0 6px; color: var(--ink); font-size: 1.35rem; letter-spacing: -0.01em; }
.login-form > p { margin: 0 0 22px; color: var(--muted); font-size: 0.9rem; line-height: 1.5; }
.login-form label { display: block; margin-bottom: 7px; color: var(--muted); font-size: 0.8rem; font-weight: 600; }
.field { position: relative; margin-bottom: 16px; }
.field input {
  width: 100%;
  padding: 12px 44px 12px 14px;
  color: var(--ink);
  font: inherit;
  background: #ffffff;
  border: 1px solid var(--line-strong);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input:focus { border-color: var(--accent-strong); box-shadow: 0 0 0 3px rgba(246, 163, 92, 0.20); }
.field__toggle {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  color: var(--muted);
  background: transparent;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.field__toggle:hover { color: var(--ink); background: rgba(16, 26, 46, 0.06); }
.login-submit { width: 100%; justify-content: center; padding: 13px 18px; font-weight: 700; }

/* ---------------------------------------------------------------- shell */
.topbar {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px clamp(16px, 4vw, 40px);
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(14px);
}
.topbar__actions { display: flex; gap: 9px; }

.wrap { max-width: 1120px; margin: 0 auto; padding: 22px clamp(16px, 4vw, 40px) 48px; }

.page-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 14px; margin-bottom: 20px; }
.page-head h1 { margin: 0; color: var(--ink); font-size: clamp(1.5rem, 3vw, 2rem); letter-spacing: -0.025em; }
.page-head p { margin: 6px 0 0; color: var(--muted); font-size: 0.92rem; }
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 13px;
  color: #9a5b12;
  font-size: 0.82rem;
  font-weight: 600;
  background: #fdf1e3;
  border: 1px solid #f4d9b8;
  border-radius: 999px;
}
.pill i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-strong);
  animation: pulse 1.9s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(234, 139, 60, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(234, 139, 60, 0); }
  100% { box-shadow: 0 0 0 0 rgba(234, 139, 60, 0); }
}

/* ---------------------------------------------------------------- stats */
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-bottom: 22px; }
.stat {
  position: relative;
  padding: 18px 20px 20px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(16, 26, 46, 0.04);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.stat:hover { transform: translateY(-2px); border-color: var(--line-strong); box-shadow: 0 12px 30px rgba(16, 26, 46, 0.10); }
.stat__icon { display: grid; place-items: center; width: 40px; height: 40px; margin-bottom: 16px; border-radius: 12px; }
.stat--pending .stat__icon { color: #b45309; background: #fef3e2; }
.stat--reviewed .stat__icon { color: #0f7a4d; background: #e6f7ef; }
.stat--total .stat__icon { color: #1d4ed8; background: #e8efff; }
.stat__value { color: var(--ink); font-size: 2.1rem; font-weight: 800; line-height: 1; letter-spacing: -0.02em; }
.stat__label { margin-top: 7px; color: var(--muted); font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; }
.stat__bar { position: absolute; left: 0; bottom: 0; height: 3px; width: 100%; opacity: 0.9; }
.stat--pending .stat__bar { background: linear-gradient(90deg, var(--accent), transparent); }
.stat--reviewed .stat__bar { background: linear-gradient(90deg, var(--green), transparent); }
.stat--total .stat__bar { background: linear-gradient(90deg, var(--blue), transparent); }

/* ---------------------------------------------------------------- toolbar */
.toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 18px; }
.tabs { display: inline-flex; gap: 4px; padding: 4px; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; }
.tabs button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 13px;
  color: var(--muted);
  font: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  background: transparent;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}
.tabs button:hover { color: var(--ink); }
.tabs button.is-active { color: var(--accent-ink); background: linear-gradient(135deg, #ffd9a8, var(--accent)); box-shadow: 0 4px 14px rgba(246, 163, 92, 0.35); }
.tabs .count { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 6px; font-size: 0.72rem; border-radius: 999px; background: #eef1f6; color: var(--muted); }
.tabs button.is-active .count { background: rgba(58, 30, 4, 0.16); color: var(--accent-ink); }

.search { position: relative; flex: 1 1 220px; max-width: 320px; margin-left: auto; }
.search > svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--faint); }
.search input {
  width: 100%;
  padding: 10px 36px;
  color: var(--ink);
  font: inherit;
  font-size: 0.88rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.search input:focus { border-color: var(--line-strong); box-shadow: 0 0 0 3px rgba(16, 26, 46, 0.05); }
.search input::placeholder { color: var(--faint); }
.search__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  color: var(--muted);
  background: transparent;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
}
.search__clear:hover { color: var(--ink); background: rgba(16, 26, 46, 0.06); }

/* ---------------------------------------------------------------- list */
.list { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.lead {
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(16, 26, 46, 0.04);
  animation: rise 0.32s ease both;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.lead:hover { border-color: var(--line-strong); box-shadow: 0 12px 30px rgba(16, 26, 46, 0.08); }
@keyframes rise { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }

.lead__top { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
.avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, hsl(var(--hue) 68% 56%), hsl(calc(var(--hue) + 34) 66% 44%));
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
}
.lead__id { flex: 1; min-width: 0; }
.lead__id h2 { margin: 0; color: var(--ink); font-size: 1.06rem; letter-spacing: -0.01em; }
.lead__sub { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; margin-top: 6px; }
.lead__service { color: var(--muted); font-size: 0.84rem; }
.lead__time { flex: none; color: var(--faint); font-size: 0.8rem; white-space: nowrap; }

.badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 999px; }
.badge i { width: 6px; height: 6px; border-radius: 50%; }
.badge--pending { color: #9a5b12; background: #fdf1e3; border: 1px solid #f4d9b8; }
.badge--pending i { background: var(--accent-strong); }
.badge--reviewed { color: #0f7a4d; background: #e6f7ef; border: 1px solid #bfe9d5; }
.badge--reviewed i { background: var(--green); }

.lead__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 24px; margin: 0 0 14px; padding-top: 15px; border-top: 1px dashed var(--line); }
.lead__grid > div { min-width: 0; }
.lead__grid dt { display: flex; align-items: center; gap: 6px; margin: 0; color: var(--faint); font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; }
.lead__grid dd { margin: 5px 0 0; color: #25324a; font-size: 0.92rem; word-break: break-word; }
.lead__grid a { color: var(--blue); text-decoration: none; }
.lead__grid a:hover { text-decoration: underline; }

.lead__details {
  margin: 0 0 14px;
  padding: 13px 15px;
  color: #33415c;
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre-wrap;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-left: 3px solid var(--accent);
  border-radius: 12px;
}
.lead__actions { display: flex; flex-wrap: wrap; gap: 9px; }

/* ---------------------------------------------------------------- buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  color: var(--ink);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  background: var(--surface);
  border: 1px solid var(--line-strong);
  border-radius: 11px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, filter 0.15s ease;
}
.btn:hover:not(:disabled) { background: #f2f5fa; border-color: #c2cadb; }
.btn:disabled { opacity: 0.5; cursor: default; }
.btn--primary { color: var(--accent-ink); background: linear-gradient(135deg, #ffd9a8, var(--accent)); border-color: transparent; box-shadow: 0 6px 16px rgba(246, 163, 92, 0.35); }
.btn--primary:hover:not(:disabled) { background: linear-gradient(135deg, #ffd9a8, var(--accent)); filter: brightness(1.04); }
.btn--danger { color: var(--red); background: #ffffff; border-color: #f3c7c9; }
.btn--danger:hover:not(:disabled) { background: #fdecec; border-color: #eeb0b3; }
.btn--ghost { background: transparent; border-color: transparent; }
.btn--ghost:hover:not(:disabled) { background: rgba(16, 26, 46, 0.06); border-color: transparent; }

/* ---------------------------------------------------------------- states */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 13px 15px;
  margin-bottom: 16px;
  color: #9f1b25;
  font-size: 0.9rem;
  background: #fdecec;
  border: 1px solid #f6c9cb;
  border-radius: 14px;
}
.alert svg { flex: none; margin-top: 1px; }

.empty {
  display: grid;
  place-items: center;
  gap: 6px;
  padding: 58px 24px;
  text-align: center;
  color: var(--muted);
  background: var(--surface);
  border: 1px dashed var(--line-strong);
  border-radius: 20px;
}
.empty__icon { display: grid; place-items: center; width: 58px; height: 58px; margin-bottom: 8px; color: #c2701f; background: #fff2e4; border-radius: 17px; }
.empty h3 { margin: 0; color: var(--ink); font-size: 1.05rem; }
.empty p { margin: 0; font-size: 0.9rem; }

.skeleton {
  height: 132px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(100deg, #eef1f6 30%, #f8fafc 50%, #eef1f6 70%);
  background-size: 220% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

@media (max-width: 760px) {
  .login-shell { grid-template-columns: 1fr; }
  .login-aside { display: none; }
  .login-form { padding: 32px 24px; }
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
              <span className="brand__mark" aria-hidden="true">
                <Sparkle size={18} weight="fill" />
              </span>
              <span className="brand__text">
                <strong>beconsfield</strong>
                <small>Admin</small>
              </span>
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
          <span className="brand__mark" aria-hidden="true">
            <Sparkle size={18} weight="fill" />
          </span>
          <span className="brand__text">
            <strong>beconsfield</strong>
            <small>Consultation inbox</small>
          </span>
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
