import { createContext, useContext } from 'react'

export const ConsultationContext = createContext(null)

export function useConsultation() {
  const context = useContext(ConsultationContext)

  if (!context) {
    throw new Error('useConsultation must be used inside a ConsultationProvider')
  }

  return context
}
