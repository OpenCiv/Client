<script lang=ts>
import axios from 'axios';
import { Link, navigate } from 'svelte-routing';

let email = 'matrix@straland.com';
let password = 'ErgotSeeds';
let message = '';
$: disabled = !email || !password;

function login() {
   axios.post('login.php', JSON.stringify({
      username: email,
      password: password
   })).then(response => {
      if (response.data.success) {
         navigate('main', { replace: true });
      } else {
         message = response.data.message;
      }
   }).catch(error => {
      console.log(error.message);
   });
   email = '';
   password = '';
}
</script>
<h2>Login</h2>
<div class="message">{message}</div>
<div>
   <label>E-mail address</label>
   <input type="email" bind:value={email}>
</div>
<div>
   <label>Password</label>
   <input type="password" bind:value={password}>
</div>
<button {disabled} on:click={login}>Log in</button>
