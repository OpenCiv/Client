<style lang="less">
@import url("../less/map.less");

.active {
   background: #FF000080;
}
</style>

<script>
import { createEventDispatcher } from 'svelte';
import { alerts, backend, selected, player } from '../stores';

const dispatch = createEventDispatcher();

let mapdata;
let mapsize;

export function setData(map, size) {
   mapdata = map;
   mapdata.forEach(y => y.forEach(x => { x.random = Math.floor(Math.random() * 3 + 1); }));
   mapsize = size;
}

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

   const order = await backend('move', { id: $selected.id, x: tile.x, y: tile.y });
   dispatch('newAction', { action: {
      type: 'move',
      parameter: tile.x + ',' + tile.y,
      order
   }});
}
</script>

{#if mapdata && mapsize}
   <div id="map" class="full" style="width: {mapsize.x * 128}px;">
      {#each mapdata as row}
         <div class="map_row" style="width: {mapsize.x * 128}px;">
            {#each row as tile}
               <div class="tile {tile.type === 'water' ? 'water' : ('ground ' + tile.type + tile.random)}" on:mousedown={e => tile_click(e, tile)}>
                  {#each tile.improvements as improvement}
                     <div class="improvement">
                        <img src="img/improvements/{improvement.type}.png" alt={improvement.type}>
                     </div>
                  {/each}
                  {#each tile.units as unit}
                     <div class="unit">
                        <div class="player-banner">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
                              <!-- The fill of this polygon should be adjusted to be player's primary color. -->
                              <polygon fill="#F2D346" points="0,0 100,0 100,100 50,120 0,100"/>

                              <!-- The fill of this polygon should be adjusted to be player's secondary color. -->
                              <polygon fill="#FFEC96" points="0,0 100,0 100,12.5 0,12.5"/>

                              <!-- To be added: player custom icon, also with secondary color -->
                           </svg>
                        </div>
                        <img src="img/units/nordic.png" alt="nordic" class:active={unit === $selected}>
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
               </div>
            {/each}
         </div>
      {/each}
   </div>
{/if}
