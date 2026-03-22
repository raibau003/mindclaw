import { useEffect, useRef } from 'react'

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Nodos del Knowledge Graph
  const nodes = [
    { id: 'mindclaw', x: 400, y: 300, label: 'MindClaw', icon: '🧠', color: '#3b82f6', size: 60 },
    { id: 'client', x: 250, y: 150, label: 'Cliente 1', icon: '👤', color: '#10b981', size: 50 },
    { id: 'user', x: 550, y: 150, label: 'Usuario 1', icon: '👤', color: '#10b981', size: 50 },
    { id: 'project', x: 200, y: 300, label: 'Proyecto ABC', icon: '📁', color: '#8b5cf6', size: 50 },
    { id: 'dataset', x: 600, y: 300, label: 'Ventas 2025', icon: '📊', color: '#f59e0b', size: 50 },
    { id: 'pipeline', x: 250, y: 450, label: 'ETL Clientes', icon: '⚙️', color: '#06b6d4', size: 50 },
    { id: 'model', x: 400, y: 500, label: 'Churn Predictor', icon: '🤖', color: '#ec4899', size: 50 },
    { id: 'dashboard', x: 550, y: 450, label: 'Sales Overview', icon: '📈', color: '#f59e0b', size: 50 },
    { id: 'alert', x: 400, y: 100, label: 'Stock Bajo', icon: '⚠️', color: '#ef4444', size: 50 },
  ]

  // Conexiones entre nodos
  const edges = [
    { from: 'mindclaw', to: 'client' },
    { from: 'mindclaw', to: 'user' },
    { from: 'mindclaw', to: 'project' },
    { from: 'mindclaw', to: 'dataset' },
    { from: 'mindclaw', to: 'pipeline' },
    { from: 'mindclaw', to: 'model' },
    { from: 'mindclaw', to: 'dashboard' },
    { from: 'mindclaw', to: 'alert' },
    { from: 'project', to: 'dataset' },
    { from: 'dataset', to: 'pipeline' },
    { from: 'pipeline', to: 'model' },
    { from: 'model', to: 'dashboard' },
    { from: 'dashboard', to: 'alert' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from)
      const toNode = nodes.find(n => n.id === edge.to)
      if (!fromNode || !toNode) return

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw nodes
    nodes.forEach(node => {
      // Draw circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.size / 2, 0, Math.PI * 2)
      ctx.fillStyle = node.color + '20'
      ctx.fill()
      ctx.strokeStyle = node.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw icon
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.icon, node.x, node.y)

      // Draw label
      ctx.font = '12px Arial'
      ctx.fillStyle = '#f1f5f9'
      ctx.fillText(node.label, node.x, node.y + node.size / 2 + 15)
    })
  }, [])

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 glow-text">
          🕸️ Knowledge Graph
        </h1>
        <p className="text-slate-400">
          Memoria semántica del sistema - El cerebro de MindClaw
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Entities" value="247" />
        <StatCard label="Relations" value="834" />
        <StatCard label="Levels Depth" value="3" />
        <StatCard label="Vector DB Size" value="5.2GB" />
      </div>

      {/* Graph Visualization */}
      <div className="glass-card border border-white/10 rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white glow-text mb-2">
            Visualización del Grafo
          </h2>
          <p className="text-sm text-slate-400">
            Red de entidades y relaciones del sistema. Los agentes consultan este grafo para tener contexto del negocio.
          </p>
        </div>
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="rounded-lg border border-white/10"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Entity Types */}
      <div className="glass-card border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white glow-text mb-4">
          Tipos de Entidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <EntityTypeCard icon="👤" label="Clientes & Usuarios" count={45} color="text-emerald-400" />
          <EntityTypeCard icon="📁" label="Proyectos" count={23} color="text-purple-400" />
          <EntityTypeCard icon="📊" label="Datasets" count={89} color="text-amber-400" />
          <EntityTypeCard icon="⚙️" label="Pipelines & Workflows" count={67} color="text-cyan-400" />
        </div>
      </div>

      {/* Capabilities */}
      <div className="glass-card border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white glow-text mb-4">
          Capacidades del Knowledge Graph
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CapabilityCard
            icon="🔍"
            title="Búsqueda Semántica"
            description="Los agentes encuentran información relevante usando embeddings y similitud semántica"
          />
          <CapabilityCard
            icon="🧩"
            title="Relaciones Contextuales"
            description="Conoce cómo se conectan clientes, proyectos, datasets y modelos entre sí"
          />
          <CapabilityCard
            icon="📚"
            title="Memoria Persistente"
            description="Todo el conocimiento se almacena en vector database para consultas rápidas"
          />
          <CapabilityCard
            icon="🔄"
            title="Actualización Continua"
            description="El grafo se actualiza automáticamente con cada nueva entidad o relación"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card border border-white/10 rounded-lg p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white glow-text">{value}</p>
    </div>
  )
}

function EntityTypeCard({
  icon,
  label,
  count,
  color
}: {
  icon: string
  label: string
  count: number
  color: string
}) {
  return (
    <div className="glass-card border border-white/10 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xl font-bold ${color}`}>{count}</span>
      </div>
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  )
}

function CapabilityCard({
  icon,
  title,
  description
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="glass-card border border-white/10 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
