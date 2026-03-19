import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import { createSession } from '../services/api'

export default function BookSessionPage() {
  const [searchParams] = useSearchParams()
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()

  const mentorId = searchParams.get('mentorId')
  const subjectId = searchParams.get('subjectId')

  const [sessionDateTime, setSessionDateTime] = useState('')
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [paymentSlipUrl, setPaymentSlipUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isLoaded) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-48 rounded bg-slate-200" />
          <div className="h-4 w-64 rounded bg-slate-200" />
          <div className="h-16 rounded-2xl bg-slate-200" />
        </div>
      </div>
    )
  }

  const studentName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    'Student'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    if (!mentorId || !subjectId) {
      setErrorMessage('Missing mentor or subject information')
      return
    }

    if (!paymentSlipUrl.trim()) {
      setErrorMessage('Payment slip URL is required')
      return
    }

    try {
      setLoading(true)

      const token = await getToken()

      if (!token) {
        throw new Error('Authentication token not found')
      }

      const payload = {
        studentName,
        sessionDateTime,
        durationMinutes,
        mentorId: Number(mentorId),
        subjectId: Number(subjectId),
        paymentSlipUrl,
      }

      await createSession(token, payload)

      setSuccessMessage('Session booked successfully!')
      setSessionDateTime('')
      setDurationMinutes(60)
      setPaymentSlipUrl('')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 px-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Session Booking
            </span>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Book a Session
              </h1>
              <p className="mt-2 text-lg leading-8 text-slate-600">
                Complete the form below to request your mentoring session and upload
                your bank slip proof as a URL.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/mentors"
                className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Back to Mentors
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Mentor ID</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{mentorId || '-'}</p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Subject ID</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{subjectId || '-'}</p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">Booking as</p>
              <p className="mt-2 text-lg font-semibold">{studentName}</p>
            </div>
          </div>
        </div>
      </section>

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

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Session Date & Time
            </label>
            <input
              type="datetime-local"
              value={sessionDateTime}
              onChange={(e) => setSessionDateTime(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              min={15}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-800">
              Payment Slip URL
            </label>
            <input
              type="url"
              value={paymentSlipUrl}
              onChange={(e) => setPaymentSlipUrl(e.target.value)}
              placeholder="Paste your bank slip image or file URL"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Before you submit</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>• Make sure the selected date and time are correct.</li>
            <li>• Paste a valid payment slip URL for admin review.</li>
            <li>• You can track booking and payment status later from My Sessions.</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Session'}
          </button>

          <Link
            to="/my-sessions"
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            View My Sessions
          </Link>
        </div>
      </form>
    </div>
  )
}