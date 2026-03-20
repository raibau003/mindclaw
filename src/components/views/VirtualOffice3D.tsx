import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { useStore } from '../../store/useStore'
import { useMemo } from 'react'

interface Room3DProps {
  position: [number, number, number]
  color: string
  name: string
  emoji: string
  agentCount: number
}

function Room3D({ position, color, name, emoji, agentCount }: Room3DProps) {
  return (
    <group position={position}>
      {/* Room base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color={color} opacity={0.3} transparent />
      </mesh>

      {/* Room walls */}
      <mesh position={[0, 0.5, -1]}>
        <boxGeometry args={[2, 1, 0.05]} />
        <meshStandardMaterial color={color} opacity={0.15} transparent />
      </mesh>
      <mesh position={[-1, 0.5, 0]}>
        <boxGeometry args={[0.05, 1, 2]} />
        <meshStandardMaterial color={color} opacity={0.15} transparent />
      </mesh>

      {/* Room label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {emoji} {name}
      </Text>

      {/* Agent count badge */}
      <Text
        position={[0, 0.05, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {agentCount}
      </Text>
    </group>
  )
}

interface AgentSphere3DProps {
  position: [number, number, number]
  color: string
  emoji: string
  name: string
}

function AgentSphere3D({ position, color, emoji, name }: AgentSphere3DProps) {
  return (
    <group position={position}>
      {/* Agent sphere */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>

      {/* Emoji label */}
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.2}
        anchorX="center"
        anchorY="middle"
      >
        {emoji}
      </Text>

      {/* Name label */}
      <Text
        position={[0, -0.1, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

export default function VirtualOffice3D() {
  const { agents, rooms } = useStore()

  // Calculate agent positions within rooms
  const agentPositions = useMemo(() => {
    const positions: Record<string, number> = {}

    return agents.map(agent => {
      const room = rooms.find(r => r.id === agent.room)
      if (!room) return null

      // Get room position
      const roomIndex = rooms.indexOf(room)
      const row = Math.floor(roomIndex / 3)
      const col = roomIndex % 3
      const roomX = col * 3 - 3
      const roomZ = row * 3 - 1.5

      // Calculate agent position within room
      const agentsInRoom = positions[room.id] || 0
      positions[room.id] = agentsInRoom + 1

      const offset = agentsInRoom * 0.4 - 0.4

      return {
        agent,
        position: [roomX + offset, 0, roomZ] as [number, number, number],
        color: room.color
      }
    }).filter(Boolean) as Array<{ agent: typeof agents[0], position: [number, number, number], color: string }>
  }, [agents, rooms])

  // Room positions in 3D grid (2 rows x 3 columns)
  const roomPositions: Array<[number, number, number]> = [
    [-3, 0, -1.5],  // Conference
    [0, 0, -1.5],   // Automation Lab
    [3, 0, -1.5],   // Analytics
    [-3, 0, 1.5],   // ML Lab
    [0, 0, 1.5],    // Dev Studio
    [3, 0, 1.5],    // Security
  ]

  return (
    <div className="w-full h-[600px] glass-card rounded-xl overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[5, 8, 5]} fov={50} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#8b5cf6" />
        <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.6} penumbra={1} color="#60a5fa" />

        {/* Rooms */}
        {rooms.map((room, index) => {
          const agentsInRoom = agents.filter(a => a.room === room.id).length
          return (
            <Room3D
              key={room.id}
              position={roomPositions[index]}
              color={room.color}
              name={room.name}
              emoji={room.emoji}
              agentCount={agentsInRoom}
            />
          )
        })}

        {/* Agents */}
        {agentPositions.map(({ agent, position, color }) => (
          <AgentSphere3D
            key={agent.id}
            position={position}
            color={color}
            emoji={agent.emoji}
            name={agent.name}
          />
        ))}

        {/* Grid floor */}
        <gridHelper args={[20, 20, '#334155', '#1e293b']} position={[0, -0.05, 0]} />
      </Canvas>

      {/* Controls legend */}
      <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-lg">
        <p className="text-xs text-slate-300">
          🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
        </p>
      </div>
    </div>
  )
}
