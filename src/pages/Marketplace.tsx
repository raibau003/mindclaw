import { useState } from 'react'

export default function Marketplace() {
  const [filter, setFilter] = useState<'all' | 'CORE' | 'PRO' | 'ENTERPRISE'>('all')

  const skills = [
    {
      id: 'sap-connector',
      name: 'skill-sap-connector',
      icon: '🔌',
      description: 'Conecta a SAP Business One para sincronización de datos en tiempo real',
      tier: 'CORE',
      price: 0,
      priceLabel: 'Incluido en plan',
      rating: 5.0,
      installs: 1200,
      installed: true,
      category: 'Conectores'
    },
    {
      id: 'data-cleaner',
      name: 'skill-data-cleaner',
      icon: '🧹',
      description: 'Limpieza y validación automática de datos con reglas configurables',
      tier: 'CORE',
      price: 0,
      priceLabel: 'Incluido en plan',
      rating: 4.9,
      installs: 980,
      installed: true,
      category: 'Data Quality'
    },
    {
      id: 'churn-predictor',
      name: 'skill-churn-predictor',
      icon: '📊',
      description: 'Predicción de churn de clientes usando ML avanzado con explicabilidad',
      tier: 'PRO',
      price: 2000,
      priceLabel: '€2,000/mes',
      rating: 4.8,
      installs: 456,
      installed: false,
      category: 'Predicción'
    },
    {
      id: 'web-scraper',
      name: 'skill-web-scraper',
      icon: '🌐',
      description: 'Web scraping con Scrapling (HTTP2, TLS fingerprinting, anti-bot)',
      tier: 'PRO',
      price: 1500,
      priceLabel: '€1,500/mes',
      rating: 4.9,
      installs: 789,
      installed: false,
      category: 'Automatización'
    },
    {
      id: 'nl2sql',
      name: 'skill-nl2sql',
      icon: '💬',
      description: 'Natural Language to SQL con soporte multi-database (PostgreSQL, MySQL, BigQuery)',
      tier: 'PRO',
      price: 1800,
      priceLabel: '€1,800/mes',
      rating: 4.7,
      installs: 654,
      installed: false,
      category: 'Analytics'
    },
    {
      id: 'pii-redactor',
      name: 'skill-pii-redactor',
      icon: '🔒',
      description: 'Redacción automática de PII con compliance GDPR/SOC2 certificado',
      tier: 'ENTERPRISE',
      price: 5000,
      priceLabel: '€5,000/mes',
      rating: 5.0,
      installs: 234,
      installed: false,
      category: 'Governance'
    },
    {
      id: 'mapon-gps',
      name: 'skill-mapon-gps',
      icon: '🚛',
      description: 'Integración con Mapon GPS para tracking de flotas en tiempo real',
      tier: 'PRO',
      price: 1200,
      priceLabel: '€1,200/mes',
      rating: 4.6,
      installs: 345,
      installed: false,
      category: 'Industria'
    },
    {
      id: 'jaltest-obd',
      name: 'skill-jaltest-obd',
      icon: '🔧',
      description: 'Diagnóstico OBD con Jaltest para mantenimiento predictivo de vehículos',
      tier: 'PRO',
      price: 1800,
      priceLabel: '€1,800/mes',
      rating: 4.8,
      installs: 289,
      installed: false,
      category: 'Industria'
    },
    {
      id: 'anomaly-detector',
      name: 'skill-anomaly-detector',
      icon: '⚠️',
      description: 'Detección de anomalías en time series usando NV-Tesseract',
      tier: 'ENTERPRISE',
      price: 3500,
      priceLabel: '€3,500/mes',
      rating: 4.9,
      installs: 167,
      installed: false,
      category: 'Predicción'
    },
    {
      id: 'shopify-sync',
      name: 'skill-shopify-sync',
      icon: '🛍️',
      description: 'Sincronización bidireccional con Shopify (productos, órdenes, clientes)',
      tier: 'CORE',
      price: 0,
      priceLabel: 'Incluido en plan',
      rating: 4.7,
      installs: 567,
      installed: true,
      category: 'E-commerce'
    },
    {
      id: 'n8n-orchestrator',
      name: 'skill-n8n-orchestrator',
      icon: '⚙️',
      description: 'Orquestación de workflows N8N desde lenguaje natural',
      tier: 'PRO',
      price: 1600,
      priceLabel: '€1,600/mes',
      rating: 4.8,
      installs: 423,
      installed: false,
      category: 'Automatización'
    },
    {
      id: 'data-lineage',
      name: 'skill-data-lineage',
      icon: '🔗',
      description: 'Tracking automático de data lineage y data provenance',
      tier: 'ENTERPRISE',
      price: 4000,
      priceLabel: '€4,000/mes',
      rating: 5.0,
      installs: 123,
      installed: false,
      category: 'Governance'
    }
  ]

  const filteredSkills = filter === 'all'
    ? skills
    : skills.filter(s => s.tier === filter)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'CORE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'PRO':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'ENTERPRISE':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const stats = {
    totalSkills: skills.length,
    installedSkills: skills.filter(s => s.installed).length,
    avgRating: (skills.reduce((sum, s) => sum + s.rating, 0) / skills.length).toFixed(1),
    totalInstalls: skills.reduce((sum, s) => sum + s.installs, 0)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 glow-text">
          🛒 NemoClaw Marketplace
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Skills composables - CORE incluidos, PRO y ENTERPRISE con revenue share 70/30
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Total Skills" value={stats.totalSkills.toString()} />
        <StatCard label="Instalados" value={stats.installedSkills.toString()} />
        <StatCard label="Rating Promedio" value={`⭐ ${stats.avgRating}`} />
        <StatCard label="Total Instalaciones" value={`${(stats.totalInstalls / 1000).toFixed(1)}K`} />
      </div>

      {/* Filters */}
      <div className="glass-card border border-white/10 rounded-xl p-3 md:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs md:text-sm text-slate-400">Filtrar por tier:</span>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {(['all', 'CORE', 'PRO', 'ENTERPRISE'] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                  filter === tier
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {tier === 'all' ? 'Todos' : tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            className="glass-card border border-white/10 rounded-xl p-6 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-2xl border border-white/10">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-400">{skill.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTierColor(skill.tier)}`}>
                {skill.tier}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-4 line-clamp-2">
              {skill.description}
            </p>

            {/* Rating & Installs */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <span>⭐</span>
                <span>{skill.rating.toFixed(1)}</span>
              </div>
              <div className="text-xs text-slate-500">
                {skill.installs.toLocaleString()} instalaciones
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-white">
                  {skill.price === 0 ? 'Gratis' : `€${skill.price.toLocaleString()}`}
                </p>
                <p className="text-xs text-slate-500">{skill.priceLabel}</p>
              </div>
              {skill.installed ? (
                <button className="px-4 py-2 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default">
                  ✓ Instalado
                </button>
              ) : (
                <button className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                  Instalar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Share Info */}
      <div className="glass-card border border-purple-500/30 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
          <div className="text-2xl md:text-3xl">💰</div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 glow-text">
              Modelo de Revenue Share
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mb-3 md:mb-4">
              Los developers de skills reciben el 70% de los ingresos, la plataforma retiene el 30%. Crea tus propios skills y monetízalos en el marketplace.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="glass rounded-lg p-3 md:p-4 border border-white/10">
                <p className="text-xl md:text-2xl font-bold text-purple-400 mb-1">70%</p>
                <p className="text-xs text-slate-400">Para el Developer</p>
              </div>
              <div className="glass rounded-lg p-3 md:p-4 border border-white/10">
                <p className="text-xl md:text-2xl font-bold text-blue-400 mb-1">30%</p>
                <p className="text-xs text-slate-400">Para la Plataforma</p>
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
