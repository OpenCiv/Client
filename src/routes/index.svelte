<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';
import { alerts } from '../stores';

onMount(() => {
   axios.get('checkin.php').then(response => {
      if (response.data > 0) {
         sapper.goto('game/' + response.data);
      }
      else if (response.data === 0) {
         sapper.goto('menu');
      } else {
         // sapper.goto('login');
         sapper.goto('game/1');
      }
   }).catch(error => {
      alerts.add(error ? error.message || error : 'unknown error');
   });
});
</script>
