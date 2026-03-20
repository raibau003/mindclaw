import { useState } from 'react'
import { useStore } from '../../store/useStore'
import TaskCard from '../tasks/TaskCard'
import type { Task } from '../../store/useStore'

const columns = [
  { id: 'inbox', title: 'Inbox', color: '#6b7280' },
  { id: 'in_progress', title: 'In Progress', color: '#3b82f6' },
  { id: 'review', title: 'Review', color: '#8b5cf6' },
  { id: 'done', title: 'Done', color: '#10b981' },
] as const

export default function KanbanBoard() {
  const { tasks, updateTaskStatus, selectTask, selectedTaskId } = useStore()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

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

  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  return (
    <div className="flex gap-6">
      {/* Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id)

          return (
            <div
              key={column.id}
              className="bg-[#0d1321] border border-gray-800 rounded-xl p-4 min-h-[600px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            >
              {/* Column Header */}
              <div className="mb-4">
                <div
                  className="font-bold text-sm mb-1"
                  style={{ color: column.color }}
                >
                  {column.title}
                </div>
                <div className="text-xs text-gray-400">
                  {columnTasks.length} {columnTasks.length === 1 ? 'task' : 'tasks'}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div key={task.id} className={selectedTaskId === task.id ? 'ring-2 ring-blue-500 rounded-lg' : ''}>
                    <TaskCard
                      task={task}
                      onClick={() => handleTaskClick(task.id)}
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      draggable
                    />
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-600 text-sm border-2 border-dashed border-gray-800 rounded-lg">
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
        <div className="w-96 bg-[#0d1321] border border-gray-800 rounded-xl p-6 animate-slide-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Task Details</h3>
            <button
              onClick={() => selectTask(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Task Header */}
          <div
            className="p-4 rounded-lg mb-4 border-l-4"
            style={{
              borderLeftColor: selectedTask.color,
              backgroundColor: `${selectedTask.color}10`,
            }}
          >
            <div className="font-bold text-lg mb-2">{selectedTask.title}</div>
            <div className="text-sm text-gray-400">{selectedTask.description}</div>
          </div>

          {/* Task Meta */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Assigned To</div>
              <div className="px-3 py-2 bg-gray-800 rounded text-sm">
                {selectedTask.agentName}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Priority</div>
              <div
                className={`px-3 py-2 rounded text-sm capitalize ${
                  selectedTask.priority === 'high'
                    ? 'bg-red-500/20 text-red-400'
                    : selectedTask.priority === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {selectedTask.priority}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Status</div>
              <select
                value={selectedTask.status}
                onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value as Task['status'])}
                className="w-full px-3 py-2 bg-gray-800 rounded text-sm text-white border border-gray-700 focus:border-blue-500 outline-none"
              >
                <option value="inbox">Inbox</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {selectedTask.duration && (
              <div>
                <div className="text-xs text-gray-400 mb-1">Duration</div>
                <div className="px-3 py-2 bg-gray-800 rounded text-sm">
                  ⏱️ {selectedTask.duration}
                </div>
              </div>
            )}

            {selectedTask.resources.length > 0 && (
              <div>
                <div className="text-xs text-gray-400 mb-2">Resources</div>
                <div className="flex flex-wrap gap-2">
                  {selectedTask.resources.map((resource, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-gray-400 mb-1">Created</div>
              <div className="text-sm text-gray-300">
                {new Date(selectedTask.createdAt).toLocaleString()}
              </div>
            </div>

            {selectedTask.completedAt && (
              <div>
                <div className="text-xs text-gray-400 mb-1">Completed</div>
                <div className="text-sm text-gray-300">
                  {new Date(selectedTask.completedAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-gray-800 space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors">
              View Agent Details
            </button>
            <button className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-semibold transition-colors">
              View Logs
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
