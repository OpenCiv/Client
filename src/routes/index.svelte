<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';
import { alerts } from '../stores.js';

onMount(() => {
   axios.get('checkin.php').then(response => {
      if (response.data) {
         sapper.goto('/menu');
      } else {
         sapper.goto('/login');
      }
   }).catch(error => {
      alerts.update(a => [...a, error]);
   });
});
</script>
