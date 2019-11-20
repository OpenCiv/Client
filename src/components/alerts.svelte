<script>
let messages = [];

export function addAlert(message) {
   messages = [...messages, message];
}

function remove(message) {
   messages.splice(messages.indexOf(message), 1);
   messages = messages;
}
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
   
}
</style>

<div class="messages">
   {#each messages as message}
      <div class="message">message</div>
      <div class="x" on:click={remove(message)}>x</div>
   {/each}
</div>
