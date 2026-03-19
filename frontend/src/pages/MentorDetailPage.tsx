import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMentorById, fetchSubjectsByMentorId } from '../services/api'
import type { Mentor } from '../types/mentor'
import type { Subject } from '../types/subject'

const infoCardClass = 'rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200'
const subjectCardClass =
  'rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md'

export default function MentorDetailPage() {
  const { id } = useParams()

  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMentorDetails = async () => {
      if (!id) return

      try {
        const mentorData = await fetchMentorById(id)
        const subjectData = await fetchSubjectsByMentorId(id)

        setMentor(mentorData)
        setSubjects(subjectData)
      } catch {
        setError('Failed to load mentor details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadMentorDetails()
  }, [id])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-56 rounded bg-slate-200" />
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-200" />
            </div>
            <div className="h-28 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    )
  }

  if (!mentor) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Mentor not found</h2>
        <p className="mt-2 text-slate-600">
          The mentor profile you are looking for could not be found.
        </p>
        <Link
          to="/mentors"
          className="mt-5 inline-flex rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Back to Mentors
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <Link
        to="/mentors"
        className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
      >
        ← Back to Mentors
      </Link>

      <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-blue-100 text-3xl font-bold text-blue-700 shadow-sm">
                {mentor.firstName?.charAt(0)}
                {mentor.lastName?.charAt(0)}
              </div>

              <div className="space-y-3">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    {mentor.firstName} {mentor.lastName}
                  </h1>
                  <p className="mt-2 text-lg font-semibold text-blue-600">
                    {mentor.title || 'Mentor'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                    {mentor.profession || 'Professional Mentor'}
                  </span>
                  {mentor.company && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
                      {mentor.company}
                    </span>
                  )}
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-blue-200">
                    {mentor.experienceYears} years experience
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ring-1 ${
                      mentor.isCertified
                        ? 'bg-emerald-100 text-emerald-700 ring-emerald-200'
                        : 'bg-slate-100 text-slate-700 ring-slate-200'
                    }`}
                  >
                    {mentor.isCertified ? 'Certified' : 'Not Certified'}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">About</h2>
              <p className="mt-3 leading-7 text-slate-600">
                {mentor.bio || 'No mentor bio available yet.'}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className={infoCardClass}>
              <p className="text-sm font-medium text-slate-500">Profession</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {mentor.profession || 'Not specified'}
              </p>
            </div>

            <div className={infoCardClass}>
              <p className="text-sm font-medium text-slate-500">Company</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {mentor.company || 'Not specified'}
              </p>
            </div>

            <div className={infoCardClass}>
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="mt-2 break-words text-base font-semibold text-slate-900">
                {mentor.email || 'Not specified'}
              </p>
            </div>

            <div className={infoCardClass}>
              <p className="text-sm font-medium text-slate-500">Phone</p>
              <p className="mt-2 text-base font-semibold text-slate-900">
                {mentor.phoneNumber || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Subjects taught by this mentor
          </h2>
          <p className="text-slate-600">
            Select a subject to continue your booking journey with the right mentor.
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-600">No subjects available for this mentor.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {subjects.map((subject) => (
              <div key={subject.id} className={subjectCardClass}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">{subject.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {subject.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Subject
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800">
                        Ready for one-to-one mentoring
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                      Available
                    </span>
                  </div>

                  <Link
                    to={`/book-session?mentorId=${mentor.id}&subjectId=${subject.id}`}
                    className="inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book this subject
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}