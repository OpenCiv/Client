<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link href="https://fonts.googleapis.com/css?family=Hind:400,600|Lora:400i&display=swap" rel="stylesheet">
</svelte:head>

<style lang="less">
   @import url("../../../less/layout.less");
</style>

<script>
import { onMount, onDestroy } from 'svelte';
import { stores } from '@sapper/app';
import Map from '../../../components/Map.svelte';
import { alerts, selected, backend, player } from '../../../stores';

const { page } = stores();

// Obtained from the server and passed on to the map component
let mapdata, mapsize;

// Init values for information on divs.
// Variables are exposed globally at the moment.
// You can access the variables out of this scope
var timeBarYears = '';
var timeBarTurn = '';
var researchBarResearch = '';
var infoPanel = {
   currentUnit: '',
   information: '',
};
var commandsPanel = {
   commandOne: '',
   commandTwo: '',
   commandThree: '',
   commandFour: ''
};

var innerHeight;

const unsubscribe = selected.subscribe(value => {
   infoPanel.currentUnit = value ? 'Unit selected' : '';
   infoPanel.information = value ? 'What orders?' : '';
});

onMount(async () => {
   let result = await backend('load', { game: $page.params.id });
   if (!result) {
      alerts.add('The data could not be loaded');
      return;
   }

   player.set(result.player);
   mapdata = result.map;
   mapsize = { x: result.game.x, y: result.game.y };
});

onDestroy(unsubscribe);

// Full screen buttons
const elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
</script>

<svelte:window bind:innerHeight/>

<header class="full">
   <div id="account-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <div class="fourth">
         <img src="img/icon_flag.png" alt="Flag">
      </div>
      <div class="three-fours">
         <p>
            
            {$player ? $player.name : "No login information."}
         </p>
      </div>
   </div>
   <div id="research-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center"><span class="research">&sext; Researching</span> {researchBarResearch || "No research"}</p>
   </div>
   <div id="time-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center">
         {timeBarTurn || "Turn 1"} - {timeBarYears || "30 000 BC"}
      </p>
   </div>
   <div id="menu-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="right">
         <a title="Enable fullscreen" class="activate-fullscreen-button" on:click={openFullscreen}>
            <img class="tiny-icon" src="img/icon_fullscreen.png" alt="Full">
         </a>
         <a title="Deactivate fullscreen" class="deactivate-fullscreen-button" on:click={closeFullscreen}>
            <img class="tiny-icon" src="img/icon_disablefullscreen.png" alt="Minimize">
         </a>
         <a href="/menu">
            <img class="tiny-icon" src="img/icon_menu.png" alt="Main"> Menu
         </a>
      </p>
   </div>
</header>
<main style="height: {innerHeight - 128}px;">
   <Map {mapdata} {mapsize}/>
</main>
<footer class="full">
   <div id="info-panel" class="third">
      <div class="third non-responsive">
         <img src="" alt="Unit image">
      </div>
      <div class="two-thirds non-responsive">
         <!-- Get values from variables or show defaults. -->
         <h3 class="no-top-margin">{infoPanel.currentUnit}</h3>
         <p>{infoPanel.information}</p>
      </div>
   </div>
   <div id="commands-panel" class="third">
      <h3 class="left no-top-margin">Command options</h3>
      <!-- Get values from variables or show defaults. -->
      <p class="center" id="command-buttons">{commandsPanel.commandOne || " - "}{commandsPanel.commandTwo || " - "}{commandsPanel.commandThree || " - "}{commandsPanel.commandTwo || " - "}</p>
   </div>
   <div id="status-panel" class="third">
      <h2 class="center no-bottom-margin no-top-margin">Turn complete</h2>
      <p class="center"><button id="end-turn">End Turn</button></p>
   </div>
</footer>

