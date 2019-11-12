<script>
import { Router, Route, Link } from 'svelte-routing';
import Login from './Login.svelte';
import Register from './Register.svelte';
import NewPassword from './NewPassword.svelte';
import Unverified from './Unverified.svelte';
</script>
<Router>
   <nav>
      <Link to="login">Log in</Link>
      <Link to="register">Register</Link>
      <Link to="newpassword">New password</Link>
   </nav>
   <div>
      <Route path="login" component="{Login}"/>
      <Route path="register" component="{Register}"/>
      <Route path="newpassword" component="{NewPassword}"/>
      <Route path="unverified" component="{Unverified}"/>
   </div>
</Router>