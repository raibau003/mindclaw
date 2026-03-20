import type { Task } from '../../store/useStore'

interface TaskCardProps {
  task: Task
  onClick?: () => void
  onDragStart?: (e: React.DragEvent) => void
  draggable?: boolean
}

export default function TaskCard({ task, onClick, onDragStart, draggable = true }: TaskCardProps) {
  const priorityConfig = {
    low: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
    },
    medium: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    high: {
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/20',
    },
  }

  const priority = priorityConfig[task.priority]

  return (
    <div
      className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-200 cursor-pointer"
      style={{ borderLeftColor: task.color, borderLeftWidth: '2px' }}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      data-task-id={task.id}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="font-medium text-sm text-white leading-tight">{task.title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded ${priority.bg} ${priority.text} border ${priority.border} whitespace-nowrap`}>
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-zinc-500 mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded bg-white/[0.05] text-zinc-400">
          {task.agentName}
        </span>
        {task.duration && (
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <ClockIcon />
            {task.duration}
          </span>
        )}
      </div>

      {task.resources.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
          {task.resources.map((resource, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/[0.03] text-zinc-500">
              {resource}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function ClockIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
