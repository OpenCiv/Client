<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import * as sapper from '@sapper/app';
import Navbar from '../components/Navbar.svelte';
import { alerts, backend, busy } from '../stores';

let email = '';
let password = '';

$: disabled = $busy || !email || !password;

async function login() {
   const result = await backend('login', { username: email, password });
   if (result === true) {
      sapper.goto('menu', { replace: true });
   } else {
      alerts.add(result);
   }

   email = '';
   password = '';
}
</script>
<Navbar/>
<h2>Login</h2>
<div>
   <label>E-mail address</label>
   <input type=email disabled={$busy} bind:value={email}>
</div>
<div>
   <label>Password</label>
   <input type=password disabled={$busy} bind:value={password}>
</div>
<button {disabled} on:click={login}>Log in</button>
