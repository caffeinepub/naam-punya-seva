import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Ritual {
    id: bigint;
    title: string;
    description: string;
    steps: Array<string>;
}
export interface ScheduleItem {
    id: bigint;
    name: string;
    time: string;
    description: string;
}
export interface Prayer {
    id: bigint;
    title: string;
    text: string;
    translation: string;
    category: string;
}
export interface FavoriteItem {
    id: bigint;
    itemType: string;
}
export interface backendInterface {
    addFavorite(itemId: bigint, itemType: string): Promise<void>;
    getAllPrayers(): Promise<Array<Prayer>>;
    getAllRituals(): Promise<Array<Ritual>>;
    getFavorites(): Promise<Array<FavoriteItem>>;
    getFullSchedule(): Promise<Array<ScheduleItem>>;
    getPrayerCompletionsForDate(date: string): Promise<Array<bigint>>;
    getPrayersByCategory(category: string): Promise<Array<Prayer>>;
    markPrayerCompleted(prayerId: bigint, date: string): Promise<void>;
    removeFavorite(itemId: bigint, itemType: string): Promise<void>;
}
