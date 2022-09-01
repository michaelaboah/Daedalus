<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<script lang="ts">
  // import "carbon-components-svelte/css/all.css";
  import { SvelteUIProvider } from "@svelteuidev/core";
  import "@svelteuidev/prism";
  import Header from "./components/Header.svelte";

  let isDark = false;
  const toggleTheme = () => {
    isDark = !isDark;
  };
</script>

<SvelteUIProvider withGlobalStyles themeObserver="{isDark ? 'dark' : 'light'}">
  <Header />
</SvelteUIProvider>
