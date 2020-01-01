<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import Icon from 'svelte-awesome/components/Icon.svelte';
import { edit } from 'svelte-awesome/icons';
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

onMount(async () => {
   await refresh();
   name = user.name;
   email = user.email;
   if ($page.query.token && !user.verified) {
      let success = await backend('verify', { token: $page.query.token });
      alerts.add(success ? 'Your account is now verified.' : 'Verification failed.');
      if (success) {
         sapper.goto('menu', { replace: true });
      }
   }
});

async function refresh() {
   user = await backend('getuser');
}

async function onChangeName() {
   let result = await backend('changename', { name });
   editName = false;
   if (result === true) {
      user.name = name;
      user = user;
   } else {
      alerts.add(result);
      refresh();
   }
}

async function onChangeEmail() {
   let result = await backend('changeemail', { email });
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

async function resend() {
   let result = await backend('resend');
   if (result) {
      alerts.add(`A verification e-mail is sent to ${user.email}.<br>Please click on the link in that e-mail to verify your account.`);
   } else {
      alerts.add('The verification e-mail could not be sent.');
      refresh();
   }
}

function cancelName(event) {
   if (event.key === 'Escape') {
      name = user.name;
      editName = false;
   }
}

function cancelEmail(event) {
   if (event.key === 'Escape') {
      email = user.email;
      editEmail = false;
   }
}
</script>

<p>
   <a href="/menu">Menu</a>
</p>
{#if !user}
   <span>Loading...</span>
{:else}
   <p>
      <label>Display name:</label>
      {#if editName}
         <input type=text disabled={$busy} bind:value={name} on:change={onChangeName} on:keydown={cancelName}>
      {:else}
         {user.name}
      {/if}
      <button on:click={() => { editName = !editName; }}>
         <Icon data={edit} />
      </button><br>
      <label>E-mail address:</label>
      {#if editEmail}
         <input type=email disabled={$busy} bind:value={email} on:change={onChangeEmail} on:keydown={cancelEmail}>
      {:else}
         {user.email}
      {/if}
      <button on:click={() => { editEmail = !editEmail; }}>
         <Icon data={edit} />
      </button>
   </p>
   <a href="/changepassword">Change password</a>
   {#if !user.verified}
      <p div="unverified">
         <span>Your account has not been verified yet.</span><br>
         <button disabled={$busy} on:click={() => resend()}>Resend verification e-mail</button>
      </p>
   {/if}
{/if}