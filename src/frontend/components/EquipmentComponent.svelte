<script lang="ts">
  import { Box, Button, Grid, NumberInput, Text, TextInput, theme } from "@svelteuidev/core";
  import { MagnifyingGlass } from "radix-icons-svelte";
  import { onMount } from "svelte";
  import { Item } from "../Classes";
import { AsyncFuzzySearch } from "../generated/graphql";
  import type { Gear } from "../global";

  export let equipment: Gear;
  export let items: Item[] = [];
  // let modelSearchInput = ""
  $: totalCost = equipment.quantity * (equipment.cost ??= 0);
  $: totalPower = equipment.quantity * (equipment.powerDraw ??= 0);
  $: totalItems = 0
  

  onMount(() => {
    if (equipment.items === undefined) {
      totalItems = 0
    } else {
      totalItems = equipment.items!
        .map((item) => item.itemQuantity as number)
        .reduce((partial, i) => partial + i, 0)
    }
  })

  $: fuzzyResponse = AsyncFuzzySearch({variables: {FuzzySearchInput: equipment.model }})

  const addItem = () => {
    items = [...items, new Item()]
  };

  const handleItemChange = () => {
      const sum = equipment.items!.map((item) => item.itemQuantity as number)
      totalItems = sum.reduce((partial, i) => partial + i, 0)
  };  
</script>

<Box css="{{ backgroundColor: theme.colors['dark100'] }}">
  <Grid cols="{12}">
    <Grid.Col span="{3}">
      <Text weight="bold" size="xl">Model</Text>
      <TextInput  icon="{MagnifyingGlass}" placeholder="Search by Model" size="sm" bind:value={equipment.model}/>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl">Total Quantity</Text>
      <NumberInput defaultValue="{equipment.quantity}" bind:value="{totalItems}" min="{0}" size="sm" hideControls />
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl">Initial Cost</Text>
      <NumberInput defaultValue="{equipment.cost}" bind:value="{equipment.cost}" min="{0}" size="sm" />
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="xl">Total Cost: ${totalCost}</Text>
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="xl">Total Power Draw: {totalPower}</Text>
    </Grid.Col>
    <Grid.Col offset="{1}" span="{1}">
      <Button on:click="{addItem}">Add Item</Button>
    </Grid.Col>
    {#if items.length > 0}
      {#each items as { description, itemQuantity }}
        <Grid.Col span="{2}">
          <TextInput label="Description" bind:value="{description}" />
        </Grid.Col>
        <Grid.Col span="{1}">
          <NumberInput
            label="Quantity"
            min="{0}"
            on:change={handleItemChange}
            bind:value={itemQuantity}
          />
        </Grid.Col>
      {/each}
    {/if}
  </Grid>
</Box>
