import { Link, useLocation } from 'react-router-dom'

export function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/tasks', label: '任务', icon: '📋' },
    { path: '/stats', label: '统计', icon: '📊' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:bg-gray-50 md:border-r md:border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <h1 className="text-2xl font-bold text-primary">⏱️ 时间追踪</h1>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors min-h-[44px] ${
                isActive(item.path) ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
