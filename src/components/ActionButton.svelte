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
</script>

<button disabled={$busy} class="button iconbutton" title={capitalize(action.parameter)} on:click>
   <img src="img/{imgFolder[action.type]}/{action.parameter}.svg" alt={action.parameter.slice(0, 3).toUpperCase()}>
</button>
