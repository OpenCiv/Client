<script>
import Alerts from '../components/Alerts.svelte';
</script>

<svelte:head>
	<title>Open Civ</title>
</svelte:head>

<!-- This will prevent the content menu to be displayed anywhere -->
<svelte:window on:contextmenu|preventDefault/>

<!-- The application content -->
<slot/>

<!-- Alerts are shown everywhere -->
<Alerts/>
