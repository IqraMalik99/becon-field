import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@phosphor-icons/react/dist/csr/X'
import ConsultationForm from './ConsultationForm.jsx'
import { contactServiceOptions } from '../data/services.js'
import { resolveServiceOption } from '../data/serviceOptionMap.js'

export default function ConsultationModal({
  open,
  requestedService = '',
  initialDetails = '',
  onClose,
}) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  const initialService = requestedService
    ? resolveServiceOption(requestedService, '', contactServiceOptions)
    : ''
  const prefilledDetails =
    initialDetails ||
    (requestedService ? `I would like to request: ${requestedService}.` : '')

  useEffect(() => {
    if (!open) return undefined

    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    const appRoot = document.getElementById('root')
    const wasInert = appRoot?.inert ?? false
    document.body.style.overflow = 'hidden'
    if (appRoot) appRoot.inert = true

    closeButtonRef.current?.focus()

    const getFocusable = () => {
      const dialog = dialogRef.current
      if (!dialog) return []

      return Array.from(
        dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) => element.offsetParent !== null && !element.closest('.hp-field'),
      )
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (appRoot) appRoot.inert = wasInert
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="modal__dialog glass-form"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="modal__head">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            Free consultation
          </p>
          <h2 id={titleId}>Tell us what you need.</h2>
          <p id={descriptionId}>
            Share a few details. If it is a fit for us, we get back to you soon — no
            obligation and no sales presentation.
          </p>
          <button
            type="button"
            className="modal__close"
            ref={closeButtonRef}
            aria-label="Close consultation form"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="modal__body">
          <ConsultationForm
            idPrefix="consultation"
            initialService={initialService}
            initialDetails={prefilledDetails}
            requestedService={requestedService}
            submitLabel="Book My Free Consultation"
            compact
            onClose={onClose}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}