import { writable, type Writable } from "svelte/store";

export const activeMenu = writable('');
export const progress: Writable<number> = writable(0);
export const loading: Writable<boolean> = writable(false)
export const user: Writable<Record<string, string>> = writable({});
export const acl: Writable<Record<string, any>> = writable({});