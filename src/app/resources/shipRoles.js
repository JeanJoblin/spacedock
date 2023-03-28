import { getHullObj, crewQuals } from './genFunctions';
import { hulls, weapons, defenses, fittings, hullsArray, weaponsArray, defensesArray, fittingsArray, fighterWeapons, civWeapons, flakWeapons, hunterDefenses, civDefenses, miltaryDefenses, hunterWeapons, militaryWeapons, } from './tables'

const todo = [
'Cargo',
];

export const shipRoles = {
  pirate: {
    name: 'Pirate',
    driveBase: 1,
    driveUp: 0.25,
    driveMax: 6,
    hulls: Object.keys(hulls).filter((hull) => {
      return getHullObj(hull).class === 'Frigate' || 
      getHullObj(hull).class === 'Cruiser' ||
      getHullObj(hull).class === 'Fighter'
    }).map(hull => getHullObj(hull)),
    weapons:  [...weaponsArray.filter(weapon => weapon.class === "Frigate" || weapon.class === "Fighter"), weapons.SpinalBeamCannon, weapons.MassCannon],
    defenses: [...civDefenses, ...hunterDefenses],
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
    freq: {
      weapon: 0.6,
      defense: 0.4,
    },
  },
  trader: {
    name: 'Trader',
    driveBase: 2,
    driveUp: 0.20,
    driveMax: 4,
    hulls: [hulls.FreeMerchant, hulls.BulkFreighter, hulls.FreeMerchant, hulls.BulkFreighter, hulls.Corvette],
    weapons: [...flakWeapons, ...civWeapons],
    defenses: [...civDefenses],
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
    freq: {
      weapon: 0.15,
      defense: 0.2,
    },
  },
  explorer: {
    name: 'Explorer',
    driveBase: 2,
    driveUp: 0.4,
    driveMax: 5,
    crew: crewQuals,
    hulls: [
      hulls.FreeMerchant,
      hulls.Corvette,
      hulls.HeavyFrigate,
      hulls.PatrolBoat,
    ],
    weapons: [
      ...fighterWeapons,
      weapons.PlasmaBeam,
      weapons.SpinalBeamCannon,
    ],
    defenses: [
      defenses.AugmentedPlating,
      defenses.BurstECMGenerator,
      defenses.AugmentedPlating,
      defenses.PointDefenseLasers,
      defenses.PlanetaryDefenseArray,
    ],
    fittings: [
      fittings.AtmosphericConfiguration,
      fittings.AmphibiousOperation,
      fittings.FuelScoops,
      fittings.FuelBunkers,
      fittings.HydroponicProduction,
      fittings.ShiptenderMount,
      fittings.SurveySensorArray,
      fittings.TractorBeams,
      fittings.MobileFactory,
      fittings.MobileExtractor,
      fittings.Workshop,
      fittings.LuxuryCabins,
      fittings.VehicleTransportFittings,
      fittings.ExtendedMedbay,
      fittings.ExtendedStores,
    ],
    freq: {
      weapon: 0.2,
      defense: 0.15,
    },
  },
  passenger: {
    name: 'Passenger',
    driveBase: 1,
    driveUp: 0.2,
    driveMax: 4,
    hulls: [
      hulls.Shuttle,
      hulls.FreeMerchant,
      hulls.BulkFreighter,
      hulls.Corvette,
    ],
    crew: [
      'low',
      'med',
    ],
    weapons: [
      ...flakWeapons,
      ...civWeapons,
    ],
    defenses: [
      defenses.BoardingCountermeasures,
      defenses.PointDefenseLasers,
      defenses.BurstECMGenerator,
      defenses.FoxerDrones,
    ],
    fittings: [
      fittings.Lifeboats,
      fittings.LuxuryCabins,
      fittings.ExtendedLifeSupport,
      fittings.ColdSleepPods,
      fittings.ExtendedStores,
      fittings.AdvancedNavComputer,
      fittings.ShipBayFighter,
      fittings.AtmosphericConfiguration,
      fittings.CargoSpace,
      fittings.ExodusBay,
    ],
    freq: {
      weapon: 0.15,
      defense: 0.25,
    },
  },
  security: {
    name: 'Security',
    driveBase: 1,
    driveUp: 0.33,
    driveMax: 3,
    hulls: [
      hulls.PatrolBoat,
      hulls.StrikeFighter,
      hulls.HeavyFrigate,
    ],
    crew: [
      'high',
      'packed',
      'med',
    ],
    weapons: [
      ...civWeapons,
      ...hunterWeapons,
      weapons.ReaperBattery,
      weapons.PlasmaBeam,
      weapons.MagSpikeArray,
    ],
    defenses: [
      ...hunterDefenses,
      defenses.BurstECMGenerator,
    ],  
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.Armory,
      fittings.AtmosphericConfiguration,
      fittings.AutotargetingSystem,
      fittings.AutomationSupport,
      fittings.BoardingTubes,
      fittings.ColdSleepPods,
      fittings.ExtendedMedbay,
      fittings.FuelBunkers,
      fittings.Lifeboats,
      fittings.ShiptenderMount,
      fittings.SurveySensorArray,
    ],
    freq: {
      weapon: 0.4,
      defense: 0.25,
    },
  },
  research: {
    name: 'Research',
    driveBase: 1,
    driveUp: 0.35,
    driveMax: 6,
    hulls: [
      hulls.Shuttle,
      hulls.FreeMerchant,
      hulls.Corvette,
    ],
    crew: [
      'low',
      'med',
      'high',
      'fullRange',
    ],
    weapons: [
      ...civWeapons,
    ],
    defenses: [
      ...civDefenses,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.AdvancedLab,
      fittings.AmphibiousOperation,
      fittings.AtmosphericConfiguration,
      fittings.AutomationSupport,
      fittings.ColdSleepPods,
      fittings.ExtendedStores,
      fittings.FuelBunkers,
      fittings.FuelScoops,
      fittings.HydroponicProduction,
      fittings.MobileExtractor,
      fittings.ShipLocker,
      fittings.SurveySensorArray,
      fittings.SmugglersHold,
      fittings.TractorBeams,
      fittings.Workshop,
    ],
    freq: {
      weapon: 0.15,
      defense: 0.15,
    },
  },
  refugee: {
    name: 'Refugee',
    driveBase: 1,
    driveUp: 0.18,
    driveMax: 6,
    hulls: [
      hulls.Shuttle,
      hulls.FreeMerchant,
      hulls.Corvette,
      hulls.BulkFreighter,
    ],
    crew: [
      'low',
      'skeleton',
      'packed',
      'high',
    ],
    weapons: [
      ...civWeapons,
    ],
    defenses: [
      ...civDefenses,
    ],
    fittings: [
      fittings.AtmosphericConfiguration,
      fittings.ColdSleepPods,
      fittings.ExodusBay,
      fittings.ExtendedLifeSupport,
      fittings.FuelBunkers,
      fittings.FuelScoops,
      fittings.SensorMask,
    ],
    freq: {
      weapon: 0.1,
      defense: 0.1,
    },
  },
  colony: {
    name: 'Colony',
    driveBase: 1,
    driveUp: 0.33,
    driveMax: 3,
    hulls: [
      hulls.BulkFreighter,
      hulls.Carrier,
      hulls.Corvette,
    ],
    crew: [
      'low',
      'skeleton',
      'packed',
      'high',
    ],
    weapons: [
      ...flakWeapons,
    ],
    defenses: [
      ...civDefenses,
      defenses.PointDefenseLasers,
      defenses.AugmentedPlating,
      defenses.BurstECMGenerator,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.AutomationSupport,
      fittings.ColdSleepPods,
      fittings.ColonyCore,
      fittings.ExodusBay,
      fittings.ExtendedLifeSupport,
      fittings.ExtendedMedbay,
      fittings.ExtendedStores,
      fittings.FuelBunkers,
      fittings.LuxuryCabins,
      fittings.MobileFactory,
      fittings.VehicleTransportFittings,
      fittings.ShipBayFighter,
      fittings.SurveySensorArray,
    ],
    freq: {
      weapon: 0.1,
      defense: 0.1,
    },
  },
  mining: {
    name: 'Mining',
    driveBase: 1,
    driveUp: 0.15,
    driveMax: 4,
    hulls: [
      hulls.FreeMerchant,
      hulls.Shuttle,
      hulls.BulkFreighter,
    ],
    crew: [
      'skeleton',
      'low',
      'med',
    ],
    weapons: [
      ...civWeapons,
      weapons.MultifocalLaser,
      weapons.PlasmaBeam,
    ],
    defenses: [
      defenses.AugmentedPlating,
      defenses.PointDefenseLasers,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.CargoLighter,
      fittings.ColdSleepPods,
      fittings.ExtendedMedbay,
      fittings.FuelScoops,
      fittings.MobileExtractor,
      fittings.MobileFactory,
      fittings.ShipLocker,
      fittings.SurveySensorArray,
      fittings.TractorBeams,
    ],
    freq: {
      weapon: 0.15,
      defense: 0.2,
    },
  },
  salvage: {
    name: 'Salvage',
    driveBase: 1,
    driveUp: 0.125,
    driveMax: 4,
    hulls: [
      hulls.FreeMerchant,
      hulls.BulkFreighter,
      hulls.BulkFreighter,
    ],
    crew: [
      'low',
      'med',
    ],
    weapons: [
      ...civWeapons,
      ...flakWeapons,
    ],
    defenses: [
      ...civDefenses,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.AutomationSupport,
      fittings.BoardingTubes,
      fittings.CargoLighter,
      fittings.ExtendedMedbay,
      fittings.FuelBunkers,
      fittings.FuelScoops,
      fittings.Lifeboats,
      fittings.ShiptenderMount,
      fittings.TractorBeams,
      fittings.SmugglersHold,
      fittings.Armory,
      fittings.ShipLocker,
      fittings.SurveySensorArray,
    ],
    freq: {
      weapon: 0.2,
      defense: 0.1,
    },
  },
  smuggler: {
    name: 'Smuggler',
    driveBase: 1,
    driveUp: 0.4,
    driveMax: 4,
    hulls: [
      hulls.Shuttle,
      hulls.FreeMerchant,
      hulls.BulkFreighter,
      hulls.Corvette,
    ],
    crew: [
      'low',
      'med',
      'skeleton',
    ],
    weapons: [
      ...civWeapons,
    ],
    defenses: [
      ...civDefenses,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.AtmosphericConfiguration,
      fittings.CargoLighter,
      fittings.EmissionsDampers,
      fittings.SensorMask,
      fittings.SmugglersHold,
    ],
    freq: {
      weapon: 0.125,
      defense: 0.15,
    },
  },
  courier: {
    name: 'Courier',
    driveBase:  2,
    driveUp: 0.25,
    driveMax: 5,
    hulls: [
      hulls.StrikeFighter,
      hulls.FreeMerchant,
      hulls.PatrolBoat,
    ],
    crew: [
      'low',
      'skeleton',
      'med',
    ],
    weapons: [
      
    ],
    defenses: [
      ...civDefenses,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.FuelScoops,
      fittings.FuelBunkers,
      fittings.AtmosphericConfiguration,
      fittings.LuxuryCabins,
    ],
    freq: {
      weapon: 0.125,
      defense: 0.15,
    },
  },
  yacht: {
    name: 'Yacht',
    driveBase:  1,
    driveUp: 0.2,
    driveMax: 6,
    hulls: [
      ...hullsArray.filter(hull => (hull.class === 'Frigate' || hull.class === 'Cruiser') && hull.name !== 'Small Station'),
    ],
    crew: [
      'low',
      'skeleton',
      'med',
    ],
    weapons: [
      ...civWeapons,
    ],
    defenses: [
      ...civDefenses,
    ],
    fittings: [
      fittings.LuxuryCabins,
      fittings.AdvancedLab,
      fittings.AdvancedNavComputer,
      fittings.AtmosphericConfiguration,
      fittings.HydroponicProduction,
      fittings.Lifeboats,
      fittings.SmugglersHold,
      fittings.Workshop,
    ],
    freq: {
      weapon: 0.05,
      defense: 0.1,
    },
  },
  militarytransport: {
    name: 'Military Transport',
    driveBase: 2,
    driveUp: 0.3,
    driveMax: 4,
    hulls: [
      hulls.HeavyFrigate,
      hulls.FleetCruiser,
      hulls.Carrier,
    ],
    crew: [
      'high',
      'packed',
    ],
    weapons: [
      ...civWeapons,
      ...hunterWeapons,
    ],
    defenses: [
      ...miltaryDefenses,
      ...hunterDefenses,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.Armory,
      fittings.AtmosphericConfiguration,
      fittings.ColdSleepPods,
      fittings.ColonyCore,
      fittings.EmissionsDampers,
      fittings.ExodusBay,
      fittings.DropPod,
      fittings.FuelBunkers,
      fittings.VehicleTransportFittings,
      fittings.ShipBayFighter,
      fittings.ShipBayFrigate,
      fittings.SurveySensorArray,
      fittings.ShiptenderMount,
    ],
    freq: {
      weapon: 0.2,
      defense: 0.3
    },
  },
  racer: {
    name: 'Racer',
    driveBase:  3,
    driveUp:  0.2,
    driveMax: 6,
    hulls: [
      hulls.StrikeFighter,
      hulls.PatrolBoat,
    ],
    crew: [
      'low',
      'med',
      'skeleton',
    ],
    weapons: [
      
    ],
    defenses: [
  
    ],
    fittings: [
      fittings.FuelBunkers,
      fittings.AutomationSupport,
      fittings.AtmosphericConfiguration,
    ],
    freq: {
      weapon: 0,
      defense: 0,
    },
  },
  warship: {
    name: 'Warship',
    driveBase: 2,
    driveUp: 0.3,
    driveMax: 4,
    hulls: [
      hulls.StrikeFighter,
      hulls.Corvette,
      hulls.HeavyFrigate,
      hulls.FleetCruiser,
      hulls.Battleship,
    ],
    crew: [
      'high',
      'packed',
    ],
    weapons: [
      ...militaryWeapons,
      ...hunterWeapons,
      weapons.MassCannon,
      weapons.Gravcannon,
      weapons.VortexTunnelInductor,
      weapons.SmartCloud,
      weapons.LightningChargeMantle,
      weapons.SpinalBeamCannon,
      weapons.FractalImpactCharge,
      weapons.TorpedoLauncher,
      weapons.ChargedParticleCaster,
    ],
    defenses: [
      ...miltaryDefenses,
      defenses.AblativeHullCompartments,
      defenses.BoardingCountermeasures,
      defenses.FoxerDrones,
      defenses.HardenedPolyceramicOverlay,
    ],
    fittings: [
      fittings.AdvancedNavComputer,
      fittings.Armory,
      fittings.AutotargetingSystem,
      fittings.BoardingTubes,
      fittings.ColdSleepPods,
      fittings.DropPod,
      fittings.ExtendedMedbay,
      fittings.ExtendedStores,
      fittings.Lifeboats,
      fittings.MobileFactory,
      fittings.ShipBayFighter,
      fittings.ShipBayFrigate,
      fittings.ShiptenderMount,
      fittings.SurveySensorArray,
      fittings.VehicleTransportFittings,
    ],
    freq: {
      weapon: 0.5,
      defense: 0.6,
    },
  },
  bountyhunter: {
    name: 'Bounty Hunter',
    driveBase:  1,
    driveUp: 0.33,
    driveMax: 3,
    hulls: [
      hulls.StrikeFighter,
      hulls.Corvette,
      hulls.HeavyFrigate,
      hulls.FleetCruiser,
    ],
    crew: [
      'low',
      'med',
      'high',
    ],
    weapons: [
      ...hunterWeapons,
      weapons.ReaperBattery,
      weapons.TorpedoLauncher,
      weapons.FractalImpactCharge,
      weapons.ChargedParticleCaster,
      weapons.SpinalBeamCannon,
      weapons.MassCannon,
    ],
    defenses: [
      ...hunterDefenses,
      defenses.FoxerDrones,
      defenses.HardenedPolyceramicOverlay,
      defenses.BurstECMGenerator,
    ],
    fittings: [
      fittings.Armory,
      fittings.AdvancedNavComputer,
      fittings.AutotargetingSystem,
      fittings.AutomationSupport,
      fittings.BoardingTubes,
      fittings.EmissionsDampers,
      fittings.ColdSleepPods,
    ],
    freq: {
      weapon: 0.4,
      defense: 0.6,
    },
  },
};

/*
const template = 
{
  name:
  driveBase:
  driveUp:
  hulls: [

  ],
  crew: [

  ],
  weapons: [

  ],
  defenses: [

  ],
  fittings: [

  ],
  freq: {
    weapon:
    defense:
  },
}
*/