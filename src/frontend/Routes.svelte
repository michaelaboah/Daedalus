<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import MainMenu from "./pages/MainMenu.svelte";
  import Bye from "./pages/Bye.svelte";
  import EquipmentListPage from "./pages/EquipmentListPage.svelte";

  const routes = {
    "/": MainMenu,
    "/Bye": Bye,
    "/EquipmentListPage": EquipmentListPage,
  };

  const nav = [
    { name: "MainMenu", route: "/" },
    { name: "Bye", route: "/Bye" },
    { name: "EquipmentListPage", route: "/EquipmentListPage" },
    { name: "PreferencesPage", route: "#/Bye" },
  ];
</script>

<!-- <Tabs type="container">
    {#each nav as point}
      <Tab label="{point.name}" on:click="{() => push(point.route)}"/>
    {/each}
  </Tabs> -->
<!-- <Header /> -->
<div>
  <Router routes="{routes}" />
</div>