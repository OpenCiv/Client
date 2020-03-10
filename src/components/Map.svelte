<style lang="less">
@import url("../less/map.less");

.active {
   background: #FF000080;
}
</style>

<script>
import { selected, player } from '../stores';

export let mapdata;

function img_src(category, type) {
   return `img/${category.charAt(0)}_${type}.png`;
}

function resource_quantity(resource) {
   return `${resource.type} (${Number.parseFloat(resource.quantity).toFixed(0)})`;
}

function tile_click(e, tile) {
   e.stopPropagation();
   if (e.which === 1) {
      const unit = tile.units.find(u => u.player_id === $player.id);
      selected.set(unit);
      return;
   }

   if (e.which === 3 && $selected) {
      
   }
}
</script>

{#if mapdata}
   <div id="map" class="full">
      {#each mapdata as row}
         <div class="map_row">
            {#each row as tile}
               <div class="{tile.type === 'water' ? 'tile tile_ocean' : 'tile tile_plains'}" on:mousedown={e => tile_click(e, tile)}>
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
                        <img src={img_src('unit', 'nordic')} alt={'nordic'} class:active={unit === $selected}>
                     </div>
                  {/each}
               </div>
            {/each}
         </div>
      {/each}
   </div>
{/if}
