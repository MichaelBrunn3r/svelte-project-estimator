<script>
	import materialStore from './material-store.js';

	let materials = [];

	materialStore.subscribe(items => {
		materials = items;
	})

	const formatter = new Intl.NumberFormat('de-DE',{
		style: 'currency',
		currency: 'EUR'
	});

	$: total = materials.reduce((acc, current) => acc+current.price, 0);
</script>

<style>
	table {
		width: 100%;
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
			<tr>
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