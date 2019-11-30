<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';
import { alerts } from '../stores.js';

onMount(() => {
   alerts.update(a => [...a, 'Hello, world!']);
   axios.get('checkin.php').then(response => {
      if (response.data) {
         sapper.goto('game');
      } else {
         sapper.goto('login');
      }
   }).catch(error => {
      alerts.update(a => error ? error.message || error : 'unknown error');
      console.log(error ? error.message || error : 'unknown error');
   });
});
</script>
