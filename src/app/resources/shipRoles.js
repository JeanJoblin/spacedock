import { getHullObj } from './genFunctions';
import { hulls, weapons, defenses, fittings, weaponsArray, defensesArray, fittingssArray } from './tables'


const pirate = {
  driveBase: 1,
  driveUp: 0.25,
  hulls: Object.keys(hulls).filter((hull) => {
    return getHullObj(hull).class === 'Frigate' || 
    getHullObj(hull).class === 'Cruiser'
  }).map(hull => getHullObj(hull)),
  weapons: weaponsArray.filter(weapon => weapon.class === "Frigate" || weapon.class === "Fighter"),
  defenses: [defenses.FoxerDrones, defenses.BurstECMGenerator, defenses.PointDefenseLasers],
  fittings: [
    fittings.ExtendedStores,
    fittings.FuelScoops,
    fittings.Armory,
    fittings.BoardingTubes,
    fittings.SmugglersHold,
    fittings.SensorMask,
    fittings.CargoSpace
  ],
  crew: ['packed', 'high', 'low', 'skeleton',],
  //percentage frequency for a weapon. Then percentage of the remainder that should be defenses
  freq: [0.6, 0.4],
};
const trader = {
  driveBase: 2,
  driveUp: 0.20,
  hulls: [hulls.FreeMerchant, hulls.BulkFreighter,],
  weapons: [weapons.MultifocalLaser, weapons.Sandthrower],
  defenses: [defenses.FoxerDrones, defenses.PointDefenseLasers],
  fittings: [
    fittings.AdvancedNavComputer,
    fittings.CargoLighter,
    fittings.AutomationSupport,
    fittings.FuelBunkers,
    fittings.ExtendedStores,
    fittings.CargoSpace,
    fittings.CargoSpace
  ],
  crew: ['skeleton', 'low',],
  freq: [0.15, 0.2],
};
const passenger = {

}
const todo = [
'Cargo',
'Passenger',
'BountyHunter',
'Explorer',
'Cop',
'Research',
'Refugee',
'Colony',
'Mining',
'Salvage',
'Smuggler',
'Courier',
'Yacht',
'Racing',
'MilitaryTransport',
'Warship'
];

export const shipRoles = [
  pirate,
  trader,
]