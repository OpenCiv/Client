<style lang="less">
   @import url("../less/layout.less");
</style>

<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { backend, busy } from '../stores';

let games = null;

onMount(async () => {
   games = await backend('getgames');
});

async function logoff() {
   await backend('logoff');
   sapper.goto('login', { replace: true });
}
</script>
<h2>Menu</h2>
<p>
   <a href="newgame">New game</a><br>
</p>
<h3>Active games</h3>
{#if !Array.isArray(games)}
   <span>Loading...</span><br>
{:else if games.length === 0}
   <span>None</span><br>
{:else}
   {#each games as game (game.id)}
      <a href={'/game/' + game.id}>{game.name}</a><br>
   {/each}
{/if}<br>
<a href="/account">Account</a><br>
<button disabled={$busy} on:click={logoff}>Log off</button>
