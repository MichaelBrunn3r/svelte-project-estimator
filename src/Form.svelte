<script>
	import materialStore from './material-store.js';

	export let id;
	export let material = '';
	export let price;

	$: submitButtonMode = id ? "edit" : "add";
	$: canSubmit = material && price >= 0;

	function submit(e) {
		if(!canSubmit) return;

		if(submitButtonMode === 'add') {
			materialStore.add(material, price);
		}

		if(submitButtonMode === 'edit') {
			materialStore.edit(id, material, price);
		}

		price = undefined;
		material = '';
		id = undefined;
	}

	function cancel() {
		price = undefined;
		material = '';
		id = undefined;
	}
</script>

<style>
	button {
		margin-left: 8px;
	}

	button:disabled {
		cursor: not-allowed;
	}
</style>

<form on:submit|preventDefault={submit}>
	<fieldset>
		<label for="">Material</label>
		<input type="text" id="materialNameInput" placeholder="Wood, Glue, etc." bind:value={material}>
		<label for="">Price</label>
		<input type="number" id="priceInput" placeholder="Price" min="0" step="any" bind:value={price}>
	</fieldset>

	<button class="float-right" type="submit" disabled={!canSubmit}>{submitButtonMode}</button>

	{#if submitButtonMode === "edit"}
		<button class="float-right" type="button" on:click={cancel}>Cancel</button>
	{/if}
</form>