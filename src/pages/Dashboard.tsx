import { useStore } from '../store/useStore'
import { useInitializeData } from '../hooks/useInitializeData'
import AgentCard from '../components/agents/AgentCard'
import TaskCard from '../components/tasks/TaskCard'
import LogEntry from '../components/logs/LogEntry'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  useInitializeData()
  const navigate = useNavigate()
  const { agents, tasks, logs, supervisors } = useStore()

  const activeAgents = agents.filter((a) => a.status === 'active').length
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === 'done').length
  const avgSuccessRate = agents.length > 0
    ? (agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length).toFixed(1)
    : '0.0'

  const recentTasks = tasks.slice(0, 4)
  const recentLogs = logs.slice(0, 6)

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-white mb-2">
          MindClaw Mission Control
        </h1>
        <p className="text-zinc-400">Monitor and manage your AI agent workforce</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Active Agents"
          value={`${activeAgents}/${agents.length}`}
          subtext={`+${supervisors.length} supervisors`}
          color="emerald"
        />
        <StatCard
          label="Tasks"
          value={`${completedTasks}/${totalTasks}`}
          subtext="completed"
          color="blue"
        />
        <StatCard
          label="Success Rate"
          value={`${avgSuccessRate}%`}
          subtext="average across agents"
          color="purple"
        />
        <StatCard
          label="Uptime"
          value="99.9%"
          subtext="system reliability"
          color="cyan"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          icon={<BuildingIcon />}
          title="Virtual Office"
          description="View agents in 2D workspace"
          onClick={() => navigate('/agents?view=office')}
        />
        <QuickActionCard
          icon={<KanbanIcon />}
          title="Kanban Board"
          description="Manage tasks and workflows"
          onClick={() => navigate('/agents?view=kanban')}
        />
        <QuickActionCard
          icon={<ShieldIcon />}
          title="Supervision"
          description="QA & error recovery"
          onClick={() => navigate('/governance')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents Column */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Agents</h2>
              <button
                onClick={() => navigate('/agents')}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {agents.slice(0, 5).map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => navigate(`/agents?id=${agent.id}`)}
                />
              ))}
            </div>

            {/* Supervisors */}
            {supervisors.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <h3 className="text-sm font-medium text-zinc-400 mb-4">Supervisors</h3>
                <div className="space-y-3">
                  {supervisors.map((supervisor) => (
                    <AgentCard
                      key={supervisor.id}
                      agent={supervisor}
                      onClick={() => navigate(`/agents?id=${supervisor.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tasks & Logs Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Tasks */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
              <button
                onClick={() => navigate('/agents?view=kanban')}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                View Kanban
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => navigate(`/agents?view=kanban&task=${task.id}`)}
                  draggable={false}
                />
              ))}
            </div>
          </div>

          {/* Live Logs */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Live Logs</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-zinc-500">Streaming</span>
              </div>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {recentLogs.map((log) => (
                <LogEntry key={log.id} log={log} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
interface StatCardProps {
  label: string
  value: string
  subtext: string
  color: 'emerald' | 'blue' | 'purple' | 'cyan'
}

function StatCard({ label, value, subtext, color }: StatCardProps) {
  const colorClasses = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
  }

  return (
    <div className="glass-card rounded-xl p-6 hover-lift">
      <p className="text-sm text-zinc-400 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colorClasses[color]} mb-1`}>{value}</p>
      <p className="text-xs text-zinc-500">{subtext}</p>
    </div>
  )
}

// Quick Action Card Component
interface QuickActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

function QuickActionCard({ icon, title, description, onClick }: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="glass-card rounded-xl p-5 text-left hover-lift group w-full"
    >
      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center mb-4 group-hover:bg-white/[0.08] transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </button>
  )
}

// Icon Components
function BuildingIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )
}

function KanbanIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}
