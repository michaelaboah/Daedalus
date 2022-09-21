<style>
  
</style>

<script lang="ts">
  import AutoComplete from "simply-svelte-autocomplete"
    import type { Equipment } from "../Classes";

  const options: string[] = []
  let gear: Equipment
</script>


<AutoComplete 
  {options}
  bind:selectedValue={gear}
/>