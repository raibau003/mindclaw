import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  // Los 7 agentes con información completa desde los documentos
  const agents = [
    {
      id: 'data-engineer',
      name: 'Data Engineer Agent',
      icon: '🔧',
      status: 'ACTIVO',
      quarter: 'Q1 2026',
      description: 'Conexión a fuentes de datos, limpieza automática, generación de pipelines ETL, mantenimiento de data warehouse',
      metrics: [
        { value: '1.2K', label: 'Records/min' },
        { value: '99.8%', label: 'Success Rate' },
        { value: '247', label: 'Pipelines Activos' }
      ],
      capabilities: [
        'Conecta cualquier fuente: ERP, CMMS, sensores, APIs, archivos',
        'Pipelines auto-generados por agentes',
        'Knowledge Graph semántico industrial',
        'Data catalog con búsqueda en lenguaje natural'
      ]
    },
    {
      id: 'automation',
      name: 'Automation Agent',
      icon: '⚙️',
      status: 'ACTIVO',
      quarter: 'Q2 2026',
      description: 'Orquestación N8N, ejecución de workflows, integración con Zapier/Make, automatización end-to-end',
      metrics: [
        { value: '5', label: 'Workflows' },
        { value: '100%', label: 'Uptime' },
        { value: '1.2K', label: 'Automations/day' }
      ],
      capabilities: [
        'Workflows end-to-end automáticos',
        'Órdenes de trabajo auto-generadas',
        'Rutas óptimas de operación',
        'Loop de aprendizaje continuo'
      ]
    },
    {
      id: 'bi-analytics',
      name: 'BI & Analytics Agent',
      icon: '📊',
      status: 'ACTIVO',
      quarter: 'Q1 2026',
      description: 'Consultas NL2SQL, generación de dashboards, análisis predictivo, alertas inteligentes',
      metrics: [
        { value: '347', label: 'Queries/day' },
        { value: '23', label: 'Dashboards' },
        { value: '89.4%', label: 'Cache Hit' }
      ],
      capabilities: [
        'Dashboards generados desde lenguaje natural',
        'Queries en lenguaje natural sobre cualquier dato',
        'Anomaly detection visual integrada',
        'Narrativa auto-explicativa de los datos'
      ]
    },
    {
      id: 'data-science',
      name: 'Data Science Agent',
      icon: '🧪',
      status: 'TRAINING',
      quarter: 'Q2 2026',
      description: 'Modelos predictivos, clustering, forecasting, feature engineering, AutoML',
      metrics: [
        { value: '89.4%', label: 'Accuracy' },
        { value: '12', label: 'Models' },
        { value: '67%', label: 'Training Progress' }
      ],
      capabilities: [
        'Modelos predictivos automáticos',
        'Forecasting de series temporales',
        'Clustering y segmentación',
        'AutoML para optimización de modelos'
      ]
    },
    {
      id: 'vision',
      name: 'Vision Agent',
      icon: '👁️',
      status: 'Q3 2026',
      quarter: 'Q3 2026',
      description: 'OCR, detección de objetos, clasificación de imágenes, análisis de documentos',
      metrics: [
        { value: '0', label: 'Images Processed' },
        { value: '0', label: 'Models' },
        { value: 'Q3 2026', label: 'Ready' }
      ],
      capabilities: [
        'OCR en documentos industriales',
        'Detección de PPE (Personal Protective Equipment)',
        'Análisis de video para seguridad operacional',
        'Conteo de inventario visual'
      ]
    },
    {
      id: 'web-apps',
      name: 'Web Apps Agent',
      icon: '💻',
      status: 'ACTIVO',
      quarter: 'Q1 2026',
      description: 'Generación de apps React, APIs FastAPI, dashboards interactivos, deployment automático',
      metrics: [
        { value: '12', label: 'Apps Deployed' },
        { value: '4.2K', label: 'LOC Generated' },
        { value: '99.1%', label: 'Uptime' }
      ],
      capabilities: [
        'Generación de apps React desde lenguaje natural',
        'APIs FastAPI auto-documentadas',
        'Dashboards interactivos con React + Recharts',
        'Deployment automático a Vercel/Netlify'
      ]
    },
    {
      id: 'governance',
      name: 'Governance Agent',
      icon: '🔒',
      status: 'ACTIVO',
      quarter: 'Q1 2026',
      description: 'PII redaction, compliance GDPR/SOC2, auditoría, control de accesos, lineage tracking',
      metrics: [
        { value: '247', label: 'Entities Monitored' },
        { value: '834', label: 'Relations' },
        { value: '100%', label: 'Compliance' }
      ],
      capabilities: [
        'Guardrails de seguridad y PII redaction',
        'Audit logs completos',
        'Compliance configurable (GDPR, SOC2)',
        'Identity management y control de accesos'
      ]
    }
  ]

  // Estado para simular actualización de métricas
  const [liveMetrics, setLiveMetrics] = useState(agents)

  // Simular actualización de métricas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(current =>
        current.map(agent => ({
          ...agent,
          metrics: agent.metrics.map(metric => {
            if (metric.label.includes('%') || metric.label.includes('Rate')) {
              const value = parseFloat(metric.value)
              if (!isNaN(value)) {
                const change = (Math.random() - 0.5) * 0.3
                const newValue = Math.max(0, Math.min(100, value + change))
                return { ...metric, value: `${newValue.toFixed(1)}%` }
              }
            } else if (metric.label.includes('Progress')) {
              const value = parseFloat(metric.value)
              if (!isNaN(value)) {
                const change = (Math.random() - 0.5) * 1.5
                const newValue = Math.max(0, Math.min(100, value + change))
                return { ...metric, value: `${newValue.toFixed(0)}%` }
              }
            }
            return metric
          })
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Estadísticas globales del Knowledge Graph
  const knowledgeGraphStats = {
    entities: 247,
    relations: 834,
    depth: 3,
    vectorDbSize: '5.2GB'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVO':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'TRAINING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'Q2 2026':
      case 'Q3 2026':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 glow-text">
          Dashboard
        </h1>
        <p className="text-slate-400">
          La IA que reemplaza una consultoría entera de datos
        </p>
      </div>

      {/* Knowledge Graph Stats - Destacado */}
      <div className="glass-card border border-blue-500/30 rounded-xl p-6 glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1 glow-text">
              🕸️ Knowledge Graph
            </h2>
            <p className="text-sm text-slate-400">
              Memoria semántica del sistema - El cerebro de MindClaw
            </p>
          </div>
          <button
            onClick={() => navigate('/knowledge-graph')}
            className="btn-primary text-sm px-4 py-2 rounded-lg text-white font-medium"
          >
            Ver Grafo
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Entities" value={knowledgeGraphStats.entities.toString()} />
          <StatCard label="Relations" value={knowledgeGraphStats.relations.toString()} />
          <StatCard label="Levels Depth" value={knowledgeGraphStats.depth.toString()} />
          <StatCard label="Vector DB Size" value={knowledgeGraphStats.vectorDbSize} />
        </div>
      </div>

      {/* Agentes Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white glow-text">
            Agentes Especializados
          </h2>
          <span className="text-sm text-slate-400">
            {liveMetrics.filter(a => a.status === 'ACTIVO').length} activos de {liveMetrics.length} agentes
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {liveMetrics.map((agent) => (
            <div
              key={agent.id}
              className="glass-card border border-white/10 rounded-xl p-6 group"
            >
              {/* Header del agente */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-2xl border border-white/10">
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white glow-text">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-slate-400">{agent.quarter}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(agent.status)}`}>
                  {agent.status}
                </span>
              </div>

              {/* Descripción */}
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                {agent.description}
              </p>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-white/5">
                {agent.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-lg font-bold text-blue-400">
                      {metric.value}
                    </p>
                    <p className="text-xs text-slate-500">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Capabilities */}
              <div className="space-y-1.5 mb-4">
                <p className="text-xs font-medium text-slate-400 mb-2">Capacidades:</p>
                {agent.capabilities.slice(0, 2).map((cap, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 text-xs mt-0.5">✓</span>
                    <p className="text-xs text-slate-300 line-clamp-1">{cap}</p>
                  </div>
                ))}
              </div>

              {/* Acciones */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/agents?id=${agent.id}`)}
                  className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => navigate(`/settings?agent=${agent.id}`)}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Configurar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickActionCard
          icon="🛒"
          title="NemoClaw Marketplace"
          description="50+ skills disponibles - CORE, PRO, ENTERPRISE"
          onClick={() => navigate('/marketplace')}
        />
        <QuickActionCard
          icon="🔌"
          title="APIs & Conectores"
          description="15 integraciones pre-configuradas listas"
          onClick={() => navigate('/integrations')}
        />
        <QuickActionCard
          icon="🔒"
          title="Governance & Security"
          description="PII redaction, GDPR compliance, audit logs"
          onClick={() => navigate('/governance')}
        />
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-lg p-3 border border-white/10">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-white glow-text">{value}</p>
    </div>
  )
}

// Quick Action Card
function QuickActionCard({
  icon,
  title,
  description,
  onClick
}: {
  icon: string
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="glass-card border border-white/10 rounded-xl p-6 text-left group"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-white mb-2 glow-text group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-400">{description}</p>
    </button>
  )
}
