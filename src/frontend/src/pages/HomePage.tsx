import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TabId } from "../App";
import { useAllPrayers, useFullSchedule, usePrayerCompletions } from "../hooks/useQueries";

const GREETINGS = [
  "ॐ नमः शिवाय",
  "जय श्री राम",
  "ॐ नमो नारायण",
  "जय माँ दुर्गा",
  "ॐ गं गणपतये नमः",
  "हरे कृष्ण हरे राम",
];

const TODAY = new Date().toISOString().split("T")[0];

function getTodayFormatted() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDayGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Subha Prabhat";
  if (hour < 17) return "Shubh Dopahar";
  return "Shubh Sandhya";
}

interface QuickNavCardProps {
  icon: string;
  title: string;
  subtitle: string;
  tab: TabId;
  onNavigate: (tab: TabId) => void;
  gradient: string;
}

function QuickNavCard({ icon, title, subtitle, tab, onNavigate, gradient }: QuickNavCardProps) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(tab)}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 active:scale-95 hover:scale-[1.02]"
      style={{
        background: gradient,
        border: "1px solid oklch(0.78 0.16 72 / 0.3)",
        boxShadow: "0 4px 12px oklch(0.22 0.05 30 / 0.1)",
      }}
    >
      <span className="text-3xl">{icon}</span>
      <div className="text-center">
        <p className="font-cinzel font-semibold text-sm" style={{ color: "oklch(0.22 0.05 30)" }}>
          {title}
        </p>
        <p className="text-xs font-devanagari mt-0.5" style={{ color: "oklch(0.42 0.06 30)" }}>
          {subtitle}
        </p>
      </div>
    </button>
  );
}

interface HomePageProps {
  onNavigate: (tab: TabId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: prayers, isLoading: prayersLoading } = useAllPrayers();
  const { data: schedule, isLoading: scheduleLoading } = useFullSchedule();
  const { data: completions } = usePrayerCompletions(TODAY);

  const greeting = GREETINGS[new Date().getDay() % GREETINGS.length];
  const prayerOfDay = prayers && prayers.length > 0 ? prayers[new Date().getDay() % prayers.length] : null;
  const completedIds = new Set((completions ?? []).map(String));
  const completedCount = prayers ? prayers.filter((p) => completedIds.has(String(p.id))).length : 0;

  // Sort schedule by time and get upcoming items
  const upcomingItems = schedule
    ? [...schedule]
        .sort((a, b) => a.time.localeCompare(b.time))
        .slice(0, 3)
    : [];

  return (
    <div className="page-enter space-y-5 pt-2">
      {/* Date & Greeting Hero */}
      <div
        className="rounded-3xl p-5 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.38 0.14 22) 0%, oklch(0.42 0.16 35) 50%, oklch(0.35 0.12 20) 100%)",
          boxShadow: "0 8px 32px oklch(0.22 0.05 30 / 0.25)",
          border: "1px solid oklch(0.55 0.15 35 / 0.4)",
        }}
      >
        {/* Decorative dots */}
        <div className="absolute top-3 left-4 w-2 h-2 rounded-full" style={{ background: "oklch(0.78 0.16 72 / 0.5)" }} />
        <div className="absolute top-3 right-4 w-2 h-2 rounded-full" style={{ background: "oklch(0.78 0.16 72 / 0.5)" }} />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.78 0.16 72 / 0.4)" }} />
          ))}
        </div>

        <p className="font-devanagari text-sm mb-1" style={{ color: "oklch(0.78 0.14 72)" }}>
          {getDayGreeting()}
        </p>
        <h2
          className="font-devanagari text-3xl font-bold mb-2"
          style={{
            color: "oklch(0.92 0.16 72)",
            textShadow: "0 0 20px oklch(0.78 0.16 72 / 0.5)",
          }}
        >
          {greeting}
        </h2>
        <p className="font-crimson text-sm" style={{ color: "oklch(0.82 0.10 72)" }}>
          {getTodayFormatted()}
        </p>
        {completedCount > 0 && (
          <div className="mt-3 inline-block px-3 py-1 rounded-full" style={{ background: "oklch(0.65 0.15 145 / 0.2)", border: "1px solid oklch(0.65 0.15 145 / 0.4)" }}>
            <span className="text-xs font-cinzel" style={{ color: "oklch(0.75 0.15 145)" }}>
              ✓ {completedCount} Prayer{completedCount !== 1 ? "s" : ""} Completed Today
            </span>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      <section>
        <h3 className="font-cinzel font-semibold text-base mb-3" style={{ color: "oklch(0.35 0.08 30)" }}>
          ❈ Explore
        </h3>
        <div className="grid grid-cols-2 gap-3 stagger-children">
          <QuickNavCard
            icon="🙏"
            title="Prayers"
            subtitle="प्रार्थना"
            tab="prayers"
            onNavigate={onNavigate}
            gradient="linear-gradient(135deg, oklch(0.96 0.04 75) 0%, oklch(0.92 0.08 65) 100%)"
          />
          <QuickNavCard
            icon="🪔"
            title="Rituals"
            subtitle="अनुष्ठान"
            tab="rituals"
            onNavigate={onNavigate}
            gradient="linear-gradient(135deg, oklch(0.95 0.05 50) 0%, oklch(0.90 0.09 40) 100%)"
          />
          <QuickNavCard
            icon="⏰"
            title="Schedule"
            subtitle="समय सारणी"
            tab="schedule"
            onNavigate={onNavigate}
            gradient="linear-gradient(135deg, oklch(0.96 0.04 80) 0%, oklch(0.92 0.07 70) 100%)"
          />
          <QuickNavCard
            icon="❤️"
            title="Favorites"
            subtitle="पसंदीदा"
            tab="favorites"
            onNavigate={onNavigate}
            gradient="linear-gradient(135deg, oklch(0.96 0.04 30) 0%, oklch(0.93 0.07 20) 100%)"
          />
        </div>
      </section>

      {/* Today's Schedule Preview */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-cinzel font-semibold text-base" style={{ color: "oklch(0.35 0.08 30)" }}>
            ❈ Today&apos;s Puja Schedule
          </h3>
          <button
            type="button"
            onClick={() => onNavigate("schedule")}
            className="text-xs font-cinzel transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.55 0.15 40)" }}
          >
            View All →
          </button>
        </div>

        {scheduleLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" style={{ background: "oklch(0.90 0.04 75)" }} />
            ))}
          </div>
        ) : upcomingItems.length === 0 ? (
          <div
            className="p-6 rounded-2xl text-center"
            style={{ background: "oklch(0.96 0.025 75)", border: "1px dashed oklch(0.78 0.10 72)" }}
          >
            <p className="font-devanagari text-sm" style={{ color: "oklch(0.52 0.06 40)" }}>
              ईश्वर की कृपा से आज का समय आएगा
            </p>
            <p className="text-xs mt-1 font-crimson italic" style={{ color: "oklch(0.62 0.05 40)" }}>
              Schedule will appear when added
            </p>
          </div>
        ) : (
          <div className="space-y-2 stagger-children">
            {upcomingItems.map((item) => (
              <div
                key={String(item.id)}
                className="flex items-center gap-4 p-4 rounded-2xl fade-in-up"
                style={{
                  background: "oklch(0.985 0.012 80)",
                  border: "1px solid oklch(0.86 0.055 75)",
                  boxShadow: "0 2px 8px oklch(0.22 0.05 30 / 0.06)",
                }}
              >
                <div
                  className="shrink-0 w-14 text-center py-1 px-2 rounded-xl"
                  style={{ background: "oklch(0.42 0.13 22)", border: "1px solid oklch(0.55 0.15 25)" }}
                >
                  <span className="font-cinzel text-xs font-bold" style={{ color: "oklch(0.92 0.12 72)" }}>
                    {item.time}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-cinzel font-semibold text-sm truncate" style={{ color: "oklch(0.30 0.08 30)" }}>
                    {item.name}
                  </p>
                  <p className="text-xs font-crimson truncate mt-0.5" style={{ color: "oklch(0.52 0.05 40)" }}>
                    {item.description}
                  </p>
                </div>
                <span className="text-lg">🪔</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Prayer of the Day */}
      <section>
        <h3 className="font-cinzel font-semibold text-base mb-3" style={{ color: "oklch(0.35 0.08 30)" }}>
          ❈ Prayer of the Day
        </h3>
        {prayersLoading ? (
          <Skeleton className="h-40 w-full rounded-2xl" style={{ background: "oklch(0.90 0.04 75)" }} />
        ) : prayerOfDay ? (
          <div
            className="p-5 rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.42 0.13 22) 0%, oklch(0.38 0.14 22 / 0.95) 100%)",
              boxShadow: "0 8px 24px oklch(0.22 0.05 30 / 0.2)",
              border: "1px solid oklch(0.55 0.15 25 / 0.5)",
            }}
          >
            {/* Decorative element */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
              style={{
                background: "oklch(0.78 0.16 72)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">🙏</span>
              <div className="flex-1">
                <h4 className="font-cinzel font-bold text-base" style={{ color: "oklch(0.92 0.14 72)" }}>
                  {prayerOfDay.title}
                </h4>
                <Badge className="mt-1 text-xs font-cinzel badge-aarti border-0">
                  {prayerOfDay.category}
                </Badge>
              </div>
            </div>
            <p
              className="font-devanagari text-base leading-relaxed mb-3"
              style={{ color: "oklch(0.90 0.10 72)", lineHeight: "1.9" }}
            >
              {prayerOfDay.text.length > 150 ? `${prayerOfDay.text.slice(0, 150)}...` : prayerOfDay.text}
            </p>
            {prayerOfDay.translation && (
              <p className="font-crimson text-sm italic" style={{ color: "oklch(0.78 0.08 72)", borderTop: "1px solid oklch(0.78 0.16 72 / 0.2)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
                {prayerOfDay.translation.length > 120
                  ? `${prayerOfDay.translation.slice(0, 120)}...`
                  : prayerOfDay.translation}
              </p>
            )}
            <button
              type="button"
              onClick={() => onNavigate("prayers")}
              className="mt-3 text-xs font-cinzel transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.82 0.14 72)" }}
            >
              Read Full Prayer →
            </button>
          </div>
        ) : (
          <div
            className="p-6 rounded-2xl text-center"
            style={{ background: "oklch(0.96 0.025 75)", border: "1px dashed oklch(0.78 0.10 72)" }}
          >
            <p className="text-2xl mb-2">🙏</p>
            <p className="font-devanagari text-sm" style={{ color: "oklch(0.52 0.06 40)" }}>
              भगवान की महिमा अपरंपार है
            </p>
            <p className="text-xs mt-1 font-crimson italic" style={{ color: "oklch(0.62 0.05 40)" }}>
              Prayers will appear when added
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-4 mt-4">
        <p className="text-xs font-crimson italic" style={{ color: "oklch(0.58 0.07 40)" }}>
          © 2026. Built with{" "}
          <span style={{ color: "oklch(0.62 0.19 22)" }}>♥</span> using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
            style={{ color: "oklch(0.58 0.14 45)" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
