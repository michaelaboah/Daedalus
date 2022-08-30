<script lang="ts">
import { Tab, Tabs } from "carbon-components-svelte";
import Router, { push } from "svelte-spa-router";
import Login from "./components/Login.svelte";
import MainMenu from "./pages/MainMenu.svelte";
import Bye from './pages/Bye.svelte';

const routes = {
    "/": MainMenu,
    "/Bye": Bye 
  }

  const nav = [
    { name: "MainMenu", route: "#/" },
    { name: "Bye", route: "#/Bye" },
  ]
    
</script>

<Tabs type="container">
    {#each nav as point}
      <Tab label="{point.name}" on:click="{() => push(point.route)}"/>
    {/each}
  </Tabs>
  <Login/>
  <Router routes="{routes}" />