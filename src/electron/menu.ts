import { app, dialog } from "electron";
import fs from "fs";
import path from "path";
import { mainWindow } from "./index";

const isMac = process.platform === "darwin";

export const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            {
              label: "Check for Updates",
              click() {
                console.log("Check for updates: Not implemented");
              },
            },
            {
              label: "Preferences",
              accelerator: "Cmd+,",
              click() {
                mainWindow.webContents.send("open-prefs", "#/Preferences");
              },
            },
            {
              click: () => mainWindow.webContents.send('get-projects'),
              label: 'Increment',
              accelerator: "Cmd+2"
            },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { label: "Testing Quit Delete later", accelerator: "Cmd+1", click() {
              console.log("Test quit")
              mainWindow.webContents.send("check-projects")
            }},
            { role: "quit" },
          ],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      isMac ? { role: "close" } : { role: "quit" },
      { label: "New" },
      { label: "New Window" },
      { type: "separator" },
      {
        label: "Open",
        accelarator: "CmdOrCtrl+O",
        click() {
          openFile();
        },
      },
      {
        label: "Open Recent",
        role: "recentdocuments",
        submenu: [
          {
            label: "Clear Recent",
            role: "clearrecentdocuments",
            click() {
              app.clearRecentDocuments();
            },
          },
        ],
      },
      { type: "separator" },
      { label: "Save", accelerator: "CommandOrControl+S" },
      {
        label: "Save As",
        accelarator: "CommandOrControl+Shift+S",
        click() {
          saveAsFile();
        },
      },
      {
        label: "Print",
        accelerator: "CmdOrCtrl + p",
        click() {
          mainWindow.webContents.send("printer");
        },
      },
      ...(isMac
        ? []
        : [
            {
              label: "Preferences",
              accelerator: "Ctrl+,",
              click() {
                mainWindow.webContents.send("open-prefs", "#/Preferences");
              },
            },
          ]), // This is fine
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac
        ? [
            { role: "pasteAndMatchStyle" },
            { role: "delete" },
            { role: "selectAll" },
            { type: "separator" },
            {
              label: "Speech",
              submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
            },
          ]
        : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  // Exchange Sync
  {
    label: "Database Sync",
    submenu: [
    ],
  },

  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
        : [{ role: "close" }]),
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];

// *************************** Menu Functions **************************

export const openFile = async (): Promise<any> => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [
      { name: "Daedalus", extensions: ["dae"] },
      { name: "JSON", extensions: ["json"] },
    ],
  });
  if (canceled) {
    return;
  }
  fs.readFile(filePaths[0], (err, data) => {
    if (err) {
      return console.log(err);
    } else {
        console.log(data)
    }
  });
};

export const saveAsFile = async (data?: any) => {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    properties: ["createDirectory"],
    filters: [
      { name: "Freyur", extensions: ["fyr"] },
      { name: "Json", extensions: ["json"] },
    ],
  });
  if (canceled) {
    return;
  } else {
    fs.writeFile(filePath as string, data ? JSON.stringify(data) : "Nothing saved", function (err) {
      if (err) {
        return console.log(err);
      }
      app.addRecentDocument(path.join(filePath as string));
      console.log("The file was saved!");
    });
  }
};


export const beforeQuit = (_data:any) => {
  try {
  } catch (error) {
    if (error instanceof TypeError) {}
  }
}