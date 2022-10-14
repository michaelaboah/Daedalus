import { app, BrowserWindow, dialog, ipcMain, Menu, nativeTheme, Notification } from "electron";
import { join } from "path";
import { parse } from "url";
import { autoUpdater } from "electron-updater";
import logger from "./utils/logger";
import settings from "./utils/settings";
import { template } from "./menu";
import { getUserPreferences, getWinRect, saveBounds, setUserPreferences } from "./utils/persistant";
import { initSQLite, ormMain } from "./database/init_SQL";
import "dotenv/config";
const isProd = process.env.NODE_ENV === "production" || app.isPackaged;
logger.info("App starting...");
settings.set("check", true);
logger.info("Checking if settings store works correctly.");
logger.info(settings.get("check") ? "Settings store works correctly." : "Settings store has a problem.");

export let mainWindow: BrowserWindow;
// let splashScreen: BrowserWindow;
let notification: Notification | null;
const isMac = process.platform === "darwin";

initSQLite();
ormMain().catch((err) => {
  console.log(err);
});

// export const createPopup = (title: string) => {
//   const bounds = getWinRect();
//   let popupWindow = new BrowserWindow({
//     ...bounds,
//     resizable: true,
//     modal: true,
//     alwaysOnTop: true,
//     show: true,
//     title: title,
//   });
//   popupWindow.loadFile("public/splash.html");
// };

// Uncomment when implementing Splash Screen
// const createSplash = () => {
//   try {
//     splashScreen = new BrowserWindow({
//       width: 500,
//       height: 300,
//       resizable: false,
//       transparent: true,
//       frame: false,
//       alwaysOnTop: false,
//       // show: false,                                              /////////Uncommemet these lines when working on UI
//     });
//     splashScreen.loadFile("./public/splash.html");
//     splashScreen.center();
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message);
//       dialog.showErrorBox("Learn more", error.name);
//     } else {
//       console.log(error);
//       dialog.showErrorBox("Learn more", error);
//       logger.error(`Create Splash Error: ${error}`);
//     }
//   }
// };

const createWindow = () => {
  const bounds = getWinRect();
  mainWindow = new BrowserWindow({
    ...bounds,
    minHeight: 600,
    minWidth: 800,
    autoHideMenuBar: true,
    alwaysOnTop: false,
    // frame: false,
    show: true,
    webPreferences: {
      devTools: isProd ? false : true,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });
  if (isMac) {
    mainWindow.autoHideMenuBar = false;
  }
  const url =
    // process.env.NODE_ENV === "production"
    isProd
      ? // in production, use the statically build version of our application
        `file://${join(__dirname, "public", "index.html")}`
      : // in dev, target the host and port of the local rollup web server
        "http://localhost:5000";

  mainWindow.loadURL(url).catch((err) => {
    logger.error(JSON.stringify(err));
    app.quit();
  });

  if (!isProd) mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    // mainWindow = null;
  });
  // Persistant window size
  mainWindow.on("resized", () => saveBounds(mainWindow.getBounds()));
  mainWindow.on("moved", () => saveBounds(mainWindow.getBounds()));

  //Dark mode toggle
  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });
  //Dark mode toggle
  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });

  mainWindow.once("ready-to-show", () => {
    // try {
    //   setTimeout(() => {
    //     splashScreen.close(); /////////Uncomment these lines when working on UI
    //     mainWindow.show(); /////////Uncomment these lines when working on UI
    //   }, 2000);
    // } catch (error) {
    //   splashScreen.close();
    //   mainWindow.show();
    // }
  });
};

// ************************ App Listeners ************************

app.on("ready", () => {
  createWindow();
  //Adds more menus to the ones that already exist on Macos
  if (isMac) {
    // @ts-expect-error
    Menu.setApplicationMenu(Menu.buildFromTemplate(template)); // Try and find the correct type
  } else {
    // const customMenu = new Menu()
  }
});

// those two events are completely optional to subscrbe to, but that's a common way to get the
// user experience people expect to have on macOS: do not quit the application directly
// after the user close the last window, instead wait for Command + Q (or equivalent).
app.on("window-all-closed", () => {
  app.clearRecentDocuments();
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", () => mainWindow.webContents.send("get-projects"));

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("open-file", (_event, path) => {
  const fs = require("fs");
  fs.readFile(path, (err: NodeJS.ErrnoException | null, data: JSON) => {
    if (err) {
      return console.log(err);
    } else {
      mainWindow.webContents.send("load:project", { data: JSON.parse(data.toString()), filepath: path });
    }
  });
});

app.on("web-contents-created", (e, contents) => {
  logger.info(e);
  // Security of webviews
  contents.on("will-attach-webview", (event, webPreferences, params) => {
    logger.info(event, params);
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;

    // Verify URL being loaded
    // if (!params.src.startsWith(`file://${join(__dirname)}`)) {
    //   event.preventDefault(); // We do not open anything now
    // }
  });

  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedURL = parse(navigationUrl);
    // In dev mode allow Hot Module Replacement
    if (parsedURL.host !== "localhost:5000" && !isProd) {
      logger.warn("Stopped attempt to open: " + navigationUrl);
      event.preventDefault();
    } else if (isProd) {
      logger.warn("Stopped attempt to open: " + navigationUrl);
      event.preventDefault();
    }
  });
});
// ************************ App Listeners ************************

// ************************ Auto Updater ************************
if (isProd)
  autoUpdater.checkForUpdates().catch((err) => {
    logger.error(JSON.stringify(err));
  });

autoUpdater.logger = logger;

autoUpdater.on("update-available", () => {
  notification = new Notification({
    title: "Fluide",
    body: "Updates are available. Click to download.",
    silent: true,
    // icon: nativeImage.createFromPath(join(__dirname, "..", "assets", "icon.png"),
  });
  notification.show();
  notification.on("click", () => {
    autoUpdater.downloadUpdate().catch((err) => {
      logger.error(JSON.stringify(err));
    });
  });
});

autoUpdater.on("update-not-available", () => {
  notification = new Notification({
    title: "Fluide",
    body: "Your software is up to date.",
    silent: true,
    // icon: nativeImage.createFromPath(join(__dirname, "..", "assets", "icon.png"),
  });
  notification.show();
});

autoUpdater.on("update-downloaded", () => {
  notification = new Notification({
    title: "Fluide",
    body: "The updates are ready. Click to quit and install.",
    silent: true,
    // icon: nativeImage.createFromPath(join(__dirname, "..", "assets", "icon.png"),
  });
  notification.show();
  notification.on("click", () => {
    autoUpdater.quitAndInstall();
  });
});

autoUpdater.on("error", (err) => {
  notification = new Notification({
    title: "Fluide",
    body: JSON.stringify(err),
    // icon: nativeImage.createFromPath(join(__dirname, "..", "assets", "icon.png"),
  });
  notification.show();
});
// ************************ Auto Updater ************************

// ************************ Others ************************

process.on("uncaughtException", (error) => {
  dialog.showErrorBox("UnCaught Exception", error.name);
  console.log(error.message);
  console.log(error.stack);
  logger.error(error.stack ? error.stack : error.message);
});

//send the process to the render

// ************************ Others ************************
ipcMain.on("open-window", (args) => {
  console.log(args);
});

ipcMain.on("frontend-error", (_event, errorTitle, errorMessage) => {
  dialog.showErrorBox(errorTitle, errorMessage);
});

ipcMain.on("sanity", (_event, args) => console.log(args));

ipcMain.on("counter-value", (_event, value) => {
  console.log(value); // will print value to Node console
  // beforeQuit(value)
});

ipcMain.handle("persist:frontend", async (_event, args) => {
  if (args.prefsData !== undefined) {
    setUserPreferences(args.prefsData);
    return getUserPreferences();
  } else {
    return getUserPreferences();
  }
});
