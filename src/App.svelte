<script>
import { onMount } from 'svelte';
import axios from 'axios';
import { Router, Link, Route, navigate } from 'svelte-routing';
import LoggedOff from './routes/LoggedOff.svelte';
import Main from './routes/Main.svelte';

export let url = '';

onMount(async () => {
   axios.defaults.baseURL = 'http://openciv/php/';
   axios.get('checkin.php').then(response => {
      if (!response.data) {
         navigate('/login');
      } else {
         navigate('main');
      }
   });
});
</script>
<Router url="{url}">
   <div>
      <Route path="/*" component="{LoggedOff}"/>
      <Route path="main" component="{Main}"/>
   </div>
</Router>
