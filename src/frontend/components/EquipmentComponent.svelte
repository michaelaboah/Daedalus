<script lang="ts">
  import { Box, Button, Grid, NumberInput, Text, TextInput, theme } from "@svelteuidev/core";
  import { MagnifyingGlass } from "radix-icons-svelte";
  import { gearList } from "../stores/Store";
  import { buildItem, type Equipment, type Item } from "../Classes";
  import { AsyncFuzzyTextSearch } from "../generated/graphql";
  import AutoComplete from 'simple-svelte-autocomplete'

  type Gear = Equipment & { items: Item[], quantity: number}

  export let gear: Equipment
   let test: Gear  
  export let index: number
  $: test = {...gear, quantity: 0, items: new Array<Item>()}
  $: totalCost = test.quantity * test.cost!
  $: totalPower = test.quantity * test.powerDraw!
  $: totalItems = 0

  // $: $gearList[index] = test

    
  const asyncTest = async () => {
    const response = await AsyncFuzzyTextSearch({variables: {fuzzySearch: gear.model }})
      console.log(response.data.fuzzyTextSearch)
    return response.data.fuzzyTextSearch
  }

  const addItem = () => { 
    // test.items = [...test.items, buildItem()]
    test.items.push(buildItem())
    // test.items = test.items
    console.log(test.items)
  };

  //handle total item count
  const handleItemChange = () => {
      const sum = test.items.map((item: { itemQuantity: number; }) => item.itemQuantity as number)
      totalItems = sum.reduce((partial: any, i: any) => partial + i, 0)
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
      <NumberInput defaultValue="{test.quantity}" bind:value="{totalItems}" min="{0}" size="sm" hideControls />
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
      <Button on:click="{addItem}">Add Item</Button>
    </Grid.Col>
    {#if test.items.length > 0}
    {test.items}
      {#each test.items as item}
      {item}
        <Grid.Col span="{2}">
          <TextInput label="Description" bind:value="{item.description}" />
        </Grid.Col>
        <Grid.Col span="{1}">
          <NumberInput
            label="Quantity"
            min="{0}"
            on:change={handleItemChange}
            bind:value={test.quantity}
          />
        </Grid.Col>
      {/each}
    {/if}
  </Grid>
</Box>
