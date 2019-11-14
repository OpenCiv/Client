<script>
import axios from 'axios';
import * as sapper from '@sapper/app';

function logoff() {
   axios.get('logoff.php').finally(response => {
      sapper.goto('/login');
   });
}
</script>
<h2>Main</h2>
<button on:click={logoff}>Log off</button>
