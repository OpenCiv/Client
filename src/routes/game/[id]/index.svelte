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
var timeBarYears = '5000 BC';
var timeBarTurn = 'Turn 1';
var researchBarResearch = 'No research';
var infoPanel = {
   currentUnit: '',
   information: '',
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
         <div class="account-banner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" preserveAspectRatio="none">
               <!-- The fill of this polygon should be adjusted to be players primary color. -->
               <polygon fill="#F2D346" points="0,0 100,0 100,85 50,105 0,85"/>

               <!-- The fill of this polygon should be adjusted to be players secondary color. -->
               <polygon fill="#FFEC96" points="0,0 100,0 100,10 0,10"/>

               <!-- To be added: player custom icon, also with secondary color -->
            </svg>
         </div>
      </div>
      <div class="three-fours">
         <p>
            {$player ? $player.name : "No login information."}
         </p>
      </div>
   </div>
   <div id="research-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center"><span class="research">&sext; Researching</span> {researchBarResearch}</p>
   </div>
   <div id="time-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center">
         {timeBarTurn} - {timeBarYears}
      </p>
   </div>
   <div id="menu-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="right">
         <button title="Enable fullscreen" class="hyperlink activate-fullscreen-button" on:click={openFullscreen}>
            <img class="tiny-icon" src="img/icon_fullscreen.png" alt="Full">
         </button>
         <button title="Deactivate fullscreen" class="hyperlink deactivate-fullscreen-button" on:click={closeFullscreen}>
            <img class="tiny-icon" src="img/icon_disablefullscreen.png" alt="Minimize">
         </button>
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
      <div class="two-thirds non-responsive">
         <!-- Get values from variables or show defaults. -->
         <h3 class="no-top-margin">{infoPanel.currentUnit}</h3>
         <p>{infoPanel.information}</p>
      </div>
   </div>
   <div id="commands-panel" class="third">
      <h3 class="left no-top-margin">Command options</h3>
      <!-- Get values from variables or show defaults. -->
      <p id="command-buttons">
         <button class="button iconbutton" title="Build"><img src="img/actions/production.svg" alt="BLD"></button>
         <button class="button iconbutton" title="Wait">WAIT</button>
         <button class="button iconbutton" title="Move">MOV</button>
      </p>
   </div>
   <div id="status-panel" class="third">
      <h2 class="center no-bottom-margin no-top-margin">Turn complete</h2>
      <p class="center"><button class="button" id="end-turn">End Turn</button></p>
   </div>
</footer>
