import { writable } from "svelte/store";
import type { Equipment } from "../global";

export const accessToken = writable("");

export const handleEquipment = (currentEquipment?: Equipment[]) => {
  const { subscribe, set, update } = writable<Equipment[]>();
  if (currentEquipment) {
    set(currentEquipment);
  }
  return { subscribe, set, update };
};

export const count = writable(0);
