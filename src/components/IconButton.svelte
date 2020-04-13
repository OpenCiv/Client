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
import { busy } from '../stores';

const dispatch = createEventDispatcher();

// The title is displayed on hover (I hope)
export let title;

// The link to the image file
export let img;

// The text is displayed when the image could not be loaded
export let alt;

/**
 * The click event
 */
function click(e) {
   dispatch('click', {
      e
   });
}
</script>

<button disabled={$busy} class="button iconbutton" {title} on:click>
   <img src={img} {alt}>
</button>
