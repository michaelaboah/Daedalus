<script lang="ts">
  import { Notification, Footer } from "@svelteuidev/core";
  import { Check, Cross2 } from "radix-icons-svelte";
  import { setAccessToken } from "../utils/accessToken";

  const response = fetch("http://localhost:4000/refresh_token", {
    method: "POST",
    credentials: "include",
  })
    .then((x) => x.json())
    .then(({ accessToken: recievedToken }) => {
      console.log(recievedToken);
      setAccessToken(recievedToken);
    });
  let isNotified: boolean = true;
</script>

<!-- <Button on:click={() => isNotified = !isNotified}>Notification</Button> -->
<Footer height="10" fixed>
  {#if isNotified}
    {#await response}
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
