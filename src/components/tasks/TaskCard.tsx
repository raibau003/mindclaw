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
    },
    medium: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
    },
    high: {
      bg: 'bg-red-500/10',
      text: 'text-red-400',
    },
  }

  const priority = priorityConfig[task.priority]

  return (
    <div
      className="p-4 rounded-md bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors duration-150 cursor-pointer"
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      data-task-id={task.id}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="text-sm font-medium text-[#fafafa] leading-tight">{task.title}</h4>
        <span className={`text-xs px-2 py-0.5 rounded ${priority.bg} ${priority.text} whitespace-nowrap`}>
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-[#666666] mb-4 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded bg-[#1a1a1a] text-[#888888]">
          {task.agentName}
        </span>
        {task.duration && (
          <span className="text-xs text-[#666666] flex items-center gap-1">
            <ClockIcon />
            {task.duration}
          </span>
        )}
      </div>

      {task.resources.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#1a1a1a]">
          {task.resources.map((resource, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded bg-[#141414] text-[#666666]">
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
