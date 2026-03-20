export default function Integrations() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#fafafa] mb-1">Integrations</h1>
        <p className="text-sm text-[#666666]">Connect external services and APIs</p>
      </div>

      <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg p-12 text-center">
        <div className="w-14 h-14 rounded-lg bg-[#1a1a1a] flex items-center justify-center mx-auto mb-6">
          <IntegrationsIcon />
        </div>
        <h3 className="text-sm font-semibold text-[#fafafa] mb-2">External Integrations</h3>
        <p className="text-xs text-[#666666] max-w-md mx-auto">
          Connect your favorite tools and services including Slack, GitHub, Jira, and more coming soon.
        </p>
      </div>
    </div>
  )
}

function IntegrationsIcon() {
  return (
    <svg className="w-6 h-6 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  )
}
