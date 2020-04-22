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
{#if $hoveredTile.improvement}
<br><span>{capitalize($hoveredTile.improvement.type)}</span>
{/if}
{#each $hoveredTile.units as unit}
<br><span style="color: {Colors.getPrimaryColor(unit.color)}">Unit</span>
{/each}
</div>
