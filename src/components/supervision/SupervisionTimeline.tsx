import type { SupervisionEvent } from '../../store/useStore'

interface SupervisionTimelineProps {
  events: SupervisionEvent[]
}

export default function SupervisionTimeline({ events }: SupervisionTimelineProps) {
  return (
    <div className="space-y-3">
      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          No supervision events yet
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded-lg border"
            style={{ borderColor: event.color, backgroundColor: `${event.color}10` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{event.type === 'qa' ? '🔍' : '🔧'}</span>
                <span className="font-semibold text-sm" style={{ color: event.color }}>
                  {event.supervisorName}
                </span>
              </div>
              <span className="text-xs text-gray-500">{event.timestamp}</span>
            </div>
            <div className="text-sm text-gray-300 mb-2">{event.message}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-gray-800 rounded">
                {event.action}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
