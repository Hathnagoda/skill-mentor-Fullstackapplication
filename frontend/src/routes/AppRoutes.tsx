import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import MainLayout from '../layouts/MainLayout'

import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import MentorsPage from '../pages/MentorsPage'
import MentorDetailPage from '../pages/MentorDetailPage'
import BookSessionPage from '../pages/BookSessionPage'
import MySessionsPage from '../pages/MySessionsPage'
import AdminSessionsPage from '../pages/AdminSessionsPage'
import CreateSubjectPage from '../pages/CreateSubjectPage'
import CreateMentorPage from '../pages/CreateMentorPage'

import ProtectedRoute from '../components/ProtectedRoute'
import AdminRoute from '../components/AdminRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/mentors/:id" element={<MentorDetailPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-session"
          element={
            <ProtectedRoute>
              <BookSessionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-sessions"
          element={
            <ProtectedRoute>
              <MySessionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sessions"
          element={
            <AdminRoute>
              <AdminSessionsPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-subject"
          element={
            <AdminRoute>
              <CreateSubjectPage />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-mentor"
          element={
            <AdminRoute>
              <CreateMentorPage />
            </AdminRoute>
          }
        />
      </Route>

      <Route
        path="/sign-in/*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full flex justify-center',
                  card: 'shadow-xl rounded-2xl border border-slate-200',
                  headerTitle: 'text-slate-900',
                  headerSubtitle: 'text-slate-600',
                  socialButtonsBlockButton:
                    'border border-slate-300 hover:bg-slate-50 rounded-xl',
                  formButtonPrimary:
                    'bg-blue-600 hover:bg-blue-700 text-white rounded-xl',
                  footerActionLink: 'text-blue-600 hover:text-blue-700',
                  formFieldInput:
                    'rounded-xl border border-slate-300 focus:border-blue-500',
                },
              }}
            />
          </div>
        }
      />

      <Route
        path="/sign-up/*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <SignUp
              appearance={{
                elements: {
                  rootBox: 'w-full flex justify-center',
                  card: 'shadow-xl rounded-2xl border border-slate-200',
                  headerTitle: 'text-slate-900',
                  headerSubtitle: 'text-slate-600',
                  socialButtonsBlockButton:
                    'border border-slate-300 hover:bg-slate-50 rounded-xl',
                  formButtonPrimary:
                    'bg-blue-600 hover:bg-blue-700 text-white rounded-xl',
                  footerActionLink: 'text-blue-600 hover:text-blue-700',
                  formFieldInput:
                    'rounded-xl border border-slate-300 focus:border-blue-500',
                },
              }}
            />
          </div>
        }
      />
    </Routes>
  )
}