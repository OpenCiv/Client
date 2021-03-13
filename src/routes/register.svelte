<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<script>
import * as sapper from '@sapper/app';
import { alerts, backend, busy } from '../stores';

// The user's name
let name = '';

// The user's e-mail address
let email = '';

// The user's password
let password = '';

// The user's password again
let repeat = '';

// Whether a registration can be requested
$: disabled = $busy || !name || !email || !password;

/**
 * Registers a new user
 */
async function register() {

   // The regular expression tests the e-mail address' validity
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(email)) {
      alerts.add('Not a valid e-mail address');
      return;
   }

   // Check if the user filled in the same password twice
   if (password !== repeat) {
      alerts.add('The passwords are not the same');
      return;
   }

   // Register as a new user
   let result = await backend('account/register', { name, email, password });
   if (!result) {
      sapper.goto('menu', { replace: true });
   } else {
      alerts.add(result);

      // ToDo: result value is too specific
      if (result === 'E-mail address already used') {
         sapper.goto('newpassword', { replace: true });
      }
   }
}
</script>

<div class="menuwrapper">
   <img src="../img/branding/prosper_logo.svg" alt="Prosper" class="menulogo">
   <h1>Register</h1>
   <div class="row">
      <div class="third left">
         <label for="name">Name</label>
      </div>
      <div class="two-thirds">
         <input type=text disabled={$busy} id="name" placeholder="Nickname or real name..." bind:value={name}>
      </div>
   </div>
   
   <div class="row">
      <div class="third left">
         <label for="email">E-mail address</label>
      </div>
      <div class="two-thirds">
         <input type=email disabled={$busy} id="email" placeholder="name@domain.com" bind:value={email}>
      </div>
   </div>
   <div class="row">
      <div class="third left">
         <label for="password">Password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} id="password" bind:value={password}>
      </div>
   </div>
   <div class="row">
      <div class="third left">
         <label for="repeat">Repeat password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} id="repeat" bind:value={repeat}>
      </div>
   </div>
   <button class="button" {disabled} on:click={register}>Register</button>
   <a href="/login" class="button cancel">Back</a>
</div>
