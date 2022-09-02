import { ipcRenderer, contextBridge } from "electron";

/**
 * @function getVersion()
 */
export const API = {
  // Create a method that calls to electron for the version.
  // Also set type declaration inline.
  getVersion: (): Promise<string> => ipcRenderer.invoke("GET/version"),
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
  openSvelteRoute: (callback: (arg0: any) => void) =>
    ipcRenderer.on("open-prefs", (_event_, args) => {
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

  sanity: (message: string) => ipcRenderer.send("sanity", message),
  dialogError: (title: string, message: string) => ipcRenderer.send("frontend-error", title, message),
  saveFile: (data?: any) => ipcRenderer.send("save-project", data),
  getProjects: (data: any) => ipcRenderer.on("get-projects", data),

  handleData: (callback: any) => ipcRenderer.on("get-projects", callback),
  onOpenFile: () => ipcRenderer.invoke("dialog:openFile"),

  handleUserStorage: (key: string, prefsData?: any) => ipcRenderer.invoke("persist:frontend", { key, prefsData }),
};

contextBridge.exposeInMainWorld("api", API);
