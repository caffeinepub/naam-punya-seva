import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Prayer, Ritual, ScheduleItem, FavoriteItem } from "../backend.d";

// ---- Prayers ----
export function useAllPrayers() {
  const { actor, isFetching } = useActor();
  return useQuery<Prayer[]>({
    queryKey: ["prayers", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPrayers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePrayersByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Prayer[]>({
    queryKey: ["prayers", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllPrayers();
      return actor.getPrayersByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePrayerCompletions(date: string) {
  const { actor, isFetching } = useActor();
  return useQuery<bigint[]>({
    queryKey: ["completions", date],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrayerCompletionsForDate(date);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkPrayerCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ prayerId, date }: { prayerId: bigint; date: string }) => {
      if (!actor) throw new Error("No actor");
      await actor.markPrayerCompleted(prayerId, date);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["completions", variables.date] });
    },
  });
}

// ---- Rituals ----
export function useAllRituals() {
  const { actor, isFetching } = useActor();
  return useQuery<Ritual[]>({
    queryKey: ["rituals", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRituals();
    },
    enabled: !!actor && !isFetching,
  });
}

// ---- Schedule ----
export function useFullSchedule() {
  const { actor, isFetching } = useActor();
  return useQuery<ScheduleItem[]>({
    queryKey: ["schedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFullSchedule();
    },
    enabled: !!actor && !isFetching,
  });
}

// ---- Favorites ----
export function useFavorites() {
  const { actor, isFetching } = useActor();
  return useQuery<FavoriteItem[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, itemType }: { itemId: bigint; itemType: string }) => {
      if (!actor) throw new Error("No actor");
      await actor.addFavorite(itemId, itemType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useRemoveFavorite() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, itemType }: { itemId: bigint; itemType: string }) => {
      if (!actor) throw new Error("No actor");
      await actor.removeFavorite(itemId, itemType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export type { Prayer, Ritual, ScheduleItem, FavoriteItem };
