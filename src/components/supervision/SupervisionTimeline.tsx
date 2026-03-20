import type { SupervisionEvent } from '../../store/useStore'

interface SupervisionTimelineProps {
  events: SupervisionEvent[]
}

export default function SupervisionTimeline({ events }: SupervisionTimelineProps) {
  return (
    <div className="space-y-2">
      {events.length === 0 ? (
        <div className="text-center py-8 text-[#666666] text-xs">
          No supervision events yet
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-md bg-[#0a0a0a] border border-[#1a1a1a]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{event.type === 'qa' ? '?' : 'W'}</span>
                <span className="text-xs font-medium text-[#fafafa]">
                  {event.supervisorName}
                </span>
              </div>
              <span className="text-xs text-[#666666]">{event.timestamp}</span>
            </div>
            <div className="text-xs text-[#888888] mb-2">{event.message}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-[#1a1a1a] text-[#666666] rounded">
                {event.action}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
