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

let oldpass = '';
let newpass = '';
let repeat = '';

// message === null when a password change is pending
$: disabled = $busy || !oldpass || !newpass;

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
   <h1>Change password</h1>
   <div class="row">
      <div class="third left">
         <label>Current password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} bind:value={oldpass}>
      </div>
   </div>
   <div class="row">
      <div class="third left">
         <label>New password</label>
      </div>
      <div class="two-thirds">
         <input type=password disabled={$busy} bind:value={newpass}>
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
   <button class="button" {disabled} on:click={submitPassword}>Submit</button>
   <a href="/account" class="button cancel">Back</a>
</div>

