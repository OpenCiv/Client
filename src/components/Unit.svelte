<script>
import { selected } from '../stores.js';

export let unit;

function select(e) {
   e.stopPropagation();
   selected.update(s => unit);
}
</script>

<div>
   <img src="img/u_nordic.png" alt="unit" on:click={e => select(e)}>
</div>
