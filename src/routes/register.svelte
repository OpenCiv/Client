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

<div class="menuwrapper">
   <h1>Register</h1>
   <div class="row">
      <div class="third left">
         <label>Name</label>
      </div>
      <div class="two-thirds">
         <input type=text disabled={$busy} placeholder="Nickname or real name..." bind:value={name}>
      </div>
   </div>
   
   <div class="row">
      <div class="third left">
         <label>E-mail address</label>
      </div>
      <div class="two-thirds">
         <input type=email disabled={$busy} placeholder="name@domain.com" bind:value={email}>
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
   <div class="row">
      <div class="third left">
         <label>Repeat password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} bind:value={repeat}>
      </div>
   </div>
   <button {disabled} on:click={register}>Register</button>
   <a href="/login" class="button cancel">Back</a>
</div>
