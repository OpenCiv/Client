<style lang="less">
   #notifications-container {
      width: auto;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      margin: 0 12px 12px 12px;

      #notifications {
         height: max-content;
      
         p {
            line-height: 110%;
            margin: 1em 0 1.2em 0;
         }

         h3 {
            border-top: 1px #888 solid;
            padding-top: 6px;
            margin: 1.5em 0 1.2em 0;
         }

         h3:first-of-type {
            margin-top: 0;
            border-top: 0 transparent none;
         }
      }
   }
</style>

<script>
import { createEventDispatcher } from 'svelte';

export let innerHeight;

const dispatch = createEventDispatcher();

function close() {
   dispatch('close');
}
</script>
<div id="sidebar-left" style="height: {innerHeight - 170}px;">
   <button class="hyperlink closewindow" title="Close" on:click={close}>
      <img class="tiny-icon" src="img/menuicons/close.svg" alt="Close window">
   </button>
   <div id="notifications-container">
      <div id="notifications">
         <h3>Turn 240 - 1100 AD</h3>
         <p><img class="tiny-icon" src="img/resources/science.svg" alt="Science"> Your civilization discovered Bronze Working! Research has now been focused on Siege Warfare.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/improvements/temple.svg" alt="Temple"> A Temple was build to 14, 24.</p>
         <p><img class="tiny-icon" src="img/menuicons/playerflag.svg" alt="Unit"> Your unit arrived to 12, 22.</p>
         <p><img class="tiny-icon" src="img/vegetation/forest.svg" alt="Forest"> A Forest has grown to 12, 23.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <h3>Turn 240 - 1100 AD</h3>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <h3>Turn 240 - 1100 AD</h3>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
         <p><img class="tiny-icon" src="img/menuicons/error.svg" alt="Error"> Something happened.</p>
      </div>
   </div>
</div>
