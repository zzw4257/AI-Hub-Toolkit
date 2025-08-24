import { ReactNode } from 'react'
import { useAuthStore } from '@/store/auth'
import { LoginForm } from './LoginForm'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <LoginForm />
      </div>
    )
  }

  return <>{children}</>
}