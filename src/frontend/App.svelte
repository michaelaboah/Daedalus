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
  // import { accessToken } from './stores/Store'


  setContext(themeKey, {
    toggleDark: () => (isDark = !isDark),
  });

  // $: test = testStorage

  let isDark: boolean
  // import { persist } from './stores/renderStore'
  // console.log($persist)
</script>

<SvelteUIProvider withGlobalStyles themeObserver="{isDark ? 'dark' : 'light'}">
  <AppShell>
    <Header />
    <Routes />
    <Footer />
  </AppShell>
</SvelteUIProvider>
