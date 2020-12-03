<script>
	import { createEventDispatcher } from 'svelte';
import { exclude_internal_props } from 'svelte/internal';
	import materialStore from './material-store.js';

	const dispatch = createEventDispatcher();

	let materials = [];

	materialStore.subscribe(items => {
		materials = items;
	})

	const formatter = new Intl.NumberFormat('de-DE',{
		style: 'currency',
		currency: 'EUR'
	});

	$: total = materials.reduce((acc, current) => acc+current.price, 0);

	function edit(id, material, price) {
		dispatch('edit', {id, material, price});
	}
</script>

<style>
	table {
		width: 100%;
	}
	tr {
		cursor: pointer;
	}
</style>

<h1>Total: {formatter.format(total)}</h1>
<table class="primary">
	<thead>
		<tr>
			<th>Material</th>
			<th>Price</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each materials as material (material.id)}
			<tr on:click={edit(material.id, material.material, material.price)}>
				<td>{material.material}</td>
				<td>{formatter.format(material.price)}</td>
				<td>
					<i class="far fa-trash-alt"></i>
				</td>
			</tr>
		{/each}
		<tr>
			<td><b>Total</b></td>
			<td colspan="2"><b>{formatter.format(total)}</b></td>
		</tr>
	</tbody>
</table>