<script>
import axios from 'axios';
import { navigate } from 'svelte-routing';

function logoff() {
   axios.get('logoff.php').finally(response => {
      navigate('/login');
   });
}
</script>
<h2>Main</h2>
<button on:click={logoff}>Log off</button>