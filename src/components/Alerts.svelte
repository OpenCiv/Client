<script>
import { onDestroy } from 'svelte';
import { alerts } from '../stores';

function remove(id) {
   alerts.remove(id);
}
</script>

<style>
.messages {
   width: 100%;
   position: absolute;
   bottom: 0;
}

.container {
   color: #fff;
   max-width: 600px;
   margin: 10px;
   padding: 20px 20px;
   position: relative;
   background: #333;
   border: 3px solid #F2D346;
}

.closewindow {
   cursor: pointer;
   position: absolute;
   top: 10px;
   right: 10px;
   background-color: #F2D346;
	border: 3px solid #FFEC96;
	padding: 6px 10px;
	color: #333;
}
</style>

<div class="messages">
   {#each $alerts as alrt (alrt.id)}
      <div class="container">
         <span>{@html alrt.message}</span>
         <div class="closewindow" on:click|stopPropagation={() => remove(alrt.id)}>X</div>
      </div>
   {/each}
</div>
