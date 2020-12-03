<script>
	import Table from './Table.svelte';
	import Form from './Form.svelte';

	let id;
	let material = '';
	let price;

	function edit(e) {
		({ id, material, price } = e.detail);
	}
</script>

<style>
	main {
		flex: 1;
		align-content: center;
		justify-content: center;
		width: 80%;
		margin: 0 auto;
	}
</style>

<main>
	<h1>Project Estimator</h1>
	<Form bind:id bind:material bind:price/>
	<Table on:edit={edit}/>
</main>