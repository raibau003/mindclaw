import type { Agent } from '../../store/useStore'

interface AgentCardProps {
  agent: Agent
  onClick?: () => void
  onDragStart?: (e: React.DragEvent) => void
  draggable?: boolean
}

export default function AgentCard({ agent, onClick, onDragStart, draggable = false }: AgentCardProps) {
  const statusColors = {
    active: 'bg-green-400',
    idle: 'bg-yellow-400',
    error: 'bg-red-400',
  }

  const statusLabels = {
    active: 'Active',
    idle: 'Idle',
    error: 'Error',
  }

  return (
    <div
      className={`p-4 bg-[#0d1321] rounded-lg border border-gray-800 hover:border-gray-700 transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${draggable ? 'cursor-move' : ''}`}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      data-agent-id={agent.id}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{agent.emoji}</div>
          <div>
            <div className="font-semibold text-sm">{agent.name}</div>
            <div className="text-xs text-gray-400">{agent.type}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[agent.status]} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-gray-400">{statusLabels[agent.status]}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
        <div>{agent.tasks} tasks</div>
        <div>{agent.successRate}% success</div>
      </div>
    </div>
  )
}
