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

export default {
	subscribe: materialStore.subscribe,
	add
}