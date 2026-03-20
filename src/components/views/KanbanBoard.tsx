import { useState } from 'react'
import { useStore } from '../../store/useStore'
import TaskCard from '../tasks/TaskCard'
import type { Task } from '../../store/useStore'

const columns = [
  { id: 'inbox', title: 'Inbox', color: 'from-gray-400 to-gray-600', textColor: 'text-gray-300' },
  { id: 'in_progress', title: 'In Progress', color: 'from-blue-400 to-blue-600', textColor: 'text-blue-300' },
  { id: 'review', title: 'Review', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-300' },
  { id: 'done', title: 'Done', color: 'from-emerald-400 to-emerald-600', textColor: 'text-emerald-300' },
] as const

export default function KanbanBoard() {
  const { tasks, updateTaskStatus, selectTask, selectedTaskId } = useStore()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const safeTasks = tasks || []

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault()
    if (draggedTask) {
      updateTaskStatus(draggedTask, status)
      setDraggedTask(null)
    }
  }

  const handleTaskClick = (taskId: string) => {
    selectTask(taskId)
  }

  const selectedTask = safeTasks.find((t) => t.id === selectedTaskId)

  return (
    <div className="flex gap-6">
      {/* Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTasks = safeTasks.filter((t) => t.status === column.id)

          return (
            <div
              key={column.id}
              className="glass-card border border-white/10 rounded-lg p-4 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            >
              {/* Column Header */}
              <div className="mb-4 pb-4 border-b border-white/10">
                <div className={`inline-block px-3 py-1.5 rounded-full bg-gradient-to-r ${column.color} mb-2`}>
                  <div className="text-sm font-semibold text-white glow-text">
                    {column.title}
                  </div>
                </div>
                <div className={`text-xs ${column.textColor} font-medium`}>
                  {columnTasks.length} {columnTasks.length === 1 ? 'task' : 'tasks'}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div key={task.id} className={selectedTaskId === task.id ? 'ring-2 ring-white/30 rounded-md' : ''}>
                    <TaskCard
                      task={task}
                      onClick={() => handleTaskClick(task.id)}
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      draggable
                    />
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-white/40 text-xs border border-dashed border-white/10 rounded-md bg-white/5">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <div className="w-80 glass-card border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-white glow-text">Task Details</h3>
            <button
              onClick={() => selectTask(null)}
              className="text-white/60 hover:text-white transition-colors duration-150 text-sm"
            >
              Close
            </button>
          </div>

          {/* Task Header */}
          <div className="mb-6">
            <div className="text-sm font-medium text-white mb-2">{selectedTask.title}</div>
            <div className="text-xs text-white/60">{selectedTask.description}</div>
          </div>

          {/* Task Meta */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-white/60 mb-1">Assigned To</div>
              <div className="px-3 py-2 glass rounded-md text-xs text-white">
                {selectedTask.agentName}
              </div>
            </div>

            <div>
              <div className="text-xs text-white/60 mb-1">Priority</div>
              <div
                className={`px-3 py-2 rounded-md text-xs capitalize font-medium ${
                  selectedTask.priority === 'high'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : selectedTask.priority === 'medium'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {selectedTask.priority}
              </div>
            </div>

            <div>
              <div className="text-xs text-white/60 mb-1">Status</div>
              <select
                value={selectedTask.status}
                onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value as Task['status'])}
                className="w-full px-3 py-2 glass rounded-md text-xs text-white border border-white/10 focus:border-white/30 outline-none"
              >
                <option value="inbox">Inbox</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {selectedTask.duration && (
              <div>
                <div className="text-xs text-white/60 mb-1">Duration</div>
                <div className="px-3 py-2 glass rounded-md text-xs text-white/80">
                  {selectedTask.duration}
                </div>
              </div>
            )}

            {selectedTask.resources.length > 0 && (
              <div>
                <div className="text-xs text-white/60 mb-2">Resources</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTask.resources.map((resource, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 glass text-white/70 rounded text-xs border border-white/10"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-white/60 mb-1">Created</div>
              <div className="text-xs text-white/70">
                {new Date(selectedTask.createdAt).toLocaleString()}
              </div>
            </div>

            {selectedTask.completedAt && (
              <div>
                <div className="text-xs text-white/60 mb-1">Completed</div>
                <div className="text-xs text-white/70">
                  {new Date(selectedTask.completedAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
            <button className="btn-primary w-full px-4 py-2 rounded-md text-white text-xs font-medium">
              View Agent Details
            </button>
            <button className="w-full px-4 py-2 glass border border-white/20 hover:border-white/40 text-white rounded-md text-xs font-medium transition-all duration-150">
              View Logs
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
