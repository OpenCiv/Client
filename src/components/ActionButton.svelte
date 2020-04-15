<style lang="less">
@import url("../less/layout.less");

.iconbutton, .iconbutton:visited, .iconbutton:hover {
	height: 36px;
	width: 36px;
	min-height: 36px;
	min-width: 36px;
	padding: 0px;
	border-color: @color_text;
	color: @color_negatext;
	background-color: darken(@color_text,10%);
	letter-spacing: 0px;
}
</style>

<script>
import { createEventDispatcher } from 'svelte';
import { busy, selectedAction } from '../stores';
import { capitalize, imgFolder } from '../utilities';

const dispatch = createEventDispatcher();

// The action this button represents
export let action;

/**
 * The click event
 */
function click(e) {
   dispatch('click', {
      e
   });
}

function getParameter() {
   if (!action) {
      return '';
   }

   if (typeof action.parameter === 'string') {
      return action.parameter;
   } else {
      const destination = action.parameter[action.parameter.length - 1];
      return `${destination.x},${destination.y}`;
   }
   return typeof action.parameter === 'string' ? action.parameter : action.parameter[action.parameter.length - 1];
}
</script>

<button disabled={$busy} class="button iconbutton" title={capitalize(getParameter())} on:click>
   <img src="img/{imgFolder[action.type]}/{action.parameter}.svg" alt={getParameter().slice(0, 3).toUpperCase()}>
</button>
