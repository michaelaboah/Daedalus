import type { Gear } from "radix-icons-svelte";
import { writable } from "svelte/store";

export const accessToken = writable("");

export const gearList = writable<Gear[]>([]);

export const count = writable(0);
