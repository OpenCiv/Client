<style lang="less">
@import url("../less/map.less");

.active {
   background: #FF000080;
}

/* .canmove {
   &:hover {
      background-image: none;
      background-color: #FF8000;
   }
} */
</style>

<script>
import { backend, selected, player } from '../stores';

export let mapdata;

export let mapsize;

function img_src(category, type) {
   return `img/${category.charAt(0)}_${type}.png`;
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

   if (e.which !== 3 || !can_move(tile)) {
      return;
   }

   const action = await backend('move', { id: $selected.id, x: tile.x, y: tile.y });
   if (!action) {
      return;
   }

   $selected.action = action;

   /*
   const old = mapdata[$selected.y][$selected.x]['units'].indexOf($selected);
   if (old === -1) {
      alerts.add('Error moving unit');
   }

   mapdata[$selected.y][$selected.x]['units'].splice(old, 1);
   $selected.x = tile.x;
   $selected.y = tile.y;
   tile.units.push($selected);
   mapdata = mapdata;
   */
}

/**
 * Returns whether the selected units is allowed to move to the tile.
 */
function can_move(tile) {
   if (tile.type === 'water' || !$selected) {
      return false;
   }

   let x = Math.abs(tile.x - $selected.x);
   let y = Math.abs(tile.y - $selected.y);
   return x < 2 && y < 2 && x + y > 0;
}
</script>

{#if mapdata}
   <div id="map" class="full" style="width: {mapsize.x * 128}px;">
      {#each mapdata as row}
         <div class="map_row" style="width: {mapsize.x * 128}px;">
            {#each row as tile}
               <!-- <div class="tile {tile.type === 'water' ? 'tile_ocean' : 'tile_plains'}" class:canmove={can_move(tile)} on:mousedown={e => tile_click(e, tile)}> -->
               <div class="tile {tile.type === 'water' ? 'tile_ocean' : 'tile_plains'}" on:mousedown={e => tile_click(e, tile)}>
                  {#each tile.improvements as improvement}
                     <div class="improvement">
                        <img src={img_src('building', improvement.type)} alt={improvement.type}>
                     </div>
                  {/each}
                  {#each tile.resources as resource}
                     <div class="resource">
                        <img src={img_src('resource', resource.type)} alt={resource_quantity(resource)}>
                     </div>
                  {/each}
                  {#each tile.units as unit}
                     <div class="unit">
                        <div class="player-banner">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
                              <!-- The fill of this polygon should be adjusted to be players primary color. -->
                              <polygon fill="white" points="0,0 100,0 100,100 50,120 0,100"/>

                              <!-- The fill of this polygon should be adjusted to be players secondary color. -->
                              <polygon fill="gold" points="0,0 100,0 100,10 0,10"/>

                              <!-- To be added: player custom icon, also with secondary color -->
                           </svg>
                        </div>
                        <img src={img_src('unit', 'nordic')} alt={'nordic'} class:active={unit === $selected}>
                     </div>
                  {/each}
               </div>
            {/each}
         </div>
      {/each}
   </div>
{/if}
