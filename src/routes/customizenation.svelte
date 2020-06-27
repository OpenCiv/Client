<style lang="less">
    @import url("../less/layout.less");

    .flagcontainer {
        display: block;
        position: relative;
        width: 100%;
    }

    .placeholder {
        width: 100%;
        height: auto;
        display: block;
    }

    .playerbanner {
        position: absolute;

        top: 15%;
        left: 25%;
        width: 50%;
        height: 75%;
    }
</style>

<script>
import { onMount } from 'svelte';
import * as sapper from '@sapper/app';
import { alerts, backend, busy } from '../stores';
import Flag from '../components/Flag.svelte';

const { page } = sapper.stores();

// The values received from the server
let user = null;

// The values bound to the inputs
let nationName = 'Finland';
let nationAdjective = 'Finnish';

// Values indicating whether the properties are in edit mode
let editNationName = false;
let editNationAdjective = false;

// Refreshes on mount
// If a token is passed as URL parameter, it is sent to the backend to verify the user's e-mail address
onMount(async () => {
   await refresh();
   //nationName = user.nationName;
   //nationAdjective = user.nationAdjective;
   /* if ($page.query.token && !user.verified) {
      let success = await backend('account/verify', { token: $page.query.token });
      alerts.add(success ? 'Your account is now verified' : 'Verification failed');
      if (success) {
         sapper.goto('menu', { replace: true });
      }
   } */
});

/**
 * Gets the user's details
 */
async function refresh() {
   user = await backend('account/getuser');
}

/**
 * Changes the name of the nation
 */
async function onChangeNationName() {
   //let result = await backend('account/changename', { name });
   let result = 'Nation name changed!';
   editNationName = false;
   if (result === true) {
      user.nationName = nationName;
      user = user;
   } else {
      alerts.add(result);
      refresh();
   }
}

/**
 * Changes the adjective of the nationality
 */
async function onChangeNationAdjective() {
   //let result = await backend('account/changename', { name });
   let result = 'Nation adjective changed!';
   editNationAdjective = false;
   if (result === true) {
      user.nationAdjective = nationAdjective;
      user = user;
   } else {
      alerts.add(result);
      refresh();
   }
}

/**
 * Resets the displayed nation name to the current
 */
function cancelNationName(event) {
   if (event.key === 'Escape') {
      nationName = 'Finland';
      editNationName = false;
   }
}

/**
 * Resets the displayed nation adjective to the current
 */
function cancelNationAdjective(event) {
   if (event.key === 'Escape') {
      nationAdjective = 'Finnish';
      editNationAdjective = false;
   }
}

</script>

<div class="menuwrapper">
    <img src="../img/branding/prosper_logo.svg" alt="Prosper" class="menulogo">
    <h1>Customize Nation</h1>

    <div class="separator"></div>

    <h2>Identity</h2>
    <!-- Name of the nation -->
    <h3 class="left">Name of the Nation</h3>
    <div class="row">
        <div class="half">
            {#if editNationName}
                <input type=text disabled={$busy} bind:value={nationName} on:change={onChangeNationName} on:keydown={cancelNationName} placeholder="Finland">
            {:else}
                <label><!-- {user.nationName} --></label> 
            {/if}
        </div>
        <div class="half">
            <button class="button" on:click={() => { editNationName = !editNationName; }}>Edit</button>
        </div>
    </div>
    <!-- Adjective -->
    <h3 class="left">Adjective of the Nationality</h3>
    <div class="row">
        <div class="half">
            {#if editNationAdjective}
                <input type=text disabled={$busy} bind:value={nationAdjective} on:change={onChangeNationAdjective} on:keydown={cancelNationAdjective} placeholder="Finnish">
            {:else}
                <label><!-- {user.nationAdjective} --></label> 
            {/if}
        </div>
        <div class="half">
            <button class="button" on:click={() => { editNationAdjective = !editNationAdjective; }}>Edit</button>
        </div>
    </div>

    <div class="separator"></div>

    <h2>National Flag</h2>

    <!-- Flag -->
    <div class="row">
        
        <!-- Flag preview -->
        <div class="third">
            <div class="flagcontainer">
                <img src="../img/1x1-placeholder.png" alt="Placeholder" class="placeholder">
                <div class="playerbanner">
                    <Flag color="gold" icon="celticcross" />
                </div>
            </div>
        </div>
        
        <div class="two-thirds">
            <!-- Flag symbol selection -->
            <h3 class="left">Symbol</h3>
            <select id="flagSymbolSelect" name="flagsymbol">
                <option value="symbol1">Cross</option>
                <option value="symbol2">Rectangle</option>
                <option value="symbol3">Poop</option>
            </select>
            <!-- Flag colour selection -->
            <h3 class="left">Colour Theme</h3>
            <select id="colorSelect" name="color">
                <option value="color1">Cross Cyan</option>
                <option value="color2">Rectangle Red</option>
                <option value="color3">Poop Brown</option>
            </select>
        </div>

    </div>

    <div class="separator"></div>

    <a href="/menu" class="button cancel">Back</a>
</div>