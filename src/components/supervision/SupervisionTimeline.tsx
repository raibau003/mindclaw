import type { SupervisionEvent } from '../../store/useStore'

interface SupervisionTimelineProps {
  events: SupervisionEvent[]
}

export default function SupervisionTimeline({ events }: SupervisionTimelineProps) {
  return (
    <div className="space-y-2">
      {events.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-xs">
          No supervision events yet
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="p-3 rounded-md glass-card border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{event.type === 'qa' ? '🔍' : '🔧'}</span>
                <span className="text-xs font-medium text-white">
                  {event.supervisorName}
                </span>
              </div>
              <span className="text-xs text-slate-300">{event.timestamp}</span>
            </div>
            <div className="text-xs text-slate-300 mb-2">{event.message}</div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 glass rounded border ${
                event.type === 'qa'
                  ? 'border-emerald-400/30 text-emerald-300'
                  : 'border-amber-400/30 text-amber-300'
              }`}>
                {event.action}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
