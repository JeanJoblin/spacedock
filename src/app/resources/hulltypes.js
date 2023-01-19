
// need fucntion to generate current crew numbers

export class Hull {
  constructor(cost, speed, armour, hp, crew, ac, power, mass, hardpoints, weight) {
    this.cost = cost;
    this.speed = speed;
    this.armour = armour;
    this.hp = hp;
    this.crew = {
      min: crew[0],
      max: crew[1],
      current: crew[2],
    };
    this.ac = ac;
    this.power = power;
    this.mass = mass;
    this.hardpoints = hardpoints;
    this.weight = weight;
  };
  // get cost() { return this.cost}
  // get speed() { return this.speed}
  // get armour() { return this.armour}
  // get hp() { return this.hp}
  // get crew() { return this.crew}
  // get ac() { return this.ac}
  // get power() { return this.power}
  // get mass() { return this.mass}
  // get hardpoints() { return this.hardpoints}
  // get weight() { return this.weight}
}

const strikeFighter = new Hull(200000, 5, 5, 8, [1, 1, 1], 16, 5, 2, 1, 'Fighter' );

const Shuttle = new Hull(200000, 3, 0, 15, [1, 10, 1], 11, 3, 5, 1, 'Fighter');