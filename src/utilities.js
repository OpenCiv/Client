export const imgFolder = {
   group: 'actions',
   build: 'improvements'
}

export class Colors {
   static getPrimaryColor(name) {
      switch (name) {
         case 'gold': return "#F2D346";
         default: return "#808080";
      }
   }
   
   static getSecondaryColor(name) {
      switch (name) {
         case 'gold': return "#FFEC96";
         default: return "#808080";
      }
   }
}

export function capitalize(value, restLower = false) {
   let result = value.slice(0, 1).toUpperCase();
   let rest = value.slice(1);
   if (restLower) {
      rest = rest.toLowerCase();
   }

   return result + rest;
}
