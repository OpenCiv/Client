<script>
import * as sapper from '@sapper/app';
</script>
<nav>
   <div>Boe!</div>
   <button on:click={() => sapper.goto('login')} class="link">Login</button>
   <button on:click={() => sapper.goto('register')} class="link">Register</button>
   <button on:click={() => sapper.goto('newpassword')} class="link">New password</button>
</nav>
