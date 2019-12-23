<script>
import * as sapper from '@sapper/app';
import axios from 'axios';

let oldpass = '';
let newpass = '';
let repeat = '';
let message = '';

// message === null when a password change is pending
$: disabled = !oldpass || !newpass || message === null;

function submitPassword() {
   if (newpass !== repeat) {
      message = 'The passwords are not the same';
      return;
   }

   message = null;
   axios.post('account.php', JSON.stringify({ request: 'changepassword', oldpass, newpass }))
   .then(response => {
      if (response.data) {
         message = '';
         console.log('Password successfully changed');
         sapper.goto('account', { replace: true });
      } else {
         message = 'Incorrect password';
      }
   })
   .catch(error => {
      message = error ? error.message || error : 'unknown error';
      console.log(message);
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
{#if message}
   <p>
      <span class="wrong">{message}</span>
   </p>
{/if}

<style lang="less">
@wrong: #FF0000;

.wrong {
   color: @wrong;
}
</style>