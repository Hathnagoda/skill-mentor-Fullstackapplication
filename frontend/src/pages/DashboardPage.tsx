import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const quickCardClass =
  'rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="h-10 w-56 rounded bg-slate-200" />
          <div className="h-5 w-80 rounded bg-slate-200" />
        </div>
      </div>
    )
  }

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    'User'

  const role = String(user?.publicMetadata?.role || '').toLowerCase()

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-8 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-12">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Welcome back
            </span>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Your learning dashboard
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Hello, <span className="font-semibold text-slate-900">{displayName}</span>.
                Manage sessions, discover mentors, and track your learning progress
                from one clean workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/mentors"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Mentors
              </Link>

              <Link
                to="/my-sessions"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                View My Sessions
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Access</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {role === 'admin' ? 'Admin' : 'Student'}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Signed in and ready to continue.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Focus</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">Sessions</p>
              <p className="mt-1 text-sm text-slate-600">
                Keep track of upcoming and completed mentoring sessions.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm font-medium text-slate-300">Next step</p>
              <p className="mt-2 text-2xl font-bold">
                {role === 'admin' ? 'Manage platform' : 'Book your next session'}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {role === 'admin'
                  ? 'Review bookings, payments, and meeting links.'
                  : 'Explore mentors and continue your learning journey.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Link to="/mentors" className={quickCardClass}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
            M
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Explore Mentors</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Browse mentor profiles, compare expertise, and find the right guide
            for your learning goals.
          </p>
          <p className="mt-5 text-sm font-semibold text-blue-600">Go to mentors →</p>
        </Link>

        <Link to="/my-sessions" className={quickCardClass}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-700">
            S
          </div>
          <h2 className="text-xl font-semibold text-slate-900">My Sessions</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Check your booked sessions, monitor status updates, and access meeting
            links in one place.
          </p>
          <p className="mt-5 text-sm font-semibold text-blue-600">View sessions →</p>
        </Link>

        {role === 'admin' && (
          <Link to="/admin/sessions" className={quickCardClass}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-xl font-bold text-amber-700">
              A
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Admin Panel</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Review all sessions, manage payments, update meeting links, and
              complete platform workflows.
            </p>
            <p className="mt-5 text-sm font-semibold text-blue-600">Open admin tools →</p>
          </Link>
        )}
      </section>
    </div>
  )
}