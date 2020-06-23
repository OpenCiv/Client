<style lang="less">
   @import url("../less/layout.less");

   h4 {
      margin-top:0;
      margin-bottom: 0;
      color: #ccc;
   }
</style>

<script>
import { hoveredTile } from '../stores';
import { capitalize, Colors } from '../utilities';
</script>


<h3 class="no-top-margin">Tile Info</h3>
<table>
   <tbody>
      <tr>
         <td class="hide-mobile right"><h4>Terrain</h4></td>
         <td><span>{capitalize($hoveredTile.type)}</span></td>
      </tr>
      <tr>
         <td class="hide-mobile right"><h4>Features</h4></td>
         <td>
            {#if $hoveredTile.improvement}
               <span>{capitalize($hoveredTile.improvement.type)}{#if $hoveredTile.improvement.completion < 1}&nbsp;({Math.round(100 * $hoveredTile.improvement.completion, 0)}%){/if},</span>
            {/if}
            {#if $hoveredTile.vegetation}
               <span>{capitalize($hoveredTile.vegetation)}</span>
            {/if}
         </td>
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
               <span style="color: {Colors.getUnitPrimaryColor(unit)}">Unit{#if unit.actions && unit.actions.length > 0}&nbsp;({unit.actions[0].type}){/if}</span>
            {/each}
         </td>
      </tr>
   </tbody>
</table>

