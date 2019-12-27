<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { alerts, backend } from '../stores';

onMount(async () => {
   let id = await backend('check');
   if (id > 0) {
      sapper.goto('game/' + id);
   }
});
</script>
