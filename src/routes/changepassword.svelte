<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<script>
import * as sapper from '@sapper/app';
import { alerts, backend, busy } from '../stores';

// Should become equal to the current password
let oldpass = '';

// The new password
let newpass = '';

// The new password again
let repeat = '';

// message === null when a password change is pending
$: disabled = $busy || !oldpass || !newpass;

/**
 * Sends the new password to the backend
 */
async function submitPassword() {
   if (newpass !== repeat) {
      message = 'The passwords are not the same';
      return;
   }

   const result = await backend('account/changepassword', { oldpass, newpass });
   if (result) {
      alerts.add('Password successfully changed');
      sapper.goto('account', { replace: true });
   } else {
      alerts.add('Incorrect password');
   }
}
</script>

<div class="menuwrapper">
   <img src="../img/branding/prosper_logo.svg" alt="Prosper" class="menulogo">
   <h1>Change password</h1>

   <div class="separator"></div>

   <div class="row">
      <div class="third left">
         <label for="oldpass">Current password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} id="oldpass" bind:value={oldpass}>
      </div>
   </div>
   <div class="row">
      <div class="third left">
         <label for="newpass">New password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} id="newpass" bind:value={newpass}>
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

   <div class="separator"></div>

   <button class="button" {disabled} on:click={submitPassword}>Submit</button>
   <a href="/account" class="button cancel">Back</a>
</div>

