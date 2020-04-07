<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<style lang="less">
   @import url("../../../less/layout.less");
</style>

<script>
import { onMount } from 'svelte';
import { stores } from '@sapper/app';
import Map from '../../../components/Map.svelte';
import CommandOptions from '../../../components/CommandOptions.svelte';
import UnitInfo from '../../../components/UnitInfo.svelte';
import { alerts, backend, selected, player, busy } from '../../../stores';
import { capitalize } from '../../../utilities';
import Flag from '../../../components/Flag.svelte';

const { page } = stores();

// The map component
let map, unitInfo;

// True if the browser is in full screen mode
let fullscreen = false;

// The window's inner height
let innerHeight;

// The displayed turn and year
let turnAndYear = '';

// The current research
let researchBarResearch = 'No research';

function setTurnAndYear(turn) {
   let date;
   if (turn < 61) {
      date = (5050 - 50 * turn) + ' BC';
   } else if (turn < 96) {
      date = (4440 - 40 * turn) + ' BC';
   } else if (turn < 120) {
      date = (3000 - 25 * turn) + ' BC';
   } else if (turn === 120) {
      date = '1 AD';
   } else if (turn < 180) {
      date = (20 * turn - 2400) + ' AD';
   } else if (turn < 220) {
      date = (10 * turn - 600) + ' AD';
   } else if (turn < 260) {
      date = (5 * turn + 500) + ' AD';
   } else if (turn < 310) {
      date = (2 * turn + 1280) + ' AD';
   } else if (turn < 420) {
      date = (turn + 1590) + ' AD';
   } else {
      date = (turn % 2 === 0 ? 'Spring ' : 'Autumn ') + (Math.floor(turn / 2) + 1800) + ' AD';
   }

   turnAndYear = `Turn ${turn} - ${date}`;
}

onMount(refresh);

async function refresh() {
   let result = await backend('game/load', { game: $page.params.id });
   if (!result) {
      alerts.add('The data could not be loaded');
      return;
   }

   setTurnAndYear(result.game.turn);
   player.set(result.player);
   const mapsize = { x: result.game.x, y: result.game.y };
   map.setData(result.map, mapsize);
}

function openFullscreen() {
   document.documentElement.requestFullscreen();
   fullscreen = true;
}

function closeFullscreen() {
   document.exitFullscreen();
   fullscreen = false;
}

async function endTurn() {
   selected.set(null);
   const result = await backend('game/endturn');
   if (result) {
      refresh();
   }
}
</script>

<svelte:window bind:innerHeight/>

<header class="full">
   <div id="account-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <div class="account-banner">
         <Flag primary="#D45722" secondary="#FFEC96" icon="celticcross" />
      </div>
      <p>
         {$player ? $player.name : "No login information."}
      </p>
   </div>
   <div id="research-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center"><span class="research">&sext; Researching</span> {researchBarResearch}</p>
   </div>
   <div id="time-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center">
         {turnAndYear}
      </p>
   </div>
   <div id="menu-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="right">
         {#if !fullscreen}
            <button title="Enable fullscreen" class="hyperlink" on:click={openFullscreen}>
               <img class="tiny-icon" src="img/icon_fullscreen.png" alt="Full">
            </button>
         {/if}
         {#if fullscreen}
            <button title="Deactivate fullscreen" class="hyperlink" on:click={closeFullscreen}>
               <img class="tiny-icon" src="img/icon_disablefullscreen.png" alt="Minimize">
            </button>
         {/if}
         <a href="/menu">
            <img class="tiny-icon" src="img/icon_menu.png" alt="Main"> Menu
         </a>
      </p>
   </div>
</header>
<main style="height: {innerHeight - 128}px;">
   <Map bind:this={map} on:newAction={e => unitInfo.addAction(e.detail.action)}/>
</main>
<footer class="full">
   <div id="info-panel" class="third">
      <UnitInfo bind:this={unitInfo} />
   </div>
   <div id="commands-panel" class="third">
      <CommandOptions on:newAction={e => unitInfo.addAction(e.detail.action)} />
   </div>
   <div id="status-panel" class="third">
      <h2 class="center no-bottom-margin no-top-margin">Turn complete</h2>
      <p class="center">
         <button disabled={$busy} class="button" id="end-turn" on:click={endTurn}>End Turn</button>
      </p>
   </div>
</footer>
