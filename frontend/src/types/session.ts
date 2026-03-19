export type Session = {
  id: number
  studentName: string
  sessionDateTime: string
  durationMinutes: number
  meetingLink: string | null
  paymentSlipUrl: string | null
  sessionStatus: string
  paymentStatus: string
  mentorId: number
  mentorName: string
  subjectId: number
  subjectName: string
}