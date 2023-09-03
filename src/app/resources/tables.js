export const hulls = require('../../app/resources/hulls.json');
export const fittings = require('../../app/resources/fittings.json');
export const defenses = require('../../app/resources/defenses.json');
export const weapons = require('../../app/resources/weapons.json');
export const stationHulls = require('../../app/resources/stations.json');

const tables = {
  hulls: hulls,
  fittings: fittings,
  weapons: weapons,
  defenses: defenses,
};

export const hullsArray = Object.keys(hulls).map(hull => hulls[hull]);
export const weaponsArray = Object.keys(weapons).map(weapon => weapons[weapon]);
export const defensesArray = Object.keys(defenses).map(defense => defenses[defense]);
export const fittingsArray = Object.keys(fittings).map(fittings => fittings[fittings]);

export const planetaryInterface = {
  Fighter: ['AtmosphericConfiguration', 'AmphibiousOperation',],
  Frigate: ['AtmosphericConfiguration', 'AmphibiousOperation', 'CargoLighter'],
  Cruiser: ['CargoLighter', 'ShipBayFighter',],
  Capital: ['CargoLighter', 'ShipBayFighter', 'ShipBayFrigate',],
}

export const fighterWeapons = weaponsArray.filter(weapon => weapon.class === 'Fighter' && weapon.techlevel !== 5);
export const flakWeapons = [
  weapons.Sandthrower,
  weapons.FlakEmitterBattery,
  weapons.MagSpikeArray,
];
export const civWeapons = [
  weapons.MultifocalLaser,
  weapons.Sandthrower,
  weapons.FlakEmitterBattery,
];
export const civDefenses = [
  defenses.AugmentedPlating,
  defenses.BurstECMGenerator,
  defenses.FoxerDrones,
  defenses.PointDefenseLasers
];
export const hunterDefenses = [
  defenses.BoardingCountermeasures,
  defenses.FoxerDrones,
  defenses.GravEddyDisplacer,
  defenses.HardenedPolyceramicOverlay,
  defenses.PointDefenseLasers,
];
export const miltaryDefenses = [
  defenses.AblativeHullCompartments,
  defenses.AugmentedPlating,
  defenses.BoardingCountermeasures,
  defenses.FoxerDrones,
  defenses.GravEddyDisplacer,
  defenses.HardenedPolyceramicOverlay,
  defenses.PointDefenseLasers,
];
export const hunterWeapons = [
  weapons.MultifocalLaser,
  weapons.ReaperBattery,
  weapons.TorpedoLauncher,
  weapons.ChargedParticleCaster,
  weapons.MagSpikeArray,
  weapons.PlasmaBeam,
  weapons.SpinalBeamCannon,
];
export const militaryWeapons = [
  weapons.FractalImpactCharge,
  weapons.TorpedoLauncher,
  weapons.ChargedParticleCaster,
  weapons.MagSpikeArray,
  weapons.Gravcannon,
  weapons.MassCannon,
];

export const drives = {
  1: fittings.SpikeDrive1,
  2: fittings.SpikeDrive2,
  3: fittings.SpikeDrive3,
  4: fittings.SpikeDrive4,
  5: fittings.SpikeDrive5,
  6: fittings.SpikeDrive6,
}

export default tables;
