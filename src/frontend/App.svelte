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
  import Login from './components/Login.svelte'
  import "carbon-components-svelte/css/all.css";
  import MainMenu from "./pages/MainMenu.svelte";
  import Router, {push} from "svelte-spa-router"
  import {Tabs, Tab} from "carbon-components-svelte"


  export let name: string;



  const routes = {
    "/": MainMenu 
  }

  const nav = [
    { name: "MainMenu", route: "#/" }
  ]
  
</script>




<Tabs type="container">
  {#each nav as point}
    <Tab label="{point.name}" on:click="{() => push(point.route)}"/>
  {/each}
</Tabs>
<Login/>
<Router routes="{routes}" />