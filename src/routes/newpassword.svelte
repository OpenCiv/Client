<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { alerts, backend, busy } from '../stores';

// A new password is sent to this e-mail address if it exists in the database
let email = '';

// Whether a new password can be requested
$: disabled = $busy || !email;

/**
 * Sends a new password request to the backend
 */
async function submit() {

   // The regular expression tests whether the e-mail address is valid
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(email)) {
      alerts.add('Not a valid e-mail address');
      return;
   }

   // Send a new password request to the backend
   let result = await backend('account/newpassword', { email });
   if (result) {
      alerts.add(`A new password is sent to ${email}`);
      email = '';
   } else {
      alerts.add('E-mail address not found');
   }
}
</script>

<div class="menuwrapper">
   <img src="../img/branding/prosper_logo.svg" alt="Prosper" class="menulogo">
   <h1>Reset password</h1>
   <p>
      Please fill in your e-mail address. A new password will be sent to the address if it has an account.
   </p>
   <input type=email disabled={$busy} bind:value={email} placeholder="name@domain.com">
   <button class="button" {disabled} on:click={submit}>Send new password</button>
   <a href="/login" class="button cancel">Back</a>
</div>
