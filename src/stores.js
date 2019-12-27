import { writable } from 'svelte/store';
import axios from 'axios';
import * as sapper from '@sapper/app';

export const alerts = createAlerts();
export const selected = writable(null);
export const busy = writable(false);

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
            sapper.goto('/menu');
         } else {
            alerts.add(error.response.data || 'An unknown network error occurred');
         }
      }
      else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         // http.ClientRequest in node.js
         alerts.add('No response from the server');
         console.log(error.request);
      }
      else {
         // Something happened in setting up the request that triggered an Error
         alerts.add('An unknown error occurred');
         console.log('Error: ', error.message);
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
