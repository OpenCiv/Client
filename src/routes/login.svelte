<script>
import * as sapper from '@sapper/app';
import axios from 'axios';
import Navbar from '../components/Navbar.svelte';
import { alerts } from '../stores';

let email = '';
let password = '';

$: disabled = !email || !password;

function login() {
   axios.post('login.php', JSON.stringify({
      username: email,
      password: password
   }))
   .then(response => {
      if (response.data) {
         sapper.goto('menu', { replace: true });
      } else {
         alerts.add(response.data);
      }
   })
   .catch(error => {
      alerts.add(error ? error.message || error : 'unknown error');
   });
   email = '';
   password = '';
}

let count = 0;
function sendAlert() {
   alerts.add('This is alert #' + ++count);
}
</script>
<Navbar/>
<h2>Login</h2>
<div>
   <label>E-mail address</label>
   <input type="email" bind:value={email}>
</div>
<div>
   <label>Password</label>
   <input type="password" bind:value={password}>
</div>
<button {disabled} on:click={() => login()}>Log in</button>
