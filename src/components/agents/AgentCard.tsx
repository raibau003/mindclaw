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
      dot: 'bg-emerald-500',
      label: 'Active',
    },
    idle: {
      dot: 'bg-amber-500',
      label: 'Idle',
    },
    error: {
      dot: 'bg-red-500',
      label: 'Error',
    },
  }

  const status = statusConfig[agent.status]

  return (
    <div
      className={`p-4 rounded-md bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors duration-150 ${
        onClick ? 'cursor-pointer' : ''
      } ${draggable ? 'cursor-move' : ''}`}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      data-agent-id={agent.id}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl">{agent.emoji}</div>
          <div>
            <p className="text-sm font-medium text-[#fafafa]">{agent.name}</p>
            <p className="text-xs text-[#666666]">{agent.type}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          <span className="text-xs text-[#666666]">{status.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a1a1a]">
        <span className="text-xs text-[#666666]">{agent.tasks} tasks</span>
        <span className="text-xs text-[#888888]">{agent.successRate}%</span>
      </div>
    </div>
  )
}
