<svelte:head>
<link rel="stylesheet" href="layout.css">
</svelte:head>
<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import Map from '../../components/Map.svelte'

  // Obtained from the server and passed on to the map component
  var terrain = [];

  // Init values for information on divs.
  // Variables are exposed globally at the moment.
  // You can access the variables out of this scope
  var timeBarYears = "";
  var timeBarTurn = "";
  var researchBarResearch = "";
  var menuBarSelectedMenu = "";
  var accountBarAccountName = "";
  var sideBarUnits = {
    unitSelectUnitBuild:"",
    unitOneName:"",
    unitOneDescription:"",
    unitTwoName:"",
    unitTwoDescription:"",
    unitThreeName:"",
    unitThreeDescription:""
  };
  var infoPanel = {
    currentUnit:"",
    information:"",
  }
  var commandsPanel = {
    commandOne:"",
    commandTwo:"",
    commandThree:"",
    commandFour:""
  }
  //For show purpose populate with bogus data.
  function populateUnits(event){
    timeBarYears = "29 000 BC";
    timeBarTurn = "Turn " + 2;
    researchBarResearch = "Agriculture";
    menuBarSelectedMenu = "World view";
    accountBarAccountName = "Laiska-Jaakko";
    sideBarUnits.unitOneName = "Builder";
    sideBarUnits.unitOneDescription = "Builds a lot";
    sideBarUnits.unitTwoName = "Monk";
    sideBarUnits.unitTwoDescription = "Prays a lot"
    sideBarUnits.unitThreeName = "Warrior";
    sideBarUnits.unitThreeDescription = "Fights a lot";
    infoPanel.currentUnit = "Builder";
    infoPanel.information = "Currenlty building an iron mine.";
    commandsPanel.commandOne = " [Build] ";
    commandsPanel.commandTwo = " [Move] ";
    commandsPanel.commandThree = " [Destroy] ";
    commandsPanel.commandFour = " [Cancel] ";
  }
  //For clearing variables
  function clearAllVariables(event){
    timeBarYears = "";
    timeBarTurn = "";
    researchBarResearch = "";
    menuBarSelectedMenu = "";
    accountBarAccountName = "";
    sideBarUnits.unitOneName = "";
    sideBarUnits.unitOneDescription = "";
    sideBarUnits.unitTwoName = "";
    sideBarUnits.unitTwoDescription = ""
    sideBarUnits.unitThreeName = "";
    sideBarUnits.unitThreeDescription = "";
    infoPanel.currentUnit = "";
    infoPanel.information = "";
    commandsPanel.commandOne = " - ";
    commandsPanel.commandTwo = " - ";
    commandsPanel.commandThree = " - ";
    commandsPanel.commandFour = " - ";
  }

  onMount(() => {
    axios.post('load.php', JSON.stringify({
       game: 1
    }))
    .then(response => {
      // response.data contains all the information from the server
      if (!response.data) {
         console.log('Could not load data');
      }

      terrain = response.data;
      console.log(terrain);
    })
    .catch(error => {
      console.log(error ? error.message || error : 'unknown error');
    });
  });
</script>
<header class="full">
   <div id="time-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p>{timeBarTurn || "Turn 1"} - {timeBarYears || "30 000 BC"}</p>
   </div>
   <div id="research-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center">Currently researching: {researchBarResearch || "No research."}</p>
   </div>
   <div id="menu-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="center">{menuBarSelectedMenu || "Menus"}</p>
   </div>
   <div id="account-bar" class="fourth">
      <!-- Get values from variables or show defaults. -->
      <p class="right">{accountBarAccountName || "No login information."}</p>
   </div>
</header>
<main class="full">
   <div id="map" class="two-thirds">
      <Map {terrain}/>
   </div>
   <div id="sidebar" class="third">
   <!-- Get values from variables or show defaults. -->
      <h2>{sideBarUnits.unitSelectUnitBuild || "Select a unit to build"}</h2>
      <h3>{sideBarUnits.unitOneName||"No unit"}</h3>
      <p>{sideBarUnits.unitOneDescription||"No description"}</p>
      <h3>{sideBarUnits.unitTwoName||"No unit"}</h3>
      <p>{sideBarUnits.unitTwoDescription||"No description"}</p>
      <h3>{sideBarUnits.unitThreeName||"No unit"}</h3>
      <p>{sideBarUnits.unitThreeDescription||"no description"}</p>
      <!-- Test field input. -->
      <button on:click={populateUnits}>Populate</button>
      <button on:click={clearAllVariables}>Clear</button>
   </div>
</main>
<footer class="full">
   <div id="info-panel" class="third">
      <!-- Get values from variables or show defaults. -->
      <h3>{infoPanel.currentUnit || "No unit selected."}</h3>
      <p>{infoPanel.information || "Please select a unit."}</p>
   </div>
   <div id="commands-panel" class="third">
      <p class="left">Command options</p>
      <!-- Get values from variables or show defaults. -->
      <p class="center" id="command-buttons">{commandsPanel.commandOne || " - "}{commandsPanel.commandTwo || " - "}{commandsPanel.commandThree || " - "}{commandsPanel.commandTwo || " - "}</p>
   </div>
   <div id="status-panel" class="third">
      <h2 class="center">Turn complete</h2>
      <p class="center"><button id="end-turn">End Turn</button></p>
   </div>
</footer>
