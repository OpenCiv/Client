<script>
import axios from 'axios';
import { tick } from 'svelte';
import { Link, navigate } from 'svelte-routing';

let name = 'Matrix';
let email = 'matrix@straland.com';
let password = 'ErgotSeeds';
let repeat = 'ErgotSeeds';
let message = '';
let nameError = false;
let emailError = false;
let passwordError = false;
let repeatError = false;
let repeatPlaceholder = '';

$: disabled = !name || !email || !password || password !== repeat;

function register() {
   axios.post('register.php', JSON.stringify({
      name: name,
      email: email,
      password: password
   })).then(response => {
      this.message = response.data.message;
      if (response.data.success) {
         navigate('/unverified', { replace: true });
      } else if (response.data.message ='E-mail address already used') {
         navigate('/newpassword', { replace: true });
      } else {
         this.message = response.data.message;
      }
   }).catch(error => {
      console.log(error.message);
   });
}

function name_changed() {
   nameError = false;
}

function validate_name() {
   nameError = !name;
}
function email_changed() {
   emailError = false;
}

function validate_email() {
   emailError = !email;
}

async function password_changed() {
   passwordError = false;
   await tick();
   repeatPlaceholder = '';
   for (let c = 0; c < password.length; c++) {
      repeatPlaceholder += '●';
   }
}

function validate_password() {
   passwordError = !password;
}
function repeat_changed() {
   repeatError = false;
}

function validate_repeat() {
   repeatError = password !== repeat;
}
</script>
<h2>Register</h2>
<div class="message">{message}</div>
<div>
   <label>Name</label>
   <input type="text" placeholder="Nickname or real name..." bind:value={name} on:focus={name_changed} on:blur={validate_name}>
   {#if nameError}
      <div class="error">The name cannot be empty</div>
   {/if}
</div>
<div>
   <label>E-mail address</label>
   <input type="email" placeholder="johndoe@email.com" bind:value={email} on:focus={email_changed} on:blur={validate_email}>
   {#if emailError}
      <div class="error">The e-mail address cannot be empty</div>
   {/if}
</div>
<div>
   <label>Password</label>
   <input type="password" bind:value={password} on:focus={password_changed} on:blur={validate_password}>
   {#if passwordError}
      <div class="error">The password cannot be empty</div>
   {/if}
</div>
<div>
   <label>Repeat password</label>
   <input type="password" placeholder={repeatPlaceholder} bind:value={repeat} on:focus={repeat_changed} on:blur={validate_repeat}>
   {#if repeatError}
      <div class="error">The passwords are not the same</div>
   {/if}
</div>
<button {disabled} on:click={register}>Log in</button>
