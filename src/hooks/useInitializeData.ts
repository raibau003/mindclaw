import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import type { Agent, Task, LogEntry, SupervisionEvent, Room } from '../store/useStore'

export function useInitializeData() {
  const { setAgents, setSupervisors, setTasks, setRooms, addLog, addSupervisionEvent } = useStore()

  useEffect(() => {
    // Initialize agents
    const agents: Agent[] = [
      {
        id: 'data-engineer',
        name: 'Data Engineer Agent',
        emoji: '💾',
        type: 'Data Engineering',
        status: 'active',
        position: { x: 15, y: 20 },
        room: 'analytics',
        tasks: 12456,
        successRate: 98.5,
        model: 'nvidia/nemotron-70b-instruct',
        temperature: 0.3,
        maxTokens: 4096,
        skills: [
          { name: 'skill-sap-connector', version: 'v2.1.0' },
          { name: 'skill-db-connector', version: 'v1.8.0' },
          { name: 'skill-data-cleaner', version: 'v3.0.0' },
        ],
      },
      {
        id: 'automation',
        name: 'Automation Agent',
        emoji: '⚙️',
        type: 'Process Automation',
        status: 'active',
        position: { x: 45, y: 20 },
        room: 'automation-lab',
        tasks: 8234,
        successRate: 96.2,
        model: 'nvidia/nemotron-70b-instruct',
        temperature: 0.5,
        maxTokens: 4096,
        skills: [
          { name: 'skill-web-scraper', version: 'v2.5.0' },
          { name: 'skill-computer-use', version: 'v1.2.0' },
          { name: 'skill-n8n-generator', version: 'v1.0.0' },
        ],
      },
      {
        id: 'data-science',
        name: 'Data Science Agent',
        emoji: '🧠',
        type: 'Machine Learning',
        status: 'active',
        position: { x: 75, y: 20 },
        room: 'ml-lab',
        tasks: 5123,
        successRate: 94.8,
        model: 'nvidia/nemotron-70b-instruct',
        temperature: 0.7,
        maxTokens: 8192,
        skills: [
          { name: 'skill-sales-forecaster', version: 'v1.5.0' },
          { name: 'skill-churn-predictor', version: 'v2.0.0' },
          { name: 'skill-rfm-segmentation', version: 'v1.3.0' },
        ],
      },
      {
        id: 'vision',
        name: 'Vision Agent',
        emoji: '👁️',
        type: 'Computer Vision',
        status: 'idle',
        position: { x: 15, y: 60 },
        room: 'security',
        tasks: 3456,
        successRate: 97.1,
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.4,
        maxTokens: 4096,
        skills: [
          { name: 'skill-vision-ppe', version: 'v1.8.0' },
          { name: 'skill-vision-retail', version: 'v1.5.0' },
        ],
      },
      {
        id: 'developer',
        name: 'Developer Agent',
        emoji: '👨‍💻',
        type: 'Software Development',
        status: 'active',
        position: { x: 45, y: 60 },
        room: 'dev-studio',
        tasks: 15678,
        successRate: 99.1,
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.6,
        maxTokens: 8192,
        skills: [
          { name: 'skill-react-dev', version: 'v3.2.0' },
          { name: 'skill-typescript', version: 'v2.1.0' },
          { name: 'skill-git-expert', version: 'v1.9.0' },
        ],
      },
    ]

    // Initialize supervisors
    const supervisors: Agent[] = [
      {
        id: 'qa-supervisor',
        name: 'QA Supervisor',
        emoji: '🔍',
        type: 'Quality Assurance',
        status: 'active',
        tasks: 2341,
        successRate: 99.5,
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.2,
        maxTokens: 4096,
        skills: [
          { name: 'skill-code-review', version: 'v2.0.0' },
          { name: 'skill-quality-check', version: 'v1.5.0' },
        ],
      },
      {
        id: 'error-recovery',
        name: 'Error Recovery Supervisor',
        emoji: '🔧',
        type: 'Error Recovery',
        status: 'active',
        tasks: 1876,
        successRate: 98.8,
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.4,
        maxTokens: 4096,
        skills: [
          { name: 'skill-error-detection', version: 'v1.8.0' },
          { name: 'skill-auto-fix', version: 'v2.1.0' },
        ],
      },
    ]

    // Initialize tasks
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Sync SAP customer data',
        description: 'Extract and transform customer records from SAP B1',
        status: 'in_progress',
        agentId: 'data-engineer',
        agentName: 'Data Engineer',
        color: '#1e40af',
        duration: '15m left',
        resources: ['SAP B1', 'PostgreSQL'],
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'task-2',
        title: 'Generate weekly sales report',
        description: 'Create automated report with charts and insights',
        status: 'inbox',
        agentId: 'automation',
        agentName: 'Automation',
        color: '#10b981',
        resources: ['Excel', 'Email'],
        priority: 'medium',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'task-3',
        title: 'Train churn prediction model',
        description: 'Update ML model with latest customer behavior data',
        status: 'review',
        agentId: 'data-science',
        agentName: 'Data Science',
        color: '#8b5cf6',
        duration: '30m left',
        resources: ['XGBoost', 'MLflow'],
        priority: 'high',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'task-4',
        title: 'Inspect warehouse safety equipment',
        description: 'Analyze CCTV footage for PPE compliance',
        status: 'done',
        agentId: 'vision',
        agentName: 'Vision',
        color: '#f59e0b',
        resources: ['CCTV', 'Vision API'],
        priority: 'low',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date().toISOString(),
      },
      {
        id: 'task-5',
        title: 'Refactor authentication module',
        description: 'Improve JWT token handling and refresh logic',
        status: 'in_progress',
        agentId: 'developer',
        agentName: 'Developer',
        color: '#06b6d4',
        duration: '45m left',
        resources: ['TypeScript', 'JWT'],
        priority: 'medium',
        createdAt: new Date().toISOString(),
      },
    ]

    // Initialize rooms
    const rooms: Room[] = [
      { id: 'conference', name: 'Conference Room', icon: '🎯', color: '#3b82f6', agents: [] },
      { id: 'automation-lab', name: 'Automation Lab', icon: '⚙️', color: '#10b981', agents: ['automation'] },
      { id: 'analytics', name: 'Analytics Studio', icon: '📊', color: '#8b5cf6', agents: ['data-engineer'] },
      { id: 'ml-lab', name: 'ML Lab', icon: '🧠', color: '#f59e0b', agents: ['data-science'] },
      { id: 'dev-studio', name: 'Dev Studio', icon: '💻', color: '#06b6d4', agents: ['developer'] },
      { id: 'security', name: 'Security Ops', icon: '🛡️', color: '#ef4444', agents: ['vision'] },
    ]

    setAgents(agents)
    setSupervisors(supervisors)
    setTasks(tasks)
    setRooms(rooms)

    // Add initial logs
    const initialLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString().slice(11, 23),
        level: 'INFO',
        agentId: 'data-engineer',
        agentName: 'Data Engineer',
        message: 'SAP connection established successfully',
      },
      {
        id: '2',
        timestamp: new Date().toISOString().slice(11, 23),
        level: 'SUCCESS',
        agentId: 'automation',
        agentName: 'Automation',
        message: 'Weekly report generated and sent to 15 recipients',
      },
      {
        id: '3',
        timestamp: new Date().toISOString().slice(11, 23),
        level: 'WARN',
        agentId: 'data-science',
        agentName: 'Data Science',
        message: 'Model accuracy below threshold: 85.2% (expected: 90%)',
      },
    ]

    initialLogs.forEach(addLog)

    // Add initial supervision events
    const initialEvents: SupervisionEvent[] = [
      {
        id: '1',
        timestamp: new Date().toISOString().slice(11, 19),
        supervisorId: 'qa-supervisor',
        supervisorName: 'QA Supervisor',
        agentId: 'data-science',
        message: 'Reviewed model training process. Found accuracy below threshold.',
        action: '✓ Quality Check',
        type: 'qa',
        color: '#14b8a6',
      },
      {
        id: '2',
        timestamp: new Date().toISOString().slice(11, 19),
        supervisorId: 'error-recovery',
        supervisorName: 'Error Recovery',
        agentId: 'data-science',
        message: 'Auto-adjusted hyperparameters. Retraining model...',
        action: '🔧 Auto-Fix Applied',
        type: 'error_recovery',
        color: '#f97316',
      },
    ]

    initialEvents.forEach(addSupervisionEvent)

    // Simulate live logs
    const logInterval = setInterval(() => {
      const messages = [
        { agent: 'data-engineer', level: 'INFO' as const, msg: 'Processing batch #1247 - 5000 records' },
        { agent: 'automation', level: 'SUCCESS' as const, msg: 'Invoice #INV-2024-001 generated' },
        { agent: 'data-science', level: 'INFO' as const, msg: 'Training epoch 45/100 - loss: 0.023' },
        { agent: 'developer', level: 'SUCCESS' as const, msg: 'Unit tests passed: 127/127' },
      ]

      const random = messages[Math.floor(Math.random() * messages.length)]
      const agent = agents.find((a) => a.id === random.agent)

      if (agent) {
        addLog({
          id: Date.now().toString(),
          timestamp: new Date().toISOString().slice(11, 23),
          level: random.level,
          agentId: agent.id,
          agentName: agent.name,
          message: random.msg,
        })
      }
    }, 5000)

    return () => clearInterval(logInterval)
  }, [setAgents, setSupervisors, setTasks, setRooms, addLog, addSupervisionEvent])
}
