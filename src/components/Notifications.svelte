<style lang="less">
   @import url("../less/layout.less");

   .iconbutton, .iconbutton:visited, .iconbutton:hover {
      height: 36px;
      width: 36px;
      min-height: 36px;
      min-width: 36px;
      box-sizing: border-box;
      padding: 0px;
      border-color: @color_text;
      color: @color_negatext;
      background-color: darken(@color_text,10%);
      letter-spacing: 0px;
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
