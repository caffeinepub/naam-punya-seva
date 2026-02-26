import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  useFavorites,
  useAllPrayers,
  useAllRituals,
  useRemoveFavorite,
  type Prayer,
  type Ritual,
} from "../hooks/useQueries";

interface FavPrayerCardProps {
  prayer: Prayer;
  onRemove: () => void;
}

function FavPrayerCard({ prayer, onRemove }: FavPrayerCardProps) {
  return (
    <div
      className="p-4 rounded-2xl fade-in-up"
      style={{
        background: "oklch(0.985 0.012 80)",
        border: "1.5px solid oklch(0.86 0.055 75)",
        boxShadow: "0 2px 12px oklch(0.22 0.05 30 / 0.07)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{
            background: "oklch(0.92 0.08 65)",
            border: "1px solid oklch(0.78 0.10 72 / 0.4)",
          }}
        >
          🙏
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-cinzel font-semibold text-sm"
            style={{ color: "oklch(0.28 0.08 30)" }}
          >
            {prayer.title}
          </h3>
          <span
            className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-cinzel"
            style={{
              background: "oklch(0.92 0.05 65)",
              color: "oklch(0.42 0.10 50)",
              border: "1px solid oklch(0.80 0.08 65)",
            }}
          >
            {prayer.category}
          </span>
          <p
            className="font-devanagari text-sm mt-1.5 line-clamp-2 leading-relaxed"
            style={{ color: "oklch(0.45 0.05 30)" }}
          >
            {prayer.text}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "oklch(0.94 0.03 20)",
            border: "1px solid oklch(0.86 0.055 75)",
          }}
        >
          <span className="text-sm">✕</span>
        </button>
      </div>
    </div>
  );
}

interface FavRitualCardProps {
  ritual: Ritual;
  onRemove: () => void;
}

function FavRitualCard({ ritual, onRemove }: FavRitualCardProps) {
  return (
    <div
      className="p-4 rounded-2xl fade-in-up"
      style={{
        background: "oklch(0.985 0.012 80)",
        border: "1.5px solid oklch(0.86 0.055 75)",
        boxShadow: "0 2px 12px oklch(0.22 0.05 30 / 0.07)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.42 0.13 22) 0%, oklch(0.48 0.15 35) 100%)",
            border: "1px solid oklch(0.55 0.15 25 / 0.5)",
          }}
        >
          🪔
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-cinzel font-semibold text-sm"
            style={{ color: "oklch(0.28 0.08 30)" }}
          >
            {ritual.title}
          </h3>
          <span
            className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-cinzel"
            style={{
              background: "oklch(0.95 0.05 50)",
              color: "oklch(0.42 0.10 40)",
              border: "1px solid oklch(0.80 0.10 55)",
            }}
          >
            {ritual.steps.length} steps
          </span>
          <p
            className="font-crimson text-sm mt-1.5 line-clamp-2 italic leading-relaxed"
            style={{ color: "oklch(0.45 0.05 30)" }}
          >
            {ritual.description}
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "oklch(0.94 0.03 20)",
            border: "1px solid oklch(0.86 0.055 75)",
          }}
        >
          <span className="text-sm">✕</span>
        </button>
      </div>
    </div>
  );
}

export function FavoritesPage() {
  const { data: favorites, isLoading: favLoading } = useFavorites();
  const { data: allPrayers } = useAllPrayers();
  const { data: allRituals } = useAllRituals();
  const removeFavorite = useRemoveFavorite();

  const favPrayerIds = new Set(
    (favorites ?? []).filter((f) => f.itemType === "prayer").map((f) => String(f.id))
  );
  const favRitualIds = new Set(
    (favorites ?? []).filter((f) => f.itemType === "ritual").map((f) => String(f.id))
  );

  const favPrayers = (allPrayers ?? []).filter((p) => favPrayerIds.has(String(p.id)));
  const favRituals = (allRituals ?? []).filter((r) => favRitualIds.has(String(r.id)));

  const handleRemove = async (itemId: bigint, itemType: string) => {
    try {
      await removeFavorite.mutateAsync({ itemId, itemType });
      toast.success("Removed from favorites");
    } catch {
      toast.error("Could not remove from favorites.");
    }
  };

  const isEmpty = favPrayers.length === 0 && favRituals.length === 0;

  return (
    <div className="page-enter space-y-5 pt-2">
      {/* Page Title */}
      <div className="text-center py-2">
        <h2 className="font-cinzel-deco text-xl font-bold" style={{ color: "oklch(0.38 0.14 22)" }}>
          Favorites
        </h2>
        <p className="font-devanagari text-base mt-1" style={{ color: "oklch(0.55 0.12 45)" }}>
          पसंदीदा संग्रह
        </p>
      </div>

      {favLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" style={{ background: "oklch(0.90 0.04 75)" }} />
          ))}
        </div>
      ) : isEmpty ? (
        <div
          className="p-12 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, oklch(0.96 0.025 75) 0%, oklch(0.98 0.015 80) 100%)",
            border: "1px dashed oklch(0.78 0.10 72 / 0.6)",
          }}
        >
          <p className="text-5xl mb-4">❤️</p>
          <h3 className="font-cinzel font-semibold text-base mb-2" style={{ color: "oklch(0.38 0.08 30)" }}>
            No Favorites Yet
          </h3>
          <p className="font-devanagari text-sm" style={{ color: "oklch(0.52 0.06 40)" }}>
            भक्ति में पसंदीदा जोड़ें
          </p>
          <p className="font-crimson text-sm italic mt-1" style={{ color: "oklch(0.62 0.05 40)" }}>
            Tap the heart icon on prayers and rituals to save them here
          </p>
        </div>
      ) : (
        <>
          {/* Favorite Prayers */}
          {favPrayers.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🙏</span>
                <h3 className="font-cinzel font-semibold text-base" style={{ color: "oklch(0.35 0.08 30)" }}>
                  Prayers
                </h3>
                <span
                  className="text-xs font-cinzel px-2 py-0.5 rounded-full"
                  style={{ background: "oklch(0.92 0.05 65)", color: "oklch(0.42 0.10 50)" }}
                >
                  {favPrayers.length}
                </span>
              </div>
              <div className="space-y-3 stagger-children">
                {favPrayers.map((prayer) => (
                  <FavPrayerCard
                    key={String(prayer.id)}
                    prayer={prayer}
                    onRemove={() => handleRemove(prayer.id, "prayer")}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Favorite Rituals */}
          {favRituals.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🪔</span>
                <h3 className="font-cinzel font-semibold text-base" style={{ color: "oklch(0.35 0.08 30)" }}>
                  Rituals
                </h3>
                <span
                  className="text-xs font-cinzel px-2 py-0.5 rounded-full"
                  style={{ background: "oklch(0.95 0.05 50)", color: "oklch(0.42 0.10 40)" }}
                >
                  {favRituals.length}
                </span>
              </div>
              <div className="space-y-3 stagger-children">
                {favRituals.map((ritual) => (
                  <FavRitualCard
                    key={String(ritual.id)}
                    ritual={ritual}
                    onRemove={() => handleRemove(ritual.id, "ritual")}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

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
