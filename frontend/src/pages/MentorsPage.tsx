import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMentors } from '../services/api'
import type { Mentor } from '../types/mentor'

const cardClass =
  'group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md'

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const data = await fetchMentors()
        setMentors(data)
      } catch {
        setError('Failed to load mentors. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadMentors()
  }, [])

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] bg-white px-8 py-10 shadow-sm ring-1 ring-slate-200 sm:px-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            Mentor Discovery
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Find the right mentor for your next learning goal.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Explore experienced mentors, compare expertise, and choose the guide
            who best matches your subject, schedule, and career direction.
          </p>
        </div>
      </section>

      {loading && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-200" />
                  <div className="h-4 w-5/6 rounded bg-slate-200" />
                  <div className="h-4 w-4/6 rounded bg-slate-200" />
                </div>
                <div className="h-10 w-32 rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && mentors.length === 0 && (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">No mentors found</h2>
          <p className="mt-2 text-slate-600">
            There are no mentors available right now. Please check again later.
          </p>
        </div>
      )}

      {!loading && !error && mentors.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <Link key={mentor.id} to={`/mentors/${mentor.id}`} className={cardClass}>
              <div className="flex h-full flex-col">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-blue-600">
                      {mentor.firstName} {mentor.lastName}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-blue-600">
                      {mentor.title || 'Mentor'}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-700">
                    {mentor.firstName?.charAt(0)}
                    {mentor.lastName?.charAt(0)}
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-medium text-slate-800">Profession</p>
                    <p className="mt-1">{mentor.profession || 'Not specified'}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-medium text-slate-800">Company</p>
                    <p className="mt-1">{mentor.company || 'Not specified'}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="font-medium text-slate-800">Experience</p>
                    <p className="mt-1">{mentor.experienceYears} years</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    {mentor.isCertified ? 'Certified Mentor' : 'Professional Mentor'}
                  </span>

                  <span className="text-sm font-semibold text-blue-600">
                    View profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}