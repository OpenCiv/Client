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
<p>
   <!-- <a href="newgame">New game</a> -->
   <a href="/game/1">Game 1</a>
</p>

<button on:click={logoff}>Log off</button>
