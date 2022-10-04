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

export const buildEquipment = () => ({
  createdAt: undefined,
  updatedAt: undefined,
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
  itemQuantity: 1,
  publicNotes: "",
  privateNotes: "",
  // box: new Box();
});

export type Gear = Equipment & { items: Item[]; gearId: number; quantity: number };

export const buildGear = (addId?: number) => ({
  createdAt: undefined,
  updatedAt: undefined,
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
  items: [buildItem()],
  quantity: 0,
  gearId: (addId ??= 0),
});

export type Project = {
  name: string;
  showImage: string | undefined;
  designerStamp: string | undefined;
};

export const createProject = (): Project => ({} as Project);
