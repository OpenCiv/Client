<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';

onMount(() => {
   axios.get('checkin.php').then(response => {
      if (response.data) {
         sapper.goto('/menu');
      } else {
         sapper.goto('/login');
      }
   }).catch(error => {
      
   });
});
</script>
