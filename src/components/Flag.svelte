<script>
import { Colors } from '../utilities';

// The icon or symbol displayed in the flag
export let icon;

// The color of the flag
export let color;
</script>

<style>
   /* Somehow color iconparts based on this */
   [data-name="iconpart"] {
      fill: aqua;
   }
</style>

<!-- Different icons -->
<g id="nordiccross"><g id="iconpart"><polygon points="64 33 39 33 39 0 25 0 25 33 0 33 0 47 25 47 25 96 39 96 39 47 64 47 64 33"/></g></g>
<g id="americanstar"><polygon id="iconpart-2" data-name="iconpart" points="32 18.61 38.3 31.38 52.38 33.42 42.19 43.36 44.6 57.39 32 50.76 19.4 57.39 21.81 43.36 11.62 33.42 25.7 31.38 32 18.61"/></g>
<g id="starandcrescent"><g id="starandcrescent-2" data-name="starandcrescent"><path id="iconpart-3" data-name="iconpart" d="M29.64,20.22a16.58,16.58,0,1,0,20.86,25,19.42,19.42,0,1,1-20.86-25Z"/><polygon id="iconpart-4" data-name="iconpart" points="42.93 20.7 45.58 26.06 51.5 26.92 47.21 31.1 48.23 37 42.93 34.22 37.63 37 38.64 31.1 34.36 26.92 40.28 26.06 42.93 20.7"/></g></g>
<g id="risingsun"><circle id="iconpart-5" data-name="iconpart" cx="32" cy="39.5" r="17.5"/></g>
<g id="verticalstripe"><g id="iconpart-6" data-name="iconpart"><rect x="21" width="22" height="96"/></g></g>
<g id="saintgeorge"><g id="iconpart-7" data-name="iconpart"><polygon points="64 35 37 35 37 0 27 0 27 35 0 35 0 45 27 45 27 96 37 96 37 45 64 45 64 35"/></g></g>
<g id="saintjohn"><polygon id="iconpart-8" data-name="iconpart" points="46.49 35 36 35 36 21.75 42.01 16 21.99 16 28 21.75 28 35 17.51 35 12 29.14 12 35 12 43 12 49.17 17.79 43 28 43 28 65.25 21.99 71 42.01 71 36 65.25 36 43 46.21 43 52 49.17 52 43 52 35 52 29.14 46.49 35"/></g>
<g id="celticcross"><g id="celticcross-2" data-name="celticcross"><g id="iconpart-9" data-name="iconpart"><polygon points="54 33.85 35.99 33.85 35.99 13.56 28 13.56 28 33.85 10 33.85 10 41.84 28 41.84 28 71 35.99 71 35.99 41.84 54 41.84 54 33.85"/></g><path id="iconpart-10" data-name="iconpart" d="M32,22A16,16,0,1,0,48,38,16,16,0,0,0,32,22Zm0,27A11,11,0,1,1,43,38,11,11,0,0,1,32,49Z"/></g></g>
<g id="teutonicorder"><g id="iconpart-11" data-name="iconpart"><polygon points="64 29 37 36 44 0 20 0 27 36 0 29 0 51 27 44 18 96 46 96 37 44 64 51 64 29"/></g></g>
<g id="divided"><g id="iconpart-12" data-name="iconpart"><rect x="32" width="32" height="96"/></g></g>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" preserveAspectRatio="none">
   <!-- The fill of this polygon should be adjusted to be player's primary color. -->
   <polygon fill={Colors.getPrimaryColor(color)} points="0,0 100,0 100,110 50,130 0,110"/>

   <!-- The fill of this polygon should be adjusted to be player's secondary color. -->
   <polygon fill={Colors.getSecondaryColor(color)} points="0,0 100,0 100,9.375 0,9.375"/>

   <!-- Icon is used with its id -->
   <use href="#{icon}" />

   <!-- <svg xmlns="http://www.w3.org/2000/svg">
      {#if icon="celticcross"}
         <path fill={secondary} d="m54 33.85h-18.01v-20.29h-7.99v20.29h-18v7.99h18v29.16h7.99v-29.16h18.01z"/><path fill={secondary} d="m32 22a16 16 0 1 0 16 16 16 16 0 0 0 -16-16zm0 27a11 11 0 1 1 11-11 11 11 0 0 1 -11 11z"/>
      {:else if icon="americanstar"}
         <path fill={secondary} d="m32 18.61 6.3 12.77 14.08 2.04-10.19 9.94 2.41 14.03-12.6-6.63-12.6 6.63 2.41-14.03-10.19-9.94 14.08-2.04z"/>
      {:else}
         <path fill={Colors.getSecondaryColor(color)} d="m32 0h32v81h-32z"/>
      {/if}
   </svg> -->
</svg>
