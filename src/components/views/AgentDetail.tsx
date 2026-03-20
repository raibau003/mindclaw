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
      <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-8 text-center">
        <div className="text-[#666666] text-sm">Agent not found</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] rounded-md text-xs font-medium transition-colors duration-150"
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
      <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{agent.emoji}</div>
            <div>
              <h2 className="text-xl font-semibold text-[#fafafa] mb-1">{agent.name}</h2>
              <div className="text-sm text-[#666666] mb-2">{agent.type}</div>
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
                <span className="text-xs text-[#888888] capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-[#fafafa] transition-colors duration-150 text-sm"
          >
            Close
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-[#0a0a0a] rounded-md p-4">
            <div className="text-xs text-[#666666] mb-1">Tasks Completed</div>
            <div className="text-xl font-semibold text-[#fafafa]">{agent.tasks.toLocaleString()}</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-md p-4">
            <div className="text-xs text-[#666666] mb-1">Success Rate</div>
            <div className="text-xl font-semibold text-[#fafafa]">{agent.successRate}%</div>
          </div>
          <div className="bg-[#0a0a0a] rounded-md p-4">
            <div className="text-xs text-[#666666] mb-1">Active Tasks</div>
            <div className="text-xl font-semibold text-[#fafafa]">{agentTasks.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Model Configuration */}
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
            <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Configuration</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-[#666666] mb-1">Model</div>
                <div className="text-xs font-mono bg-[#0a0a0a] px-3 py-2 rounded-md text-[#888888]">
                  {agent.model}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#666666] mb-1">Temperature</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-[#0a0a0a] rounded-full h-1.5">
                    <div
                      className="bg-[#fafafa] h-1.5 rounded-full"
                      style={{ width: `${(agent.temperature / 1) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-[#888888] w-8">{agent.temperature}</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-[#666666] mb-1">Max Tokens</div>
                <div className="text-xs font-mono bg-[#0a0a0a] px-3 py-2 rounded-md text-[#888888]">
                  {agent.maxTokens.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
            <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Skills Enabled</h3>
            <div className="space-y-2">
              {agent.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded-md"
                >
                  <span className="text-xs text-[#fafafa]">{skill.name}</span>
                  <span className="text-xs text-[#666666]">{skill.version}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Tasks */}
          {!isSupervisor && agentTasks.length > 0 && (
            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
              <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Current Tasks</h3>
              <div className="space-y-2">
                {agentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-[#0a0a0a] rounded-md"
                  >
                    <div className="text-xs font-medium text-[#fafafa] mb-1">{task.title}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#666666] capitalize">{task.status}</span>
                      {task.duration && (
                        <span className="text-xs text-[#666666]">{task.duration}</span>
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
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#fafafa]">Execution Logs</h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-xs text-[#666666]">Live</span>
              </div>
            </div>

            <div className="space-y-1 max-h-80 overflow-y-auto">
              {agentLogs.length === 0 ? (
                <div className="text-center py-8 text-[#666666] text-xs">
                  No logs yet
                </div>
              ) : (
                agentLogs.map((log) => <LogEntry key={log.id} log={log} />)
              )}
            </div>
          </div>

          {/* Supervision Timeline */}
          {!isSupervisor && (
            <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-semibold text-[#fafafa]">Supervision Timeline</h3>
                <span className="text-xs px-2 py-0.5 bg-[#1a1a1a] text-[#888888] rounded">
                  {agentSupervision.length} events
                </span>
              </div>

              <SupervisionTimeline events={agentSupervision} />
            </div>
          )}

          {/* Performance Metrics */}
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
            <h3 className="text-sm font-semibold text-[#fafafa] mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] rounded-md p-4">
                <div className="text-xs text-[#666666] mb-2">Avg Execution Time</div>
                <div className="text-lg font-semibold text-[#fafafa]">1.2s</div>
                <div className="text-xs text-emerald-500 mt-1">15% faster</div>
              </div>

              <div className="bg-[#0a0a0a] rounded-md p-4">
                <div className="text-xs text-[#666666] mb-2">Error Rate</div>
                <div className="text-lg font-semibold text-[#fafafa]">
                  {(100 - agent.successRate).toFixed(1)}%
                </div>
                <div className="text-xs text-emerald-500 mt-1">2% lower</div>
              </div>

              <div className="bg-[#0a0a0a] rounded-md p-4">
                <div className="text-xs text-[#666666] mb-2">Tasks Today</div>
                <div className="text-lg font-semibold text-[#fafafa]">342</div>
                <div className="text-xs text-emerald-500 mt-1">12% more</div>
              </div>

              <div className="bg-[#0a0a0a] rounded-md p-4">
                <div className="text-xs text-[#666666] mb-2">Uptime</div>
                <div className="text-lg font-semibold text-[#fafafa]">99.8%</div>
                <div className="text-xs text-[#666666] mt-1">Last 30 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
