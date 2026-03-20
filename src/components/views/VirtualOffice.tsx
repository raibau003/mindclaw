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
      <div className="flex items-center justify-between bg-[#0d1321] border border-gray-800 rounded-xl p-4">
        <div className="text-sm text-gray-400">
          Drag agents between rooms to collaborate
        </div>
        <button
          onClick={handleGatherAll}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
        >
          🎯 Gather All in Conference
        </button>
      </div>

      {/* Office Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const roomAgents = agents.filter((a) => a.room === room.id)

          return (
            <div
              key={room.id}
              className="bg-[#0d1321] border-2 rounded-xl p-6 min-h-[300px] transition-all"
              style={{
                borderColor: draggedAgent ? room.color : 'rgb(31, 41, 55)',
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, room.id)}
            >
              {/* Room Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-800">
                <div className="text-3xl">{room.icon}</div>
                <div>
                  <div className="font-bold" style={{ color: room.color }}>
                    {room.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {roomAgents.length} {roomAgents.length === 1 ? 'agent' : 'agents'}
                  </div>
                </div>
              </div>

              {/* Agents in Room */}
              <div className="space-y-3">
                {roomAgents.length === 0 ? (
                  <div className="text-center py-8 text-gray-600 text-sm">
                    Drop agents here
                  </div>
                ) : (
                  roomAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="p-3 bg-[#0a0f1e] rounded-lg border border-gray-800 cursor-move hover:border-gray-700 transition-all"
                      draggable
                      onDragStart={(e) => handleDragStart(e, agent.id)}
                      onClick={() => onAgentClick(agent.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{agent.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{agent.name}</div>
                          <div className="text-xs text-gray-400">{agent.type}</div>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            agent.status === 'active'
                              ? 'bg-green-400 animate-pulse'
                              : agent.status === 'idle'
                              ? 'bg-yellow-400'
                              : 'bg-red-400'
                          }`}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Room Activity */}
              {roomAgents.length > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="text-xs text-gray-400 mb-2">Active Collaboration</div>
                  <div className="flex flex-wrap gap-1">
                    {roomAgents.map((agent) => (
                      <span key={agent.id} className="text-lg">
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
      <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-400">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-gray-400">Idle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
            <span className="text-gray-400">Error</span>
          </div>
        </div>
      </div>
    </div>
  )
}
