import Store from "electron-store";

type WindowStore = {
  winSize: number[];
  winPos: number[];
  bounds: Electron.Rectangle;
};

export type UserPreferences = {
  credentials?: { username: string; password: string };
  darkmode?: boolean;
  rememberMe?: boolean;
};

const windowStorage = new Store<WindowStore>();

export const getWinRect = () => {
  const defaultBounds = {
    x: 500,
    y: 500,
    width: 800,
    height: 600,
  };
  const size = windowStorage.get("bounds");

  if (size) return size;
  else windowStorage.set("bounds", defaultBounds);
  return defaultBounds;
};

export const saveBounds = (bounds: Electron.Rectangle) => {
  windowStorage.set("bounds", bounds);
};

const renderStorage = new Store<UserPreferences>();
renderStorage.set("test", { username: "test", password: "hello" });

export const getUserPreferences = () => {
  return renderStorage.get("preferences");
};

export const setUserPreferences = (prefs: UserPreferences) => {
  renderStorage.set("preferences", prefs);
  return renderStorage.get("preferences");
};
