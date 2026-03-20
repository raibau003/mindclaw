import { useStore } from '../store/useStore'
import AgentCard from '../components/agents/AgentCard'
import SupervisionTimeline from '../components/supervision/SupervisionTimeline'
import { useNavigate } from 'react-router-dom'

export default function Governance() {
  const navigate = useNavigate()
  const { supervisors, supervisionEvents, agents } = useStore()

  const totalSupervisions = supervisionEvents.length
  const qaEvents = supervisionEvents.filter((e) => e.type === 'qa').length
  const errorRecoveries = supervisionEvents.filter((e) => e.type === 'error_recovery').length
  const avgInterventionRate = agents.length > 0
    ? ((supervisionEvents.length / agents.length) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Governance & Supervision</h1>
        <p className="text-gray-400">AI-powered quality assurance and error recovery</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Active Supervisors</div>
          <div className="text-4xl font-bold text-cyan-400">{supervisors.length}</div>
          <div className="text-xs text-gray-500 mt-1">monitoring {agents.length} agents</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">QA Reviews</div>
          <div className="text-4xl font-bold text-green-400">{qaEvents}</div>
          <div className="text-xs text-gray-500 mt-1">quality checks performed</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Auto-Fixes</div>
          <div className="text-4xl font-bold text-orange-400">{errorRecoveries}</div>
          <div className="text-xs text-gray-500 mt-1">errors recovered</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Intervention Rate</div>
          <div className="text-4xl font-bold text-purple-400">{avgInterventionRate}%</div>
          <div className="text-xs text-gray-500 mt-1">per agent</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supervisors */}
        <div className="lg:col-span-1">
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Supervisor Agents</h2>
            <div className="space-y-3">
              {supervisors.map((supervisor) => (
                <AgentCard
                  key={supervisor.id}
                  agent={supervisor}
                  onClick={() => navigate(`/agents?id=${supervisor.id}`)}
                />
              ))}
            </div>

            {/* Add New Supervisor */}
            <button className="w-full mt-4 p-4 border-2 border-dashed border-gray-800 hover:border-blue-500/50 rounded-lg transition-all text-gray-400 hover:text-white">
              <div className="text-2xl mb-1">+</div>
              <div className="text-sm">Add Supervisor</div>
            </button>
          </div>

          {/* Supervision Stats */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6 mt-6">
            <h3 className="font-bold mb-4">Supervision Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <span className="text-sm text-gray-400">Total Events</span>
                <span className="font-bold">{totalSupervisions}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <span className="text-sm text-gray-400">QA Reviews</span>
                <span className="font-bold text-cyan-400">{qaEvents}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                <span className="text-sm text-gray-400">Error Recoveries</span>
                <span className="font-bold text-orange-400">{errorRecoveries}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supervision Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Live Supervision Timeline</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Real-time</span>
              </div>
            </div>

            <div className="space-y-4 max-h-[800px] overflow-y-auto">
              {supervisionEvents.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-4xl mb-2">🔍</div>
                  <div className="text-sm">No supervision events yet</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Supervisors will monitor agent activities automatically
                  </div>
                </div>
              ) : (
                <SupervisionTimeline events={supervisionEvents} />
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6 mt-6">
            <h3 className="font-bold mb-4">How Supervision Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-semibold text-sm mb-1 text-cyan-400">QA Supervisor</div>
                <div className="text-xs text-gray-400">
                  Reviews output quality, data accuracy, and compliance with business rules
                </div>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="text-2xl mb-2">🔧</div>
                <div className="font-semibold text-sm mb-1 text-orange-400">Error Recovery</div>
                <div className="text-xs text-gray-400">
                  Detects errors, applies auto-fixes, and guides agents to correct solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
