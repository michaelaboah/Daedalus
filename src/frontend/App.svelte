<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<script lang="ts">
  import "carbon-components-svelte/css/all.css";
  import { setAccessToken } from './accessToken';
  import { onMount } from 'svelte';
  import Routes from "./Routes.svelte";

  let loading = true
  onMount(async () => {
    const response = await fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include"
    })
      const { accessToken } = await response.json()
      setAccessToken(accessToken);
      loading = false
    });

</script>
{#if loading}
  <div>...loading</div>
  {:else}
  <Routes/>
{/if}


  

