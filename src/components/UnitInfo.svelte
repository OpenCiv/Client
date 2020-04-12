<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { selected, backend } from '../stores';
import { capitalize, imgFolder } from '../utilities';
import IconButton from './IconButton.svelte';

let actions = [];

function getDescription(action) {
   return action.type === 'move' ? action.type : action.parameter;
}

async function removeAction(action) {
   await backend('game/removeaction', { id: $selected.id, order: action.order });
   $selected.actions = $selected.actions.filter(a => a !== action);
   $selected.actions.forEach(act => {
      if (act.order > action.order) {
         act.order--;
      }
   });
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
