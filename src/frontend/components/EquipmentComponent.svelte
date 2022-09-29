<style>
  .autocomplete {
    margin-left: 1vw;
  }
</style>

<script lang="ts">
  //@ts-ignore
  import { Box, Button, Grid, Input, NumberInput, SimpleGrid, Text, TextInput, theme } from "@svelteuidev/core";
  import { buildEquipment, buildItem, type Equipment, type Gear } from "../Classes";
  import { AsyncFuzzyTextSearch } from "../generated/graphql";
  //@ts-ignore
  import Select from "svelte-select";
  import { gearList } from "../stores/Store";


  export let gear: Gear;
  export let index = 0;
  
  $: totalCost = gear.quantity * gear.cost
  $: totalPower = gear.quantity * (gear.powerDraw ??= 0)

  const asyncTest = async () => {
    const response = await AsyncFuzzyTextSearch({ variables: { fuzzySearch: gear.model } });
    return response.data.fuzzyTextSearch;
  };

  const addItem = () => {
    gear.items = [...gear.items, buildItem()];
  };

  //handle total item count
  const handleItemChange = () => {
    const sum = gear.items.map((item) => item.itemQuantity);
    gear.quantity = sum.reduce((partial, i) => partial + i, 0);
  };

  // const handleCreateGear = (newGear: Equipment) => {
  //   let createEquip = buildEquipment();
  //   return ($gearList[index] = createEquip);
  // };

  const handleSelect = (e: { detail: Equipment }) => {
    gear = {...gear, ...e.detail}
    $gearList[index] = gear;
  };
</script>

<Box css="{{ backgroundColor: theme.colors['dark100'] }}">
  <Grid cols="{12}" grow>
    <Grid.Col span="{3}">
      <Text weight="bold" size="xl" m="xs">Quick Search Model</Text>
      <div class="autocomplete">
        <Select
          value="{null}"
          loadOptions="{asyncTest}"
          placeholder=""
          on:select="{handleSelect}"
          labelIdentifier="{'model'}"
        />
      </div>
      <Input bind:value="{gear.model}" />
    </Grid.Col>
    <Grid.Col span="{1}">
      <Text weight="bold" size="xl" m="xs">Total Quantity</Text>
      <NumberInput defaultValue="{gear.items.length}" bind:value="{gear.quantity}" min="{0}" size="sm" hideControls />
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
      {#each gear.items as { description, itemQuantity, publicNotes, privateNotes }}
        <SimpleGrid cols={6} ml="lg" mb="lg">
          <TextInput label="Description" bind:value="{description}" />
          <NumberInput label="Quantity" min="{0}" on:change="{handleItemChange}" bind:value="{itemQuantity}" />
          <TextInput label="Public Notes" bind:value="{publicNotes}" />
          <TextInput label="Private Notes" bind:value="{privateNotes}" />
        </SimpleGrid>  
      {/each}
  </Grid>
</Box>
