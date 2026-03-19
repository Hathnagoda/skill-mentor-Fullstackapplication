import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { fetchSessionsByStudentName } from '../services/api'
import type { Session } from '../types/session'

const badgeClass = (value: string) => {
  if (value === 'CONFIRMED') return 'bg-blue-100 text-blue-700 ring-blue-200'
  if (value === 'COMPLETED') return 'bg-green-100 text-green-700 ring-green-200'
  if (value === 'PENDING') return 'bg-yellow-100 text-yellow-700 ring-yellow-200'
  if (value === 'CANCELLED') return 'bg-red-100 text-red-700 ring-red-200'
  if (value === 'REJECTED') return 'bg-rose-100 text-rose-700 ring-rose-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}

export default function MySessionsPage() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()

  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadSessions = async () => {
      if (!isLoaded || !user) return

      try {
        setLoading(true)
        setErrorMessage('')

        const token = await getToken()
        if (!token) {
          throw new Error('Authentication token not found')
        }

        const fullName =
          `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ||
          user.fullName ||
          ''

        const data = await fetchSessionsByStudentName(token, fullName)
        setSessions(data)
      } catch (error) {
        if (error instanceof Error) setErrorMessage(error.message)
        else setErrorMessage('Failed to load sessions')
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [isLoaded, user, getToken])

  if (!isLoaded) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-5 w-72 rounded bg-slate-200" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Student Sessions
            </span>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                My Sessions
              </h1>
              <p className="mt-2 text-lg leading-8 text-slate-600">
                Logged in as{' '}
                <span className="font-semibold text-slate-900">
                  {user?.fullName || 'Student'}
                </span>
                . Review your bookings, session status, and meeting links in one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/mentors"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Book Another Session
              </Link>

              <Link
                to="/dashboard"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Status Overview</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{sessions.length}</p>
              <p className="mt-1 text-sm text-slate-600">
                Total sessions currently visible in your dashboard.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">Quick Tip</p>
              <p className="mt-2 text-lg font-semibold">
                Check confirmed sessions for meeting links before joining.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-7 w-48 rounded bg-slate-200" />
                <div className="h-4 w-40 rounded bg-slate-200" />
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

      {errorMessage && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-red-700">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && sessions.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
            S
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">No sessions found</h2>
          <p className="mt-2 text-slate-600">
            Your booked sessions will appear here once you complete a booking.
          </p>
          <Link
            to="/mentors"
            className="mt-6 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Mentors
          </Link>
        </div>
      )}

      {!loading && !errorMessage && sessions.length > 0 && (
        <div className="grid gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {session.subjectName}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
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

                  {/* {session.sessionStatus === 'COMPLETED' && (
                    <div>
                      <button className="rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                        Write Review
                      </button>
                    </div>
                  )} */}
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}