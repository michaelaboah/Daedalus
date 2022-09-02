<script lang="ts">
  import { Box, Switch } from "@svelteuidev/core";
  import { getContext, onDestroy, onMount } from "svelte";
  import { themeKey } from "../../utils/contextKeys";
  const { toggleDark } = getContext(themeKey);
   

  const test = async () => {
    let dark = toggleDark()
    const data = await window.api.handleUserStorage('preferences', {darkmode: dark})
    console.log(data.darkmode)
  }

</script>

<Box>
  <Switch
    size="xl"
    onLabel="ON"
    offLabel="OFF"

    on:click="{test}" 
    label="Toggle Dark-Mode"
    color="dark"
    aria-label="Toggle Dark-Mode"
  />
  <!-- <button on:click="{() => console.log(toggleDark())}"></button> -->
</Box>
