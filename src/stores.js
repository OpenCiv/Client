import { writable } from 'svelte/store';
import axios from 'axios';
import * as sapper from '@sapper/app';

export const alerts = createAlerts();
export const selectedUnit = writable(null);
export const selectedAction = writable(null);
export const busy = writable(false);
export const player = writable(undefined);
export const hoveredTile = writable(null);
export const statics = {
   players: [],
   metadata: null
};

export async function backend (address, request) {
   busy.set(true);
   try {
      let response;
      if (!request) {
         response = await axios.get(address + '.php');
      } else {
         response = await axios.post(address + '.php', JSON.stringify(request));
      }

      busy.set(false);
      return response.data;
   }
   catch (error) {
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         if (error.response.status === 401) {
            sapper.goto('/login');
         }
         else if (error.response.status === 403) {
            alerts.add(error.response.data || 'An unknown error occurred');
            sapper.goto('/menu');
         }
         else if (error.response.status === 500) {
            alerts.add(error.response.statusText);
            console.error(`HTTP status code: ${error.response.status}\nMessage: ${error.response.data}`);
         }
         else {
            alerts.add(error.response.data || 'An unknown error occurred');
         }
      }
      else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         // http.ClientRequest in node.js
         alerts.add('No response from the server');
         console.error(error.request);
      }
      else {
         // Something happened in setting up the request that triggered an Error
         alerts.add('An unknown error occurred');
         console.error(error.message);
         console.log(error.config);
      }

      busy.set(false);
   }
}

let alertCount = 0;

function createAlerts() {
   const { subscribe, update } = writable([]);

   return {
      subscribe,
      add: message => {
         update(a => [...a, { id: ++alertCount, message }]);
         return alertCount;
      },
      remove: id => update(a => a = a.filter(m => m.id !== id))
   };
}
