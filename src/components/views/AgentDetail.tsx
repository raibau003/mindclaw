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
      <div className="glass-card border border-white/10 rounded-lg p-8 text-center">
        <div className="text-slate-300 text-sm">Agent not found</div>
        <button
          onClick={onClose}
          className="btn-primary mt-4"
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
      <div className="glass-card border border-white/10 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{agent.emoji}</div>
            <div>
              <h2 className="text-xl font-semibold text-white glow-text mb-1">{agent.name}</h2>
              <div className="text-sm text-slate-300 mb-2">{agent.type}</div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === 'active'
                      ? 'bg-emerald-500'
                      : agent.status === 'idle'
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-xs text-slate-300 capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white transition-colors duration-150 text-sm"
          >
            Close
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass rounded-md p-4 border border-white/10">
            <div className="text-xs text-slate-300 mb-1">Tasks Completed</div>
            <div className="text-xl font-semibold text-white">{agent.tasks.toLocaleString()}</div>
          </div>
          <div className="glass rounded-md p-4 border border-white/10">
            <div className="text-xs text-slate-300 mb-1">Success Rate</div>
            <div className="text-xl font-semibold text-white">{agent.successRate}%</div>
          </div>
          <div className="glass rounded-md p-4 border border-white/10">
            <div className="text-xs text-slate-300 mb-1">Active Tasks</div>
            <div className="text-xl font-semibold text-white">{agentTasks.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Model Configuration */}
          <div className="glass-card border border-white/10 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white glow-text mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-300 mb-1">Model</div>
                <div className="text-xs font-mono glass px-3 py-2 rounded-md text-white border border-white/10">
                  {agent.model}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-300 mb-1">Temperature</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 glass rounded-full h-1.5 border border-white/10">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full"
                      style={{ width: `${(agent.temperature / 1) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-white w-8">{agent.temperature}</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-300 mb-1">Max Tokens</div>
                <div className="text-xs font-mono glass px-3 py-2 rounded-md text-white border border-white/10">
                  {agent.maxTokens.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="glass-card border border-white/10 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white glow-text mb-4">Skills Enabled</h3>
            <div className="space-y-2">
              {agent.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 glass rounded-md border border-white/10"
                >
                  <span className="text-xs text-white">{skill.name}</span>
                  <span className="text-xs text-slate-300">{skill.version}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Tasks */}
          {!isSupervisor && agentTasks.length > 0 && (
            <div className="glass-card border border-white/10 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-white glow-text mb-4">Current Tasks</h3>
              <div className="space-y-2">
                {agentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 glass rounded-md border border-white/10"
                  >
                    <div className="text-xs font-medium text-white mb-1">{task.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300 capitalize">{task.status}</span>
                      {task.duration && (
                        <span className="text-xs text-slate-300">{task.duration}</span>
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
          <div className="glass-card border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white glow-text">Execution Logs</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-xs text-slate-300">Live</span>
              </div>
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto">
              {agentLogs.length === 0 ? (
                <div className="text-center py-8 text-slate-300 text-xs">
                  No logs yet
                </div>
              ) : (
                agentLogs.map((log) => <LogEntry key={log.id} log={log} />)
              )}
            </div>
          </div>

          {/* Supervision Timeline */}
          {!isSupervisor && (
            <div className="glass-card border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-white glow-text">Supervision Timeline</h3>
                <span className="text-xs px-2 py-0.5 glass text-slate-300 rounded border border-white/10">
                  {agentSupervision.length} events
                </span>
              </div>

              <SupervisionTimeline events={agentSupervision} />
            </div>
          )}

          {/* Performance Metrics */}
          <div className="glass-card border border-white/10 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-white glow-text mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-md p-4 border border-white/10">
                <div className="text-xs text-slate-300 mb-2">Avg Execution Time</div>
                <div className="text-lg font-semibold text-white">1.2s</div>
                <div className="text-xs text-emerald-400 mt-1">15% faster</div>
              </div>

              <div className="glass rounded-md p-4 border border-white/10">
                <div className="text-xs text-slate-300 mb-2">Error Rate</div>
                <div className="text-lg font-semibold text-white">
                  {(100 - agent.successRate).toFixed(1)}%
                </div>
                <div className="text-xs text-emerald-400 mt-1">2% lower</div>
              </div>

              <div className="glass rounded-md p-4 border border-white/10">
                <div className="text-xs text-slate-300 mb-2">Tasks Today</div>
                <div className="text-lg font-semibold text-white">342</div>
                <div className="text-xs text-emerald-400 mt-1">12% more</div>
              </div>

              <div className="glass rounded-md p-4 border border-white/10">
                <div className="text-xs text-slate-300 mb-2">Uptime</div>
                <div className="text-lg font-semibold text-white">99.8%</div>
                <div className="text-xs text-slate-300 mt-1">Last 30 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
