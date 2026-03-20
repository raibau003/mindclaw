import type { Agent } from '../../store/useStore'

interface AgentCardProps {
  agent: Agent
  onClick?: () => void
  onDragStart?: (e: React.DragEvent) => void
  draggable?: boolean
}

export default function AgentCard({ agent, onClick, onDragStart, draggable = false }: AgentCardProps) {
  const statusConfig = {
    active: {
      dot: 'bg-emerald-400',
      label: 'Active',
      pulse: true,
    },
    idle: {
      dot: 'bg-amber-400',
      label: 'Idle',
      pulse: false,
    },
    error: {
      dot: 'bg-red-400',
      label: 'Error',
      pulse: false,
    },
  }

  const status = statusConfig[agent.status]

  return (
    <div
      className={`p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${draggable ? 'cursor-move' : ''}`}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      data-agent-id={agent.id}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{agent.emoji}</div>
          <div>
            <p className="font-medium text-sm text-white">{agent.name}</p>
            <p className="text-xs text-zinc-500">{agent.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.dot} ${status.pulse ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-zinc-500">{status.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
        <span className="text-xs text-zinc-500">{agent.tasks} tasks</span>
        <span className="text-xs text-zinc-400">{agent.successRate}% success</span>
      </div>
    </div>
  )
}
