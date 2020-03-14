<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { backend, busy } from '../stores';

let games = null;

onMount(async () => {
   games = await backend('getgames');
});

async function logoff() {
   await backend('logoff');
   sapper.goto('login', { replace: true });
}
</script>
<div class="menuwrapper">
   <h1>Menu</h1>
   <a href="newgame" class="button">New game</a>
   
   <h3>Active games</h3>

   {#if !Array.isArray(games)}
      <span>Loading...</span><br>
   {:else if games.length === 0}
      <span>None</span><br>
   {:else}
      {#each games as game (game.id)}
         <a href={'/game/' + game.id} class="button">{game.name}</a>
      {/each}
   {/if}

   <a href="/account" class="button">Account</a>

   <button disabled={$busy} on:click={logoff} class="cancel">Log off</button>
</div>
