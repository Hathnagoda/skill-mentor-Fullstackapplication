import { Link } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

const featureCardClass =
  'rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-10 px-8 py-12 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-16">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Online Mentoring Platform
            </span>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn faster with expert mentors and structured one-to-one guidance.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              SkillMentor helps students discover experienced mentors, explore
              real-world subjects, book sessions with confidence, and manage
              their full learning journey in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/mentors"
                className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Explore Mentors
              </Link>

              <SignedIn>
                <Link
                  to="/my-sessions"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  View My Sessions
                </Link>
              </SignedIn>

              <SignedOut>
                <Link
                  to="/sign-up"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Create Account
                </Link>
              </SignedOut>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-2xl font-bold text-slate-900">1:1</p>
                <p className="mt-1 text-sm text-slate-600">Personal mentoring sessions</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-2xl font-bold text-slate-900">Flexible</p>
                <p className="mt-1 text-sm text-slate-600">Choose time, mentor, and subject</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-2xl font-bold text-slate-900">Track</p>
                <p className="mt-1 text-sm text-slate-600">Manage sessions and progress easily</p>
              </div>
            </div>
          </div>

          <div className="flex items-stretch">
            <div className="grid w-full gap-4 rounded-[2rem] bg-slate-50 p-5 ring-1 ring-slate-200">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-blue-600">Featured Benefit</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  Find the right mentor for your goals
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Compare mentors by expertise, industry experience, and subjects
                  taught before booking your next session.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-3xl bg-blue-600 p-5 text-white shadow-sm">
                  <p className="text-sm font-semibold text-blue-100">For Students</p>
                  <p className="mt-2 text-lg font-semibold">
                    Book sessions and stay on top of your learning plan.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
                  <p className="text-sm font-semibold text-slate-300">For Admins</p>
                  <p className="mt-2 text-lg font-semibold">
                    Manage mentors, bookings, and session workflows professionally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className={featureCardClass}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
            M
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Browse Mentors</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Discover mentors by expertise, profession, teaching style, and practical
            experience across multiple subjects.
          </p>
        </div>

        <div className={featureCardClass}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-700">
            B
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Book Sessions</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Schedule one-to-one learning sessions with clear timing, duration,
            subject selection, and session status updates.
          </p>
        </div>

        <div className={featureCardClass}>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-xl font-bold text-amber-700">
            T
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Track Progress</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            View your sessions, payment states, confirmations, meeting links,
            and learning activity from a single dashboard.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-10 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Start Learning Today
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Build confidence with guided mentoring sessions.
            </h2>
            <p className="mt-3 text-slate-300">
              Whether you want help with coding, problem solving, or subject mastery,
              SkillMentor gives you a structured path with expert support.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/mentors"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Find a Mentor
            </Link>

            <SignedIn>
              <Link
                to="/dashboard"
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Go to Dashboard
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in"
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  )
}