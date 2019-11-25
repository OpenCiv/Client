<script>
import * as sapper from '@sapper/app';
import axios from 'axios';
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
         sapper.goto('/menu');
      } else {
         alerts.update(a => [...a, response.data]);
      }
   })
   .catch(error => {
      alerts.update(a => [...a, error]);
   });
   email = '';
   password = '';
}
</script>
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
