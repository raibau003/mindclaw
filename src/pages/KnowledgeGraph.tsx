import { useEffect, useRef } from 'react'

export default function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvas = () => {
      // Get container width for responsive sizing
      const container = canvas.parentElement
      if (!container) return

      const isMobile = window.innerWidth < 768
      const width = Math.min(container.clientWidth - 32, isMobile ? 350 : 800)
      const height = isMobile ? 400 : 600
      const scale = width / 800

      // Nodos del Knowledge Graph (posiciones escaladas)
      const nodes = [
        { id: 'mindclaw', x: 400 * scale, y: 300 * scale, label: 'MindClaw', icon: '🧠', color: '#3b82f6', size: (isMobile ? 50 : 60) * scale },
        { id: 'client', x: 250 * scale, y: 150 * scale, label: 'Cliente 1', icon: '👤', color: '#10b981', size: (isMobile ? 40 : 50) * scale },
        { id: 'user', x: 550 * scale, y: 150 * scale, label: 'Usuario 1', icon: '👤', color: '#10b981', size: (isMobile ? 40 : 50) * scale },
        { id: 'project', x: 200 * scale, y: 300 * scale, label: 'Proyecto ABC', icon: '📁', color: '#8b5cf6', size: (isMobile ? 40 : 50) * scale },
        { id: 'dataset', x: 600 * scale, y: 300 * scale, label: 'Ventas 2025', icon: '📊', color: '#f59e0b', size: (isMobile ? 40 : 50) * scale },
        { id: 'pipeline', x: 250 * scale, y: 450 * scale, label: 'ETL Clientes', icon: '⚙️', color: '#06b6d4', size: (isMobile ? 40 : 50) * scale },
        { id: 'model', x: 400 * scale, y: 500 * scale, label: 'Churn Predictor', icon: '🤖', color: '#ec4899', size: (isMobile ? 40 : 50) * scale },
        { id: 'dashboard', x: 550 * scale, y: 450 * scale, label: 'Sales Overview', icon: '📈', color: '#f59e0b', size: (isMobile ? 40 : 50) * scale },
        { id: 'alert', x: 400 * scale, y: 100 * scale, label: 'Stock Bajo', icon: '⚠️', color: '#ef4444', size: (isMobile ? 40 : 50) * scale },
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

      // Set canvas size
      canvas.width = width
      canvas.height = height

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
        ctx.lineWidth = 2 * scale
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
        ctx.lineWidth = 2 * scale
        ctx.stroke()

        // Draw icon
        ctx.font = `${isMobile ? 18 : 24}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.icon, node.x, node.y)

        // Draw label
        ctx.font = `${isMobile ? 10 : 12}px Arial`
        ctx.fillStyle = '#f1f5f9'
        ctx.fillText(node.label, node.x, node.y + node.size / 2 + 15 * scale)
      })
    }

    updateCanvas()

    // Re-draw on window resize
    window.addEventListener('resize', updateCanvas)
    return () => window.removeEventListener('resize', updateCanvas)
  }, [])

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 glow-text">
          🕸️ Knowledge Graph
        </h1>
        <p className="text-sm md:text-base text-slate-400">
          Memoria semántica del sistema - El cerebro de MindClaw
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Entities" value="247" />
        <StatCard label="Relations" value="834" />
        <StatCard label="Levels Depth" value="3" />
        <StatCard label="Vector DB Size" value="5.2GB" />
      </div>

      {/* Graph Visualization */}
      <div className="glass-card border border-white/10 rounded-xl p-4 md:p-6">
        <div className="mb-3 md:mb-4">
          <h2 className="text-base md:text-lg font-semibold text-white glow-text mb-2">
            Visualización del Grafo
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Red de entidades y relaciones del sistema. Los agentes consultan este grafo para tener contexto del negocio.
          </p>
        </div>
        <div className="flex justify-center overflow-x-auto">
          <canvas
            ref={canvasRef}
            className="rounded-lg border border-white/10"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* Entity Types */}
      <div className="glass-card border border-white/10 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-white glow-text mb-3 md:mb-4">
          Tipos de Entidades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <EntityTypeCard icon="👤" label="Clientes & Usuarios" count={45} color="text-emerald-400" />
          <EntityTypeCard icon="📁" label="Proyectos" count={23} color="text-purple-400" />
          <EntityTypeCard icon="📊" label="Datasets" count={89} color="text-amber-400" />
          <EntityTypeCard icon="⚙️" label="Pipelines & Workflows" count={67} color="text-cyan-400" />
        </div>
      </div>

      {/* Capabilities */}
      <div className="glass-card border border-white/10 rounded-xl p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-white glow-text mb-3 md:mb-4">
          Capacidades del Knowledge Graph
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
    <div className="glass-card border border-white/10 rounded-lg p-3 md:p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-lg md:text-2xl font-bold text-white glow-text">{value}</p>
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
