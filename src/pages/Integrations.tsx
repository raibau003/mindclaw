export default function Integrations() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-1 glow-text">Integrations</h1>
        <p className="text-sm text-slate-400">Connect external services and APIs</p>
      </div>

      <div className="glass-card border border-white/10 rounded-lg p-12 text-center">
        <div className="w-14 h-14 rounded-lg glass border border-white/10 flex items-center justify-center mx-auto mb-6">
          <IntegrationsIcon />
        </div>
        <h3 className="text-sm font-semibold text-white mb-2 glow-text">External Integrations</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Connect your favorite tools and services including Slack, GitHub, Jira, and more coming soon.
        </p>
      </div>
    </div>
  )
}

function IntegrationsIcon() {
  return (
    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  )
}
