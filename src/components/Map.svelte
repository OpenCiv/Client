<script>
import Unit from '../components/Unit.svelte';

export let mapdata;

function img_src(category, type) {
   return `img/${category.charAt(0)}_` + type + '.png';
}

function resource_quantity(resource) {
   return `${resource.type} (${Number.parseFloat(resource.quantity).toFixed(0)})`;
}
</script>

<style lang="less">
@import url("../less/layout.less");
@import url("../less/map.less");
</style>

{#if mapdata}
   {#each mapdata as row}
      <div class="map_row">
         {#each row as tile}
            <div class="{tile.type === 'water' ? 'tile tile_ocean' : 'tile tile_plains'}">
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
                  <div class="improvement">
                     <Unit {unit}/>
                  </div>
               {/each}
            </div>
         {/each}
      </div>
   {/each}
{/if}
