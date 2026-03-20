import { useStore } from '../../store/useStore'
import LogEntry from '../logs/LogEntry'
import SupervisionTimeline from '../supervision/SupervisionTimeline'

interface AgentDetailProps {
  agentId: string
  onClose: () => void
}

export default function AgentDetail({ agentId, onClose }: AgentDetailProps) {
  const { agents, supervisors, logs, supervisionEvents, tasks } = useStore()

  const agent = [...agents, ...supervisors].find((a) => a.id === agentId)

  if (!agent) {
    return (
      <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-8 text-center">
        <div className="text-gray-400">Agent not found</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Go Back
        </button>
      </div>
    )
  }

  const agentLogs = logs.filter((l) => l.agentId === agentId).slice(0, 20)
  const agentSupervision = supervisionEvents.filter((e) => e.agentId === agentId).slice(0, 10)
  const agentTasks = tasks.filter((t) => t.agentId === agentId)

  const isSupervisor = supervisors.some((s) => s.id === agentId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{agent.emoji}</div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{agent.name}</h2>
              <div className="text-sm text-gray-400 mb-2">{agent.type}</div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    agent.status === 'active'
                      ? 'bg-green-400 animate-pulse'
                      : agent.status === 'idle'
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                  }`}
                />
                <span className="text-sm text-gray-300 capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-[#0d1321] rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Tasks Completed</div>
            <div className="text-2xl font-bold text-blue-400">{agent.tasks.toLocaleString()}</div>
          </div>
          <div className="bg-[#0d1321] rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-green-400">{agent.successRate}%</div>
          </div>
          <div className="bg-[#0d1321] rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Active Tasks</div>
            <div className="text-2xl font-bold text-purple-400">{agentTasks.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Model Configuration */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <h3 className="font-bold mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Model</div>
                <div className="text-sm font-mono bg-gray-800 px-3 py-2 rounded">
                  {agent.model}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">Temperature</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(agent.temperature / 1) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-8">{agent.temperature}</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-400 mb-1">Max Tokens</div>
                <div className="text-sm font-mono bg-gray-800 px-3 py-2 rounded">
                  {agent.maxTokens.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <h3 className="font-bold mb-4">Skills Enabled</h3>
            <div className="space-y-2">
              {agent.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 bg-gray-800 rounded"
                >
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-xs text-gray-400">{skill.version}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Tasks */}
          {!isSupervisor && agentTasks.length > 0 && (
            <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
              <h3 className="font-bold mb-4">Current Tasks</h3>
              <div className="space-y-2">
                {agentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-gray-800 rounded border-l-2"
                    style={{ borderLeftColor: task.color }}
                  >
                    <div className="text-sm font-semibold mb-1">{task.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 capitalize">{task.status}</span>
                      {task.duration && (
                        <span className="text-xs text-gray-400">⏱️ {task.duration}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Logs & Supervision */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Execution Logs */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Live Execution Logs</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Streaming</span>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {agentLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No logs yet
                </div>
              ) : (
                agentLogs.map((log) => <LogEntry key={log.id} log={log} />)
              )}
            </div>
          </div>

          {/* Supervision Timeline */}
          {!isSupervisor && (
            <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold">Supervision Timeline</h3>
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                  {agentSupervision.length} events
                </span>
              </div>

              <SupervisionTimeline events={agentSupervision} />
            </div>
          )}

          {/* Performance Metrics */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <h3 className="font-bold mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-2">Avg Execution Time</div>
                <div className="text-xl font-bold text-cyan-400">1.2s</div>
                <div className="text-xs text-green-400 mt-1">↓ 15% faster</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-2">Error Rate</div>
                <div className="text-xl font-bold text-green-400">
                  {(100 - agent.successRate).toFixed(1)}%
                </div>
                <div className="text-xs text-green-400 mt-1">↓ 2% lower</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-2">Tasks Today</div>
                <div className="text-xl font-bold text-purple-400">342</div>
                <div className="text-xs text-green-400 mt-1">↑ 12% more</div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-2">Uptime</div>
                <div className="text-xl font-bold text-blue-400">99.8%</div>
                <div className="text-xs text-gray-400 mt-1">Last 30 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
