<script>
import { selected } from '../stores';

export let unit = null;

$: active = true;

function select(e) {
   e.stopPropagation();
   selected.set(unit);
}
</script>

<style lang="less">
@import url("../less/map.less");

.active {
   background: red;
}
</style>

<img src="img/u_nordic.png" class:active={active} alt="unit" on:click={e => select(e)}>
