<script>
import { Colors } from '../utilities';
export let icon;
export let color;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
   <!-- The fill of this polygon should be adjusted to be player's primary color. -->
   <polygon fill={Colors.getPrimaryColor(color)} points="0,0 100,0 100,100 50,120 0,100"/>

   <!-- The fill of this polygon should be adjusted to be player's secondary color. -->
   <polygon fill={Colors.getSecondaryColor(color)} points="0,0 100,0 100,12.5 0,12.5"/>

   <!-- Player custom icon, to be also filled with secondary color -->
   <svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
      {#if icon="celticcross"}
         <path fill={Colors.getSecondaryColor(color)} d="m53 33.85h-17.01v-19.29h-7.99v19.29h-17v7.99h17v26.6h7.99v-26.6h17.01z"/><path fill={Colors.getSecondaryColor(color)} d="m32 22a16 16 0 1 0 16 16 16 16 0 0 0 -16-16zm0 25.85a9.85 9.85 0 1 1 9.85-9.85 9.85 9.85 0 0 1 -9.85 9.85z"/>
      {:else if icon="americanstar"}
         <path fill={Colors.getSecondaryColor(color)} d="m32 15.61 6.3 12.77 14.08 2.04-10.19 9.94 2.41 14.03-12.6-6.63-12.6 6.63 2.41-14.03-10.19-9.94 14.08-2.04z"/>
      {:else} <!-- divided -->
         <path fill={Colors.getSecondaryColor(color)} d="m32 0h32v81h-32z"/>
      {/if}
   </svg>
</svg>
