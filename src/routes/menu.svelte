<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { backend } from '../stores';

let games = [{id: 1, name: 'Test game'}];

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
   {#if games}
      {#each games as game}
         <a href={'/game/' + game.id}>{game.name}</a><br>
      {/each}
   {/if}
   <a href="/account">Account</a>
</p>
<button on:click={logoff}>Log off</button>
