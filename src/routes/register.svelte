<script>
import * as sapper from '@sapper/app';
import axios from 'axios';
import { alerts } from '../stores';
import Navbar from '../components/Navbar.svelte';

let name = '';
let email = '';
let password = '';
let repeat = '';

$: disabled = !name || !email || !password;

function register() {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(email)) {
      alerts.add('Not a valid e-mail address');
      return;
   }

   if (password !== repeat) {
      alerts.add('The passwords are not the same');
      return;
   }

   axios.post('register.php', JSON.stringify({
      name: name,
      email: email,
      password: password
   })).then(response => {
      if (!response.data) {
         sapper.goto('menu', { replace: true });
      } else {
         alerts.add(response.data);
         alerts.update(a => [...a, response.data]);
         if (response.data = 'E-mail address already used') {
            sapper.goto('newpassword', { replace: true });
         }
      }
   }).catch(error => {
      alerts.add(error ? error.message || error : 'unknown error');
   });
}
</script>

<Navbar/>
<h2>Register</h2>
<div>
   <label>Name</label>
   <input type=text placeholder="Nickname or real name..." bind:value={name}>
</div>
<div>
   <label>E-mail address</label>
   <input type=email placeholder="name@domain.com" bind:value={email}>
</div>
<div>
   <label>Password</label>
   <input type=password bind:value={password}>
</div>
<div>
   <label>Repeat password</label>
   <input type=password bind:value={repeat}>
</div>
<button {disabled} on:click={register}>Register</button>
