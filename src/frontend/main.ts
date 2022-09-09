import "svelte";
import { push } from "svelte-spa-router";
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

window.api.openSvelteRoute((path: string) => {
  push(path);
});

export default app;
