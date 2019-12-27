<script>
import * as sapper from '@sapper/app';
import { alerts, backend, busy } from '../stores';

let oldpass = '';
let newpass = '';
let repeat = '';

// message === null when a password change is pending
$: disabled = $busy || !oldpass || !newpass;

async function submitPassword() {
   if (newpass !== repeat) {
      message = 'The passwords are not the same';
      return;
   }

   const result = await backend('changepassword', { oldpass, newpass });
   if (result) {
      alerts.add('Password successfully changed');
      sapper.goto('account', { replace: true });
   } else {
      alerts.add('Incorrect password');
   }
}
</script>

<h2>Change password</h2>
<label>Current password:</label>
<input type=password disabled={$busy} bind:value={oldpass}><br>
<label>New password:</label>
<input type=password disabled={$busy} bind:value={newpass}><br>
<label>Repeat password:</label>
<input type=password disabled={$busy} bind:value={repeat}><br>
<button {disabled} on:click={submitPassword}>Submit</button><br>
<a href="/account">Back</a>
