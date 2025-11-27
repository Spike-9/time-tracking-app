import { ReactNode } from 'react'
import { Navigation } from './Navigation'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Desktop: offset for sidebar */}
      <div className="md:pl-64">
        {/* Mobile: padding for bottom nav */}
        <main className="pb-20 md:pb-0">{children}</main>
      </div>
    </div>
  )
}
