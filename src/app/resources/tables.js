export const hulls = require('../../app/resources/hulls.json');
export const fittings = require('../../app/resources/fittings.json');
export const defenses = require('../../app/resources/defenses.json');
export const weapons = require('../../app/resources/weapons.json');

const tables = {
  hulls: hulls,
  fittings: fittings,
  weapons: weapons,
  defenses: defenses,
};


export const weaponsArray = Object.keys(weapons).map(weapon => weapons[weapon]);
export const defensesArray = Object.keys(defenses).map(defense => defenses[defense]);
export const fittingsArray = Object.keys(fittings).map(fittings => fittings[fittings]);

export default tables;
