<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onDestroy } from 'svelte';
import { selected, backend, busy } from '../stores';
import { capitalize, imgFolder } from '../utilities';
import IconButton from './IconButton.svelte';

let actions = [];

/**
 * Sets the actions based for the selected unit
 */
const unsubscribe = selected.subscribe(unit => {
   actions = getActions(unit);
});

// Destroys the subscription on the selected unit
onDestroy(unsubscribe);

/**
 * Returns an array of primary actions
 * @param {Object} unit The unit
 * @returns {Array} An array of actions
 */
function getActions(unit) {
   const acts = unit ? [
      { type: 'group', parameter: 'move' },
      { type: 'group', parameter: 'build' },
      { type: 'group', parameter: 'settle' }
   ] : [];
   return acts;
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

            // Replace action buttons with possible build options
            case 'build':
               actions = [
                  { type: 'group', parameter: 'back' },
                  { type: 'build', parameter: 'castle' },
                  { type: 'build', parameter: 'library' },
                  { type: 'build', parameter: 'market' },
                  { type: 'build', parameter: 'temple' }
               ];
               break;

            // Send the settle action to the backend
            case 'settle':
               const newActions = await backend('game/action', { id: $selected.id, type: 'settle', parameter: '' });
               if (newActions) {
                  $selected.actions = newActions;
                  selected.set(null);
               }

               break;

            // In all other cases, display the primary actions
            default:
               actions = getActions($selected);
               break;
         }

         break;

      // Send the build action to the backend
      case 'build':
         const newActions = await backend('game/action', { id: $selected.id, type: 'build', parameter: action.parameter });
         if (newActions) {
            $selected.actions = newActions;
            selected.set($selected);
         }

         break;

      // In all other cases, display the primary actions
      default:
         actions = getActions($selected);
         break;
   }
}
</script>

<h3 class="left no-top-margin">Command options</h3>
<p>
   {#each actions as action}
      <IconButton
         title={capitalize(action.parameter)}
         on:click={() => clickAction(action)}
         img="img/{imgFolder[action.type]}/{action.parameter}.svg"
         alt={action.parameter.slice(0, 3).toUpperCase()}
      />
   {/each}
</p>
