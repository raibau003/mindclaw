import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/agents', label: 'Agents', icon: '🤖' },
    { path: '/marketplace', label: 'Marketplace', icon: '🏪' },
    { path: '/integrations', label: 'Integrations', icon: '🔌' },
    { path: '/governance', label: 'Governance', icon: '⚖️' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d1321] border-r border-gray-800">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            MindClaw
          </h1>
          <p className="text-sm text-gray-400 mt-1">Mission Control</p>
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
