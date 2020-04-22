import { players } from './stores';

export const imgFolder = {
   group: 'actions',
   build: 'improvements'
}

export function getPlayerFromUnit(unit) {
   let player;
   players.subscribe(all => player = all.find(p => p.id === unit.player_id))();
   return player;
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

   static getUnitPrimaryColor(unit) {
      return Colors.getPrimaryColor(getPlayerFromUnit(unit).color);
   }

   static getUnitSecondaryColor(unit) {
      return Colors.getSecondaryColor(getPlayerFromUnit(unit).color);
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
