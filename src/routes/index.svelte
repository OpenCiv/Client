<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';
import { alerts } from '../stores.js';

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
      alerts.set(error ? error.message || error : 'unknown error');
      console.log(error ? error.message || error : 'unknown error');
   });
});
</script>
