<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<script lang="ts">
  import { AppShell, SvelteUIProvider } from "@svelteuidev/core";
  import "@svelteuidev/prism";
  import { setContext } from "svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import { themeKey } from "./utils/contextKeys";
  import Routes from "./Routes.svelte";
  import { gearList } from "./stores/Store";
  import type { Gear } from "./Classes";

  let isDark: boolean;

  (async () => {
    isDark = await getDarkMode();
  })();

  async function getDarkMode() {
    const persistData = await window.api.handleUserStorage("preferences");
    return persistData.darkmode;
  }
  window.api.loadToFrontend((_event: any, val: Gear[]) => {
    if ($gearList.length === 0) {
      $gearList = val;
    } else {
      window.api.dialogError("File load error", "Cannot override current items in Equipment List");
    }
  });

  window.api.onSaveFile((event: any) => {
    event.sender.send("save:project", $gearList);
  });

  setContext(themeKey, {
    toggleDark: () => (isDark = !isDark),
  });
</script>

<SvelteUIProvider withGlobalStyles themeObserver="{isDark ? 'dark' : 'light'}">
  <AppShell>
    <Routes />
    <Header />
    <Footer />
  </AppShell>
</SvelteUIProvider>
