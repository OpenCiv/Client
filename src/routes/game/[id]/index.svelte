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
import { alerts, backend, selectedUnit, hoveredTile, player, busy } from '../../../stores';
import { capitalize } from '../../../utilities';
import Map from '../../../components/Map.svelte';
import TechTree from '../../../components/TechTree.svelte';
import CommandOptions from '../../../components/CommandOptions.svelte';
import UnitInfo from '../../../components/UnitInfo.svelte';
import Flag from '../../../components/Flag.svelte';
import Notifications from '../../../components/Notifications.svelte';
import TileInfo from '../../../components/TileInfo.svelte';

const { page } = stores();

// The map component
let map, unitInfo;

// True if the browser is in full screen mode
let fullscreen = false;

// Display tile yield on map?
let displayYield = false;

// Display notifications log?
let displayNotifications = false;

// Display tech tree?
let displayTechTree = false;

// The window's inner height
let innerHeight;

// The displayed turn and year
let turnAndYear = '';

// The current research
let researchBarResearch = 'No research';

/**
 * Sets the displayed turn and date
 * @param {number} turn The turn number
 */
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

// Refresh when the page is mounted
onMount(refresh);

/**
 * Loads the game data
 */
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

/**
 * Sets the browser in full screen mode
 */
function openFullscreen() {
   document.documentElement.requestFullscreen();
   fullscreen = true;
}

/**
 * Puts the browser out of full screen mode
 */
function closeFullscreen() {
   document.exitFullscreen();
   fullscreen = false;
}

/**
 * Send to the backend that the user finished their turn
 */
async function endTurn() {
   selectedUnit.set(null);
   const result = await backend('game/endturn');
   if (result) {
      refresh();
   }
}
</script>

<!-- The inner height is used to set the map's scroll bar -->
<svelte:window bind:innerHeight/>

<header class="full">
   <div id="account-bar" class="fourth">
      <div class="account-banner">
         <Flag color="gold" icon="celticcross" />
      </div>
      <p class="account-name">
         {$player ? `${$player.name} (${100 * $player.surplus}%)` : "No login information"}
      </p>
   </div>
   <div id="research-bar" class="fourth">
      <p class="center">
         <img src="img/resources/wealth.svg" class="tiny-icon" alt="Wealth">
         <span class="wealth">123 </span>
         <button title="Toggle Research window" class="hyperlink" on:click={() => { displayTechTree = !displayTechTree; }}>
            <img src="img/resources/science.svg" class="tiny-icon" alt="Science">
            <span class="research">+123 &rArr; {researchBarResearch} (17)</span>
         </button>
      </p>
   </div>
   <div id="time-bar" class="fourth">
      <p class="center">
         {turnAndYear}
      </p>
   </div>
   <div id="menu-bar" class="fourth">
      <p class="right">
         <button title="{displayNotifications ? 'Hide' : 'Show'} notification log" class="hyperlink" on:click={() => { displayNotifications = !displayNotifications; }}>
            <img class="tiny-icon" src="img/menuicons/notifications.svg" alt="{displayNotifications ? 'Hide' : 'Show'} notification log">
         </button>
         <button title="{displayYield ? 'Disable' : 'Enable'} yield display" class="hyperlink" on:click={() => { displayYield = !displayYield; }}>
            <img class="tiny-icon" src="img/menuicons/displayyield_{displayYield ? 'false' : 'true'}.svg" alt="{displayYield ? 'Disable' : 'Enable'} yield display">
         </button>
         {#if !fullscreen}
            <button title="Enable fullscreen" class="hyperlink" on:click={openFullscreen}>
               <img class="tiny-icon" src="img/menuicons/enable_fullscreen.svg" alt="Full">
            </button>
         {/if}
         {#if fullscreen}
            <button title="Deactivate fullscreen" class="hyperlink" on:click={closeFullscreen}>
               <img class="tiny-icon" src="img/menuicons/disable_fullscreen.svg" alt="Minimize">
            </button>
         {/if}
         <a href="/menu">
            <img class="tiny-icon" src="img/menuicons/menu.svg" alt="Main"> Menu
         </a>
      </p>
   </div>
</header>
<main style="height: {innerHeight - 128}px;">
   <Map bind:this={map} {displayYield} />
   {#if displayNotifications}
      <Notifications {innerHeight} on:close={() => { displayNotifications = !displayNotifications; }} />
   {/if}
   {#if displayTechTree}
      <TechTree on:close={() => { displayTechTree = !displayTechTree; }} />
   {/if}
   {#if $hoveredTile}
      <TileInfo />
   {/if}
</main>
<footer class="full">
   <div id="info-panel" class="third">
      <UnitInfo />
   </div>
   <div id="commands-panel" class="third">
      <CommandOptions />
   </div>
   <div id="status-panel" class="third">
      <h2 class="center no-bottom-margin no-top-margin">Turn complete</h2>
      <p class="center">
         <button disabled={$busy} class="button" id="end-turn" on:click={endTurn}>End Turn</button>
      </p>
   </div>
</footer>
