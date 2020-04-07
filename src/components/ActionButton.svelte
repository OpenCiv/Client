<style lang="less">
@import url("../less/layout.less");

button {
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

export let title;
export let img;
export let alt;

function click(e) {
   dispatch('click', {
      e
   });
}
</script>

<button disabled={$busy} class="button iconbutton" {title} on:click>
   <img src={img} {alt}>
</button>