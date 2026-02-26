import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  usePrayersByCategory,
  usePrayerCompletions,
  useMarkPrayerCompleted,
  useAddFavorite,
  useRemoveFavorite,
  useFavorites,
  type Prayer,
} from "../hooks/useQueries";

const CATEGORIES = ["All", "Morning", "Evening", "Aarti"];
const TODAY = new Date().toISOString().split("T")[0];

function CategoryBadgeStyle(cat: string) {
  switch (cat.toLowerCase()) {
    case "morning": return "badge-morning";
    case "evening": return "badge-evening";
    case "aarti": return "badge-aarti";
    default: return "badge-all";
  }
}

interface PrayerCardProps {
  prayer: Prayer;
  isCompleted: boolean;
  isFavorited: boolean;
  onComplete: () => void;
  onToggleFavorite: () => void;
}

function PrayerCard({ prayer, isCompleted, isFavorited, onComplete, onToggleFavorite }: PrayerCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 fade-in-up ${isCompleted ? "completed-glow" : ""}`}
      style={{
        background: isCompleted
          ? "linear-gradient(135deg, oklch(0.96 0.04 145 / 0.3) 0%, oklch(0.985 0.012 80) 100%)"
          : "oklch(0.985 0.012 80)",
        border: isCompleted
          ? "1.5px solid oklch(0.65 0.15 145 / 0.5)"
          : "1.5px solid oklch(0.86 0.055 75)",
        boxShadow: "0 2px 12px oklch(0.22 0.05 30 / 0.07)",
      }}
    >
      {/* Card Header */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start gap-3">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: isCompleted
                ? "oklch(0.65 0.15 145 / 0.15)"
                : "oklch(0.92 0.08 65)",
              border: "1px solid oklch(0.78 0.10 72 / 0.4)",
            }}
          >
            {isCompleted ? "✅" : "🙏"}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-cinzel font-semibold text-sm leading-snug"
              style={{ color: "oklch(0.28 0.08 30)" }}
            >
              {prayer.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-cinzel ${CategoryBadgeStyle(prayer.category)}`}>
                {prayer.category}
              </span>
              {isCompleted && (
                <span className="text-xs font-cinzel" style={{ color: "oklch(0.55 0.14 145)" }}>
                  ✓ Done today
                </span>
              )}
            </div>
            {!expanded && (
              <p
                className="mt-2 font-devanagari text-sm line-clamp-2"
                style={{ color: "oklch(0.42 0.05 30)", lineHeight: "1.7" }}
              >
                {prayer.text}
              </p>
            )}
          </div>
          <span className="text-xs" style={{ color: "oklch(0.62 0.07 40)" }}>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Sanskrit Text */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "oklch(0.42 0.13 22)",
              border: "1px solid oklch(0.55 0.15 25 / 0.5)",
            }}
          >
            <p
              className="font-devanagari text-base leading-loose"
              style={{ color: "oklch(0.92 0.10 72)", lineHeight: "2" }}
            >
              {prayer.text}
            </p>
          </div>

          {/* Translation */}
          {prayer.translation && (
            <div
              className="p-3 rounded-xl"
              style={{
                background: "oklch(0.94 0.025 80)",
                border: "1px dashed oklch(0.78 0.10 72 / 0.5)",
              }}
            >
              <p className="text-xs font-cinzel font-semibold mb-1.5" style={{ color: "oklch(0.55 0.12 45)" }}>
                ✦ English Translation
              </p>
              <p
                className="font-crimson text-sm italic leading-relaxed"
                style={{ color: "oklch(0.38 0.06 30)" }}
              >
                {prayer.translation}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onComplete}
              disabled={isCompleted}
              className="flex-1 py-2.5 px-3 rounded-xl font-cinzel font-semibold text-xs transition-all duration-200 disabled:opacity-60"
              style={{
                background: isCompleted
                  ? "oklch(0.65 0.15 145 / 0.15)"
                  : "oklch(0.62 0.19 45)",
                color: isCompleted
                  ? "oklch(0.55 0.14 145)"
                  : "oklch(0.985 0 0)",
                border: isCompleted
                  ? "1px solid oklch(0.65 0.15 145 / 0.4)"
                  : "1px solid oklch(0.68 0.21 48)",
                boxShadow: isCompleted ? "none" : "0 4px 12px oklch(0.62 0.19 45 / 0.3)",
              }}
            >
              {isCompleted ? "✓ Completed Today" : "Mark as Completed"}
            </button>
            <button
              type="button"
              onClick={onToggleFavorite}
              className="py-2.5 px-4 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                background: isFavorited
                  ? "oklch(0.62 0.19 22 / 0.15)"
                  : "oklch(0.94 0.025 80)",
                border: isFavorited
                  ? "1px solid oklch(0.62 0.19 22 / 0.5)"
                  : "1px solid oklch(0.86 0.055 75)",
              }}
            >
              <span className="text-lg">{isFavorited ? "❤️" : "🤍"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PrayersPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: prayers, isLoading } = usePrayersByCategory(activeCategory);
  const { data: completions } = usePrayerCompletions(TODAY);
  const { data: favorites } = useFavorites();
  const markCompleted = useMarkPrayerCompleted();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const completedIds = new Set((completions ?? []).map(String));
  const favoritedIds = new Set(
    (favorites ?? []).filter((f) => f.itemType === "prayer").map((f) => String(f.id))
  );

  const handleComplete = async (prayer: Prayer) => {
    try {
      await markCompleted.mutateAsync({ prayerId: prayer.id, date: TODAY });
      toast.success("🙏 Prayer completed! Jai Shri Ram", {
        style: { background: "oklch(0.42 0.13 22)", color: "oklch(0.92 0.10 72)", border: "1px solid oklch(0.55 0.15 25)" },
      });
    } catch {
      toast.error("Could not mark prayer. Please try again.");
    }
  };

  const handleToggleFavorite = async (prayer: Prayer) => {
    const isFav = favoritedIds.has(String(prayer.id));
    try {
      if (isFav) {
        await removeFavorite.mutateAsync({ itemId: prayer.id, itemType: "prayer" });
        toast.success("Removed from favorites");
      } else {
        await addFavorite.mutateAsync({ itemId: prayer.id, itemType: "prayer" });
        toast.success("❤️ Added to favorites");
      }
    } catch {
      toast.error("Could not update favorites.");
    }
  };

  return (
    <div className="page-enter space-y-4 pt-2">
      {/* Page Title */}
      <div className="text-center py-2">
        <h2 className="font-cinzel-deco text-xl font-bold" style={{ color: "oklch(0.38 0.14 22)" }}>
          Prayers
        </h2>
        <p className="font-devanagari text-base mt-1" style={{ color: "oklch(0.55 0.12 45)" }}>
          प्रार्थना संग्रह
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="shrink-0 px-4 py-2 rounded-full font-cinzel font-medium text-xs transition-all duration-200"
            style={{
              background: activeCategory === cat ? "oklch(0.42 0.13 22)" : "oklch(0.94 0.025 80)",
              color: activeCategory === cat ? "oklch(0.92 0.10 72)" : "oklch(0.42 0.08 30)",
              border: activeCategory === cat
                ? "1.5px solid oklch(0.55 0.15 25)"
                : "1.5px solid oklch(0.86 0.055 75)",
              boxShadow: activeCategory === cat ? "0 4px 12px oklch(0.42 0.13 22 / 0.3)" : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prayers List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" style={{ background: "oklch(0.90 0.04 75)" }} />
          ))}
        </div>
      ) : !prayers || prayers.length === 0 ? (
        <div
          className="p-10 rounded-2xl text-center"
          style={{ background: "oklch(0.96 0.025 75)", border: "1px dashed oklch(0.78 0.10 72)" }}
        >
          <p className="text-4xl mb-3">🙏</p>
          <p className="font-devanagari text-base" style={{ color: "oklch(0.42 0.06 30)" }}>
            इस श्रेणी में कोई प्रार्थना नहीं है
          </p>
          <p className="font-crimson text-sm italic mt-1" style={{ color: "oklch(0.58 0.05 40)" }}>
            No prayers in this category yet
          </p>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {prayers.map((prayer) => (
            <PrayerCard
              key={String(prayer.id)}
              prayer={prayer}
              isCompleted={completedIds.has(String(prayer.id))}
              isFavorited={favoritedIds.has(String(prayer.id))}
              onComplete={() => handleComplete(prayer)}
              onToggleFavorite={() => handleToggleFavorite(prayer)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
