import { writable } from 'svelte/store';

let alertCount = 0;

function createAlerts() {
   const { subscribe, update } = writable([]);

   return {
      subscribe,
      add: message => update(a => [...a, { id: alertCount++, message }]),
      remove: id => update(a => a = a.filter(m => m.id !== id))
   };
}

export const alerts = createAlerts();
export const selected = writable(null);
export const verified = writable(false);
