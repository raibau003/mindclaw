import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../store/useStore'
import AgentCard from '../components/agents/AgentCard'
import VirtualOffice from '../components/views/VirtualOffice'
import VirtualOffice3D from '../components/views/VirtualOffice3D'
import KanbanBoard from '../components/views/KanbanBoard'
import AgentDetail from '../components/views/AgentDetail'

type ViewMode = 'list' | 'office' | 'office3d' | 'kanban' | 'detail'

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

  const tabs = [
    { id: 'list', label: 'List View', icon: <ListIcon /> },
    { id: 'office', label: 'Virtual Office 2D', icon: <BuildingIcon /> },
    { id: 'office3d', label: 'Virtual Office 3D', icon: <CubeIcon /> },
    { id: 'kanban', label: 'Kanban Board', icon: <KanbanIcon /> },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold glow-text mb-1">Agents</h1>
        <p className="text-sm text-slate-400">Manage and monitor your AI agent workforce</p>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-1 mb-8 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleViewChange(tab.id as ViewMode)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
              viewMode === tab.id
                ? 'text-white border-cyan-400 bg-white/5 backdrop-blur-sm'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
        {viewMode === 'detail' && selectedAgentId && (
          <button className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white border-b-2 border-cyan-400 bg-white/5 backdrop-blur-sm -mb-px">
            <DetailIcon />
            Agent Detail
          </button>
        )}
      </div>

      {/* View Content */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Worker Agents */}
          <div className="glass-card border border-white/10 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-white mb-6">
              Worker Agents <span className="text-slate-400 font-normal">({agents.length})</span>
            </h2>
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
          <div className="glass-card border border-white/10 rounded-lg p-6">
            <h2 className="text-sm font-semibold text-white mb-6">
              Supervisor Agents <span className="text-slate-400 font-normal">({supervisors.length})</span>
            </h2>
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
      {viewMode === 'office3d' && <VirtualOffice3D />}
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

// Icon Components
function ListIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )
}

function KanbanIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}

function DetailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}

function CubeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  )
}
