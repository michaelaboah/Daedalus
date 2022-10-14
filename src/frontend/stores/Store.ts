import { derived, writable, type Writable } from "svelte/store";
import { buildProdInfo, type Gear, type ProductionInformation, type Project } from "../Classes";

export const accessToken = writable("");

export const gearList = writable<Gear[]>([]);

export const count = writable(0);

// export const projectList = writable<Project>({} as Project);

export const prodInfo = writable<ProductionInformation>(buildProdInfo());

export const project = derived<[Writable<ProductionInformation>, Writable<Gear[]>], Project>(
  [prodInfo, gearList],
  ([$prodInfo, $gearList]) => {
    return { productionInformation: $prodInfo, gearList: $gearList } as Project;
  }
);
