<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import * as sapper from '@sapper/app';
import { backend, busy } from '../stores';

// The name of the new game
let name;

/**
 * Sets up a new game
 */
async function newgame(e) {
   const gameId = await backend('newgame/initiate', { name });
   sapper.goto('/game/' + gameId);
}
</script>

<div class="menuwrapper">
   <h1>New Game</h1>
   <p>
      The game is still in the early development stage.<br>
      We aim to have a prototype by the end of 2020.
   </p>
   <div class="row">
      <div class="two-thirds left">
         <input type=text disabled={$busy} bind:value={name}>
      </div>
      <div class="third">
         <button class="button" disabled={$busy} on:click={newgame}>Create game</button>
      </div>
   </div>
   <a href="/menu" class="button cancel">Back</a>
</div>

