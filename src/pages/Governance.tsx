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
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-white mb-2">Governance & Supervision</h1>
        <p className="text-zinc-400">AI-powered quality assurance and error recovery</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Active Supervisors"
          value={supervisors.length.toString()}
          subtext={`monitoring ${agents.length} agents`}
          color="cyan"
        />
        <StatCard
          label="QA Reviews"
          value={qaEvents.toString()}
          subtext="quality checks performed"
          color="emerald"
        />
        <StatCard
          label="Auto-Fixes"
          value={errorRecoveries.toString()}
          subtext="errors recovered"
          color="amber"
        />
        <StatCard
          label="Intervention Rate"
          value={`${avgInterventionRate}%`}
          subtext="per agent"
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supervisors */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">Supervisor Agents</h2>
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
            <button className="w-full mt-4 p-4 border border-dashed border-white/[0.1] hover:border-blue-500/50 rounded-lg transition-all text-zinc-500 hover:text-white">
              <PlusIcon />
              <span className="text-sm mt-2 block">Add Supervisor</span>
            </button>
          </div>

          {/* Supervision Stats */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Supervision Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <span className="text-sm text-zinc-400">Total Events</span>
                <span className="font-semibold text-white">{totalSupervisions}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <span className="text-sm text-zinc-400">QA Reviews</span>
                <span className="font-semibold text-cyan-400">{qaEvents}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg">
                <span className="text-sm text-zinc-400">Error Recoveries</span>
                <span className="font-semibold text-amber-400">{errorRecoveries}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Supervision Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Live Supervision Timeline</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-zinc-500">Real-time</span>
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {supervisionEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                    <SearchIcon />
                  </div>
                  <p className="text-sm text-zinc-400">No supervision events yet</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Supervisors will monitor agent activities automatically
                  </p>
                </div>
              ) : (
                <SupervisionTimeline events={supervisionEvents} />
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">How Supervision Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3">
                  <QAIcon />
                </div>
                <h4 className="font-medium text-sm text-white mb-1">QA Supervisor</h4>
                <p className="text-xs text-zinc-500">
                  Reviews output quality, data accuracy, and compliance with business rules
                </p>
              </div>

              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                  <WrenchIcon />
                </div>
                <h4 className="font-medium text-sm text-white mb-1">Error Recovery</h4>
                <p className="text-xs text-zinc-500">
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
  color: 'cyan' | 'emerald' | 'amber' | 'purple'
}

function StatCard({ label, value, subtext, color }: StatCardProps) {
  const colorClasses = {
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
  }

  return (
    <div className="glass-card rounded-xl p-6 hover-lift">
      <p className="text-sm text-zinc-400 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colorClasses[color]} mb-1`}>{value}</p>
      <p className="text-xs text-zinc-500">{subtext}</p>
    </div>
  )
}

// Icon Components
function PlusIcon() {
  return (
    <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

function QAIcon() {
  return (
    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  )
}
