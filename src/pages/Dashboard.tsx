import { useEffect, useState } from 'react'

interface Agent {
  id: string
  name: string
  status: 'active' | 'idle' | 'error'
  tasks: number
  emoji: string
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([])

  useEffect(() => {
    // Load agents data
    import('../data/agents.json').then((data) => {
      const agentsData = data.default || data
      const mapped: Agent[] = agentsData.map((a: any) => ({
        id: a.id,
        name: a.name,
        status: (a.status === 'live' ? 'active' : 'idle') as 'active' | 'idle' | 'error',
        tasks: a.metrics?.totalExecutions || 0,
        emoji: a.icon === 'database' ? '💾' : a.icon === 'cpu' ? '⚙️' : a.icon === 'brain' ? '🧠' : a.icon === 'eye' ? '👁️' : '🤖'
      }))
      setAgents(mapped)
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MindClaw Mission Control</h1>
        <p className="text-gray-400">Monitor and manage your AI agents</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Active Agents</div>
          <div className="text-3xl font-bold text-green-400">
            {agents.filter(a => a.status === 'active').length}
          </div>
        </div>

        <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Total Tasks</div>
          <div className="text-3xl font-bold text-blue-400">
            {agents.reduce((sum, a) => sum + (a.tasks || 0), 0)}
          </div>
        </div>

        <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Success Rate</div>
          <div className="text-3xl font-bold text-purple-400">98.5%</div>
        </div>

        <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
          <div className="text-sm text-gray-400 mb-2">Uptime</div>
          <div className="text-3xl font-bold text-cyan-400">99.9%</div>
        </div>
      </div>

      {/* Agents List */}
      <div className="bg-[#0d1321] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Active Agents</h2>
        <div className="space-y-4">
          {agents.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Loading agents...
            </div>
          ) : (
            agents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 bg-[#0a0f1e] rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{agent.emoji}</div>
                  <div>
                    <div className="font-semibold">{agent.name}</div>
                    <div className="text-sm text-gray-400">
                      {agent.tasks} tasks completed
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      agent.status === 'active'
                        ? 'bg-green-400 animate-pulse'
                        : agent.status === 'idle'
                        ? 'bg-yellow-400'
                        : 'bg-red-400'
                    }`}
                  />
                  <span className="text-sm text-gray-400 capitalize">
                    {agent.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
