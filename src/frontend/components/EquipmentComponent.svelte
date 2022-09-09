<script>
  import { Box, Button, Grid, NumberInput, Text, TextInput, theme } from "@svelteuidev/core";
  import { MagnifyingGlass } from "radix-icons-svelte";
  import { buildItem } from "../Classes";
  import { AsyncFuzzyTextSearch } from "../generated/graphql";
  import AutoComplete from 'simple-svelte-autocomplete'
  import { gearList } from "../stores/Store";
import { onMount } from "svelte";

  export let gear
  export let index = 0
  let items = []
  $: reformed = $gearList[index]
  $: totalCost = reformed.quantity * reformed.cost
  $: totalPower = reformed.quantity * reformed.powerDraw
  // $: totalItems = 0

    
  const asyncTest = async () => {
    const response = await AsyncFuzzyTextSearch({variables: {fuzzySearch: gear.model }})
      // console.log(response.data.fuzzyTextSearch)
    return response.data.fuzzyTextSearch
  }

  const addItem = () => { 
    let newItem = JSON.parse(JSON.stringify(gear))
    newItem.items = []
    items = [...items, buildItem()]
    newItem.items = items
    console.log(newItem.items)
    reformed = newItem
    $gearList[index] = newItem
  };

  onMount(() => {
    console.log($gearList)
  })

  //handle total item count
  const handleItemChange = () => {
      const sum = reformed.items.map((item) => item.itemQuantity)
      reformed.quantity = sum.reduce((partial, i) => partial + i, 0)
      console.log(`Total Items: ${reformed.quantity}`)
  };  
</script>


<Box css="{{ backgroundColor: theme.colors['dark100'] }}">
  <Grid cols="{12}">
    <Grid.Col span="{3}">
      <Text weight="bold" size="xl">Model</Text>
      <AutoComplete  bind:selectedItem={gear} searchFunction={asyncTest} labelFieldName="model" delay="200"/>
      <TextInput  icon="{MagnifyingGlass}" placeholder="Search by Model" size="sm" bind:value={gear.model}/>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl">Total Quantity</Text>
      <NumberInput defaultValue="{gear.quantity}" bind:value="{reformed.quantity}" min="{0}" size="sm" hideControls />
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl">Initial Cost</Text>
      <NumberInput bind:value="{gear.cost}" min="{0}" size="sm" />
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="xl">Total Cost: ${totalCost}</Text>
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="xl">Total Power Draw: {totalPower}</Text>
    </Grid.Col>
    <Grid.Col offset="{1}" span="{1}">
      <Button on:click="{addItem}" disabled={!gear.model}>Add Item</Button>
    </Grid.Col>
    {#if reformed.items != undefined && reformed.items.length > 0}
      {#each reformed.items as {description, itemQuantity}}
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
