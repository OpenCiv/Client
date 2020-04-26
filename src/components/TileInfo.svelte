<style lang="less">
@import url("../less/layout.less");
</style>

<script>
import { hoveredTile } from '../stores';
import { capitalize, Colors } from '../utilities';
</script>

<div id="tileinfo">
   <span>{capitalize($hoveredTile.type)}</span>
   {#if $hoveredTile.vegetation}
      <br><span>{capitalize($hoveredTile.vegetation)}</span>
   {/if}
   {#each $hoveredTile.resources as resource}
      <br><span>{capitalize(resource.type)} ({resource.quantity})</span>
   {/each}
   {#if $hoveredTile.improvement}
      <br><span>{capitalize($hoveredTile.improvement.type)}{#if $hoveredTile.improvement.completion < 1}&nbsp;({Math.round(100 * $hoveredTile.improvement.completion, 0)}%){/if}</span>
   {/if}
   {#each $hoveredTile.units as unit}
      <br><span style="color: {Colors.getUnitPrimaryColor(unit)}">Unit{#if unit.actions && unit.actions.length > 0}&nbsp;({unit.actions[0].type}){/if}</span>
   {/each}
</div>
