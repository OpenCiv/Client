<style lang="less">
   @import url("../less/layout.less");

   h4 {
      margin-top: 0;
      margin-bottom: 0;
      color: #ccc;
   }
</style>

<script>
import { onMount, onDestroy } from 'svelte';
import { hoveredTile } from '../stores';
import { capitalize, Colors } from '../utilities';

let features = '';
let subscriptions = [];

onMount(() => {
   subscriptions.push(hoveredTile.subscribe(tile => {
      let result = '';
      if (tile) {
         if (tile.improvement) {
            result += capitalize(tile.improvement.type);
            if (tile.improvement.completion < 1) {
               result += ` (${Math.round(100 * tile.improvement.completion, 0)}%)`;
            }

            if (tile.vegetation) {
               result += ', ';
            }
         }

         if (tile.vegetation) {
            result += tile.improvement ? tile.vegetation : capitalize(tile.vegetation);
         }
      }

      features = result;
   }));
});

onDestroy(() => {
   subscriptions.forEach(subscription => subscription());
})
</script>

<h3 class="no-top-margin">Tile Info</h3>
<table>
   <tbody>
      <tr>
         <td class="hide-mobile right"><h4>Terrain</h4></td>
         <td>
            <span>
               {capitalize($hoveredTile.type)}{#if $hoveredTile.hill}, hills{/if}
            </span>
         </td>
      </tr>
      <tr>
         <td class="hide-mobile right"><h4>Features</h4></td>
         <td><span>{features}</span></td>
      </tr>
      <tr>
         <td class="hide-mobile right"><h4>Resources</h4></td>
         <td>
            {#each $hoveredTile.resources as resource}
               <span>{capitalize(resource.type)} ({resource.quantity})</span>
            {/each}
         </td>
      </tr>
      <tr>
         <td class="hide-mobile right"><h4>Units</h4></td>
         <td>
            {#each $hoveredTile.units as unit}
               <span style="color: {Colors.getUnitPrimaryColor(unit)}">Unit
                  {#if unit.actions && unit.actions.length > 0}
                     ({unit.actions[0].type})
                  {/if}
               </span>
            {/each}
         </td>
      </tr>
   </tbody>
</table>
