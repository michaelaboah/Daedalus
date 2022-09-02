// import type ElectronStore from "electron-store";
import Store from "electron-store";
import { writable } from "svelte/store";

Store.initRenderer();

const renderStorage = new Store<UserPreferences>();
renderStorage.set("test", { username: "test", password: "hello" });

// const managePersistance = () => {
//   const { subscribe, set, update } = writable<UserPreferences>();
//   set()
//   return { subscribe, set, update };
// };

type UserPreferences = {
  rememberMe: { username: string; password: string };
};

export const persist = writable<UserPreferences>({ rememberMe: { username: "", password: "string" } });
