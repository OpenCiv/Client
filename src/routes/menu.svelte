<script>
import axios from 'axios';
import * as sapper from '@sapper/app';

function logoff() {
   axios.get('logoff.php')
   .finally(() => {
      sapper.goto('login');
   });
}
</script>
<h2>Main</h2>
<button on:click={logoff}>Log off</button>
