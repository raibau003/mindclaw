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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold glow-text mb-1">Governance</h1>
        <p className="text-sm text-cyan-300/80">AI-powered quality assurance and error recovery</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active Supervisors"
          value={supervisors.length.toString()}
          subtext={`monitoring ${agents.length} agents`}
        />
        <StatCard
          label="QA Reviews"
          value={qaEvents.toString()}
          subtext="quality checks performed"
        />
        <StatCard
          label="Auto-Fixes"
          value={errorRecoveries.toString()}
          subtext="errors recovered"
        />
        <StatCard
          label="Intervention Rate"
          value={`${avgInterventionRate}%`}
          subtext="per agent"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supervisors */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-sm font-semibold text-cyan-300 mb-6">Supervisor Agents</h2>
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
            <button className="w-full mt-4 p-4 border border-dashed border-white/10 hover:border-cyan-400/40 rounded-md transition-colors duration-150 text-cyan-300/60 hover:text-cyan-300">
              <PlusIcon />
              <span className="text-xs mt-2 block">Add Supervisor</span>
            </button>
          </div>

          {/* Supervision Stats */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-cyan-300 mb-4">Supervision Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 glass rounded-md">
                <span className="text-xs text-cyan-200/70">Total Events</span>
                <span className="text-sm font-medium text-white">{totalSupervisions}</span>
              </div>
              <div className="flex items-center justify-between p-3 glass rounded-md">
                <span className="text-xs text-cyan-200/70">QA Reviews</span>
                <span className="text-sm font-medium text-cyan-100">{qaEvents}</span>
              </div>
              <div className="flex items-center justify-between p-3 glass rounded-md">
                <span className="text-xs text-cyan-200/70">Error Recoveries</span>
                <span className="text-sm font-medium text-cyan-100">{errorRecoveries}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supervision Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-cyan-300">Live Supervision Timeline</h2>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="text-xs text-emerald-300/80">Real-time</span>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {supervisionEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-lg glass flex items-center justify-center mx-auto mb-4">
                    <SearchIcon />
                  </div>
                  <p className="text-sm text-cyan-200/70">No supervision events yet</p>
                  <p className="text-xs text-cyan-300/50 mt-1">
                    Supervisors will monitor agent activities automatically
                  </p>
                </div>
              ) : (
                <SupervisionTimeline events={supervisionEvents} />
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-cyan-300 mb-4">How Supervision Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 glass border border-white/10 rounded-md hover:border-cyan-400/40 transition-colors">
                <div className="w-9 h-9 rounded-md glass flex items-center justify-center mb-3">
                  <QAIcon />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">QA Supervisor</h4>
                <p className="text-xs text-cyan-200/70">
                  Reviews output quality, data accuracy, and compliance with business rules
                </p>
              </div>

              <div className="p-4 glass border border-white/10 rounded-md hover:border-cyan-400/40 transition-colors">
                <div className="w-9 h-9 rounded-md glass flex items-center justify-center mb-3">
                  <WrenchIcon />
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Error Recovery</h4>
                <p className="text-xs text-cyan-200/70">
                  Detects errors, applies auto-fixes, and guides agents to correct solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
interface StatCardProps {
  label: string
  value: string
  subtext: string
}

function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div className="glass-card p-5 hover:border-cyan-400/40 transition-colors duration-150">
      <p className="text-xs text-cyan-200/70 mb-2">{label}</p>
      <p className="text-2xl font-semibold text-white mb-1">{value}</p>
      <p className="text-xs text-cyan-300/50">{subtext}</p>
    </div>
  )
}

// Icon Components
function PlusIcon() {
  return (
    <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-5 h-5 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

function QAIcon() {
  return (
    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  )
}
