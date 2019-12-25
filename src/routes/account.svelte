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

const { page } = sapper.stores();

onMount(() => {
   axios.post('account.php', JSON.stringify({ request: 'getuser' }))
   .then(response => {
      if (response.data) {
         user = response.data;
         if ($page.query.token) {
            axios.post('account.php', JSON.stringify({ request: 'verify', token: $page.query.token }))
            .then(res => {
               if (res.data) {
                  user.verified = true;
                  alerts.add('Your account is now verified');
                  sapper.goto('menu', { replace: true })
               } else {
                  alerts.add('Verification failed');
               }
            })
         }
      } else {
         sapper.goto('login', { replace: true });
      }
   })
   .catch(error => {
      alerts.add(error ? error.message || error : 'unknown error');
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
      <label>Display name:</label>
      {#if editName}
         <input type=text bind:value={user.name}>
      {:else}
         {user.name}
      {/if}
      <button on:click={() => { editName = !editName; }}>
         <Icon data={edit} />
      </button><br>
      <label>E-mail address:</label>
      {#if editEmail}
         <input type=email bind:value={user.email}>
      {:else}
         {user.email}
      {/if}
      <button on:click={() => { editEmail = !editEmail; }}>
         <Icon data={edit} />
      </button><br>
   </p>
   <a href="/changepassword">Change password</a>
   {#if !user.verified}
      <p div="unverified">
         <span>Your account has not been verified yet.</span><br>
         <button on:click={() => resend()}>Resend verification e-mail</button>
      </p>
   {/if}
{/if}