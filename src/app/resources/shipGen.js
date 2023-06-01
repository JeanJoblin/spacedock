import { weapons, defenses, fittings} from './tables'
import { parseStringCost, correctCostsForClass } from './genFunctions';
import { shipRoles } from './shipRoles';
import { mountable } from '../../features/DryDockConfig/dryDockSlice';

//Making an array of weapons for spread later
const weaponsArray = Object.keys(weapons).map(weapon => weapons[weapon]);

//Ship Generator functions
export const getRandom = (array) => {
  console.log('getting random from ', array);
  let ind = Math.floor(Math.random() * array.length);
  console.log(`Chosen randomly: `, array[ind]);
  return array[ind];
};

export const genShip = (params = {}) => {
  //add params later
  let role;
  let { roleParam, hullParam, crewParam, driveParam } = params;
  console.table(params);
  console.log('Role Param: ', roleParam);
  const cargoLevels = {
    Fighter: 2,
    Frigate: 20,
    Cruiser: 200,
    Capital: 2000,
  };
  console.log('Role Param: ', roleParam);
  if(!roleParam) {
    role = shipRoles[getRandom(Object.keys(shipRoles))];
    console.log('Set role param to: ' );
  } else {
    role = roleParam;
  };
  if(!hullParam) {
    hullParam = getRandom(role.hulls);
  };
  if(!crewParam) {
    crewParam = getRandom(role.crew);
  };
  const hull = hullParam;
  let {mass, power, hardpoints} = hull;
  let cost = parseStringCost(hull);
  //Choose a drive:
  const drives = {
    1: fittings.SpikeDrive1,
    2: fittings.SpikeDrive2,
    3: fittings.SpikeDrive3,
    4: fittings.SpikeDrive4,
    5: fittings.SpikeDrive5,
    6: fittings.SpikeDrive6,
  };
  //Start with role's base (min) drive
  let driveLevel = role.driveBase;
  let allFittings = [];
  let finalDrive = null;
  let cor = {};
  //Roll under driveUp (d100). Success: keep rolling, Fail: Stop rolling.
  if(!hull.name.includes('Station') && !driveParam) {
    do {
      if(Math.random() < role.driveUp) {
        driveLevel++;
        // console.log('upgrading drive to level: ', driveLevel);
      } else if(driveLevel === role.driveMax) {
        // console.log('Hit drive limit. Drive Level: ', driveLevel);
        finalDrive = drives[driveLevel];
      } else {
        // console.log('assigning final drive of level: ', driveLevel);
        finalDrive = drives[driveLevel];
      }
    } while ( finalDrive === null && driveLevel < role.driveMax);
    //Add the upgraded drive to fittings list.
    cor = correctCostsForClass(finalDrive, hull);
    mass -= cor.mass;
    power -= cor.power;
    cost += cor.cost;
    allFittings.push(finalDrive);
  } else if(driveParam) {
    allFittings.push(driveParam);
  };
  let cargoLighter = false;
  //Drive has been selected. Outfit the ship with weapons defenses and fittings.
  const canDupe = [...weaponsArray, defenses.FoxerDrones, fittings.AutotargetingSystem, fittings.CargoLighter, fittings.CargoSpace, fittings.ColdSleepPods, fittings.DropPod, fittings.ExodusBay, fittings.ExtendedStores, fittings.HydroponicProduction, fittings.ShipBayFighter, fittings.ShipBayFrigate, fittings.ShiptenderMount, fittings.SmugglersHold,  ];
  // console.table('mountable: ', mountable);
  // console.log('role.freq: ', role.freq);
  let toAdd = null;
  function filterValidFittings(imp, hull) {
    const validFittings = imp.filter(fitting => {
      let dupe = false;
      if(allFittings.includes(fitting)) {
        if(!canDupe.includes(fitting)) {
          // console.log(`${fitting.name} is already on allFittings list`);
          dupe = true;
        }};
      if(
        (fitting.name === 'Atmospheric Configuration' && allFittings.includes(fittings.AmphibiousOperation)) ||
        (fitting.name === 'Amphibious Operation' && allFittings.includes(fittings.AtmosphericConfiguration))) {
          // console.log('A planetary interface fitting is already equipped');
          dupe = true;
      };
      const req = correctCostsForClass(fitting, hull);
      // console.log('classes mountable by hull class: ', mountable[hull.class]);
      // console.log('fitting class', fitting.class);
      // const validCheck = {
      //   name: fitting.name,
      //   power: req.power <= power,
      //   mass: req.mass <= mass,
      //   mountable: mountable[hull.class].includes(fitting.class),
      //   hardpoints: fitting.hardpoints ? fitting.hardpoints <= hardpoints : 'fitting reqs none',
      //   noDupe: !dupe,
      //   enoughCargo: fitting.name === 'Cargo Lighter' ? cargoLighter : true,
      // }
      // console.table(validCheck);
      return req.power <= power &&
      req.mass <= mass &&
      mountable[hull.class].includes(fitting.class) &&
      !dupe &&
      (fitting.hardpoints ? fitting.hardpoints <= hardpoints : true)&&
      (fitting.name === 'Cargo Lighter' ? cargoLighter : true);
    });
    // console.log('Returning these as valid: ', validFittings);
    return validFittings;
  }
  let retry = 0;
  do {
    // console.log('ENTERED THE DO WHILE');
    let fitting;
    if(Math.random() < role.freq.weapon) {
        // console.log('chosing a weapon');
        fitting = filterValidFittings(role.weapons, hull);
    } else if(Math.random() < role.freq.defense) {
      // fitting = role.defenses.filter(defense => {
        // console.log('CHOOSING A DEFENSE');
        // const req = correctCostsForClass(defense, hull);
        // console.log(`costs corrected for ${hull.name} hull [Mass: ${req.mass} Power: ${req.power}]`);
        // return req.power <= power &&
        // req.mass <= mass &&
        // mountable[hull.class].includes(defense.class);
      // });
      // console.log('Chosing a defense');
      fitting = filterValidFittings(role.defenses, hull);
    } else {
      // fitting = role.fittings.filter(fitting => {
      //   console.log('CHOOSING A FITTING');
      //   const req = correctCostsForClass(fitting, hull);
      //   return req.power <= power &&
      //   req.mass <= mass &&
      //   mountable[hull.class].includes(fitting.class);
      // });
      // console.log('Choosing a fitting');
      fitting = filterValidFittings(role.fittings, hull);
    };
    // console.log('fitting array ', fitting);
    toAdd = getRandom(fitting);
    if(toAdd !== undefined) {
      // console.log('toAdd:', toAdd);
      cor = correctCostsForClass(toAdd, hull);
      mass -= cor.mass;
      power -= cor.power;
      // console.log('cost: ', cost);
      // console.log('corrected fitting cost: ', cor.cost);
      cost += cor.cost;
      if(toAdd.hardpoints !== undefined) {
        hardpoints -= toAdd.hardpoints;
      }
      allFittings.push(toAdd);
      let cargoSpace = allFittings.filter(fitting => fitting.name === 'Cargo Space').length * cargoLevels[hull.class];
      if(cargoSpace > 200) {
        cargoLighter = true;
      }
    } else {
      retry++;
    }
  } while ( mass > 0 && power > 0 && hardpoints > 0 && retry < 3);

  const ship = {
    name:  getRandom([
      'A Likely Story', 'Never Say Never', `Yes, Sir, That's My Baby`, `No, Sir, I Don't Mean Maybe`, 'Tell Me Another One', 'The Princess Is In Another Castle', 'Rose Coloured Glasses', 'A Measured Response', 'Rocinante',
    ]),
    hull: hull,
    fittings: allFittings,
    freeMass: mass,
    freePower: power,
    totalCost: cost,
    crewParam: crewParam,
    role: role.name,
  };
  return ship;
};

// export const genName = (imp = null) => {
//   const role = imp ?? getRandom(Object.keys(shipRoles));
//   let genericNames = {
//     oneOffs: [
//       'A Likely Story', 'Never Say Never', `Yes, Sir, That's My Baby`, `No, Sir, I Don't Mean Maybe`, 'Tell Me Another One', 'The Princess Is In Another Castle', 'Rose Coloured Glasses', 'A Measured Response', 'Rocinante', 'Fat Albert'
//     ],
//     colours: [
//       'Blue', 'Pink', 'Golden', 'Jade', 'Ivory', 'Silver', 'White'
//     ],
//     animals: [
//       'Dog', 'Tiger', 'Heron', 'Stork', 'Dolphin', 'Ibex', 'Dragon', 'Elephant',
//     ],
//     plants: [
//       'Orchid', 'Oak', 'Lily', 'Thistle', 'Nettle',
//     ],
//   };
//   let type = Math.floor(Math.random() * 2);
//   if(type = 0) {

  }
}