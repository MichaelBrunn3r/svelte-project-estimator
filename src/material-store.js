import { writable } from 'svelte/store';

const storageKey = 'materials';
const materialStore = writable([]);

// Load material store from local storage
if(localStorage.getItem(storageKey)) {
	materialStore.set(JSON.parse(localStorage.getItem(storageKey)));
}

// Update local storage if material store changed
materialStore.subscribe(items => {
	localStorage.setItem(storageKey, JSON.stringify(items));
})

const add = (material, price) => {
	materialStore.update((items) => {
		const item = {
			material,
			price,
			id: new Date().getTime()
		}
		return [item, ...items];
	})
}

const edit = (id, material, price) => {
	materialStore.update(items => {
		const idx = items.findIndex(item => item.id === id);
		items[idx].material = material;
		items[idx].price = price;

		return items;
	})
}

export default {
	subscribe: materialStore.subscribe,
	add,
	edit
}