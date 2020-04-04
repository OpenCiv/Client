<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onDestroy } from 'svelte';
import { capitalize } from '../utilities';
import { selected, backend } from '../stores';

let actions = [];

const imgFolder = {
   group: 'actions',
   build: 'improvements'
}

const unsubscribe = selected.subscribe(unit => {
   actions = getActions(unit);
});

onDestroy(unsubscribe);

function getActions(unit) {
   const acts = unit ? [
      { type: 'group', parameter: 'move', short: 'MOV' },
      { type: 'group', parameter: 'build', short: 'BLD' }
   ] : [];
   return acts;
}

async function addAction(action) {
   console.log(action);
   switch (action.type) {
      case 'group':
         switch (action.parameter) {
            case 'build':
               actions = [
                  { type: 'build', parameter: 'castle', short: 'CAS' },
                  { type: 'build', parameter: 'library', short: 'LIB' },
                  { type: 'build', parameter: 'market', short: 'MAR' },
                  { type: 'build', parameter: 'temple', short: 'TEM' }
               ];
               break;

            default:
               actions = getActions($selected);
               break;
         }

         break;

      case 'build':
         const result = await backend('build', { id: $selected.id, improvement: action.parameter });
         if (result) {
            alert('yay');
         }

         actions = getActions($selected);
         break;

      default:
         actions = getActions($selected);
         break;
   }
}
</script>

<div id="commands-panel" class="third">
   <h3 class="left no-top-margin">Command options</h3>
   <p id="command-buttons">
      {#each actions as action}
         <button class="button iconbutton" title={capitalize(action.parameter)} on:click={() => addAction(action)}>
            <img src="img/{imgFolder[action.type]}/{action.parameter}.svg" alt={action.short}>
         </button>
      {/each}
   </p>
</div>
