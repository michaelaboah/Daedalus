import { API } from "../electron/preload";

declare global {
  interface Window {
    api: typeof API;
  }
}

export class Equipment {
  // id: Int!
  createdAt: !String;
  updatedAt: !String;
  category: !String;
  manufacturer: !String;
  model: !String;
  publicNotes: String;
  cost: Float;
  powerDraw: Float;
  weight: Float;
  depth: Float;
  rackUnit: Int;
  frequencyRange: String;
}

export type UserPreferences = {
  credentials: { username: string; password: string };
  darkmode: boolean;
};
