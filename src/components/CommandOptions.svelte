<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onDestroy, createEventDispatcher } from 'svelte';
import { selected, backend } from '../stores';
import { capitalize, imgFolder } from '../utilities';

const dispatch = createEventDispatcher();

let actions = [];

const unsubscribe = selected.subscribe(unit => {
   actions = getActions(unit);
});

onDestroy(unsubscribe);

function getActions(unit) {
   const acts = unit ? [
      { type: 'group', parameter: 'move' },
      { type: 'group', parameter: 'build' }
   ] : [];
   return acts;
}

async function addAction(action) {
   switch (action.type) {
      case 'group':
         switch (action.parameter) {
            case 'build':
               actions = [
                  { type: 'build', parameter: 'castle' },
                  { type: 'build', parameter: 'library' },
                  { type: 'build', parameter: 'market' },
                  { type: 'build', parameter: 'temple' }
               ];
               break;

            default:
               actions = getActions($selected);
               break;
         }

         break;

      case 'build':
         const order = await backend('build', { id: $selected.id, improvement: action.parameter });
         if (order !== false) {
            action.order = order;
            dispatch('newAction', { action });
         }

         actions = getActions($selected);
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
      <button class="button iconbutton" title={capitalize(action.parameter)} on:click={() => addAction(action)}>
         <img src="img/{imgFolder[action.type]}/{action.parameter}.svg" alt={action.parameter.slice(0, 3).toUpperCase()}>
      </button>
   {/each}
</p>
