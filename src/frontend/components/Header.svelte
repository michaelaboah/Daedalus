<style>
</style>

<script lang="ts">
  import { push } from "svelte-spa-router";
  import { ActionIcon, Box, Button, Grid, Header } from "@svelteuidev/core";
  import { Gear } from "radix-icons-svelte";
</script>

<Header fixed height="40" m="10">
  <Box>
    <Grid spacing="md" cols="{24}">
      <Grid.Col span="{2}">
        <ActionIcon ml="lg" mr="lg" radius="xl" size="xl" variant="hover" color="dark" on:click="{() => push('#/')}">
          <div on:click="{() => push('/')}">Logo or Other</div>
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button radius="sm" on:click="{() => push('#/EquipmentListPage')}">Equipemnt List</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button on:click="{() => push('#/ProjectPage')}">Project Page</Button>
      </Grid.Col>
      <Grid.Col span="{2}">
        <Button on:click="{() => push('#/PreferencesPage')}">remove</Button>
      </Grid.Col>
      <Grid.Col span="{1}" offset="{15}">
        <ActionIcon radius="xl" size="xl" variant="hover" color="dark" on:click="{() => push('#/PreferencesPage')}">
          <Gear size="{40}" />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  </Box>
</Header>
