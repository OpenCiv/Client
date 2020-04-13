<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { selected, backend } from '../stores';
import { capitalize, imgFolder } from '../utilities';
import IconButton from './IconButton.svelte';

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
   const actions = await backend('game/removeaction', { id: $selected.id, order: action.order });
   $selected.actions = actions;
   selected.set($selected);
}
</script>

<div class="two-thirds non-responsive">
   {#if $selected}
      <h3 class="no-top-margin">Current orders</h3>
      <p>
         {#if $selected.actions === 0}
            <span>None</span>
         {/if}
         {#each $selected.actions as action}
            <IconButton
               title={capitalize(getDescription(action))}
               on:click={() => removeAction(action)}
               img="img/{imgFolder[action.type]}/{getDescription(action)}.svg"
               alt={getDescription(action).slice(0, 3).toUpperCase()}
            />
         {/each}
      </p>
   {/if}
</div>
