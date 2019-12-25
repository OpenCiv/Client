<script>
import { onDestroy } from 'svelte';
import { alerts } from '../stores';

function remove(e, alert) {
   alerts.remove(alert);
}
</script>

<style>
.messages {
   width: 100%;
   position: absolute;
   bottom: 0;
   text-align: center;
}

.container {
   width: 80%;
   margin: auto;
   padding: 20px;
   position: relative;
   background: #D8D0C0;
   border: 2px solid #402010;
}

.message {
   color: #804020;
   margin: auto;
}

.x {
   cursor: default;
   position: absolute;
   top: 10px;
   right: 10px;
   color: #D8D0C0;
   background: #804020;
   border: 2px solid #402010;
}
</style>

<div class="messages">
   {#each $alerts as alert (alert.id)}
      <div class="container">
         <span class="message">{@html alert.message}</span>
         <div class="x" on:click={e => remove(e, alert.id)}>x</div>
      </div>
   {/each}
</div>
