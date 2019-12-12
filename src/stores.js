import { writable } from 'svelte/store';

export const alerts = writable([]);
export const selected = writable(null);
export const verified = writable(false);
