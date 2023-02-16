import { crewQuals as _crewQuals, genCrewAmount } from './genFunctions.mjs';

import { hulls, fittings, defenses, weapons } from './tables';

const hullList = Object.keys(hulls);
const crewQuals = _crewQuals;

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
        rangeMin = min + ( 0.25 * dif );
        rangeMax = min + ( 0.75 * dif );
        break;
      case 'high':
        rangeMin = min + ( 0.66 * dif);
        rangeMax = max;
        break;
      case 'skeleton':
        rangeMin = min;
        rangeMax = min + (0.25 * dif);
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
    const crew = genCrewAmount(hull, qual)
    test(`Minimum ${qual} crew for ${hull}`, () => {
      expect(crew).toBeGreaterThanOrEqual(rangeMin);
    });
    test(`Maximum ${qual} crew for ${hull}`, () => {
      expect(crew).toBeLessThanOrEqual(rangeMax);
    })
  });
});

