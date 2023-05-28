import tables from './tables.js';

// const hulls = require('./hulls.json');
// const weapons = require('./weapons.json');
// const fittings = require('./fittings.json');
// const defenses = require('./defenses.json');

const { hulls, weapons, fittings, defenses} = tables;

//Making weapons, defense, and fitting objs into array bc I don't understand how to make objects iterable

export const getHullObj = (inputHullStr) => {
  //frequently, a string will be passed as a hull. Use this to turn it into an object.
  return hulls[inputHullStr];
}

export const genCrewAmount = (inputHull, qualifier = 'Full Range') => {
  //This function grabs the min and max crew from a given hull and generate a number in between. Us it for generating amount of crew for a ship. Add extra functionality later for running with a lean, medium, or higher crew amount.
  // console.log(`Generating crew for ${inputHull.name} with param: ${qualifier}`);
  if(inputHull.name === 'Strike Fighter') {
    return 1;
  };
  const min = + inputHull.crew.match(/^\d*/)[0];
  //console.log('minimum: ', min);
  const max = + inputHull.crew.match(/\/(\d*)/)[1];
  //console.log('maximum: ', max);
  const dif = max - min;
  //console.log('difference is: ', dif);
  let crew = Math.round(Math.random() * dif) + min;
  //console.log(`generated: ${crew} as base`)
  switch(qualifier) {
    case 'Low':
      //console.log(`low range should be: ${min} - ${dif / 2}`);
      while(crew > dif / 3 + min) {
        crew -= Math.round( dif / 4 );
      }
      break;
    case 'High':
      //console.log(`high range should be: ${0.66 * dif + min} - ${max}`);
      while(crew < 0.66 * dif + min) {
        crew += Math.round(0.25 * dif);
      };
      break;
    case 'Med':
      //console.log(`med range should be: ${0.25 * dif + min} - ${0.75 * dif + min}`);
      if( crew > ( 0.75 * dif ) + min ) {
        crew -= Math.round( dif / 4 );
      } else if(crew < ( dif / 4 ) + min ) {
        crew += Math.round( dif / 4 );
      }
      break;
    case 'Skeleton':
      //console.log(`skeleton range should be: ${min} - ${(dif / 4) + min}`);
      if( crew > Math.floor( dif / 4 ) + min ) {
        crew = Math.floor( crew * 0.185 + min);
      };
      break;
    case 'Below Min':
      while(crew > min) {
        crew = Math.round(crew * (min / dif));
      };
      break;
    case 'Full Range':
      break;
    case 'Packed':
      //console.log(`packed range should be: ${(dif * 0.75) + min} - ${max}`);
      if( crew < ( dif * 0.75 ) + min ) {
        crew = Math.ceil(Math.random() * dif * 0.2) + min + Math.round(0.8 * dif);
      }
      break;
    default:
      //console.log('A bad qualifier has been selected. Please send low, high, med, skeleton, or belowMin. Generating a number of crew between minimum and maximum.')
      break;
  }
  //at least 1 crew rule: if crew < 1, return 1
  if(crew < 1) {
    crew = 1;
  }
  //console.log(`returning ${crew} crew for ${qualifier} between min ${min} and max ${max} of ${inputHull.name}.`)
  return crew;
};

export const correctCostsForClass = (fitting, hull) => {
  const costMulitpliers = [1, 10, 25, 100];
  const massMulitpliers = [1, 2, 3, 4];
  // console.log(`correcting cost of fitting`, fitting);
  let curFitting = fitting;
  if(typeof(fitting) === 'string') {
    curFitting = getFittingObj(fitting);
  }
  //console.log('hull:', hull);
  let curHull = hull;
  if(typeof(hull) === 'string') {
    curHull = getHullObj(hull);
  };
  //console.log('hull obj:', curHull);
  let mass = curFitting.mass;
  let power = curFitting.power;
  let cost = curFitting.cost;
  let massMult = curFitting.mass.includes('#');
  let powMult = curFitting.power.includes('#');
  let costMult = curFitting.cost.includes('*');
  //console.log(costMult);
  if(cost !== 'Special') {
    cost = curFitting.cost.match(/^\d+\.?\d*/);
    //console.log('pre modifited cost:', cost);
    let flag = cost.input;
    //console.log(flag);
    if(flag.includes('m')) {
      cost = cost * 1000000;
    }else if(flag.includes('k')) {
      cost = cost * 1000;
    }
  }
  let multSel;
  switch(curHull.class) {
    case 'Fighter':
      multSel = 0;
      break;
    case 'Frigate':
      multSel = 1;
      break;
    case 'Cruiser':
      multSel = 2;
      break;
    case 'Capital':
      multSel = 3;
      break;
    default:
      multSel = 0;
      break;
  }
  if(massMult) {
    mass = curFitting.mass.replace('#', '') * massMulitpliers[multSel];
    //console.log('mass: ', mass);
  } else {
    mass = + mass;
  };
  if(powMult) {
    power = curFitting.power.replace('#', '') * massMulitpliers[multSel];
    //console.log('power: ', power);
  } else {
    power = + power;
  };
  if(costMult) {
    cost = cost * costMulitpliers[multSel];
  } else {
    cost = + cost;
  };
  //console.log('cost:', cost)
  return {mass, power, cost};
};

export const getFittingObj = (input) => {
  if(Object.keys(defenses).includes(input)) {
    return defenses[input];
  };
  if(Object.keys(weapons).includes(input)) {
    return weapons[input];
  };
  if(Object.keys(fittings).includes(input)) {
    return fittings[input];
  }
};

export const parseStringCost = (inputItem) => {
  let cost = inputItem.cost;
  let costDig = cost.match(/^\d+/)
  //console.log('digit of cost is: ', costDig);
  if(cost.includes('k')) {
    cost = costDig * 1000;
  } else if(cost.includes('m')) {
    cost = costDig * 1000000;
  }
  return cost;
}

export const crewQuals = [ 'Below Min', 'Skeleton', 'Low', 'Med', 'High', 'Packed',  'Full Range'];

// Object.keys(hulls).forEach((hull) => {
//   crewQuals.forEach((qual) => {
//     genCrewAmount(getHullObj(hull), qual);
//   });
// });


  // //function for swapping the drive of a ship. Input level of new drive
  // const refitDrive = (level) => {
  //   const oldDrive = this.allFittings.forEach((fitting, ind) => {
  //     if(fitting.includes('SpikeDrive')) {
  //       let driveLevel = fitting.match(/\d/);
  //       return {ind, driveLevel};
  //     };
  //   const old = correctCostsForClass(this.drives[oldDrive.driveLevel[0]]);
  //   this.allFittings.filter((e, ind) => ind !== oldDrive.ind);
  //   this.caps.free.mass += old.mass;
  //   this.caps.free.power += old.power;
  //   const newDrive = this.drives[level];
  //   const newCosts = correctCostsForClass(newDrive);
  //   this.caps.free.mass -= newCosts.mass;
  //   this.caps.free.power -= newCosts.power;
  //   this.allFittings.push(newDrive);
  //   })
  // }