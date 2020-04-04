<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onDestroy } from 'svelte';
import { selected, backend } from '../stores';

let currentUnit = '';
let information = '';

const unsubscribe = selected.subscribe(unit => {
   if (unit) {
      currentUnit = 'Unit selected';
      information = 'What orders?';
   } else {
      currentUnit = '';
      information = '';
   }
});

onDestroy(unsubscribe);
</script>

<div id="info-panel" class="third">
   <div class="two-thirds non-responsive">
      <!-- Get values from variables or show defaults. -->
      <h3 class="no-top-margin">{currentUnit}</h3>
      <p>{information}</p>
   </div>
</div>
