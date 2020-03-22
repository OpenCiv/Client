<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import * as sapper from '@sapper/app';
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

<div class="menuwrapper">
   <h1>Login</h1>
   <div class="row">
      <div class="third left">
         <label>E-mail address</label>
      </div>
      <div class="two-thirds">
         <input type=email disabled={$busy} bind:value={email}>
      </div>
   </div>
   <div class="row">
      <div class="third left">
         <label>Password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} bind:value={password}>
      </div>
   </div>
   <button {disabled} on:click={login}>Log in</button>
   <div class="row">
      <div class="half">
         <a href="/register" class="button">Register</a>
      </div>
      <div class="half">
         <a href="/newpassword" class="button">Forgot password</a>
      </div>
   </div>
</div>