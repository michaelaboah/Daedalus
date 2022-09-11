<style>
  div :global(.autocomplete *){
    width: 25vw;
    max-width: 100%;
	}	
</style>

<script>
  import { Box, Button, Grid, NumberInput, SimpleGrid, Text, TextInput, theme } from "@svelteuidev/core";
  import { MagnifyingGlass } from "radix-icons-svelte";
  import { buildEquipment, buildItem } from "../Classes";
  import { AsyncFuzzyTextSearch } from "../generated/graphql";
  import AutoComplete from 'simple-svelte-autocomplete'
  import { gearList } from "../stores/Store";

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
    reformed = newItem
    $gearList[index] = newItem
  };

  //handle total item count
  const handleItemChange = () => {
      const sum = reformed.items.map((item) => item.itemQuantity)
      reformed.quantity = sum.reduce((partial, i) => partial + i, 0)
      console.log(`Total Items: ${reformed.quantity}`)
  };  

  const handleCreateGear = (newGear) => {
    let createEquip = buildEquipment({model: newGear, createdAt: new Date(), updatedAt: new Date()})
    return $gearList[index] = createEquip
  }
</script>

<Box css="{{ backgroundColor: theme.colors['dark100'] }}">
  <Grid cols="{12}" grow>
    <Grid.Col span="{3}">
      <Text weight="bold" size="xl" m="xs">Autosearch Model</Text>
      <div>
        <AutoComplete
          bind:selectedItem="{gear}"
          bind:value="{gear}"
          searchFunction="{asyncTest}"
          placeholder="Search For Item Ex: 'Galaxy'"
          labelFieldName="model"
          delay="200"
          create={true}
          createText={"Item Doesn't exist, create one?"}
          onCreate={handleCreateGear}
        />
      </div>
      <!-- <TextInput  icon="{MagnifyingGlass}" placeholder="Search by Model" size="sm" bind:value={gear.model}/> -->
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl" m="xs">Total Quantity</Text>
      <NumberInput defaultValue="{gear.quantity}" bind:value="{reformed.quantity}" min="{0}" size="sm" hideControls />
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl" m="xs">Initial Cost</Text>
      <NumberInput bind:value="{gear.cost}" min="{0}" size="sm" />
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="xl" m="xs">Total Cost: ${totalCost}</Text>
    </Grid.Col>
    <Grid.Col span="{2}">
      <Text weight="bold" size="xl" m="xs">Total Power Draw: {totalPower}</Text>
    </Grid.Col>
    <Grid.Col offset="{1}" span="{1}">
      <Button on:click="{addItem}" disabled="{!gear.model}">Add Item</Button>
    </Grid.Col>
    {#if reformed.items != undefined && reformed.items.length > 0}
      {#each reformed.items as { description, itemQuantity, publicNotes, privateNotes }}
        <SimpleGrid cols={4} ml="lg" mb="lg">
          <TextInput label="Description" bind:value="{description}" />
          <NumberInput label="Quantity" min="{0}" on:change="{handleItemChange}" bind:value="{itemQuantity}" />
          <TextInput label="Public Notes" bind:value="{publicNotes}" />
          <TextInput label="Private Notes" bind:value="{privateNotes}" />
        </SimpleGrid>  
      {/each}
    {/if}
  </Grid>
</Box>

