import { writable, type Writable } from "svelte/store";
import type { RUserProfile, IToast } from "./types";

export const activeMenu = writable('');
export const profile: Writable<RUserProfile|null> = writable(null);
export const loading: Writable<boolean> = writable(false);
export const progress: Writable<number> = writable(0);
export const acl: Writable<Record<string, any> | null> = writable(null);
export const toasts: Writable<IToast[]> = writable([]);