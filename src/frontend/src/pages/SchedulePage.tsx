import { Skeleton } from "@/components/ui/skeleton";
import { useFullSchedule, type ScheduleItem } from "../hooks/useQueries";

function getCurrentTimeMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function parseTimeToMinutes(timeStr: string): number {
  // Support formats like "06:00 AM", "6:00", "06:00"
  const cleaned = timeStr.trim().toUpperCase();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3];

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

interface TimelineItemProps {
  item: ScheduleItem;
  isActive: boolean;
  isPast: boolean;
  isLast: boolean;
}

function TimelineItem({ item, isActive, isPast, isLast }: TimelineItemProps) {
  return (
    <div className="flex gap-4 fade-in-up">
      {/* Timeline track */}
      <div className="flex flex-col items-center">
        <div
          className={isActive ? "timeline-dot-active" : "timeline-dot"}
          style={isPast ? { background: "oklch(0.65 0.15 145)", border: "2px solid oklch(0.72 0.18 145)", boxShadow: "none" } : undefined}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{
              background: isPast
                ? "linear-gradient(180deg, oklch(0.65 0.15 145 / 0.5) 0%, oklch(0.86 0.055 75) 100%)"
                : "oklch(0.86 0.055 75)",
              minHeight: "2rem",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="flex-1 mb-4 p-4 rounded-2xl transition-all duration-300"
        style={{
          background: isActive
            ? "linear-gradient(135deg, oklch(0.42 0.13 22) 0%, oklch(0.48 0.15 35) 100%)"
            : isPast
            ? "oklch(0.96 0.02 145 / 0.3)"
            : "oklch(0.985 0.012 80)",
          border: isActive
            ? "2px solid oklch(0.62 0.19 45 / 0.6)"
            : isPast
            ? "1.5px solid oklch(0.72 0.12 145 / 0.3)"
            : "1.5px solid oklch(0.86 0.055 75)",
          boxShadow: isActive
            ? "0 8px 24px oklch(0.42 0.13 22 / 0.25)"
            : "0 2px 8px oklch(0.22 0.05 30 / 0.05)",
        }}
      >
        <div className="flex items-center gap-3 mb-1">
          <span
            className="font-cinzel font-bold text-xl"
            style={{
              color: isActive
                ? "oklch(0.92 0.14 72)"
                : isPast
                ? "oklch(0.65 0.15 145)"
                : "oklch(0.42 0.13 22)",
              textShadow: isActive ? "0 0 12px oklch(0.78 0.16 72 / 0.4)" : "none",
            }}
          >
            {item.time}
          </span>
          {isActive && (
            <span
              className="text-xs font-cinzel px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.62 0.19 45 / 0.2)",
                color: "oklch(0.88 0.14 72)",
                border: "1px solid oklch(0.78 0.16 72 / 0.4)",
                animation: "omPulse 2s ease-in-out infinite",
              }}
            >
              🔴 Now
            </span>
          )}
          {isPast && !isActive && (
            <span
              className="text-xs font-cinzel"
              style={{ color: "oklch(0.60 0.12 145)" }}
            >
              ✓ Done
            </span>
          )}
        </div>
        <h3
          className="font-cinzel font-semibold text-sm"
          style={{
            color: isActive
              ? "oklch(0.92 0.10 72)"
              : isPast
              ? "oklch(0.48 0.08 30)"
              : "oklch(0.28 0.08 30)",
          }}
        >
          {item.name}
        </h3>
        {item.description && (
          <p
            className="font-crimson text-sm mt-1 leading-relaxed"
            style={{
              color: isActive
                ? "oklch(0.80 0.08 72)"
                : isPast
                ? "oklch(0.56 0.05 35)"
                : "oklch(0.48 0.05 35)",
            }}
          >
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export function SchedulePage() {
  const { data: schedule, isLoading } = useFullSchedule();
  const currentMinutes = getCurrentTimeMinutes();

  const sortedSchedule = schedule
    ? [...schedule].sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
    : [];

  // Find active item (current time is between this and next item)
  const activeIndex = sortedSchedule.findLastIndex((item, i) => {
    const itemMinutes = parseTimeToMinutes(item.time);
    const nextMinutes =
      i + 1 < sortedSchedule.length
        ? parseTimeToMinutes(sortedSchedule[i + 1].time)
        : 24 * 60;
    return currentMinutes >= itemMinutes && currentMinutes < nextMinutes;
  });

  return (
    <div className="page-enter space-y-4 pt-2">
      {/* Page Title */}
      <div className="text-center py-2">
        <h2 className="font-cinzel-deco text-xl font-bold" style={{ color: "oklch(0.38 0.14 22)" }}>
          Puja Schedule
        </h2>
        <p className="font-devanagari text-base mt-1" style={{ color: "oklch(0.55 0.12 45)" }}>
          दैनिक पूजा समय सारणी
        </p>
      </div>

      {/* Current time display */}
      <div
        className="flex items-center justify-between px-5 py-3 rounded-2xl"
        style={{
          background: "oklch(0.42 0.13 22)",
          border: "1px solid oklch(0.55 0.15 25 / 0.5)",
          boxShadow: "0 4px 16px oklch(0.22 0.05 30 / 0.15)",
        }}
      >
        <div>
          <p className="font-cinzel text-xs" style={{ color: "oklch(0.78 0.10 72)" }}>
            Current Time
          </p>
          <p
            className="font-cinzel font-bold text-2xl"
            style={{ color: "oklch(0.92 0.14 72)", textShadow: "0 0 12px oklch(0.78 0.16 72 / 0.4)" }}
          >
            {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl om-pulse">🪔</p>
        </div>
      </div>

      {/* Timeline */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <Skeleton className="w-3 h-3 rounded-full" style={{ background: "oklch(0.86 0.055 75)" }} />
                <Skeleton className="w-0.5 h-16 mt-1" style={{ background: "oklch(0.90 0.04 75)" }} />
              </div>
              <Skeleton className="flex-1 h-20 rounded-2xl mb-4" style={{ background: "oklch(0.90 0.04 75)" }} />
            </div>
          ))}
        </div>
      ) : sortedSchedule.length === 0 ? (
        <div
          className="p-10 rounded-2xl text-center"
          style={{ background: "oklch(0.96 0.025 75)", border: "1px dashed oklch(0.78 0.10 72)" }}
        >
          <p className="text-4xl mb-3">⏰</p>
          <p className="font-devanagari text-base" style={{ color: "oklch(0.42 0.06 30)" }}>
            समय सारणी अभी तक नहीं बनी
          </p>
          <p className="font-crimson text-sm italic mt-1" style={{ color: "oklch(0.58 0.05 40)" }}>
            No schedule items found
          </p>
        </div>
      ) : (
        <div className="stagger-children">
          {sortedSchedule.map((item, index) => {
            const itemMinutes = parseTimeToMinutes(item.time);
            const isActive = index === activeIndex;
            const isPast = !isActive && itemMinutes < currentMinutes;
            return (
              <TimelineItem
                key={String(item.id)}
                item={item}
                isActive={isActive}
                isPast={isPast}
                isLast={index === sortedSchedule.length - 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
