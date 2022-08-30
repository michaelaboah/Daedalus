<script lang="ts">
  import { Me } from "../generated/graphql";

  $: status = Me({ fetchPolicy: "network-only" });
</script>

<header>
  <slot />
  This is the header

  {#await $status}
    <div>Loading</div>
  {:then value}
    <div>User name is: {value?.data?.me?.email}</div>
  {:catch error}
    <div>Error: {error}</div>
  {/await}
</header>
