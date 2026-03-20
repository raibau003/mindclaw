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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          MindClaw Mission Control
        </h1>
        <p className="text-gray-400">Monitor and manage your AI agent workforce</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Active Agents</div>
          <div className="text-4xl font-bold text-green-400">{activeAgents}/{agents.length}</div>
          <div className="text-xs text-gray-500 mt-1">
            +{supervisors.length} supervisors
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Tasks</div>
          <div className="text-4xl font-bold text-blue-400">{completedTasks}/{totalTasks}</div>
          <div className="text-xs text-gray-500 mt-1">completed</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Success Rate</div>
          <div className="text-4xl font-bold text-purple-400">{avgSuccessRate}%</div>
          <div className="text-xs text-gray-500 mt-1">average across agents</div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Uptime</div>
          <div className="text-4xl font-bold text-cyan-400">99.9%</div>
          <div className="text-xs text-gray-500 mt-1">system reliability</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/agents?view=office')}
          className="p-4 bg-[#0d1321] border border-gray-800 hover:border-blue-500/50 rounded-xl transition-all text-left group"
        >
          <div className="text-2xl mb-2">🏢</div>
          <div className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">Virtual Office</div>
          <div className="text-xs text-gray-400">View agents in 2D workspace</div>
        </button>

        <button
          onClick={() => navigate('/agents?view=kanban')}
          className="p-4 bg-[#0d1321] border border-gray-800 hover:border-purple-500/50 rounded-xl transition-all text-left group"
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">Kanban Board</div>
          <div className="text-xs text-gray-400">Manage tasks and workflows</div>
        </button>

        <button
          onClick={() => navigate('/governance')}
          className="p-4 bg-[#0d1321] border border-gray-800 hover:border-green-500/50 rounded-xl transition-all text-left group"
        >
          <div className="text-2xl mb-2">🔍</div>
          <div className="font-semibold mb-1 group-hover:text-green-400 transition-colors">Supervision</div>
          <div className="text-xs text-gray-400">QA & error recovery</div>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents Column */}
        <div className="lg:col-span-1">
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Agents</h2>
              <button
                onClick={() => navigate('/agents')}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View All →
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
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Supervisors</h3>
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
          </div>
        </div>

        {/* Tasks & Logs Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Tasks */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Tasks</h2>
              <button
                onClick={() => navigate('/agents?view=kanban')}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Kanban →
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
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Live Logs</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Streaming</span>
              </div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
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
