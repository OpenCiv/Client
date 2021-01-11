<style lang="less">
@import url("../less/layout.less");

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
import { onMount, onDestroy } from 'svelte';
import { player, selectedUnit, selectedAction, backend, busy } from '../stores';
import { capitalize } from '../utilities';

let actions = [];
let subscriptions = [];

onMount(() => {
   subscriptions.push(selectedUnit.subscribe(unit => {
      actions = getBasicActions(unit);
   }));
   subscriptions.push(selectedAction.subscribe(action => {
      if (action === 'newUnit') {
         actions = [];
      }
   }));
   subscriptions.push(player.subscribe(p => {
      getBasicActions($selectedUnit);
   }));
});

// Destroys the subscriptions
onDestroy(() => {
   subscriptions.forEach(subscription => subscription());
});

/**
 * Returns an array of primary actions
 * @param {Object} unit The unit
 * @returns {Array} An array of actions
 */
function getBasicActions(unit) {
   if (unit) {
      return ['move', 'earn'];
   }

   return [];
}

/**
 * Handles a click on an action button
 * @param {Object} action The action the user clicked on
 */
async function clickAction(action) {
   switch (action) {
      case 'move':
         selectedAction.set(action);
         break;

      default:
         const newActions = await backend('game/action', { id: $selectedUnit.id, type: action });
         if (newActions) {
            $selectedUnit.actions = newActions;
            selectedUnit.set($selectedUnit);
         }

         break;
   }

   actions = getBasicActions($selectedUnit);
}
</script>

<h3 class="left no-top-margin">Command options</h3>
<p>
   {#each actions as action}
      <button disabled={$busy} class="button iconbutton" title={capitalize(action)} on:click={() => clickAction(action)}>
         <img src={`img/actions/${action}.svg`} alt={capitalize(action)}>
      </button>
   {/each}
</p>
