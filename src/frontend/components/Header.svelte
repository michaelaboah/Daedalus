<script lang="ts">
  import { Me } from "../generated/graphql";
  import { Notification, AppShell, Header, Footer, Button, Grid, Box } from "@svelteuidev/core";
  import { Check, Cross2, Gear } from "radix-icons-svelte";
  import Routes from "../Routes.svelte";
  import { push } from "svelte-spa-router";
  import { setAccessToken } from "../accessToken";

  const response = fetch("http://localhost:4000/refresh_token", {
    method: "POST",
    credentials: "include",
  })
    .then((x) => x.json())
    .then(({ accessToken: recivedToken }) => {
      setAccessToken(recivedToken);
    });

  // $: status = Me({ fetchPolicy: "network-only" });
  // only for notifications
  let isNotified: boolean;

</script>

<AppShell fixed>

  <Header fixed slot="header" height="40" m="10">
    <Box>
      <Grid spacing="md">
        <Grid.Col span="{1}">
          <div on:click="{() => push('/')}">Logo or Other</div>
        </Grid.Col>
        <Grid.Col span="{1}">
          <Button radius="sm" on:click="{() => push('/EquipmentListPage')}">Equipemnt List</Button>
        </Grid.Col>
        <Grid.Col span="{1}">
          <Button on:click="{() => (isNotified = true)}">Notification</Button>
        </Grid.Col>
        <Grid.Col span="{1}">
          <Button on:click="{() => (isNotified = false)}">remove</Button>
        </Grid.Col>
        <Grid.Col span="{1}" offset="{5}">
          <Gear size="{40}" />
        </Grid.Col>
      </Grid>
    </Box>
  </Header>

  <!-- Main content uses the default slot, so no need to explicitly declare it -->
  <!-- <ShellSection grow>
		<div>Shell</div>
	</ShellSection> -->

  <!-- <Aside slot="aside" ml="xl">
		<div>Aside</div>
	</Aside> -->

  <Routes/>

  <Footer slot="footer" height="10" fixed>
    {#if !isNotified}
      {#await response then}
          <Notification
            title="Connection Successful!"
            icon="{Check}"
            color="teal"
            closeButtonProps="{{ iconSize: 'xl' }}"
            on:close="{() => (isNotified = !isNotified)}"
            closeButtonLabel="Hide Success Notification"
          >
            You have successfully connected to the server
          </Notification>
        
      {:catch error}
        <Notification
          on:close
          title="Connection Failed"
          icon="{Cross2}"
          color="red"
          closeButtonProps="{{ iconSize: 'xl' }}"
          closeButtonLabel="Hide Error Notification"
          on:close="{() => (isNotified = !isNotified)}"
        >
          <div>You are not connected to the server | Autocomplete is diabled</div>
          <div>Error Message: {error}</div>
        </Notification>
      {/await}
    {/if}
  </Footer>
</AppShell>
