<script lang="ts">
import { setAccessToken } from '../accessToken';

    import {LoginUser, MeDoc, type MeQuery, type UserInput } from '../generated/graphql'
    let loginOptions: UserInput = {email: "", password: ""}
    let isLoggedIn = false
    const sumbitLogin = async (credentials: UserInput) => {
        const loginResponse = await LoginUser({
            variables: { inputOptions: credentials },
            update: (store, {data}) => {
                if (!data) {
                    return null
                }
                store.writeQuery<MeQuery>({
                    query: MeDoc,
                    data: {
                        me: data.loginUser.user
                    }
                })
                return data.loginUser.user
            }
        })
        if (loginResponse && loginResponse.data){
            isLoggedIn = false
            console.log(loginResponse.data)
            setAccessToken(loginResponse.data?.loginUser.accessToken)
        } 
            isLoggedIn = true
        
    }

</script>
<form action=""
    on:submit|preventDefault="{() => sumbitLogin(loginOptions)}"
    
>
    <input type="text" bind:value={loginOptions.email} placeholder="Enter: Email"/>
    <input type="password" bind:value={loginOptions.password} placeholder="Enter: Password"/>
    <button type="submit">Login</button>
</form>


{#if isLoggedIn}
    <div>Logged In!!</div>
    {:else}
    <div>Failed</div>
{/if}