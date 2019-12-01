<script>
   import Unit from '../components/Unit.svelte';
   export let terrain;

   function improvement_src(type) {
      return 'img/b_' + type + '.png';
   }
</script>

<svelte:head>
   <link rel="stylesheet" href="map.css">
</svelte:head>

{#each terrain as row}
<div class="map_row">
   {#each row as tile}
   <div class="{tile.type === 'water' ? 'tile tile_ocean' : 'tile tile_plains'}">
      {#each tile.improvements as improvement}
      <div class="improvement">
         <img src={improvement_src(improvement)} alt={improvement}>
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

<!-- <div class="map_row">
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_plains">
            <div class="improvement">
                <img src="img/b_market.png" alt="Market">
            </div>
        </div>
        <div class="tile tile_plains">

        </div>
    </div>
    <div class="map_row">
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_plains">
            <div class="improvement">
                <img src="img/b_church.png" alt="Church">
            </div>
        </div>
        <div class="tile tile_plains">
            <div class="resource">
                <img src="img/r_gold.png" alt="Gold">
            </div>
        </div>
        <div class="tile tile_plains">
            <div class="improvement">
                <img src="img/b_temple.png" alt="Temple">
            </div>
        </div>
    </div>
    <div class="map_row">
        <div class="tile tile_plains">
            <div class="improvement">
                <img src="img/b_craftshop.png" alt="Craftshop">
            </div>
        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_plains">

        </div>
    </div>
    <div class="map_row">
        <div class="tile tile_plains">
            <div class="resource">
                <img src="img/r_sandstone.png" alt="Sandstone">
            </div>
        </div>
        <div class="tile tile_plains">
            <div class="improvement">
                <img src="img/b_castle.png" alt="Castle">
            </div>
        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
    </div>
    <div class="map_row">
        <div class="tile tile_plains">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_plains">
            <div class="improvement">
                <img src="img/b_tower.png" alt="Tower">
            </div>
        </div>
        <div class="tile tile_ocean">

        </div>
        <div class="tile tile_ocean">

        </div>
    </div> -->
