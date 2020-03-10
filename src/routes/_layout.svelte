<script>
import Alerts from '../components/Alerts.svelte';
</script>

<svelte:head>
	<title>Open Civ</title>
</svelte:head>

<!-- <svelte:window on:contextmenu|preventDefault/> -->

<slot/>
<Alerts/>
