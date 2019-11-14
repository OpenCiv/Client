<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';

onMount(async () => {
   const response = await axios.get('checkin.php');
   if (response.data) {
      sapper.goto('/menu');
   } else {
      sapper.goto('/login');
   }
});
</script>
<svelte:head>
	<title>Open Civ</title>
</svelte:head>
