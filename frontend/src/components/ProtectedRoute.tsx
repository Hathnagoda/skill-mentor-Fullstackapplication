import { Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return <p className="p-6">Loading...</p>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  return <>{children}</>
}