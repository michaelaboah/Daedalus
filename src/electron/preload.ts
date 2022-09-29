import { ipcRenderer, contextBridge } from "electron";
import type { UserPreferences } from "./utils/persistant";

/**
 * @function getVersion()
 */
export const API = {
  // Create a method that calls to electron for the version.
  // Also set type declaration inline.
  getVersion: (): Promise<string> => ipcRenderer.invoke("GET/version"),
  openSvelteRoute: (callback: (arg0: any) => void) =>
    ipcRenderer.on("go-to-page", (_event_, args) => {
      callback(args);
    }),
  sendToSvelte: (callback: (arg0: boolean) => void) =>
    ipcRenderer.on("electron->svelte", (_event_, args) => {
      callback(args);
    }),
  print: (callback: (table: any) => void) =>
    ipcRenderer.on("printer", (_event, args) => {
      callback(args);
    }),

  // OS Level Functions

  // Theming
  // toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  // system: () => ipcRenderer.invoke("dark-mode:system"),

  // Error Handling
  sanity: (message: string) => ipcRenderer.send("sanity", message),
  dialogError: (title: string, message: string) => ipcRenderer.send("frontend-error", title, message),

  // File Handling
  saveFile: (data: any) => ipcRenderer.send("save:project", data),
  onSaveFile: (callback: any) => ipcRenderer.on("start:save:project", callback),
  onOpenFile: () => ipcRenderer.invoke("dialog:openFile"),

  // User Persistance
  handleUserStorage: (key: string, prefsData?: UserPreferences) =>
    ipcRenderer.invoke("persist:frontend", { key, prefsData }),
};

contextBridge.exposeInMainWorld("api", API);
