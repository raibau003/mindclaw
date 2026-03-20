import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../store/useStore'
import AgentCard from '../components/agents/AgentCard'
import VirtualOffice from '../components/views/VirtualOffice'
import KanbanBoard from '../components/views/KanbanBoard'
import AgentDetail from '../components/views/AgentDetail'

type ViewMode = 'list' | 'office' | 'kanban' | 'detail'

export default function Agents() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { agents, supervisors, selectedAgentId, selectAgent } = useStore()

  // Determine view mode from URL params
  const viewParam = searchParams.get('view') as ViewMode | null
  const idParam = searchParams.get('id')
  const [viewMode, setViewMode] = useState<ViewMode>(
    idParam ? 'detail' : viewParam || 'list'
  )

  useEffect(() => {
    if (idParam) {
      selectAgent(idParam)
      setViewMode('detail')
    } else if (viewParam) {
      setViewMode(viewParam)
    }
  }, [idParam, viewParam, selectAgent])

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode)
    if (mode === 'detail' && selectedAgentId) {
      setSearchParams({ view: mode, id: selectedAgentId })
    } else {
      setSearchParams(mode !== 'list' ? { view: mode } : {})
    }
  }

  const handleAgentClick = (agentId: string) => {
    selectAgent(agentId)
    setSearchParams({ view: 'detail', id: agentId })
    setViewMode('detail')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agents</h1>
        <p className="text-gray-400">Manage and monitor your AI agent workforce</p>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-800">
        <button
          onClick={() => handleViewChange('list')}
          className={`px-4 py-2 transition-colors ${
            viewMode === 'list'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          📋 List View
        </button>
        <button
          onClick={() => handleViewChange('office')}
          className={`px-4 py-2 transition-colors ${
            viewMode === 'office'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🏢 Virtual Office
        </button>
        <button
          onClick={() => handleViewChange('kanban')}
          className={`px-4 py-2 transition-colors ${
            viewMode === 'kanban'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          📊 Kanban Board
        </button>
        {viewMode === 'detail' && selectedAgentId && (
          <button
            className="px-4 py-2 text-blue-400 border-b-2 border-blue-400"
          >
            🔍 Agent Detail
          </button>
        )}
      </div>

      {/* View Content */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Worker Agents */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Worker Agents ({agents.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onClick={() => handleAgentClick(agent.id)}
                />
              ))}
            </div>
          </div>

          {/* Supervisor Agents */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Supervisor Agents ({supervisors.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {supervisors.map((supervisor) => (
                <AgentCard
                  key={supervisor.id}
                  agent={supervisor}
                  onClick={() => handleAgentClick(supervisor.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'office' && <VirtualOffice onAgentClick={handleAgentClick} />}
      {viewMode === 'kanban' && <KanbanBoard />}
      {viewMode === 'detail' && selectedAgentId && (
        <AgentDetail
          agentId={selectedAgentId}
          onClose={() => {
            selectAgent(null)
            setSearchParams({})
            setViewMode('list')
          }}
        />
      )}
    </div>
  )
}
