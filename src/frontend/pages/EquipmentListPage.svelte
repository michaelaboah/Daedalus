<style>
  /* .group.type-Console {
    border: 1px solid red;
  }
  .group.type-Processing {
    border: 1px solid green;
  }
  .thing.type-Console {
    color: red;
  }
  .thing.type-Processing {
    color: green;
  } */
</style>

<script>
  import { Button, Center, Grid, Header, Kbd, Paper, Stack, Text } from "@svelteuidev/core";
  import { Box, Title } from "@svelteuidev/core";
  import { buildGear } from "../Classes";
  import EquipmentComponent from "../components/EquipmentComponent.svelte";
  import EquipmentHeader from "../components/EquipmentHeader.svelte";
  import { gearList } from "../stores/Store";
  const addGear = () => {
    $gearList = [...$gearList, buildGear($gearList.length - 1)];
    console.log($gearList);
  };

  $: groups = $gearList.reduce((curr, val) => {
    let group = curr.length ? curr[curr.length - 1] : undefined;
    if (group && group.category === `${val.category}`) {
      group.values.push(val);
    } else {
      curr.push({ category: `${val.category}`, values: [val] });
    }
    return curr;
  }, []);

  $: $gearList.sort((a, b) => a.category.localeCompare(b.category));
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

{#each groups as group}
  <Stack align="stretch" justify="flex-start" spacing="xs">
    <div class="group {group.category}">
      <Box css="{{ backgroundColor: '$cyan100' }}">
        <Stack>
          <Title order="{3}">{group.category ? group.category : ""}</Title>
          {#each group.values as value, index (value)}
            <EquipmentComponent bind:gear="{value}" index="{index}" />
          {/each}          
        </Stack>
      </Box>
      <br />
    </div>
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
{/each}
