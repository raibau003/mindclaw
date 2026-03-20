import { useState } from 'react'
import { useStore } from '../../store/useStore'

interface VirtualOfficeProps {
  onAgentClick: (agentId: string) => void
}

export default function VirtualOffice({ onAgentClick }: VirtualOfficeProps) {
  const { agents, rooms, moveAgentToRoom } = useStore()
  const [draggedAgent, setDraggedAgent] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, agentId: string) => {
    setDraggedAgent(agentId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, roomId: string) => {
    e.preventDefault()
    if (draggedAgent) {
      moveAgentToRoom(draggedAgent, roomId)
      setDraggedAgent(null)
    }
  }

  const handleGatherAll = () => {
    agents.forEach((agent) => {
      moveAgentToRoom(agent.id, 'conference')
    })
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between glass-card border border-white/10 rounded-lg p-4">
        <div className="text-xs text-slate-300">
          Drag agents between rooms to collaborate
        </div>
        <button
          onClick={handleGatherAll}
          className="btn-primary px-4 py-2 rounded-md text-sm text-white font-medium"
        >
          Gather All in Conference
        </button>
      </div>

      {/* Office Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const roomAgents = agents.filter((a) => a.room === room.id)

          return (
            <div
              key={room.id}
              className="glass-card border rounded-lg p-6 min-h-[280px] transition-all duration-150 hover:border-white/20"
              style={{
                borderColor: draggedAgent ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, room.id)}
            >
              {/* Room Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="text-2xl">{room.icon}</div>
                <div>
                  <div className="text-sm font-medium text-white glow-text">
                    {room.name}
                  </div>
                  <div className="text-xs text-slate-300">
                    {roomAgents.length} {roomAgents.length === 1 ? 'agent' : 'agents'}
                  </div>
                </div>
              </div>

              {/* Agents in Room */}
              <div className="space-y-2">
                {roomAgents.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Drop agents here
                  </div>
                ) : (
                  roomAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="p-3 glass rounded-md border border-white/10 cursor-move hover:border-white/20 hover:bg-white/5 transition-all duration-150"
                      draggable
                      onDragStart={(e) => handleDragStart(e, agent.id)}
                      onClick={() => onAgentClick(agent.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{agent.emoji}</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{agent.name}</div>
                          <div className="text-xs text-slate-300">{agent.type}</div>
                        </div>
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            agent.status === 'active'
                              ? 'bg-emerald-500'
                              : agent.status === 'idle'
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Room Activity */}
              {roomAgents.length > 1 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-slate-300 mb-2">Collaborating</div>
                  <div className="flex flex-wrap gap-1">
                    {roomAgents.map((agent) => (
                      <span key={agent.id} className="text-base">
                        {agent.emoji}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="glass-card border border-white/10 rounded-lg p-4">
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-slate-300">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            <span className="text-slate-300">Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            <span className="text-slate-300">Error</span>
          </div>
        </div>
      </div>
    </div>
  )
}
