import { writable } from "svelte/store";
import type { Gear } from "../global";

export const accessToken = writable("");

export const gearList = writable<Gear[]>([]);

export const itemMap = writable<Map<string, number>>(new Map());

export const count = writable(0);
