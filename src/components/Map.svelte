<style lang="less">
@import url("../less/map.less");

.active {
   background: #FF000080;
}
</style>

<script>
import { onDestroy } from 'svelte';
import { alerts, backend, selected, player } from '../stores';
import Flag from './Flag.svelte';
import Path from './Path.svelte';

let mapdata;
let mapsize;
let randomized;

export function setData(map, size) {
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
   for (let x = 0; x < size.x; x++) {
      for (let y = 0; y < size.y; y++) {
         mapdata[y][x].random = randomized[x][y];
         mapdata[y][x].path = [];
      }
   }

   mapsize = size;
}

const subscription = selected.subscribe(unit => {
   if (!mapsize) {
      return;
   }

   for (let x = 0; x < mapsize.x; x++) {
      for (let y = 0; y < mapsize.y; y++) {
         mapdata[y][x].path = [];
      }
   }

   if (!unit) {
      return;
   }

   let startX = unit.x;
   let startY = unit.y;
   unit.actions.forEach(action => {
      if (action.type !== 'move') {
         return;
      }

      action.parameter.forEach(step => {
         const changeX = step.x - startX;
         const changeY = step.y - startY;
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

         mapdata[startY][startX].path.push(to);
         mapdata[step.y][step.x].path.push(from);
         startX = step.x;
         startY = step.y;
      });
   });

   mapdata = mapdata;
});

onDestroy(subscription);

function resource_quantity(resource) {
   return `${resource.type} (${Number.parseFloat(resource.quantity).toFixed(0)})`;
}

/**
 * Selects or moves a unit.
 */
async function tile_click(e, tile) {
   e.stopPropagation();
   if (e.which === 1) {
      const unit = tile.units.find(u => u.player_id === $player.id);
      selected.set(unit);
      return;
   }

   if (e.which !== 3) {
      return;
   }

   const actions = await backend('game/action', { id: $selected.id, type: 'move', parameter: `${tile.x},${tile.y}` });
   if (actions) {
      $selected.actions = actions;
      selected.set($selected);
   }
}
</script>

{#if mapdata && mapsize}
   <div id="map" class="full" style="width: {mapsize.x * 128}px;">
      {#each mapdata as row}
         <div class="map_row" style="width: {mapsize.x * 128}px;">
            {#each row as tile}
               <div class="tile {tile.type === 'water' ? 'water' : ('ground ' + tile.type + tile.random)}" on:mousedown={e => tile_click(e, tile)}>
                  {#each tile.improvements as improvement}
                     <div class="improvement-back">
                        <img src="img/improvements/forest_back.svg" alt=""> <!-- Background improvement: forests, walls... -->
                     </div>
                     <div class="improvement">
                        <img src="img/improvements/{improvement.type}.svg" alt={improvement.type} style="opacity: {improvement.completion}">
                     </div>
                     <div class="improvement-front">
                        <img src="img/improvements/forest_front.svg" alt=""> <!-- Front improvement: forests, walls... -->
                     </div>
                  {/each}
                  {#each tile.units as unit}
                     <div class="unit">
                        <!-- <div class="player-banner">
                           <Flag color={$player.color} icon={$player.icon} />
                        </div>
                        <img src="img/units/nordic.png" alt="nordic" class:active={unit === $selected}> -->
                        <img src="img/units/unit_template.svg" alt="Unkown unit" class:active={unit === $selected}>
                        <img src="img/units/nordic.svg" alt="Nordic">
                     </div>
                  {/each}
                  {#each tile.resources as resource}
                     <div class="resource">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" preserveAspectRatio="none">
                           <polygon fill="#777777" points="0,0 64,0 64,64 0,64"/>
                           <circle cx="50%" cy="50%" r="75" stroke="#777777" stroke-width="8" fill="#444444" />
                        </svg>
                        <img src="img/resources/{resource.type}.svg" alt={resource_quantity(resource)}>
                     </div>
                  {/each}
                  {#each tile.path as direction}
                     <div class="path">
                        <Path {direction} />
                     </div>
                  {/each}
               </div>
            {/each}
         </div>
      {/each}
   </div>
{/if}
