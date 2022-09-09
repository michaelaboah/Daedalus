<script lang="ts">
  import { Box, Button, Checkbox, Input, InputWrapper } from "@svelteuidev/core";
  import { setAccessToken } from "../utils/accessToken";
  import { LoginUser, MeDoc, type MeQuery, type UserInput } from "../generated/graphql";
  import { onMount } from "svelte";

  let loginOptions: UserInput = { email: "", password: "" };
  let isLoggedIn: boolean;
  let isRemembered: boolean;

  onMount(async () => {
    const userData = await window.api.handleUserStorage("preferences");
    isRemembered = userData.rememberMe;
    if (isRemembered && userData.credentials !== undefined) {
      loginOptions = userData.credentials;
    }
  });

  const handleRememberMe = async () => {
    isRemembered = !isRemembered;
    const userData = await window.api.handleUserStorage("preferences");
    if (isRemembered === false) {
      loginOptions = { email: "", password: "" };
      userData.credentials = undefined;
      console.log(userData.credentials);
      await window.api.handleUserStorage("preferences", { ...userData, rememberMe: isRemembered });
    }
    await window.api.handleUserStorage("preferences", { ...userData, rememberMe: isRemembered });
  };

  const sumbitLogin = async (credentials: UserInput) => {
    const loginResponse = await LoginUser({
      variables: { inputOptions: credentials },
      update: (store, { data }) => {
        if (!data) return null;
        store.writeQuery<MeQuery>({
          query: MeDoc,
          data: {
            me: data.loginUser.user,
          },
        });
        console.log()
        return data.loginUser.user;
      },
    });
    if (loginResponse && loginResponse.data) {
      isLoggedIn = false;
      setAccessToken(loginResponse.data?.loginUser.accessToken);
    }

    //check if the user wants the login to be remembered
    if (isRemembered) {
      const userData = await window.api.handleUserStorage("preferences");
      await window.api.handleUserStorage("preferences", { ...userData, credentials });
    }
    isLoggedIn = true;
  };
</script>

<Box ml="6">
  <InputWrapper label="Login Credentials" description="Please enter your username and password" size="lg">
    <Input bind:value="{loginOptions.email}" placeholder="Enter: Email" />
    <Input bind:value="{loginOptions.password}" placeholder="Enter: Password" type="password" />
    <Button on:click="{() => sumbitLogin(loginOptions)}">Login</Button>
  </InputWrapper>
  <Checkbox label="Remember Me" bind:checked="{isRemembered}" on:change="{handleRememberMe}" />
</Box>
