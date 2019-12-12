<script>
import { onDestroy } from 'svelte';
import { alerts } from '../stores';

let messages = [];

const unsubscribe = alerts.subscribe(value => {
   messages = value;
});

function remove(e, message) {
   messages = messages.filter(m => m !== message);
   alerts.set(messages);
}

onDestroy(() => {
   unsubscribe.apply();
});
</script>

<style>
.messages {
   position: absolute;
   bottom: 0;
}

.message {
   width: 100%;
   margin: 20px;
   text-align: center;
}

.x {
   position: relative;
   top: 10px;
   right: 10px;
}
</style>

<div class="messages">
   {#each messages as message}
      <div class="message">{@html message}</div>
      <div class="x" on:click={e => remove(e, message)}>x</div>
   {/each}
</div>
