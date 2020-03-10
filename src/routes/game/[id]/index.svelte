<svelte:head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<style lang="less">
   @import url("../../../less/layout.less");
</style>

<script>
import { onMount, onDestroy } from 'svelte';
import { stores } from '@sapper/app';
import Map from '../../../components/Map.svelte';
import { alerts, selected, backend } from '../../../stores';

const { page } = stores();

// Obtained from the server and passed on to the map component
var mapdata = [];

// Init values for information on divs.
// Variables are exposed globally at the moment.
// You can access the variables out of this scope
var timeBarYears = '';
var timeBarTurn = '';
var researchBarResearch = '';
var accountBarAccountName = '';
var sideBarUnits = {
   unitSelectUnitBuild: '',
   unitOneName: '',
   unitOneDescription: '',
   unitTwoName: '',
   unitTwoDescription: '',
   unitThreeName: '',
   unitThreeDescription: ''
};
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

// For show purpose populate with bogus data.
function populateUnits(event) {
   timeBarYears = '29 000 BC';
   timeBarTurn = 'Turn ' + 2;
   researchBarResearch = 'Agriculture';
   accountBarAccountName = 'Laiska-Jaakko';
   sideBarUnits.unitOneName = 'Builder';
   sideBarUnits.unitOneDescription = 'Builds a lot';
   sideBarUnits.unitTwoName = 'Monk';
   sideBarUnits.unitTwoDescription = 'Prays a lot'
   sideBarUnits.unitThreeName = 'Warrior';
   sideBarUnits.unitThreeDescription = 'Fights a lot';
   infoPanel.currentUnit = 'Builder';
   infoPanel.information = 'Currenlty building an iron mine.';
   commandsPanel.commandOne = ' [Build] ';
   commandsPanel.commandTwo = ' [Move] ';
   commandsPanel.commandThree = ' [Destroy] ';
   commandsPanel.commandFour = ' [Cancel] ';
}

// For clearing variables
function clearAllVariables(event) {
   timeBarYears = '';
   timeBarTurn = '';
   researchBarResearch = '';
   accountBarAccountName = '';
   sideBarUnits.unitOneName = '';
   sideBarUnits.unitOneDescription = '';
   sideBarUnits.unitTwoName = '';
   sideBarUnits.unitTwoDescription = ''
   sideBarUnits.unitThreeName = '';
   sideBarUnits.unitThreeDescription = '';
   infoPanel.currentUnit = '';
   infoPanel.information = '';
   commandsPanel.commandOne = ' - ';
   commandsPanel.commandTwo = ' - ';
   commandsPanel.commandThree = ' - ';
   commandsPanel.commandFour = ' - ';
}

const unsubscribe = selected.subscribe(value => {
   infoPanel.currentUnit = value ? 'Howdy' : 'None unit selected.';
   infoPanel.information = value ? 'How are you doing?' : 'Please select a unit';
});

onMount(async () => {
   let result = await backend('load', { game: $page.params.id });
   accountBarAccountName = result.player.name;
   mapdata = result.map;
});

onDestroy(unsubscribe);

async function key_pressed(event) {
   if (!$selected) {
      return;
   }

   let direction = null;
   let x = $selected.x;
   let y = $selected.y;
   switch (event.keyCode) {
      case 97:
      case 90:
         direction = 'downleft';
         x--;
         y++;
      break;

      case 98:
      case 88:
         direction = 'down';
         y++;
      break;

      case 99:
      case 67:
         direction = 'downright';
         x++;
         y++;
      break;

      case 100:
      case 65:
         direction = 'left';
         x--;
      break;

      case 102:
      case 68:
         direction = 'right';
         x++;
      break;

      case 103:
      case 81:
         direction = 'upleft';
         x--;
         y--;
      break;

      case 104:
      case 87:
         direction = 'up';
         y--;
      break;
      
      case 105:
      case 69:
         direction = 'upright';
         x++;
         y--;
      break;

      default:
      return;
   }

   const moved = await backend('move', { id: $selected.id, direction });
   if (moved) {
      const old = mapdata[$selected.y][$selected.x]['units'].indexOf($selected);
      if (old === -1) {
         alerts.add('Error moving unit');
      }

      mapdata[$selected.y][$selected.x]['units'].splice(old, 1);
      $selected.x = x;
      $selected.y = y;
      mapdata[y][x]['units'].push($selected);
      mapdata = mapdata;
   }
}
</script>

<svelte:window bind:innerHeight on:keydown={key_pressed}/>

<header class="full">
   <div id="time-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p>{timeBarTurn || "Turn 1"} - {timeBarYears || "30 000 BC"}</p>
   </div>
   <div id="research-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center">Researching: {researchBarResearch || "No research."}</p>
   </div>
   <div id="menu-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center"><a href="/menu">Menu</a></p>
   </div>
   <div id="account-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="right">{accountBarAccountName || "No login information."}</p>
   </div>
</header>
<main style="height: {innerHeight - 160}px;">
   <div id="sidebar" class="third">
   <!-- Get values from variables or show defaults. -->
      <h2>{sideBarUnits.unitSelectUnitBuild || "Select a unit to build"}</h2>
      <a class="button closewindow" title="Close window">X</a>
      <h3 class="no-bottom-margin">{sideBarUnits.unitOneName||"No unit"}</h3>
      <p>{sideBarUnits.unitOneDescription||"No description"}</p>
      <h3 class="no-bottom-margin">{sideBarUnits.unitTwoName||"No unit"}</h3>
      <p>{sideBarUnits.unitTwoDescription||"No description"}</p>
      <h3 class="no-bottom-margin">{sideBarUnits.unitThreeName||"No unit"}</h3>
      <p>{sideBarUnits.unitThreeDescription||"no description"}</p>
      <!-- Test field input. -->
      <p>
         <button on:click={populateUnits}>Populate</button>
         <button on:click={clearAllVariables}>Clear</button>
      </p>
   </div>
   <Map {mapdata}/>
</main>
<footer class="full">
   <div id="info-panel" class="third">
      <div class="third non-responsive">
         <img src="" alt="Unit image">
      </div>
      <div class="two-thirds non-responsive">
         <!-- Get values from variables or show defaults. -->
         <h3>{infoPanel.currentUnit || "No unit selected."}</h3>
         <p>{infoPanel.information || "Please select a unit."}</p>
      </div>
   </div>
   <div id="commands-panel" class="third">
      <p class="left">Command options</p>
      <!-- Get values from variables or show defaults. -->
      <p class="center" id="command-buttons">{commandsPanel.commandOne || " - "}{commandsPanel.commandTwo || " - "}{commandsPanel.commandThree || " - "}{commandsPanel.commandTwo || " - "}</p>
   </div>
   <div id="status-panel" class="third">
      <h2 class="center no-bottom-margin">Turn complete</h2>
      <p class="center"><button id="end-turn">End Turn</button></p>
   </div>
</footer>
