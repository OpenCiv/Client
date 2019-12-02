<script>
import { selected } from '../stores.js';

export let unit = null;

function select(e) {
   e.stopPropagation();
   selected.set(unit);
}
</script>

<div>
   <img src="img/u_nordic.png" alt="unit" on:click={e => select(e)}>
</div>
