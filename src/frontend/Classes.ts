// export class Equipment {
//   // id: Int!
//   createdAt: string;
//   updatedAt: string;
//   category: string;
//   manufacturer: string;
//   model: string;
//   publicNotes?: string;
//   cost: number;
//   powerDraw?: number;
//   weight?: number;
//   depth?: number;
//   rackUnit?: number;
//   frequencyRange?: string;

//   constructor(
//     // id: Int,
//     createdAt: string,
//     updatedAt: string,
//     category: string,
//     manufacturer: string,
//     model: string,
//     publicNotes: string,
//     cost: number,
//     powerDraw: number,
//     weight: number,
//     depth: number,
//     rackUnit: number,
//     frequencyRange: string
//   ) {
//     // this.id = id
//     this.createdAt = createdAt;
//     this.updatedAt = updatedAt;
//     this.category = category;
//     this.manufacturer = manufacturer;
//     this.model = model;
//     this.publicNotes = publicNotes;
//     this.cost = cost;
//     this.powerDraw = powerDraw;
//     this.weight = weight;
//     this.depth = depth;
//     this.rackUnit = rackUnit;
//     this.frequencyRange = frequencyRange;
//   }
// }

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
export class Item {
  description: string = "";
  itemQuantity: number = 1;
  publicNotes?: string = "";
  privateNotes?: string = "";
  box?: Box;

  constructor(
    description: string = "",
    itemQuantity: number = 0,
    publicNotes?: string,
    privateNotes?: string,
    box?: Box
  ) {
    this.description = description;
    this.itemQuantity = itemQuantity;
    this.publicNotes = publicNotes;
    this.privateNotes = privateNotes;
    this.box = box;
  }
}

// export class Gear extends Equipment {
//   createdAt: string;
//   updatedAt: string;
//   category: string;
//   manufacturer: string;
//   model: string;
//   quantity: number;
//   cost: number;
//   publicNotes?: string;
//   powerDraw?: number;
//   weight?: number;
//   depth?: number;
//   rackUnit?: number;
//   frequencyRange?: string;

//   items?: Item[];

//   constructor(
//     createdAt: string,
//     updatedAt: string,
//     category: string,
//     manufacturer: string,
//     model: string,
//     cost: number,
//     quantity: number,
//     publicNotes?: string,
//     powerDraw?: number,
//     weight?: number,
//     depth?: number,
//     rackUnit?: number,
//     frequencyRange?: string,
//     items?: Item[]
//   ) {
//     super(
//       createdAt,
//       updatedAt,
//       category,
//       manufacturer,
//       model,
//       publicNotes,
//       cost,
//       powerDraw,
//       weight,
//       depth,
//       rackUnit,
//       frequencyRange,
//     );
//     this.createdAt = createdAt;
//     this.updatedAt = updatedAt;
//     this.category = category;
//     this.manufacturer = manufacturer;
//     this.model = model;
//     this.publicNotes = publicNotes;
//     this.cost = cost;
//     this.powerDraw = powerDraw;
//     this.weight = weight;
//     this.depth = depth;
//     this.rackUnit = rackUnit;
//     this.frequencyRange = frequencyRange;
//     this.quantity = quantity;
//     this.items = items;
//   }
// }
