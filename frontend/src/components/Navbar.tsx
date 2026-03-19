import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-blue-50 text-blue-700'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
  }`

export default function Navbar() {
  const { user } = useUser()
  const role = String(user?.publicMetadata?.role || '').toLowerCase()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              S
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                SkillMentor
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Learn with experts
              </p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-2 md:flex">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/mentors" className={navLinkClass}>
              Mentors
            </NavLink>

            <SignedIn>
              <NavLink to="/my-sessions" className={navLinkClass}>
                My Sessions
              </NavLink>

              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              {role === 'admin' && (
                <>
                  <NavLink to="/admin/sessions" className={navLinkClass}>
                    Admin
                  </NavLink>

                  <NavLink to="/admin/create-subject" className={navLinkClass}>
                    Add Subject
                  </NavLink>

                  <NavLink to="/admin/create-mentor" className={navLinkClass}>
                    Add Mentor
                  </NavLink>
                </>
              )}

              <div className="ml-2 rounded-full ring-1 ring-slate-200">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'h-10 w-10',
                    },
                  }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <NavLink to="/sign-in" className={navLinkClass}>
                Sign In
              </NavLink>

              <Link
                to="/sign-up"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </SignedOut>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 md:hidden"
          >
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mt-4 space-y-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:hidden">
            <NavLink to="/" className={navLinkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/mentors" className={navLinkClass} onClick={() => setOpen(false)}>
              Mentors
            </NavLink>

            <SignedIn>
              <NavLink to="/my-sessions" className={navLinkClass} onClick={() => setOpen(false)}>
                My Sessions
              </NavLink>

              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>

              {role === 'admin' && (
                <>
                  <NavLink
                    to="/admin/sessions"
                    className={navLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    Admin
                  </NavLink>

                  <NavLink
                    to="/admin/create-subject"
                    className={navLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    Add Subject
                  </NavLink>

                  <NavLink
                    to="/admin/create-mentor"
                    className={navLinkClass}
                    onClick={() => setOpen(false)}
                  >
                    Add Mentor
                  </NavLink>
                </>
              )}

              <div className="pt-2">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <NavLink to="/sign-in" className={navLinkClass} onClick={() => setOpen(false)}>
                Sign In
              </NavLink>

              <NavLink to="/sign-up" className={navLinkClass} onClick={() => setOpen(false)}>
                Sign Up
              </NavLink>
            </SignedOut>
          </div>
        )}
      </nav>
    </header>
  )
}