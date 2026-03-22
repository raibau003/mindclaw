export default function Integrations() {
  const integrations = [
    // Data Sources
    { id: 'sap', name: 'SAP Business One API', icon: '💼', category: 'Data Sources', endpoint: 'POST /api/sap/connect', methods: ['GET', 'POST', 'PUT'], enabled: true },
    { id: 'postgres', name: 'PostgreSQL Database', icon: '🐘', category: 'Data Sources', endpoint: 'POST /api/postgres/connect', methods: ['GET', 'POST', 'PUT', 'DELETE'], enabled: true },
    { id: 'mysql', name: 'MySQL Database', icon: '🐬', category: 'Data Sources', endpoint: 'POST /api/mysql/connect', methods: ['GET', 'POST', 'PUT', 'DELETE'], enabled: true },
    { id: 'rest', name: 'REST API Gateway', icon: '🌐', category: 'Data Sources', endpoint: 'POST /api/rest/proxy', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], enabled: true },
    { id: 'bigquery', name: 'Google BigQuery', icon: '📊', category: 'Data Sources', endpoint: 'POST /api/bigquery/query', methods: ['GET', 'POST'], enabled: false },

    // Industry-Specific
    { id: 'mapon', name: 'Mapon GPS Tracking', icon: '🚛', category: 'Industry', endpoint: 'POST /api/mapon/vehicles', methods: ['GET', 'POST'], enabled: true },
    { id: 'jaltest', name: 'Jaltest OBD Diagnostics', icon: '🔧', category: 'Industry', endpoint: 'POST /api/jaltest/diagnostics', methods: ['GET', 'POST'], enabled: true },

    // E-commerce
    { id: 'shopify', name: 'Shopify Store API', icon: '🛍️', category: 'E-commerce', endpoint: 'POST /api/shopify/products', methods: ['GET', 'POST', 'PUT', 'DELETE'], enabled: true },

    // Automation
    { id: 'n8n', name: 'N8N Workflow Engine', icon: '⚙️', category: 'Automation', endpoint: 'POST /api/n8n/execute', methods: ['GET', 'POST', 'PUT'], enabled: true },

    // AI Services
    { id: 'openai', name: 'OpenAI API', icon: '🤖', category: 'AI Services', endpoint: 'POST /api/openai/chat', methods: ['POST'], enabled: true },
    { id: 'nvidia', name: 'NVIDIA NIM Inference', icon: '🧠', category: 'AI Services', endpoint: 'POST /api/nvidia/inference', methods: ['POST'], enabled: false },

    // Communication
    { id: 'slack', name: 'Slack Notifications', icon: '💬', category: 'Communication', endpoint: 'POST /api/slack/message', methods: ['POST'], enabled: true },
    { id: 'email', name: 'Email SMTP', icon: '📧', category: 'Communication', endpoint: 'POST /api/email/send', methods: ['POST'], enabled: true },

    // Storage
    { id: 's3', name: 'Amazon S3 Storage', icon: '☁️', category: 'Storage', endpoint: 'POST /api/s3/upload', methods: ['GET', 'POST', 'PUT', 'DELETE'], enabled: false },
    { id: 'azure', name: 'Azure Blob Storage', icon: '☁️', category: 'Storage', endpoint: 'POST /api/azure/upload', methods: ['GET', 'POST', 'PUT', 'DELETE'], enabled: false },
  ]

  const categories = [...new Set(integrations.map(i => i.category))]

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/20 text-emerald-400'
      case 'POST': return 'bg-blue-500/20 text-blue-400'
      case 'PUT': return 'bg-amber-500/20 text-amber-400'
      case 'DELETE': return 'bg-red-500/20 text-red-400'
      case 'PATCH': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-slate-500/20 text-slate-400'
    }
  }

  const stats = {
    total: integrations.length,
    enabled: integrations.filter(i => i.enabled).length,
    categories: categories.length
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 glow-text">
          🔌 APIs & Conectores
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          15 integraciones pre-configuradas - Los agentes usan estas APIs automáticamente
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <StatCard label="Total APIs" value={stats.total.toString()} />
        <StatCard label="Habilitadas" value={stats.enabled.toString()} />
        <StatCard label="Categorías" value={stats.categories.toString()} />
      </div>

      {/* Integrations by Category */}
      {categories.map(category => {
        const categoryIntegrations = integrations.filter(i => i.category === category)
        return (
          <div key={category}>
            <div className="mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-semibold text-white glow-text">
                {category}
              </h2>
              <p className="text-xs text-slate-400">
                {categoryIntegrations.length} APIs disponibles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {categoryIntegrations.map(integration => (
                <div
                  key={integration.id}
                  className="glass-card border border-white/10 rounded-xl p-5"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {integration.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          {integration.endpoint}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${integration.enabled ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                    </div>
                  </div>

                  {/* Methods */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {integration.methods.map(method => (
                      <span
                        key={method}
                        className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${getMethodColor(method)}`}
                      >
                        {method}
                      </span>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="text-xs">
                    {integration.enabled ? (
                      <span className="text-emerald-400">✓ Habilitado</span>
                    ) : (
                      <span className="text-slate-500">○ Deshabilitado</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Info Card */}
      <div className="glass-card border border-blue-500/30 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
          <div className="text-2xl md:text-3xl">⚡</div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 glow-text">
              Uso Automático por Agentes
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mb-3">
              Los agentes de MindClaw usan estas APIs automáticamente según la tarea del usuario. No necesitas configurar nada manualmente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 text-xs mt-0.5">✓</span>
                <p className="text-xs text-slate-300">
                  <strong>Data Engineer Agent</strong> usa SAP, PostgreSQL, MySQL para pipelines
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 text-xs mt-0.5">✓</span>
                <p className="text-xs text-slate-300">
                  <strong>Automation Agent</strong> usa N8N, Slack, Email para workflows
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 text-xs mt-0.5">✓</span>
                <p className="text-xs text-slate-300">
                  <strong>Vision Agent</strong> usa OpenAI, NVIDIA NIM para visión computacional
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-400 text-xs mt-0.5">✓</span>
                <p className="text-xs text-slate-300">
                  <strong>Governance Agent</strong> usa S3, Azure Blob para almacenamiento seguro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card border border-white/10 rounded-lg p-3 md:p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-lg md:text-2xl font-bold text-white glow-text">{value}</p>
    </div>
  )
}
