import type { Task } from '../../store/useStore'

interface TaskCardProps {
  task: Task
  onClick?: () => void
  onDragStart?: (e: React.DragEvent) => void
  draggable?: boolean
}

export default function TaskCard({ task, onClick, onDragStart, draggable = true }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-blue-500/20 text-blue-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-red-500/20 text-red-400',
  }

  return (
    <div
      className="p-4 bg-[#0a0f1e] rounded-lg border border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
      style={{ borderLeftColor: task.color, borderLeftWidth: '3px' }}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      data-task-id={task.id}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="font-semibold text-sm">{task.title}</div>
        <div className={`text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-3">{task.description}</div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs px-2 py-1 bg-gray-800 rounded">{task.agentName}</div>
        </div>
        {task.duration && (
          <div className="text-xs text-gray-400">⏱️ {task.duration}</div>
        )}
      </div>

      {task.resources.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.resources.map((resource, i) => (
            <span key={i} className="text-xs px-2 py-0.5 bg-gray-800/50 text-gray-400 rounded">
              {resource}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
