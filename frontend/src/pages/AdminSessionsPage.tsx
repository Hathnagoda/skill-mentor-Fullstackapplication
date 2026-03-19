import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import {
  cancelSession,
  completeSession,
  confirmPayment,
  confirmSession,
  fetchAllSessions,
  fetchSessionsByPaymentStatus,
  fetchSessionsByStatus,
  updateMeetingLink,
} from '../services/api'
import type { Session } from '../types/session'

const badgeClass = (value: string) => {
  if (value === 'CONFIRMED') return 'bg-blue-100 text-blue-700 ring-blue-200'
  if (value === 'COMPLETED') return 'bg-green-100 text-green-700 ring-green-200'
  if (value === 'PENDING') return 'bg-yellow-100 text-yellow-700 ring-yellow-200'
  if (value === 'CANCELLED') return 'bg-red-100 text-red-700 ring-red-200'
  if (value === 'REJECTED') return 'bg-rose-100 text-rose-700 ring-rose-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}

const secondaryButtonClass =
  'rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'

const primaryButtonClass =
  'rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50'

export default function AdminSessionsPage() {
  const { getToken } = useAuth()

  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('')
  const [meetingLinks, setMeetingLinks] = useState<Record<number, string>>({})

  const requireToken = async () => {
    const token = await getToken()
    if (!token) {
      throw new Error('Authentication token not found')
    }
    return token
  }

  const loadAllSessions = async () => {
    try {
      setLoading(true)
      setErrorMessage('')
      const token = await requireToken()
      const data = await fetchAllSessions(token)
      setSessions(data)
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllSessions()
  }, [])

  const handleStatusFilter = async (value: string) => {
    setStatusFilter(value)
    setPaymentStatusFilter('')
    setSuccessMessage('')

    try {
      setLoading(true)
      setErrorMessage('')
      const token = await requireToken()

      if (!value) {
        const data = await fetchAllSessions(token)
        setSessions(data)
      } else {
        const data = await fetchSessionsByStatus(token, value)
        setSessions(data)
      }
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to filter sessions by status')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentStatusFilter = async (value: string) => {
    setPaymentStatusFilter(value)
    setStatusFilter('')
    setSuccessMessage('')

    try {
      setLoading(true)
      setErrorMessage('')
      const token = await requireToken()

      if (!value) {
        const data = await fetchAllSessions(token)
        setSessions(data)
      } else {
        const data = await fetchSessionsByPaymentStatus(token, value)
        setSessions(data)
      }
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to filter sessions by payment status')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmPayment = async (sessionId: number) => {
    try {
      setErrorMessage('')
      setSuccessMessage('')
      const token = await requireToken()
      await confirmPayment(token, sessionId)
      setSuccessMessage('Payment confirmed successfully.')
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to confirm payment')
    }
  }

  const handleConfirmSession = async (sessionId: number) => {
    try {
      setErrorMessage('')
      setSuccessMessage('')
      const token = await requireToken()
      await confirmSession(token, sessionId)
      setSuccessMessage('Session confirmed successfully.')
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to confirm session')
    }
  }

  const handleCompleteSession = async (sessionId: number) => {
    try {
      setErrorMessage('')
      setSuccessMessage('')
      const token = await requireToken()
      await completeSession(token, sessionId)
      setSuccessMessage('Session marked as completed.')
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to complete session')
    }
  }

  const handleCancelSession = async (sessionId: number) => {
    try {
      setErrorMessage('')
      setSuccessMessage('')
      const token = await requireToken()
      await cancelSession(token, sessionId)
      setSuccessMessage('Session cancelled successfully.')
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to cancel session')
    }
  }

  const handleMeetingLinkChange = (sessionId: number, value: string) => {
    setMeetingLinks((prev) => ({
      ...prev,
      [sessionId]: value,
    }))
  }

  const handleUpdateMeetingLink = async (sessionId: number) => {
    const meetingLink = meetingLinks[sessionId]

    if (!meetingLink?.trim()) {
      setErrorMessage('Meeting link cannot be empty')
      return
    }

    try {
      setErrorMessage('')
      setSuccessMessage('')
      const token = await requireToken()
      await updateMeetingLink(token, sessionId, meetingLink)
      setSuccessMessage('Meeting link updated successfully.')
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to update meeting link')
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Admin Session Management
            </span>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Admin Sessions Dashboard
              </h1>
              <p className="mt-2 text-lg leading-8 text-slate-600">
                Review bookings, confirm payments, inspect bank slips, update meeting
                links, and manage the full mentoring workflow.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Visible sessions</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{sessions.length}</p>
              <p className="mt-1 text-sm text-slate-600">
                Total sessions shown based on your current filters.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">Admin focus</p>
              <p className="mt-2 text-lg font-semibold">
                Confirm payment only after reviewing the submitted bank slip.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="">Filter by Session Status</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <select
            value={paymentStatusFilter}
            onChange={(e) => handlePaymentStatusFilter(e.target.value)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500"
          >
            <option value="">Filter by Payment Status</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </section>

      {loading && (
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-7 w-48 rounded bg-slate-200" />
                <div className="h-4 w-44 rounded bg-slate-200" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-20 rounded-2xl bg-slate-200" />
                  <div className="h-20 rounded-2xl bg-slate-200" />
                </div>
                <div className="h-20 rounded-2xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {successMessage && (
        <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-green-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && sessions.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-900">No sessions found</h2>
          <p className="mt-2 text-slate-600">
            There are currently no sessions matching the selected filters.
          </p>
        </div>
      )}

      {!loading && sessions.length > 0 && (
        <div className="grid gap-6">
          {sessions.map((session) => {
            const isCancelled = session.sessionStatus === 'CANCELLED'
            const isCompleted = session.sessionStatus === 'COMPLETED'
            const paymentConfirmed = session.paymentStatus === 'CONFIRMED'
            const sessionConfirmed = session.sessionStatus === 'CONFIRMED'

            return (
              <div
                key={session.id}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-5">
                      <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                          {session.subjectName}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                          Student:{' '}
                          <span className="font-medium text-slate-900">
                            {session.studentName}
                          </span>
                        </p>
                        <p className="text-sm text-slate-600">
                          Mentor:{' '}
                          <span className="font-medium text-slate-900">
                            {session.mentorName}
                          </span>
                        </p>
                      </div>

                      <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                          <p className="font-medium text-slate-800">Date & Time</p>
                          <p className="mt-2">
                            {new Date(session.sessionDateTime).toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                          <p className="font-medium text-slate-800">Duration</p>
                          <p className="mt-2">{session.durationMinutes} minutes</p>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                        <p className="font-medium text-slate-800">Bank Slip</p>
                        <p className="mt-2">
                          {session.paymentSlipUrl ? (
                            <a
                              href={session.paymentSlipUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-blue-600 underline transition hover:text-blue-700"
                            >
                              View Payment Slip
                            </a>
                          ) : (
                            'No payment slip submitted'
                          )}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
                        <p className="font-medium text-slate-800">Meeting Link</p>
                        <p className="mt-2">
                          {session.meetingLink ? (
                            <a
                              href={session.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-blue-600 underline transition hover:text-blue-700"
                            >
                              Join Meeting
                            </a>
                          ) : (
                            'Not added yet'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 xl:flex-col xl:items-end">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeClass(
                          session.paymentStatus
                        )}`}
                      >
                        Payment: {session.paymentStatus}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeClass(
                          session.sessionStatus
                        )}`}
                      >
                        Session: {session.sessionStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleConfirmPayment(session.id)}
                      disabled={paymentConfirmed || isCancelled || isCompleted}
                      className={secondaryButtonClass}
                    >
                      Confirm Payment
                    </button>

                    <button
                      onClick={() => handleConfirmSession(session.id)}
                      disabled={!paymentConfirmed || sessionConfirmed || isCancelled || isCompleted}
                      className={secondaryButtonClass}
                    >
                      Confirm Session
                    </button>

                    <button
                      onClick={() => handleCompleteSession(session.id)}
                      disabled={!sessionConfirmed || isCancelled || isCompleted}
                      className={secondaryButtonClass}
                    >
                      Complete Session
                    </button>

                    <button
                      onClick={() => handleCancelSession(session.id)}
                      disabled={isCancelled || isCompleted}
                      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel Session
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row">
                    <input
                      type="text"
                      placeholder="Enter meeting link"
                      value={meetingLinks[session.id] || ''}
                      onChange={(e) => handleMeetingLinkChange(session.id, e.target.value)}
                      disabled={isCancelled || isCompleted}
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />

                    <button
                      onClick={() => handleUpdateMeetingLink(session.id)}
                      disabled={isCancelled || isCompleted}
                      className={`${primaryButtonClass} min-w-[180px]`}
                    >
                      Update Meeting Link
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}