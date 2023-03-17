import { hulls, weapons, defenses, fittings} from './tables'
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

export const genShip = (role, params) => {
  //add params later
  let hullParam;
  let crewParam;
  if(!role) {
    role = getRandom(shipRoles);
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
  //Roll under driveUp (d100). Success: keep rolling, Fail: Stop rolling.
  do {
    if(Math.random() < role.driveUp) {
      driveLevel++;
      console.log('upgrading drive to level: ', driveLevel);
    } else {
      console.log('assigning final drive of level: ', driveLevel);
      finalDrive = drives[driveLevel];
    }
  } while ( finalDrive === null );
  //Add the upgraded drive to fittings list.
  let cor = correctCostsForClass(finalDrive, hull);
  mass -= cor.mass;
  power -= cor.power;
  cost += cor.cost;
  allFittings.push(finalDrive);
  //Drive has been selected. Outfit the ship with weapons defenses and fittings.
  const canDupe = [...weaponsArray, defenses.FoxerDrones, fittings.AutotargetingSystem, fittings.CargoLighter, fittings.CargoSpace, fittings.ColdSleepPods, fittings.DropPod, fittings.ExodusBay, fittings.ExtendedStores, fittings.HydroponicProduction, fittings.ShipBayFighter, fittings.ShipBayFrigate, fittings.ShiptenderMount, fittings.SmugglersHold,  ];
  console.table('mountable: ', mountable);
  console.log('role.freq: ', role.freq);
  let toAdd = null;
  function filterValidFittings(imp, hull) {
    const validFittings = imp.filter(fitting => {
      let dupe = false;
      if(allFittings.includes(fitting)) {
        if(!canDupe.includes(fitting)) {
          console.log(`${fitting.name} is already on allFittings list`);
          dupe = true;
        }
      }
      const req = correctCostsForClass(fitting, hull);
      console.log('classes mountable by hull class: ', mountable[hull.class]);
      console.log('fitting class', fitting.class);
      const validCheck = {
        power: req.power <= power,
        mass: req.mass <= mass,
        mountable: mountable[hull.class].includes(fitting.class),
        hardpoints: fitting.hardpoints ? fitting.hardpoints <= hardpoints : 'fitting reqs none',
        noDupe: !dupe,
      }
      console.table(validCheck);
      return req.power <= power &&
      req.mass <= mass &&
      mountable[hull.class].includes(fitting.class) &&
      !dupe &&
      (fitting.hardpoints ? fitting.hardpoints <= hardpoints : true);
    });
    console.log('Returning these as valid: ', validFittings);
    return validFittings;
  }
  do {
    console.log('ENTERED THE DO WHILE');
    let fitting;
    let chance = Math.random();
    if(Math.random() < role.freq[0]) {
        console.log('chosing a weapon');
        fitting = filterValidFittings(role.weapons, hull);
    } else if(Math.random() < role.freq[1]) {
      // fitting = role.defenses.filter(defense => {
        // console.log('CHOOSING A DEFENSE');
        // const req = correctCostsForClass(defense, hull);
        // console.log(`costs corrected for ${hull.name} hull [Mass: ${req.mass} Power: ${req.power}]`);
        // return req.power <= power &&
        // req.mass <= mass &&
        // mountable[hull.class].includes(defense.class);
      // });
      console.log('Chosing a defense');
      fitting = filterValidFittings(role.defenses, hull);
    } else {
      // fitting = role.fittings.filter(fitting => {
      //   console.log('CHOOSING A FITTING');
      //   const req = correctCostsForClass(fitting, hull);
      //   return req.power <= power &&
      //   req.mass <= mass &&
      //   mountable[hull.class].includes(fitting.class);
      // });
      console.log('Choosing a fitting');
      fitting = filterValidFittings(role.fittings, hull);
    };
    console.log('fitting array ', fitting);
    toAdd = getRandom(fitting);
    if(toAdd !== undefined) {
      console.log('toAdd:', toAdd);
      cor = correctCostsForClass(toAdd, hull);
      mass -= cor.mass;
      power -= cor.power;
      console.log('cost: ', cost);
      console.log('corrected fitting cost: ', cor.cost);
      cost += cor.cost;
      if(toAdd.hardpoints !== undefined) {
        hardpoints -= toAdd.hardpoints;
      }
      allFittings.push(toAdd);
      console.table(allFittings);
    }
  } while ( mass > 0 && power > 0 && hardpoints > 0 && toAdd !== undefined);

  const ship = {
    name:  getRandom(['FRANK', 'BOB', 'JIM', 'JAMES', 'KEVIN', 'OSCAR', 'DWIGHT', 'PAM', 'STANLEY', 'MICHAEL',]),
    hull: hull,
    fittings: allFittings,
    freeMass: mass,
    freePower: power,
    totalCost: cost,
    crewParam: crewParam,
  };
  console.table(ship);
  return ship;
};