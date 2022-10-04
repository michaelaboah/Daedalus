import { API } from "../electron/preload";

declare global {
  interface Window {
    api: typeof API;
  }
}

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
// }

// export class Gear extends Equipment {
//   createdAt: string;
//   updatedAt: string;
//   category: string;
//   manufacturer: string;
//   model: string;
//   quantity: number;
//   cost?: number;
//   publicNotes?: string;
//   powerDraw?: number;
//   weight?: number;
//   depth?: number;
//   rackUnit?: number;
//   frequencyRange?: string;

//   items: Item[];
// }

declare type FileDropEvent = import("filedrop-svelte/event").FileDropEvent;
declare type FileDropSelectEvent = import("filedrop-svelte/event").FileDropSelectEvent;
declare type FileDropDragEvent = import("filedrop-svelte/event").FileDropDragEvent;
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onfiledrop?: (event: CustomEvent<FileDropSelectEvent> & { target: EventTarget & T }) => void;
    onfiledragenter?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
    onfiledragleave?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
    onfiledragover?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
    onfiledialogcancel?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
    onfiledialogclose?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
    onfiledialogopen?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
    onwindowfiledragenter?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
    onwindowfiledragleave?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
    onwindowfiledragover?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
  }
}
