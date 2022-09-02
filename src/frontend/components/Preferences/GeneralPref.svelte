<script lang="ts">
  import { Box, Switch } from "@svelteuidev/core";
  import { getContext } from "svelte";
  import { themeKey } from "../../utils/contextKeys";
  const { toggleDark } = getContext(themeKey);
</script>

<Box>
  <Switch
    size="xl"
    onLabel="ON"
    offLabel="OFF"
    on:change="{toggleDark}"
    label="Toggle Dark-Mode"
    color="dark"
    aria-label="Toggle Dark-Mode"
  />
</Box>
