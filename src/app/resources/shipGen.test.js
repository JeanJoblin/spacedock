import * as shipGen from './shipGen';
import {fittings} from './tables';
import { shipRoles } from './shipRoles';

const {SpikeDrive1, SpikeDrive2, SpikeDrive3, SpikeDrive4, SpikeDrive5, SpikeDrive6, SystemDrive} = fittings;

let fakeHanger = [];

//Spike Drive fitting test for full random generation
function sdTest(n = 10) {
  for(let i = 0; i < n; i++) {
    let ship = shipGen.genShip({roleParam: shipRoles.pirate});
    let drive = 'Potatoes';
    drive = ship.fittings.filter(item => {
      return item.name.match(/Drive/);
    });
    if((ship.hull.name !== 'Small Station') && (ship.hull.name !== 'Large Station')) {
      test(`(${ship.name}) is a (${ship.hull.name}) and should have a drive: (${drive[0]?.name}).`, () => {
          expect(drive).not.toBe(undefined);
        });
    } else {
      test(`Ship (${ship.name}) should be Station: (${ship.hull.name}).`, () => {
        expect(ship.hull.name.match(/Station/)[0]).toBe('Station');
      });
      test(`(${ship.name}) should not have a drive: (${drive})`, () => {
        expect(drive).toHaveLength(0);
      });
      test(`Station (${ship.name}) should have some fittings: (${ship.fittings[0].name}, ${ship.fittings[1].name}, ...) `, () => {
        expect(ship.fittings).not.toHaveLength(0);
      });
      test(`Station role should be Pirate`, () => {
        expect(ship.role).toBe('Pirate');
      })
    }
  }
};

sdTest(100);
