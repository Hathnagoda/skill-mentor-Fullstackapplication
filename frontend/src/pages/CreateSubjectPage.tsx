// src/pages/CreateSubjectPage.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { fetchMentors, createSubject } from '../services/api'

type Mentor = {
  id: number
  firstName: string
  lastName: string
}

export default function CreateSubjectPage() {
  const { getToken } = useAuth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [mentorId, setMentorId] = useState('')
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadMentors = async () => {
      try {
        setPageLoading(true)
        const data = await fetchMentors()
        setMentors(data)
      } catch {
        setErrorMessage('Failed to load mentors')
      } finally {
        setPageLoading(false)
      }
    }

    loadMentors()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Subject name is required')
      return
    }

    if (!mentorId) {
      setErrorMessage('Please select a mentor')
      return
    }

    try {
      setLoading(true)

      const token = await getToken()
      if (!token) {
        throw new Error('Authentication token not found')
      }

      await createSubject(token, {
        name,
        description,
        mentorId: Number(mentorId),
      })

      setSuccessMessage('Subject created successfully')
      setName('')
      setDescription('')
      setMentorId('')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Failed to create subject')
      }
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="h-5 w-72 rounded bg-slate-200" />
            <div className="h-14 rounded-2xl bg-slate-200" />
            <div className="h-28 rounded-2xl bg-slate-200" />
            <div className="h-14 rounded-2xl bg-slate-200" />
            <div className="h-12 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-6 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Admin Subject Management
            </span>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Create Subject
              </h1>
              <p className="mt-2 text-lg leading-8 text-slate-600">
                Add a new subject and assign it to a mentor so students can discover
                and book it from the platform.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Available mentors</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{mentors.length}</p>
              <p className="mt-1 text-sm text-slate-600">
                Select one mentor for the subject you create.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">Quick note</p>
              <p className="mt-2 text-lg font-semibold">
                Subjects should be clear, descriptive, and relevant to mentor expertise.
              </p>
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
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Subject Name
          </label>
          <input
            type="text"
            placeholder="Enter subject name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Description
          </label>
          <textarea
            placeholder="Enter subject description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800">
            Assign Mentor
          </label>
          <select
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
            required
          >
            <option value="">Select a mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.firstName} {mentor.lastName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Subject'}
        </button>
      </form>
    </div>
  )
}