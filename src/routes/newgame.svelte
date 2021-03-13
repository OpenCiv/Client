<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

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
   <img src="../img/branding/prosper_logo.svg" alt="Prosper" class="menulogo">
   <h1>New Game</h1>
   <p class="center">
      The game is still in the early development stage.<br>
      We aim to have a prototype by the end of 2020.
   </p>

   <div class="separator"></div>

   <h2>Game Settings</h2>
   <div class="row">
      <div class="third right">
         <label for="name">Name</label>
      </div>
      <div class="two-thirds">
         <input type=text disabled={$busy} bind:value={name} id="name" placeholder="John Doe's Game">
      </div>
   </div>

   <div class="separator"></div>

   <h2>Map Settings</h2>
   <div class="row">
      <div class="third right">
         <label for="mapsize">Map Size</label>
      </div>
      <div class="two-thirds">
         <select id="mapsize">
            <option value="Tiny">Tiny</option>
            <option value="Small">Small</option>
            <option value="Standard" selected>Standard</option>
            <option value="Large">Large</option>
            <option value="Huge">Huge</option>
         </select>
      </div>
   </div>
   
   <div class="separator"></div>
   
   <button class="button" disabled={$busy} on:click={newgame}>Create game</button>
   <a href="/menu" class="button cancel">Back</a>
</div>

