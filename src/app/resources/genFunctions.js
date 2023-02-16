import { hulls, weapons, defenses, fittings } from './tables';
export const getHullObj = (inputHullStr) => {
  return hulls[inputHullStr];
}

export const genCrewAmount = (inputHull, qualifier = 'none') => {
  //This function grabs the min and max crew from a given hull and generate a number in between. Us it for generating amount of crew for a ship. Add extra functionality later for running with a lean, medium, or higher crew amount.
  if(inputHull.name === 'Strike Fighter') {
    return 1;
  };
  const min = inputHull.crew.match(/^\d*/)[0];
  const max = inputHull.crew.match(/\/(\d*)/)[1];
  const dif = max - min;
  let crew = Math.floor(Math.random() * dif);
  switch(qualifier) {
    case 'low':
      if(crew > dif / 3) {
        crew = Math.floor(crew / 2);
      }
      break;
    case 'high':
      if(crew < 0.66 * dif) {
        crew += Math.floor(0.45 * dif);
      };
      break;
    case 'med':
      if(crew > 0.75 * dif) {
        crew -= Math.floor(dif/4);
      } else if(crew < dif / 4) {
        crew += Math.floor(dif/4);
      }
      break;
    case 'skeleton':
      if(crew > dif / 4) {
        crew = Math.floor(crew * 0.2);
      };
      break;
    case 'belowMin':
      crew = Math.floor
    default:
      return crew;
  }
  return crew;
};

export const correctCostsForClass = (fitting, hull) => {
  const costMulitpliers = [1, 10, 25, 100];
  const massMulitpliers = [1, 2, 3, 4];
  const curFitting = getFittingObj(fitting);
  console.log('hull:', hull);
  let curHull = hull;
  if(typeof(hull) === 'string') {
    curHull = getHullObj(hull);
  };
  console.log('hull obj:', curHull);
  let mass = curFitting.mass;
  let power = curFitting.power;
  let cost = curFitting.cost;
  let massMult = curFitting.mass.includes('#');
  let powMult = curFitting.power.includes('#');
  let costMult = curFitting.cost.includes('*');
  console.log(costMult);
  if(cost !== 'Special') {
    cost = curFitting.cost.match(/^\d+\.?\d*/);
    console.log('pre modifited cost:', cost);
    let flag = cost.input;
    console.log(flag);
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
    console.log('mass: ', mass);
  } else {
    mass = + mass;
  };
  if(powMult) {
    power = curFitting.power.replace('#', '') * massMulitpliers[multSel];
    console.log('power: ', power);
  } else {
    power = + power;
  };
  if(costMult) {
    cost = cost * costMulitpliers[multSel];
  };
  console.log('cost:', cost)
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
  console.log('digit of cost is: ', costDig);
  if(cost.includes('k')) {
    cost = costDig * 1000;
  } else if(cost.includes('m')) {
    cost = costDig * 1000000;
  }
  return cost;
}
