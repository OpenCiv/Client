<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onDestroy } from 'svelte';
import { selected, backend } from '../stores';
import { capitalize, imgFolder } from '../utilities';

let actions = [];

function setDescription(action) {
   action.description = action.type === 'move' ? action.type : action.parameter;
}

export function addAction(action) {
   setDescription(action);
   actions = [...actions, action];
}

const unsubscribe = selected.subscribe(async unit => {
   if (unit) {
      const acts = await backend('game/getactions', { id: unit.id });
      acts.forEach(action => {
         setDescription(action);
      });
      actions = acts;
   } else {
      actions = [];
   }
});

onDestroy(unsubscribe);

async function removeAction(action) {
   await backend('game/removeaction', { id: $selected.id, order: action.order });
   actions = actions.filter(a => a !== action);
   actions.forEach(act => {
      if (act.order > action.order) {
         act.order--;
      }
   });
}
</script>

<div class="two-thirds non-responsive">
   <h3 class="no-top-margin">{$selected ? 'Current orders' : ''}</h3>
   <p>
      {#if $selected && actions.length === 0}
         <span>None</span>
      {/if}
      {#each actions as action}
         <button class="button iconbutton" title={capitalize(action.description)} on:click={() => removeAction(action)}>
            <img src="img/{imgFolder[action.type]}/{action.description}.svg" alt={action.description.slice(0, 3).toUpperCase()}>
         </button>
      {/each}
   </p>
</div>
