<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onMount, onDestroy } from 'svelte';
import { player, selectedUnit, selectedAction, backend, busy } from '../stores';
import { capitalize, imgFolder } from '../utilities';
import ActionButton from './ActionButton.svelte';

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
      return [
         { type: 'group', parameter: 'move' },
         { type: 'group', parameter: 'build' },
         { type: 'group', parameter: 'settle' }
      ];
   }

   return [];
}

/**
 * Handles a click on an action button
 * @param {Object} action The action the user clicked on
 */
async function clickAction(action) {
   switch (action.type) {

      // Primary action group
      case 'group':
         switch (action.parameter) {

            case 'move':
               selectedAction.set(action.parameter);
               return;

            // Replace action buttons with possible build options
            case 'build':
               actions = [
                  { type: 'group', parameter: 'back' },
                  { type: 'build', parameter: 'castle' },
                  { type: 'build', parameter: 'library' },
                  { type: 'build', parameter: 'market' },
                  { type: 'build', parameter: 'temple' }
               ];
               return;

            // Send the settle action to the backend
            case 'settle':
               const newActions = await backend('game/action', { id: $selectedUnit.id, type: 'settle', parameter: '' });
               if (newActions) {
                  $selectedUnit.actions = newActions;
                  selectedUnit.set(null);
               }

               return;
         }

         break;

      // Send the build action to the backend
      case 'build':
         const newActions = await backend('game/action', { id: $selectedUnit.id, type: 'build', parameter: action.parameter });
         if (newActions) {
            $selectedUnit.actions = newActions;
            selectedUnit.set($selectedUnit);
         }

         return;

      case 'player':
         selectedAction.set(action.parameter);
         return;
   }

   actions = getBasicActions($selectedUnit);
}
</script>

<h3 class="left no-top-margin">Command options</h3>
<p>
   {#each actions as action}
      <ActionButton {action} on:click={() => clickAction(action)} />
   {/each}
</p>
