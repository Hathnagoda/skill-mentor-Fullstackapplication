import { Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import type { ReactNode } from 'react'

type AdminRouteProps = {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <p className="p-6 text-slate-600">Loading...</p>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  const role = String(user?.publicMetadata?.role || '').toLowerCase()

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}