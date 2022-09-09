import { writable } from "svelte/store";

export const accessToken = writable("");

export const gearList = writable<any[]>([]);

export const count = writable(0);
