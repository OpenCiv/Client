<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { selectedUnit, backend } from '../stores';
import { capitalize, imgFolder } from '../utilities';
import ActionButton from './ActionButton.svelte';

// The selected unit's actions
let actions = [];

/**
 * Returns a string representing the action's description
 * @param {Object} action The action is displayed in a button
 * @returns {string} A one word description of the action
 */
function getDescription(action) {
   return action.type === 'move' ? action.type : action.parameter;
}

/**
 * Removes a unit's action
 * @param {Object} action The action is removed
 */
async function removeAction(action) {
   const actions = await backend('game/removeaction', { id: $selectedUnit.id, order: action.order });
   $selectedUnit.actions = actions;
   selectedUnit.set($selectedUnit);
}
</script>

<div class="two-thirds non-responsive">
   {#if $selectedUnit}
      <h3 class="no-top-margin">Current orders</h3>
      <p>
         {#if $selectedUnit.actions === 0}
            <span>None</span>
         {/if}
         {#each $selectedUnit.actions as action}
            <ActionButton {action} on:click={() => removeAction(action)} />
         {/each}
      </p>
   {/if}
</div>
