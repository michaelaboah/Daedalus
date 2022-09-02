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

  setContext(themeKey, {
    toggleDark: () => (isDark = !isDark),
  });

  
  let isDark: boolean
  const getStorage = async () => {
    const data = await window.api.handleUserStorage("preferences")
    console.log(data)
  }
getStorage()
</script>

<SvelteUIProvider withGlobalStyles themeObserver="{isDark ? 'dark' : 'light'}">
  <AppShell>
    <Header />
    <Routes />
    <Footer />
  </AppShell>
</SvelteUIProvider>
