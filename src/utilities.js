export const imgFolder = {
   group: 'actions',
   build: 'improvements'
}

export function capitalize(value, restLower = false) {
   let result = value.slice(0, 1).toUpperCase();
   let rest = value.slice(1);
   if (restLower) {
      rest = rest.toLowerCase();
   }

   return result + rest;
}
