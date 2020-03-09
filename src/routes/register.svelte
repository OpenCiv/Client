<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import * as sapper from '@sapper/app';
import { alerts, backend, busy } from '../stores';
import Navbar from '../components/Navbar.svelte';

let name = '';
let email = '';
let password = '';
let repeat = '';

$: disabled = $busy || !name || !email || !password;

async function register() {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(email)) {
      alerts.add('Not a valid e-mail address');
      return;
   }

   if (password !== repeat) {
      alerts.add('The passwords are not the same');
      return;
   }

   let result = await backend('register', { name, email, password });
   if (!result) {
      sapper.goto('menu', { replace: true });
   } else {
      alerts.add(result);
      if (result === 'E-mail address already used') {
         sapper.goto('newpassword', { replace: true });
      }
   }
}
</script>

<Navbar/>
<h2>Register</h2>
<div>
   <label>Name</label>
   <input type=text disabled={$busy} placeholder="Nickname or real name..." bind:value={name}>
</div>
<div>
   <label>E-mail address</label>
   <input type=email disabled={$busy} placeholder="name@domain.com" bind:value={email}>
</div>
<div>
   <label>Password</label>
   <input type=password disabled={$busy} bind:value={password}>
</div>
<div>
   <label>Repeat password</label>
   <input type=password disabled={$busy} bind:value={repeat}>
</div>
<button {disabled} on:click={register}>Register</button>
