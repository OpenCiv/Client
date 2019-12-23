<script>
import * as sapper from '@sapper/app';
import axios from 'axios';

let oldpass = '';
let newpass = '';
let repeat = '';
let wrongpass = false;

function submitPassword() {
   axios.post('account.php', JSON.stringify({ request: 'changepassword', oldpass, newpass }))
   .then(response => {
      if (response.data) {
         console.log('Password successfully changed');
         sapper.goto('account', { replace: true });
      } else {
         wrongpass = true;
      }
   })
   .catch(error => {
      console.log(error ? error.message || error : 'unknown error');
   });
}
</script>

<label>Current password:</label>
<input type=password bind:value={oldpass}><br>
<label>New password:</label>
<input type=password bind:value={newpass}><br>
<label>Repeat password:</label>
<input type=password bind:value={repeat}><br>
<button on:click={() => submitPassword()}>Submit</button><br>
<a href="/account">Back</a>
{#if wrongpass}
   <p>
      <span class="incorrect">Incorrect password</span>
   </p>
{/if}

<style lang="less">
@incorrect: #FF0000;

.incorrect {
   color: @incorrect;
}
</style>