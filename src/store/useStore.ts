import { create } from 'zustand'

export interface Agent {
  id: string
  name: string
  emoji: string
  type: string
  status: 'active' | 'idle' | 'error'
  position?: { x: number; y: number }
  room?: string
  tasks: number
  successRate: number
  model: string
  temperature: number
  maxTokens: number
  skills: Array<{ name: string; version: string }>
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'inbox' | 'in_progress' | 'review' | 'done'
  agentId: string
  agentName: string
  color: string
  duration?: string
  resources: string[]
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  completedAt?: string
}

export interface LogEntry {
  id: string
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS'
  agentId: string
  agentName: string
  message: string
}

export interface SupervisionEvent {
  id: string
  timestamp: string
  supervisorId: string
  supervisorName: string
  agentId: string
  message: string
  action: string
  type: 'qa' | 'error_recovery'
  color: string
}

export interface Room {
  id: string
  name: string
  icon: string
  emoji: string
  color: string
  agents: string[]
}

interface StoreState {
  // Agents
  agents: Agent[]
  supervisors: Agent[]
  selectedAgentId: string | null

  // Tasks
  tasks: Task[]
  selectedTaskId: string | null

  // Logs
  logs: LogEntry[]

  // Supervision
  supervisionEvents: SupervisionEvent[]

  // Rooms
  rooms: Room[]

  // View mode
  viewMode: 'dashboard' | 'office' | 'kanban' | 'agent-detail'

  // Actions
  setAgents: (agents: Agent[]) => void
  setSupervisors: (supervisors: Agent[]) => void
  selectAgent: (id: string | null) => void
  updateAgentPosition: (id: string, position: { x: number; y: number }) => void
  updateAgentRoom: (id: string, roomId: string) => void
  updateAgentStatus: (id: string, status: Agent['status']) => void

  setTasks: (tasks: Task[]) => void
  selectTask: (id: string | null) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  addTask: (task: Task) => void

  addLog: (log: LogEntry) => void
  clearLogs: () => void

  addSupervisionEvent: (event: SupervisionEvent) => void

  setRooms: (rooms: Room[]) => void
  moveAgentToRoom: (agentId: string, roomId: string) => void

  setViewMode: (mode: StoreState['viewMode']) => void
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  agents: [],
  supervisors: [],
  selectedAgentId: null,
  tasks: [],
  selectedTaskId: null,
  logs: [],
  supervisionEvents: [],
  rooms: [],
  viewMode: 'dashboard',

  // Actions
  setAgents: (agents) => set({ agents }),
  setSupervisors: (supervisors) => set({ supervisors }),
  selectAgent: (id) => set({ selectedAgentId: id }),

  updateAgentPosition: (id, position) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, position } : agent
      ),
    })),

  updateAgentRoom: (id, roomId) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, room: roomId } : agent
      ),
    })),

  updateAgentStatus: (id, status) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, status } : agent
      ),
    })),

  setTasks: (tasks) => set({ tasks }),
  selectTask: (id) => set({ selectedTaskId: id }),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs].slice(0, 100), // Keep last 100 logs
    })),

  clearLogs: () => set({ logs: [] }),

  addSupervisionEvent: (event) =>
    set((state) => ({
      supervisionEvents: [event, ...state.supervisionEvents].slice(0, 50),
    })),

  setRooms: (rooms) => set({ rooms }),

  moveAgentToRoom: (agentId, roomId) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, room: roomId } : agent
      ),
      rooms: state.rooms.map((room) => ({
        ...room,
        agents: room.id === roomId
          ? [...room.agents.filter((id) => id !== agentId), agentId]
          : room.agents.filter((id) => id !== agentId),
      })),
    })),

  setViewMode: (mode) => set({ viewMode: mode }),
}))
