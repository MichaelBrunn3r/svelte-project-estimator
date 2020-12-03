<script>
	export let id;
	export let material = '';
	export let price;

	$: submitButtonMode = id ? "edit" : "add";
	$: canSubmit = material && price >= 0;

	function submit(e) {
		if(!canSubmit) return;

		price = material = '';
		id = undefined;
	}

	function cancel() {
		price = material = '';
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