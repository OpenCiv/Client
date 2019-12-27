<script>
import Navbar from '../components/Navbar.svelte';
import { alerts, backend, busy } from '../stores';

let email = '';

$: disabled = $busy || !email;

async function submit() {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(email)) {
      alerts.add('Not a valid e-mail address');
      return;
   }

   let result = await backend('newpassword', { email });
   if (result) {
      alerts.add(`A new password is sent to ${email}`);
      email = '';
   } else {
      alerts.add('E-mail address not found');
   }
}
</script>

<Navbar/>
<p>
   <span>Please fill in your e-mail address. A new password will be sent to the address if it has an account.</span>
</p>
<input disabled={$busy} type=email bind:value={email} placeholder="name@domain.com">
<button {disabled} on:click={submit}>Send new password</button>