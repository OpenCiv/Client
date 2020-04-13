<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { alerts, backend } from '../stores';

// Checks whether the user is logged in, and if so, forwards it to the game
onMount(async () => {
   let id = await backend('check');
   if (id > 0) {
      sapper.goto('game/' + id);
   }
});
</script>
