<script>
import * as sapper from '@sapper/app';
import axios from 'axios';
import navbar from '../components/navbar.svelte';
import { alerts } from '../stores.js';

let email = '';
let password = '';
$: disabled = !email || !password;

function login() {
   axios.post('login.php', JSON.stringify({
      username: email,
      password: password
   }))
   .then(response => {
      if (!response.data) {
         sapper.goto('menu');
      } else {
         console.log(response.data);
         alerts.update(a => [...a, response.data]);
      }
   })
   .catch(error => {
      console.log(error);
   });
   email = '';
   password = '';
}
</script>
<navbar/>
<nav>
<button on:click={() => sapper.goto('login')}>Login</button>
<button on:click={() => sapper.goto('register')}>Register</button>
<button on:click={() => sapper.goto('newpassword')}>New password</button>
</nav>
<h2>Login</h2>
<div>
   <label>E-mail address</label>
   <input type="email" bind:value={email}>
</div>
<div>
   <label>Password</label>
   <input type="password" bind:value={password}>
</div>
<button {disabled} on:click={login}>Log in</button>
