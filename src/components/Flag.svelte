<script>
export let primary;
export let secondary;
export let icon;

const celticcross = '<path d="m53 33.85h-17.01v-19.29h-7.99v19.29h-17v7.99h17v26.6h7.99v-26.6h17.01z"/><path d="m32 22a16 16 0 1 0 16 16 16 16 0 0 0 -16-16zm0 25.85a9.85 9.85 0 1 1 9.85-9.85 9.85 9.85 0 0 1 -9.85 9.85z"/>';
</script>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
   <!-- The fill of this polygon should be adjusted to be player's primary color. -->
   <polygon fill={primary} points="0,0 100,0 100,110 50,130 0,110"/>

   <!-- The fill of this polygon should be adjusted to be player's secondary color. -->
   <polygon fill={secondary} points="0,0 100,0 100,9.375 0,9.375"/>

   <!-- Player custom icon, to be also filled with secondary color -->
   <svg xmlns="http://www.w3.org/2000/svg">
      {#if icon="celticcross"}
         <path fill={secondary} d="m54 33.85h-18.01v-20.29h-7.99v20.29h-18v7.99h18v29.16h7.99v-29.16h18.01z"/><path fill={secondary} d="m32 22a16 16 0 1 0 16 16 16 16 0 0 0 -16-16zm0 27a11 11 0 1 1 11-11 11 11 0 0 1 -11 11z"/>
      {:else if icon="americanstar"}
         <path fill={secondary} d="m32 18.61 6.3 12.77 14.08 2.04-10.19 9.94 2.41 14.03-12.6-6.63-12.6 6.63 2.41-14.03-10.19-9.94 14.08-2.04z"/>
      {:else} <!-- divided -->
         <path fill={secondary} d="m32 0h32v81h-32z"/>
      {/if}
   </svg>
</svg>
