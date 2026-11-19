import { useCallback, useMemo, useState } from 'react'
import ConsultationModal from '../components/ConsultationModal.jsx'
import { ConsultationContext } from './consultationContext.js'

export function ConsultationProvider({ children }) {
  const [request, setRequest] = useState({
    open: false,
    service: '',
    details: '',
  })

  const openConsultation = useCallback((options = {}) => {
    setRequest({
      open: true,
      service: typeof options.service === 'string' ? options.service : '',
      details: typeof options.details === 'string' ? options.details : '',
    })
  }, [])

  const closeConsultation = useCallback(() => {
    setRequest((current) => ({ ...current, open: false }))
  }, [])

  const value = useMemo(
    () => ({ openConsultation, closeConsultation, isOpen: request.open }),
    [openConsultation, closeConsultation, request.open],
  )

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationModal
        open={request.open}
        requestedService={request.service}
        initialDetails={request.details}
        onClose={closeConsultation}
      />
    </ConsultationContext.Provider>
  )
}
