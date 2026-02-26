import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  useAllRituals,
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
  type Ritual,
} from "../hooks/useQueries";

interface RitualDetailProps {
  ritual: Ritual;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
}

function RitualDetail({ ritual, isFavorited, onToggleFavorite, onBack }: RitualDetailProps) {
  return (
    <div className="page-enter space-y-4">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 font-cinzel text-sm transition-opacity hover:opacity-70"
        style={{ color: "oklch(0.55 0.12 45)" }}
      >
        ← Back to Rituals
      </button>

      {/* Hero */}
      <div
        className="rounded-3xl p-6"
        style={{
          background: "linear-gradient(135deg, oklch(0.38 0.14 22) 0%, oklch(0.45 0.16 35) 100%)",
          boxShadow: "0 8px 24px oklch(0.22 0.05 30 / 0.25)",
          border: "1px solid oklch(0.55 0.15 35 / 0.4)",
        }}
      >
        <div className="text-4xl mb-3">🪔</div>
        <h2
          className="font-cinzel-deco font-bold text-2xl mb-2"
          style={{ color: "oklch(0.92 0.14 72)", textShadow: "0 0 20px oklch(0.78 0.16 72 / 0.4)" }}
        >
          {ritual.title}
        </h2>
        <p
          className="font-crimson text-base italic leading-relaxed"
          style={{ color: "oklch(0.82 0.08 72)" }}
        >
          {ritual.description}
        </p>
        <button
          type="button"
          onClick={onToggleFavorite}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full font-cinzel font-medium text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: isFavorited
              ? "oklch(0.62 0.19 22 / 0.2)"
              : "oklch(0.78 0.16 72 / 0.15)",
            border: "1px solid oklch(0.78 0.16 72 / 0.4)",
            color: "oklch(0.90 0.12 72)",
          }}
        >
          {isFavorited ? "❤️ Saved to Favorites" : "🤍 Save to Favorites"}
        </button>
      </div>

      {/* Steps */}
      <div>
        <h3
          className="font-cinzel font-semibold text-base mb-3"
          style={{ color: "oklch(0.35 0.08 30)" }}
        >
          ❈ Steps to Perform
        </h3>
        <div className="space-y-3 stagger-children">
          {ritual.steps.map((step, index) => (
            <div
              key={`step-${ritual.id}-${index}`}
              className="flex gap-4 p-4 rounded-2xl fade-in-up"
              style={{
                background: "oklch(0.985 0.012 80)",
                border: "1.5px solid oklch(0.86 0.055 75)",
                boxShadow: "0 2px 8px oklch(0.22 0.05 30 / 0.05)",
              }}
            >
              <div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-cinzel font-bold text-sm"
                style={{
                  background: "oklch(0.42 0.13 22)",
                  color: "oklch(0.92 0.12 72)",
                  border: "1.5px solid oklch(0.78 0.16 72 / 0.4)",
                  boxShadow: "0 0 10px oklch(0.78 0.16 72 / 0.2)",
                }}
              >
                {index + 1}
              </div>
              <p
                className="font-crimson text-base leading-relaxed flex-1"
                style={{ color: "oklch(0.30 0.06 30)" }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Blessing */}
      <div
        className="p-4 rounded-2xl text-center"
        style={{
          background: "oklch(0.94 0.035 75)",
          border: "1px dashed oklch(0.78 0.16 72 / 0.5)",
        }}
      >
        <p className="font-devanagari text-lg" style={{ color: "oklch(0.42 0.12 30)" }}>
          ॐ शांति शांति शांति
        </p>
        <p className="font-crimson text-sm italic mt-1" style={{ color: "oklch(0.58 0.07 40)" }}>
          May this ritual bring peace and prosperity
        </p>
      </div>
    </div>
  );
}

interface RitualCardProps {
  ritual: Ritual;
  isFavorited: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
}

function RitualCard({ ritual, isFavorited, onOpen, onToggleFavorite }: RitualCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.01] fade-in-up"
      style={{
        background: "oklch(0.985 0.012 80)",
        border: "1.5px solid oklch(0.86 0.055 75)",
        boxShadow: "0 2px 12px oklch(0.22 0.05 30 / 0.07)",
      }}
    >
      <button type="button" onClick={onOpen} className="w-full text-left p-4">
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
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
            <p
              className="font-crimson text-sm mt-1 line-clamp-2 leading-relaxed"
              style={{ color: "oklch(0.48 0.05 35)" }}
            >
              {ritual.description}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="text-xs font-cinzel px-2 py-0.5 rounded-full"
                style={{
                  background: "oklch(0.92 0.05 65)",
                  color: "oklch(0.42 0.10 50)",
                  border: "1px solid oklch(0.80 0.08 65)",
                }}
              >
                {ritual.steps.length} steps
              </span>
              <span className="text-xs font-cinzel" style={{ color: "oklch(0.62 0.12 45)" }}>
                Tap to view →
              </span>
            </div>
          </div>
        </div>
      </button>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderTop: "1px solid oklch(0.92 0.03 75)" }}
      >
        <button
          type="button"
          onClick={onOpen}
          className="font-cinzel text-xs font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 hover:opacity-80"
          style={{
            background: "oklch(0.62 0.19 45)",
            color: "oklch(0.985 0 0)",
            boxShadow: "0 2px 8px oklch(0.62 0.19 45 / 0.3)",
          }}
        >
          View Ritual
        </button>
        <button
          type="button"
          onClick={onToggleFavorite}
          className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <span className="text-xl">{isFavorited ? "❤️" : "🤍"}</span>
        </button>
      </div>
    </div>
  );
}

export function RitualsPage() {
  const { data: rituals, isLoading } = useAllRituals();
  const { data: favorites } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);

  const favoritedIds = new Set(
    (favorites ?? []).filter((f) => f.itemType === "ritual").map((f) => String(f.id))
  );

  const handleToggleFavorite = async (ritual: Ritual) => {
    const isFav = favoritedIds.has(String(ritual.id));
    try {
      if (isFav) {
        await removeFavorite.mutateAsync({ itemId: ritual.id, itemType: "ritual" });
        toast.success("Removed from favorites");
      } else {
        await addFavorite.mutateAsync({ itemId: ritual.id, itemType: "ritual" });
        toast.success("❤️ Added to favorites");
      }
    } catch {
      toast.error("Could not update favorites.");
    }
  };

  if (selectedRitual) {
    return (
      <div className="pt-2">
        <RitualDetail
          ritual={selectedRitual}
          isFavorited={favoritedIds.has(String(selectedRitual.id))}
          onToggleFavorite={() => handleToggleFavorite(selectedRitual)}
          onBack={() => setSelectedRitual(null)}
        />
      </div>
    );
  }

  return (
    <div className="page-enter space-y-4 pt-2">
      {/* Page Title */}
      <div className="text-center py-2">
        <h2 className="font-cinzel-deco text-xl font-bold" style={{ color: "oklch(0.38 0.14 22)" }}>
          Rituals
        </h2>
        <p className="font-devanagari text-base mt-1" style={{ color: "oklch(0.55 0.12 45)" }}>
          पूजा अनुष्ठान
        </p>
      </div>

      {/* Rituals Grid */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" style={{ background: "oklch(0.90 0.04 75)" }} />
          ))}
        </div>
      ) : !rituals || rituals.length === 0 ? (
        <div
          className="p-10 rounded-2xl text-center"
          style={{ background: "oklch(0.96 0.025 75)", border: "1px dashed oklch(0.78 0.10 72)" }}
        >
          <p className="text-4xl mb-3">🪔</p>
          <p className="font-devanagari text-base" style={{ color: "oklch(0.42 0.06 30)" }}>
            अभी कोई अनुष्ठान नहीं है
          </p>
          <p className="font-crimson text-sm italic mt-1" style={{ color: "oklch(0.58 0.05 40)" }}>
            No rituals added yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-3 stagger-children">
          {rituals.map((ritual) => (
            <RitualCard
              key={String(ritual.id)}
              ritual={ritual}
              isFavorited={favoritedIds.has(String(ritual.id))}
              onOpen={() => setSelectedRitual(ritual)}
              onToggleFavorite={() => handleToggleFavorite(ritual)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
