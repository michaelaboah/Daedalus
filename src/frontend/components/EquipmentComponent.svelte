<script lang="ts">
  import { Box, Button, Grid, NumberInput, Text, TextInput } from "@svelteuidev/core";
  import { MagnifyingGlass } from "radix-icons-svelte";
  import {Item } from '../Classes'
import type { Gear } from "../global";
// import { itemMap } from '../stores/Store'

  export let equipment: Gear  
  $: totalCost =  equipment.quantity * (equipment.cost ??= 0)
  $: totalPower = equipment.quantity * (equipment.powerDraw ??= 0)
  export let items: Item[] = []

  const addItem = () => {
    items.push(new Item())
    console.table(items)
    items = items
  }

  $: handleItemChange = (quantity?: number) => {
      if (quantity) equipment.quantity += quantity
  }


</script>

<Box css={{backgroundColor: "LightGrey"}} >
  <Grid cols={12}>
    <Grid.Col span={3}>
      <Text weight="bold" size="xl" >Model</Text>
      <TextInput 
        icon={MagnifyingGlass}
        placeholder="Search by Model"
        size="sm"
      />
    </Grid.Col>
    <Grid.Col span={1}>
      <Text weight="bold" size="xl" >Total Quantity</Text>
      <NumberInput 
        defaultValue={equipment.quantity}
        bind:value={equipment.quantity}
        min={0}
        size="sm"
      />
    </Grid.Col>
    <Grid.Col span={1}>
      <Text weight="bold" size="xl">Initial Cost</Text> 
      <NumberInput 
        defaultValue={equipment.cost}
        bind:value={equipment.cost}
        min={0}
        size="sm"
      />
    </Grid.Col>
    <Grid.Col span={2}>
      <Text weight="bold" size="xl" >Total Cost: ${totalCost}</Text>
    </Grid.Col>
    <Grid.Col span={2}>
      <Text weight="bold" size="xl" >Total Power Draw: {totalPower}</Text>
    </Grid.Col>
    <Grid.Col offset={1} span={1}>
      <Button
        on:click={addItem}
      >Add Item</Button>
    </Grid.Col>
      {#if items.length > 0}
        {#each items as item}      
          <Grid.Col span={2}>
            <TextInput label="Description" bind:value={item.description}/>
          </Grid.Col>
          <Grid.Col span={1}>
            <NumberInput 
              label="Quantity" 
              min={0} 
              bind:value={item.itemQuantity} 
              on:change={() => handleItemChange(item.itemQuantity)}
            />
          </Grid.Col>
        {/each}
      {/if}    
  </Grid>
</Box>



