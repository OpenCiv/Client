<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import axios from 'axios';

let games = [{id: 1, name: 'Test game'}];

onMount(() => {
   // axios.post('account.php', JSON.stringify({ request: 'getgames'}))
   // .then(response => {
   //    games = response.data;
   // })
});

function logoff() {
   axios.get('logoff.php')
   .finally(() => {
      sapper.goto('login', { replace: true });
   });
}
</script>
<h2>Main</h2>
<p>
   <a href="newgame">New game</a><br>
   {#each games as game}
   <a href={'/game/' + game.id}>{game.name}</a><br>
   {/each}
   <a href="/account">Account</a>
</p>
<button on:click={logoff}>Log off</button>
