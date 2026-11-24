import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { CheckCircle } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { consultationTimes, contactServiceOptions } from '../data/services.js'
import {
  createConsultationPayload,
  localToday,
  sendConsultation,
  validateConsultation,
} from '../lib/consultation.js'

export default function ConsultationForm({
  idPrefix = 'consultation',
  initialService = '',
  initialDetails = '',
  requestedService = '',
  submitLabel = 'Book My Free Consultation',
  compact = false,
  onClose,
  className = '',
}) {
  const [service, setService] = useState(initialService)
  const [details, setDetails] = useState(initialDetails)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [formKey, setFormKey] = useState(0)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const shouldFocusForm = useRef(false)
  const shouldFocusError = useRef(false)

  useEffect(() => {
    if (status === 'success') {
      successRef.current?.focus()
    }
  }, [status])

  useEffect(() => {
    if (!shouldFocusError.current) return
    shouldFocusError.current = false
    const firstError = ['name', 'email', 'service', 'date'].find((name) => errors[name])
    if (!firstError) return
    document.getElementById(`${idPrefix}-${firstError}`)?.focus()
  }, [errors, idPrefix])

  useEffect(() => {
    if (!shouldFocusForm.current) return
    shouldFocusForm.current = false
    const firstField = formRef.current?.querySelector(
      'input:not([type="hidden"]), select, textarea',
    )
    firstField?.focus()
  }, [formKey])

  const resetForm = () => {
    shouldFocusForm.current = true
    setStatus('idle')
    setErrors({})
    setService(initialService)
    setDetails(initialDetails)
    setFormKey((key) => key + 1)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    if (data.website) return

    const nextErrors = validateConsultation({
      name: data.name,
      email: data.email,
      service,
      date: data.date,
    })

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      shouldFocusError.current = true
      return
    }

    const payload = createConsultationPayload(data, service, details)
    setStatus('submitting')

    try {
      await sendConsultation(payload)

      setStatus('success')
      form.reset()
      setService('')
      setDetails('')
      setFormKey((key) => key + 1)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className={`form-success${compact ? ' form-success--compact' : ''}`}
        role="status"
        aria-live="polite"
        ref={successRef}
        tabIndex={-1}
      >
        <span className="form-success__icon" aria-hidden="true">
          <CheckCircle size={30} weight="fill" />
        </span>
        <span className="form-success__eyebrow">Message sent</span>
        <h2>Your request is in.</h2>
        <p>
          Thanks for reaching out. We have your details and will get back to you shortly at the
          email or phone number you provided.
        </p>
        <p className="form-success__note">
          Need it sooner? Call <a href="tel:+15012518031">+1 (501) 251-8031</a>.
        </p>
        <div className="form-success__actions">
          <button type="button" className="btn btn--primary" onClick={resetForm}>
            Send another request
          </button>
          {onClose && (
            <button type="button" className="btn btn--outline" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    )
  }

  const fieldId = (name) => `${idPrefix}-${name}`
  const errorId = (name) => `${idPrefix}-${name}-error`

  return (
    <form
      className={`contact-form${compact ? ' contact-form--compact' : ''}${className ? ` ${className}` : ''}`}
      key={formKey}
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
    >
      {requestedService && (
        <div className="request-notice">
          <CheckCircle size={18} aria-hidden="true" />
          <p>
            Requesting: <strong>{requestedService}</strong>
            {service && service !== requestedService ? (
              <span> — matched to {service} in the form below.</span>
            ) : null}
          </p>
        </div>
      )}

      <div className="form-row">
        <div className={`field${errors.name ? ' has-error' : ''}`}>
          <label htmlFor={fieldId('name')}>
            Your name <span className="req">*</span>
          </label>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
          />
          {errors.name && (
            <p className="field-error" id={errorId('name')}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={`field${errors.email ? ' has-error' : ''}`}>
          <label htmlFor={fieldId('email')}>
            Email address <span className="req">*</span>
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId('email') : undefined}
          />
          {errors.email && (
            <p className="field-error" id={errorId('email')}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={`field${errors.service ? ' has-error' : ''}`}>
        <label htmlFor={fieldId('service')}>
          Service needed <span className="req">*</span>
        </label>
        <select
          id={fieldId('service')}
          name="service"
          value={service}
          onChange={(event) => {
            setService(event.target.value)
            if (errors.service) {
              setErrors((current) => ({ ...current, service: '' }))
            }
          }}
          required
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? errorId('service') : undefined}
        >
          <option value="">Select a service</option>
          {contactServiceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="field-error" id={errorId('service')}>
            {errors.service}
          </p>
        )}
      </div>

      <div className="form-row">
        <div className="field phone-field">
          <label className="phone-field__label" htmlFor={fieldId('phone')}>
            Phone number
          </label>
          <div className="phone-group">
            <div className="phone-group__box phone-group__box--code">
              <span className="phone-group__caption" aria-hidden="true">
                Code
              </span>
              <select
                className="phone-group__code"
                name="countryCode"
                aria-label="Country code"
                defaultValue="+1"
              >
                <option value="+1">+1 US/CA</option>
                <option value="+44">+44 UK</option>
                <option value="+91">+91 IN</option>
                <option value="+92">+92 PK</option>
                <option value="+61">+61 AU</option>
                <option value="+971">+971 AE</option>
                <option value="+49">+49 DE</option>
                <option value="+33">+33 FR</option>
              </select>
            </div>
            <div className="phone-group__box phone-group__box--number">
              <span className="phone-group__caption" aria-hidden="true">
                Number
              </span>
              <input
                id={fieldId('phone')}
                className="phone-group__number"
                name="phone"
                type="number"
                inputMode="numeric"
                min="0"
                autoComplete="tel-national"
              />
            </div>
          </div>
        </div>

        <div className={`field${errors.date ? ' has-error' : ''}`}>
          <label htmlFor={fieldId('date')}>
            Preferred date
          </label>
          <input
            id={fieldId('date')}
            name="date"
            type="date"
            min={localToday()}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? errorId('date') : undefined}
          />
          {errors.date && (
            <p className="field-error" id={errorId('date')}>
              {errors.date}
            </p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor={fieldId('time')}>
            Preferred time
          </label>
          <select id={fieldId('time')} name="time" defaultValue="">
            <option value="">Any time</option>
            {consultationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={fieldId('details')}>
            Project details
          </label>
          <textarea
            id={fieldId('details')}
            name="details"
            rows="2"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor={fieldId('website')}>Website</label>
        <input
          id={fieldId('website')}
          name="website"
          type="text"
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <div className="form-alert" role="alert">
          <strong>Something went wrong sending the form.</strong> Please try again in a
          moment.
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary contact-submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          'Sending request…'
        ) : (
          <>
            {submitLabel} <ArrowRight size={17} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
