<script>
export let primary;
export let secondary;
// export let icon;

const celticcross = '<path d="m53 33.85h-17.01v-19.29h-7.99v19.29h-17v7.99h17v26.6h7.99v-26.6h17.01z"/><path d="m32 22a16 16 0 1 0 16 16 16 16 0 0 0 -16-16zm0 25.85a9.85 9.85 0 1 1 9.85-9.85 9.85 9.85 0 0 1 -9.85 9.85z"/>';
</script>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
   <!-- The fill of this polygon should be adjusted to be player's primary color. -->
   <polygon fill={primary} points="0,0 100,0 100,100 50,120 0,100"/>

   <!-- The fill of this polygon should be adjusted to be player's secondary color. -->
   <polygon fill={secondary} points="0,0 100,0 100,12.5 0,12.5"/>

   <!-- Player custom icon, to be also filled with secondary color -->
   <svg viewBox="0 0 64 80" xmlns="http://www.w3.org/2000/svg">
      {@html celticcross}
   </svg>
</svg>
