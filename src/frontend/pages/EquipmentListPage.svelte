<script lang="ts">
  import { Button, Center, Grid, Header, Kbd, Paper, Stack, Text } from "@svelteuidev/core";
  import { buildGear } from "../Classes";
  import EquipmentComponent from "../components/EquipmentComponent.svelte";
  import { gearList } from "../stores/Store";
  const addGear = () => {
    //@ts-ignore
    $gearList = [...$gearList, buildGear($gearList.length -1)];
    console.log($gearList);
  }





  $: groups = $gearList.reduce((curr, val) => {
      let group = curr.length ? curr[curr.length - 1] : undefined 
      if (group && group.cssClass === `type-${val.category}`) {
        group.values.push(val)
      } else {
        curr.push({ cssClass: `type-${val.category}`, values: [ val ] }) 
      }
      return curr
    }, [])

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
      <div class="group {group.cssClass}">
        {JSON.stringify(group)}
      {#each group.values as value, index}
        <div class="thing {group.cssClass}">
          {JSON.stringify(value)}
          <EquipmentComponent bind:gear={value} {index}/>
        </div>
      {/each}
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


<style>
	.group.type-Console {
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
	}
</style>