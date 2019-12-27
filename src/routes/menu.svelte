<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { backend, busy } from '../stores';

let games = [];

onMount(async () => {
   games = await backend('getgames');
});

async function logoff() {
   await backend('logoff');
   sapper.goto('login', { replace: true });
}
</script>
<h2>Main</h2>
<p>
   <a href="newgame">New game</a><br>
</p>
<p>
   {#if games}
      <h3>Active games</h3>
      {#each games as game (game.id)}
         <a href={'/game/' + game.id}>{game.name}</a><br>
      {/each}
   {:else}
      <span>None</span>
   {/if}
</p>
<a href="/account">Account</a>
<button disabled={$busy} on:click={logoff}>Log off</button>
