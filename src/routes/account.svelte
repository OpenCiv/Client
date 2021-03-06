<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { alerts, backend, busy } from '../stores';

const { page } = sapper.stores();

// The values received from the server
let user = null;

// The values bound to the inputs
let name = '';
let email = '';

// Values indicating whether the properties are in edit mode
let editName = false;
let editEmail = false;

// Refreshes on mount
// If a token is passed as URL parameter, it is sent to the backend to verify the user's e-mail address
onMount(async () => {
   await refresh();
   name = user.name;
   email = user.email;
   if ($page.query.token && !user.verified) {
      let success = await backend('account/verify', { token: $page.query.token });
      alerts.add(success ? 'Your account is now verified' : 'Verification failed');
      if (success) {
         sapper.goto('menu', { replace: true });
      }
   }
});

/**
 * Gets the user's details
 */
async function refresh() {
   user = await backend('account/getuser');
}

/**
 * Changes the name of the user
 */
async function onChangeName() {
   let result = await backend('account/changename', { name });
   editName = false;
   if (result === true) {
      user.name = name;
      user = user;
   } else {
      alerts.add(result);
      refresh();
   }
}

/**
 * Changes the e-mail address of the user
 */
async function onChangeEmail() {
   let result = await backend('account/changeemail', { email });
   editEmail = false;
   if (result === true) {
      user.email = email;
      user.verified = false;
      user = user;
   } else {
      alerts.add(result);
      refresh();
   }
}

/**
 * Sends a new verification e-mail
 */
async function resend() {
   let result = await backend('account/resend');
   if (result) {
      alerts.add(`A verification e-mail is sent to ${user.email}.<br>Please click on the link in that e-mail to verify your account.`);
   } else {
      alerts.add('The verification e-mail could not be sent.');
      refresh();
   }
}

/**
 * Resets the displayed name to the current
 */
function cancelName(event) {
   if (event.key === 'Escape') {
      name = user.name;
      editName = false;
   }
}

/**
 * Resets the displayed e-mail address to the current
 */
function cancelEmail(event) {
   if (event.key === 'Escape') {
      email = user.email;
      editEmail = false;
   }
}

/**
 * Removes the user entirely
 */
async function remove() {
   if (confirm('Are you sure you want to delete your account?')) {
      await backend('account/remove');
      alerts.add('Your account has been deleted');
      sapper.goto('login', { replace: true });
   }
}
</script>

<div class="menuwrapper">
   <img src="../img/branding/prosper_logo.svg" alt="Prosper" class="menulogo">
   <h1>Account Settings</h1>
   {#if !user}
      <span>Loading...</span>
   {:else}

   <div class="separator"></div>
      
   <h2>Display name</h2>
   <div class="row">
      <div class="half">
         {#if editName}
            <input type=text disabled={$busy} bind:value={name} on:change={onChangeName} on:keydown={cancelName}>
         {:else}
            <span class="label">{user.name} </span> 
         {/if}
      </div>
      <div class="half">
         <button class="button" on:click={() => { editName = !editName; }}>Change</button>
      </div>
   </div>

   <div class="separator"></div>
      
   <h2>E-mail address</h2>
   <div class="row">
      <div class="half">
         {#if editEmail}
            <input type=email disabled={$busy} bind:value={email} on:change={onChangeEmail} on:keydown={cancelEmail}>
         {:else}
            <span class="label">{user.email} </span>
         {/if}
      </div>
      <div class="half">
         <button class="button" on:click={() => { editEmail = !editEmail; }}>Change</button>
      </div>
   </div>

   <div class="separator"></div>
      
   <a href="/changepassword" class="button">Change password</a>
   <button class="button" disabled={$busy} on:click={remove}>Delete account</button>
      {#if !user.verified}
         <p>
            <span>Your account has not been verified yet.</span><br>
            <button class="button" disabled={$busy} on:click={resend}>Resend verification e-mail</button>
         </p>
      {/if}
   {/if}
   <a href="/menu" class="button cancel">Back</a>
</div>