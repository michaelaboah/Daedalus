export type Equipment = {
  modelId?: number;
  createdAt: Date;
  updatedAt: Date;
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

export const buildEquipment = (newItem?: Equipment) => ({
  createdAt: newItem ? newItem.createdAt : undefined,
  updatedAt: newItem ? newItem.updatedAt : undefined,
  category: newItem ? newItem.category : "",
  manufacturer: newItem ? newItem.manufacturer : "",
  model: newItem ? newItem.model : "",
  publicNotes: newItem ? newItem.publicNotes : "",
  cost: newItem ? newItem.cost : 0,
  powerDraw: newItem ? newItem.powerDraw : 0,
  weight: newItem ? newItem.weight : 0,
  depth: newItem ? newItem.depth : 0,
  rackUnit: newItem ? newItem.rackUnit : 0,
  frequencyRange: newItem ? newItem.frequencyRange : "",
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
