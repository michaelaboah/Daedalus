<style>

  div :global(.autocomplete *){
    width: 25vw;
    max-width: 100%;
	}	

  div :global(.parent *) {
    margin-right: 1vw;
    /* margin-top: 2%; */
    width: 200%;
  }

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