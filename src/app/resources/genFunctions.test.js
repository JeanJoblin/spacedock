import * as genFuncs from './genFunctions.js'
// const genFuncs = require('./genFunctions.js');

import { hulls, fittings, defenses, weapons } from './tables';

const hullList = Object.keys(hulls);
const crewQuals = genFuncs.crewQuals;


//Extended range test for generate crew function. Runs each combination 10 times to check if the crew amount generated is within expected range
for(let i = 0; i < 100; i++ ) {
  hullList.forEach((hull) => {
    const min = + hulls[hull].crew.match(/^\d*/)[0];
    const max = + hulls[hull].crew.match(/\/(\d*)/)[1];
    const dif = max - min;
    crewQuals.forEach((qual) => {
      let rangeMin;
      let rangeMax;
      switch(qual) {
        case 'low':
          rangeMin = min;
          rangeMax = (0.5 * dif) + min;
          break;
        case 'med':
          rangeMin = min + Math.floor( 0.25 * dif );
          rangeMax = min + Math.ceil( 0.75 * dif );
          break;
        case 'high':
          rangeMin = min + ( 0.66 * dif);
          rangeMax = max;
          break;
        case 'skeleton':
          rangeMin = min;
          rangeMax = min + Math.floor(0.25 * dif);
          break;
        case 'belowMin':
          rangeMin = 1;
          rangeMax = min;
          break;
        case 'packed':
          rangeMin = min + (0.75 * dif);
          rangeMax = max;
          break;
        default:
          rangeMin = min;
          rangeMax = max;
      };
      const crew = genFuncs.genCrewAmount(genFuncs.getHullObj(hull), qual)
      test(`Minimum ${qual} crew for ${hull}`, () => {
        expect(crew).toBeGreaterThanOrEqual(rangeMin);
      });
      test(`Maximum ${qual} crew for ${hull}`, () => {
        expect(crew).toBeLessThanOrEqual(rangeMax);
      })
    });
  });
};