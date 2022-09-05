import { API } from "../electron/preload";

declare global {
  interface Window {
    api: typeof API;
  }
}

export class Equipment {
  // id: Int!
  createdAt: string;
  updatedAt: string;
  category: string;
  manufacturer: string;
  model: string;
  publicNotes?: string;
  cost: number;
  powerDraw?: number;
  weight?: number;
  depth?: number;
  rackUnit?: number;
  frequencyRange?: string;
}

export class Gear extends Equipment {
  createdAt: string;
  updatedAt: string;
  category: string;
  manufacturer: string;
  model: string;
  quantity: number;
  cost: number;
  publicNotes?: string;
  powerDraw?: number;
  weight?: number;
  depth?: number;
  rackUnit?: number;
  frequencyRange?: string;

  items?: Item[];
}
