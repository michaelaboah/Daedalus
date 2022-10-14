import { writable } from "svelte/store";
import { buildProdInfo, type ProductionInformation, type Gear } from "../Classes";

export const accessToken = writable("");

export const gearList = writable<Gear[]>([]);

export const count = writable(0);

export const projectList = writable();
// Create project type and make derived lists

export const prodInfo = writable<ProductionInformation>(buildProdInfo());
