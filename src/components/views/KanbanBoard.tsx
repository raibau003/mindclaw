import { useState } from 'react'
import { useStore } from '../../store/useStore'
import TaskCard from '../tasks/TaskCard'
import type { Task } from '../../store/useStore'

const columns = [
  { id: 'inbox', title: 'Inbox', color: '#666666' },
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
              className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-4 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            >
              {/* Column Header */}
              <div className="mb-4 pb-4 border-b border-[#1a1a1a]">
                <div className="text-sm font-medium text-[#fafafa] mb-1">
                  {column.title}
                </div>
                <div className="text-xs text-[#666666]">
                  {columnTasks.length} {columnTasks.length === 1 ? 'task' : 'tasks'}
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div key={task.id} className={selectedTaskId === task.id ? 'ring-1 ring-[#fafafa] rounded-md' : ''}>
                    <TaskCard
                      task={task}
                      onClick={() => handleTaskClick(task.id)}
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      draggable
                    />
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-[#444444] text-xs border border-dashed border-[#1a1a1a] rounded-md">
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
        <div className="w-80 bg-[#111111] border border-[#1a1a1a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-[#fafafa]">Task Details</h3>
            <button
              onClick={() => selectTask(null)}
              className="text-[#666666] hover:text-[#fafafa] transition-colors duration-150 text-sm"
            >
              Close
            </button>
          </div>

          {/* Task Header */}
          <div className="mb-6">
            <div className="text-sm font-medium text-[#fafafa] mb-2">{selectedTask.title}</div>
            <div className="text-xs text-[#666666]">{selectedTask.description}</div>
          </div>

          {/* Task Meta */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-[#666666] mb-1">Assigned To</div>
              <div className="px-3 py-2 bg-[#0a0a0a] rounded-md text-xs text-[#fafafa]">
                {selectedTask.agentName}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#666666] mb-1">Priority</div>
              <div
                className={`px-3 py-2 rounded-md text-xs capitalize ${
                  selectedTask.priority === 'high'
                    ? 'bg-red-500/10 text-red-400'
                    : selectedTask.priority === 'medium'
                    ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-blue-500/10 text-blue-400'
                }`}
              >
                {selectedTask.priority}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#666666] mb-1">Status</div>
              <select
                value={selectedTask.status}
                onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value as Task['status'])}
                className="w-full px-3 py-2 bg-[#0a0a0a] rounded-md text-xs text-[#fafafa] border border-[#1a1a1a] focus:border-[#2a2a2a] outline-none"
              >
                <option value="inbox">Inbox</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            {selectedTask.duration && (
              <div>
                <div className="text-xs text-[#666666] mb-1">Duration</div>
                <div className="px-3 py-2 bg-[#0a0a0a] rounded-md text-xs text-[#888888]">
                  {selectedTask.duration}
                </div>
              </div>
            )}

            {selectedTask.resources.length > 0 && (
              <div>
                <div className="text-xs text-[#666666] mb-2">Resources</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTask.resources.map((resource, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#0a0a0a] text-[#666666] rounded text-xs"
                    >
                      {resource}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-[#666666] mb-1">Created</div>
              <div className="text-xs text-[#888888]">
                {new Date(selectedTask.createdAt).toLocaleString()}
              </div>
            </div>

            {selectedTask.completedAt && (
              <div>
                <div className="text-xs text-[#666666] mb-1">Completed</div>
                <div className="text-xs text-[#888888]">
                  {new Date(selectedTask.completedAt).toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-[#1a1a1a] space-y-2">
            <button className="w-full px-4 py-2 bg-[#fafafa] hover:bg-[#e5e5e5] text-[#0a0a0a] rounded-md text-xs font-medium transition-colors duration-150">
              View Agent Details
            </button>
            <button className="w-full px-4 py-2 bg-[#1a1a1a] hover:bg-[#222222] text-[#fafafa] rounded-md text-xs font-medium transition-colors duration-150">
              View Logs
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
