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
   games = await backend('account/getgames');
});

async function logoff() {
   await backend('account/logoff');
   sapper.goto('login', { replace: true });
}
</script>
<div class="menuwrapper">
   <h1>Menu</h1>
   
   <div class="separator"></div>
   <h2>Active games</h2>

   {#if !Array.isArray(games)}
      <span>Loading...</span><br>
   {:else if games.length === 0}
      <span>None</span><br>
   {:else}
      {#each games as game (game.id)}
      <div class="row">
         <div class="two-thirds non-responsive">
            <p class="label">{game.name}</p>
         </div>
         <div class="third non-responsive">
            <a href={'/game/' + game.id} class="button">Join <span class="hide-mobile">game</span></a>
         </div>
      </div> 
      {/each} 
   {/if}
   <div class="separator"></div> 

   <a href="newgame" class="button">New game</a>
   <a href="/account" class="button">Account <span class="hide-mobile">Settings</span></a>

   <button class="button cancel" disabled={$busy} on:click={logoff}>Log off</button>
</div>
