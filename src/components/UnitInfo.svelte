<style lang="less">
@import url("../less/variables.less");

.iconbutton, .iconbutton:visited, .iconbutton:hover {
	height: 36px;
	width: 36px;
	min-height: 36px;
   min-width: 36px;
   box-sizing: border-box;
	padding: 0px;
	border-color: @color_text;
	color: @color_negatext;
	background-color: darken(@color_text,10%);
   letter-spacing: 0px;
   margin-right: 8px;
}
</style>

<script>
import { selectedUnit, backend, busy } from '../stores';
import { capitalize } from '../utilities';

/**
 * Removes a unit's action
 * @param {Object} action The action is removed
 */
async function removeAction(action) {
   const actions = await backend('game/removeaction', { id: $selectedUnit.id, order: action.order });
   if (actions) {
      $selectedUnit.actions = actions;
      selectedUnit.set($selectedUnit);
   }
}

function getParameter(action) {
   if (!action || !action.parameter) {
      return '';
   }

   if (typeof action.parameter === 'string') {
      return action.parameter;
   } else {
      const destination = action.parameter[action.parameter.length - 1];
      return `${destination.x},${destination.y}`;
   }
   return typeof action.parameter === 'string' ? action.parameter : action.parameter[action.parameter.length - 1];
}
</script>

{#if $selectedUnit}
   <h3 class="no-top-margin"><span class="hide-mobile">Order Queue</span><span class="hide-desktop">Orders</span></h3>
   <p>
      {#if $selectedUnit.actions === 0}
         <span>None</span>
      {/if}
      {#each $selectedUnit.actions as action}
         <button disabled={$busy} class="button iconbutton" title={capitalize(getParameter(action))} on:click={() => removeAction(action)}>
            <img src={`img/actions/${action.type}.svg`} alt={getParameter(action).slice(0, 3).toUpperCase()}>
         </button>
      {/each}
   </p>
{/if}