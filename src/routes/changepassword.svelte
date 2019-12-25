<script>
import * as sapper from '@sapper/app';
import axios from 'axios';
import { alerts } from '../stores';

let oldpass = '';
let newpass = '';
let repeat = '';

// message === null when a password change is pending
$: disabled = !oldpass || !newpass;

function submitPassword() {
   if (newpass !== repeat) {
      message = 'The passwords are not the same';
      return;
   }

   axios.post('account.php', JSON.stringify({ request: 'changepassword', oldpass, newpass }))
   .then(response => {
      if (response.data) {
         alerts.add('Password successfully changed');
         sapper.goto('account', { replace: true });
      } else {
         alerts.add('Incorrect password');
      }
   })
   .catch(error => {
      alerts.add(error ? error.message || error : 'unknown error');
   });
}
</script>

<label>Current password:</label>
<input type=password bind:value={oldpass}><br>
<label>New password:</label>
<input type=password bind:value={newpass}><br>
<label>Repeat password:</label>
<input type=password bind:value={repeat}><br>
<button {disabled} on:click={submitPassword}>Submit</button><br>
<a href="/account">Back</a>
