<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';
import Icon from 'svelte-awesome/components/Icon.svelte';
import { edit } from 'svelte-awesome/icons';
import { alerts } from '../stores';

let user = null;
let editName = false;
let editEmail = false;

onMount(() => {
   axios.post('account.php', JSON.stringify({ request: 'getuser' }))
   .then(response => {
      if (response.data) {
         user = response.data;
      } else {
         sapper.goto('login');
      }
   })
   .catch(error => {
      if (error) {
         console.log(error ? error.message || error : 'unknown error');
      }

      sapper.goto('login');
   });
});

function resend() {
   axios.post('account.php', JSON.stringify({ request: 'resend' }))
   .then(() => {
      alerts.update(a => [...a, `A verification e-mail is sent to ${user.email}.<br>Please click on the link in that e-mail to verify your account.`]);
   })
}
</script>

{#if user}
   <p>
      <a href="/menu">Menu</a>
   </p>
   <p>
      <span>Display name:
         {#if editName}
            <input type=text bind:value={user.name}>
         {:else}
            {user.name}
         {/if}
      </span>
      <Icon data={edit} on:click={editName = !editName} /><br>
      <span>E-mail address:
         {#if editEmail}
            <input type=email bind:value={user.email}>
         {:else}
            {user.email}
         {/if}
      </span>
      <Icon data={edit} on:click={editEmail = !editEmail} /><br>
   </p>
   {#if !user.verified}
      <p div="unverified">
         <span>Your account has not been verified yet.</span>
         <button type="button" on:click={resend}>Resend verification e-mail</button>
      </p>
   {/if}
{/if}