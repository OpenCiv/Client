<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onDestroy, createEventDispatcher } from 'svelte';
import { selected, backend, busy } from '../stores';
import { capitalize, imgFolder } from '../utilities';
import IconButton from './IconButton.svelte';

const dispatch = createEventDispatcher();

let actions = [];

const unsubscribe = selected.subscribe(unit => {
   actions = getActions(unit);
});

onDestroy(unsubscribe);

function getActions(unit) {
   const acts = unit ? [
      { type: 'group', parameter: 'move' },
      { type: 'group', parameter: 'build' },
      { type: 'group', parameter: 'settle' }
   ] : [];
   return acts;
}

async function addAction(action) {
   switch (action.type) {
      case 'group':
         switch (action.parameter) {
            case 'build':
               actions = [
                  { type: 'group', parameter: 'back' },
                  { type: 'build', parameter: 'castle' },
                  { type: 'build', parameter: 'library' },
                  { type: 'build', parameter: 'market' },
                  { type: 'build', parameter: 'temple' }
               ];
               break;

            case 'settle':
               const newActions = await backend('game/action', { id: $selected.id, type: 'settle', parameter: '' });
               if (newActions) {
                  $selected.actions = newActions;
                  selected.set(null);
               }

               break;

            default:
               actions = getActions($selected);
               break;
         }

         break;

      case 'build':
         const newActions = await backend('game/action', { id: $selected.id, type: 'build', parameter: action.parameter });
         if (newActions) {
            $selected.actions = newActions;
            selected.set($selected);
         }

         break;

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
         on:click={() => addAction(action)}
         img="img/{imgFolder[action.type]}/{action.parameter}.svg"
         alt={action.parameter.slice(0, 3).toUpperCase()}
      />
   {/each}
</p>
