export type Equipment = {
  modelId?: number;
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
};

export const buildEquipment = () => ({
  createdAt: "",
  updatedAt: "",
  category: "",
  manufacturer: "",
  model: "",
  publicNotes: "",
  cost: 0,
  powerDraw: 0,
  weight: 0,
  depth: 0,
  rackUnit: 0,
  frequencyRange: "",
});

export class Box {
  id: number;
  name: number;
  length: number;
  width: number;
  height: number;

  constructor(id: number, name: number, length: number, width: number, height: number) {
    this.id = id;
    this.name = name;
    this.length = length;
    this.width = width;
    this.height = height;
  }
}
export type Item = {
  description: string;
  itemQuantity: number;
  publicNotes?: string;
  privateNotes?: string;
  box?: Box;
};

export const buildItem = () => ({
  description: "",
  itemQuantity: 0,
  publicNotes: "",
  privateNotes: "",
  // box: new Box();
});

export type Gear = Equipment & { items: Item[]; quantity: number };
