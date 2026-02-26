import type { TabId } from "../App";

interface NavItem {
  id: TabId;
  label: string;
  sanskrit: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", sanskrit: "गृह", icon: "🏠" },
  { id: "prayers", label: "Prayers", sanskrit: "प्रार्थना", icon: "🙏" },
  { id: "rituals", label: "Rituals", sanskrit: "अनुष्ठान", icon: "🪔" },
  { id: "schedule", label: "Schedule", sanskrit: "समय", icon: "⏰" },
  { id: "favorites", label: "Saved", sanskrit: "पसंद", icon: "❤️" },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto z-50 px-2 pb-safe"
      style={{
        background: "linear-gradient(0deg, oklch(0.28 0.10 20) 0%, oklch(0.32 0.12 22 / 0.97) 100%)",
        boxShadow: "0 -2px 20px oklch(0.22 0.05 30 / 0.3)",
        borderTop: "1px solid oklch(0.78 0.16 72 / 0.2)",
      }}
    >
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              type="button"
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-0 flex-1"
              style={{
                background: isActive ? "oklch(0.62 0.19 45 / 0.2)" : "transparent",
                border: isActive ? "1px solid oklch(0.78 0.16 72 / 0.3)" : "1px solid transparent",
              }}
            >
              <span
                className="text-xl transition-transform duration-200"
                style={{ transform: isActive ? "scale(1.15)" : "scale(1)" }}
              >
                {item.icon}
              </span>
              <span
                className="text-xs font-cinzel font-medium truncate"
                style={{
                  color: isActive ? "oklch(0.88 0.16 72)" : "oklch(0.68 0.08 72)",
                  textShadow: isActive ? "0 0 8px oklch(0.78 0.16 72 / 0.4)" : "none",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
