import { statics } from './stores';

const neutral = '#A0A0A0';

export function getPlayerFromUnit(unit) {
   return statics.players.find(p => p.id === unit.player_id);
}

export class Colors {
   static getPrimaryColor(name) {
      switch (name) {
         case 'gold': return '#F2D346';
         default: return neutral;
      }
   }

   static getSecondaryColor(name) {
      switch (name) {
         case 'gold': return '#FFEC96';
         default: return neutral;
      }
   }

   static getUnitPrimaryColor(unit) {
      const player = getPlayerFromUnit(unit);
      return player ? Colors.getPrimaryColor(player.color) : neutral;
   }

   static getUnitSecondaryColor(unit) {
      const player = getPlayerFromUnit(unit);
      return player ? Colors.getSecondaryColor(player.color) : neutral;
   }
}

export function capitalize(value, restLower = false) {
   if (typeof value !== 'string') {
      return null;
   }

   let result = value.slice(0, 1).toUpperCase();
   let rest = value.slice(1);
   if (restLower) {
      rest = rest.toLowerCase();
   }

   return result + rest;
}
