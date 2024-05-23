import { writable, type Writable } from "svelte/store";
import type { RUserProfile } from "./types";

export const activeMenu = writable('');
export const progress: Writable<number> = writable(0);
export const loading: Writable<boolean> = writable(false)
export const profile: Writable<RUserProfile|null> = writable(null);
export const acl: Writable<Record<string, any> | null> = writable(null);