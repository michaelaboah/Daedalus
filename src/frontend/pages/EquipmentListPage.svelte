<script lang="ts">
  import { Button, Center, Grid, Header, Kbd, Paper, Stack, Text } from "@svelteuidev/core";
  import { buildGear } from "../Classes";
  import EquipmentComponent from "../components/EquipmentComponent.svelte";
  import { gearList } from "../stores/Store";
  const addGear = () => {
    // let t: Gear = {...$gearList}
    //@ts-ignore
    $gearList = [...$gearList, buildGear($gearList.length -1)];
    console.log($gearList);
  };
  // let test = { ...$gearList.at(-1), quantity: 0, items: [] };
</script>

<Header height="10" pb="4">
  <Grid>
    <Grid.Col span="{1}">
      <Button on:click="{addGear}">Add Gear</Button>
    </Grid.Col>
    <Grid.Col span="{1}">
      <Button on:click="{() => console.log($gearList)}">Delete Gear</Button>
    </Grid.Col>
  </Grid>
</Header>
{#if $gearList.length !== 0}
  <Stack align="stretch" justify="flex-start" spacing="xs">
    {#each $gearList as gear}
    {gear.gearId}
      <EquipmentComponent bind:gear/>
    {/each}
  </Stack>
{:else}
  <Center>
    <Paper>
      <Text size="xl" align="center">
        Empty list bud, try adding something using the Add Gear button or the
        <Kbd>⌘</Kbd> + <Kbd>N</Kbd>
      </Text>
    </Paper>
  </Center>
{/if}
