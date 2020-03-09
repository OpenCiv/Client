<script>
import { selected } from '../stores';

export let unit = null;

$: active = selected === unit;

function select(e) {
   e.stopPropagation();
   selected.set(unit);
}
</script>

<style>
.active {
   background: red;
}
</style>

<div>
   <img src="img/u_nordic.png" class:active alt="unit" on:click={e => select(e)}>
</div>
