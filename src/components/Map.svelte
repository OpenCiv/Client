<style lang="less">
@import url("../less/map.less");
</style>

<script>
import { onDestroy } from 'svelte';
import { alerts, backend, selectedUnit, selectedAction, hoveredTile, player, busy } from '../stores';
import { getPlayerFromUnit } from '../utilities';
import Flag from './Flag.svelte';
import Path from './Path.svelte';

// The map itself
let mapdata;

// The size of the map
let mapsize;

// Contains random numbers from 1 to 3 for randomized layout purposes
let randomized;

// Display yields?
export let displayYield;

// Display resoure icons?
export let displayResources;

/**
 * Sets the map data and size
 * @param {Object} map Contains the entire map
 * @param {Object} size Contains the size of the map
 */
export function setData(map, size) {

   // Sets random numbers from 1 to 3 for randomized layout purposes
   // This has to be done only once during the game,
   // otherwise the map's changes on a reload at the start of a new turn
   if (!randomized) {
      randomized = [];
      for (let x = 0; x < size.x; x++) {
         randomized[x] = [];
         for (let y = 0; y < size.y; y++) {
            randomized[x][y] = Math.floor(Math.random() * 3 + 1);
         }
      }
   }

   mapdata = map;

   // As soon as mapdata and mapsize are set, the map is rendered
   mapsize = size;
}

/**
 * Displays the path that the selected unit is set to take
 */
const subscription = selectedUnit.subscribe(unit => {
   if (!mapdata || !mapsize) {
      return;
   }

   // First remove all paths that are displayed now
   for (let x = 0; x < mapsize.x; x++) {
      for (let y = 0; y < mapsize.y; y++) {
         delete mapdata[y][x].path;
      }
   }

   // If a unit is deselected, no path is displayed
   if (!unit) {
      return;
   }

   // The starting point of the path is the unit's location itself
   let startX = unit.x;
   let startY = unit.y;

   // Check all actions one by one for moves
   unit.actions.forEach(action => {

      // Only moves are displayed on the map
      if (action.type !== 'move') {
         return;
      }

      // The action's parameter is an array of move steps
      action.parameter.forEach(step => {

         // If the step has a higher X, it moves from west to east
         const changeX = step.x - startX;

         // If the step has a higher Y, it moves from north to south
         const changeY = step.y - startY;

         // These two variables are passed to the Path component
         let from = 'from';
         let to = 'to';
         if (changeY === -1) {
            from += 'S';
            to += 'N';
         } else if (changeY === 1) {
            from += 'N';
            to += 'S';
         }

         if (changeX === -1) {
            from += 'E';
            to += 'W';
         } else if (changeX === 1) {
            from += 'W';
            to += 'E';
         }

         // Add a path on the present location to show where the unit is going to
         if (!mapdata[startY][startX].path) {
            mapdata[startY][startX].path = [to];
         } else {
            mapdata[startY][startX].path.push(to);
         }

         // Add a path on the destination to show where the unit is coming from
         if (!mapdata[step.y][step.x].path) {
            mapdata[step.y][step.x].path = [from];
         } else {
            mapdata[step.y][step.x].path.push(from);
         }

         // The step will be the starting point for the next step
         startX = step.x;
         startY = step.y;
      });
   });

   // Refresh the map
   mapdata = mapdata;
});

// Destroys the subscription on the selected unit
onDestroy(subscription);

/**
 * Returns the resource type and quantity
 * @param {Object} resource The resource's details are returned
 */
function resource_quantity(resource) {
   return `${resource.type} (${Number.parseFloat(resource.quantity).toFixed(0)})`;
}

/**
 * Handles mouse clicks
 * @param {MouseEvent} e The event contains which mouse button was pressed
 * @param {Object} tile The tile that was clicked on
 */
async function tile_click(e, tile) {
   e.stopPropagation();
   if ($busy || !$player) {
      return;
   }

   // Left mouse button (de)selecting a unit
   if (e.which === 1) {
      const unit = tile.units.find(u => u.player_id === $player.id);
      if ($selectedAction === 'newUnit') {
         if (unit) {
            if (unit.actions[0]['type'] === 'settle') {
               const id = await backend('game/newunit', { x: tile.x, y: tile.y });
               if (id) {
                  $player.surplus -= 1;
                  tile.units.push({
                     id,
                     x: tile.x,
                     y: tile.y,
                     player_id: $player.id,
                     actions: ['new']
                  });

                  selectedAction.set(null);
                  mapdata = mapdata;
                  return;
               }
            }
         }

         selectedAction.set(null);
      } else if (unit && unit.actions[0] === 'new') {
         const result = await backend('game/cancelnewunit', { x: tile.x, y: tile.y });
         if (result) {
            $player.surplus += 1;
            tile.units.slice(units.indexOf(unit), 1);
            selectedAction.set('newUnit');
            mapdata = mapdata;
            return;
         }
      }

      selectedUnit.set(unit);
      return;
   }

   // The only alternative is moving a unit with the right mouse button
   if (e.which !== 3 || !$selectedUnit) {
      return;
   }

   // Send the move action to the backend
   const actions = await backend('game/action', { id: $selectedUnit.id, type: 'move', parameter: `${tile.x},${tile.y}` });
   if (actions) {
      $selectedUnit.actions = actions;
      selectedUnit.set($selectedUnit);
   }
}
</script>

{#if mapdata && mapsize}
   <div id="map" class="full" style="width: {mapsize.x * 128}px;" on:mouseleave={() => { hoveredTile.set(null); }}>
      {#each mapdata as row}
         <div class="map_row" style="width: {mapsize.x * 128}px;">
            {#each row as tile}
               <div class="tile {tile.type === 'water' ? 'water' : ('ground ' + tile.type + randomized[tile.x][tile.y])}" on:mousedown={e => tile_click(e, tile)} on:mouseover={() => { hoveredTile.set(tile); }}>
                  {#if tile.vegetation}
                     <div class="improvement-back">
                        <img src="img/vegetation/{tile.vegetation}_back.svg" alt={tile.vegetation}> <!-- Background improvement: forests, walls... -->
                     </div>
                  {/if}
                  {#if tile.improvement}
                     <div class="improvement">
                        <img src="img/improvements/{tile.improvement.type}.svg" alt={tile.improvement.type} style="opacity: {tile.improvement.completion}">
                     </div>
                  {:else if tile.vegetation}
                     <div class="improvement">
                        <img src="img/vegetation/{tile.vegetation}.svg" alt={tile.vegetation}>
                     </div>
                  {/if}
                  {#if tile.vegetation}
                     <div class="improvement-front">
                        <img src="img/vegetation/{tile.vegetation}_front.svg" alt={tile.vegetation}> <!-- Front improvement: forests, walls... -->
                     </div>
                  {/if}
                  {#if tile.path}
                     {#each tile.path as direction}
                        <div class="path">
                           <Path {direction} color={$player.color} />
                        </div>
                     {/each}
                  {/if}
                  {#each tile.units as unit}
                     <div class="unit">
                        {#if unit === $selectedUnit}
                           <img src="img/effects/select_shine.svg" alt="Selected unit">
                        {/if}
                        <img src="img/units/unit_template.svg" alt="Unknown unit">
                        <div class="player-banner">
                           <Flag color={getPlayerFromUnit(unit).color} icon={getPlayerFromUnit(unit).icon} />
                        </div>
                        <img src="img/units/nordic.svg" alt="Nordic">
                        <img src="img/weapons/spear_copper.svg" alt="Copper spear">
                     </div>
                  {/each}
                  {#if displayResources}
                     {#each tile.resources as resource}
                        <div class="resource" title={resource_quantity(resource)}>
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 240" preserveAspectRatio="none">
                              <polygon fill="#777777" points="20,130 140,130 80,200"/>
                              <circle cx="50%" cy="33.333%" r="80" fill="#777777" />
                              <circle cx="50%" cy="33.333%" r="72" fill="#444444" />
                           </svg>
                           <img src="img/resources/{resource.type}.svg" alt={resource.type}>
                        </div>
                     {/each}
                  {/if}
                  {#if displayYield}
                     <div class="yield">
                        <p>
                           <span class="production">2<img src="img/resources/production.svg" alt="Production" class="tiny-icon"></span><br>
                           <span class="wealth">2<img src="img/resources/wealth.svg" alt="Wealth" class="tiny-icon"></span><br>
                           <span class="food">2<img src="img/resources/food.svg" alt="Food" class="tiny-icon"></span>
                        </p>
                     </div>
                  {/if}
               </div>
            {/each}
         </div>
      {/each}
   </div>
{/if}
