<script>
import Navbar from '../components/Navbar.svelte';
import axios from 'axios';
import { alerts } from '../stores';

let email = '';
let submitting = false;

$: disabled = !email || submitting;

function submit() {
   const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (!re.test(email)) {
      alerts.add('Not a valid e-mail address');
      return;
   }

   submitting = true;
   axios.post('account', JSON.stringify({ request: 'resend' }))
   .then(response => {
      submitting = false;
      if (response.data) {
         alerts.add(`A new password is sent to ${email}`);
         email = '';
      } else {
         alerts.add('A verification e-mail could not be sent');
      }
   })
   .catch(error => {
      submitting = false;
      alerts.add(error ? error.message || error : 'unknown error');
   });
}
</script>

<Navbar/>
<p>
   <span>Please fill in your e-mail address. A new password will be sent to the address if it has an account.</span>
</p>
<input disabled={submitting} type=email bind:value={email} placeholder="name@domain.com">
<button {disabled} on:click={submit}>Resend verification e-mail</button>