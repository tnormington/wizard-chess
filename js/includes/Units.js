// import Controller from './Controller.js';
import View from './View.js';

const Units = {
  data: [
    {
      name: 'Warrior',
      id: 'W',
      cost: 2,
      health: 3,
      currentHealth: 3,
      damage: 1,
      abilities: [
        {
          name: 'Attack',
          description: 'Deal 1 damage to an adjacent enemy',
          cost: 1,
          function: 'basicAttack'
        },
        {
          name: 'Defend',
          description: 'Bolster defenses, taking 1 less damage for the next 2 turns',
          cost: 2,
          function: 'boostSelf'
        },
        {
          name: 'Execute',
          description: 'Kill an adjacent enemy with 3 or less health',
          cost: 3,
          function: 'execute'
        }
      ]
    },
    // {
    //   name: 'Mage',
    //   id: 'M',
    //   cost: 4,
    //   health: 1,
    //   damage: 2,
    // },
    // {
    //   name: 'Scout',
    //   id: 'S',
    //   cost: 1,
    //   health: 1,
    //   damage: 1,
    // },
    // {
    //   name: 'Archer',
    //   id: 'A',
    //   cost: 4,
    //   health: 2,
    //   damage: 1,
    // },
    // {
    //   name: 'Bruiser',
    //   id: 'Br',
    //   cost: 5,
    //   health: 4,
    //   damage: 2,
    // },
    // {
    //   name: 'Wizard',
    //   id: 'Wz',
    //   cost: 6,
    //   health: 1,
    //   damage: 3,
    // },
    // {
    //   name: 'Trapper',
    //   id: 'T',
    //   cost: 5,
    //   health: 3,
    //   damage: 1,
    // }
  ],
  
  getRandomUnit: function(tileIndex = null) {
    const randomIndex = Math.floor(Math.random() * Units.data.length);
    const unit = this.data[randomIndex];

    const randomUnit = {
      content: unit.id,
      tileIndex: tileIndex,
      name: unit.name,
      cost: unit.cost,
      health: unit.health,
      damage: unit.damage
    };

    return randomUnit;
  },
  
  getUnitById: function(id) {
    // console.log('getting unit: ' + id);
    return this.data.find((unit) => { return unit.id === id; } );
  },

  basicAttack: function(unit) {
    const damage = unit.damage;
    const health = unit.health;

    // console.log(unit.tileIndex);

    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {

      // no tile selected
      if(!e.target.classList.contains('tile')) return;
      console.log('clicked a tile!');

      const tile = e.target;

      // no unit selected
      if(tile.dataset.unitId === undefined) return;
      console.log('clicked a tile with a unit!');

      // clicked active unit
      // console.log(unit.tileIndex);
      // console.log(tile.dataset.tileIndex);
      if(unit.tileIndex == tile.dataset.index) return;
      console.log('clicked a unit that wasnt the current unit');
      
    });
  },
  
};

export default Units;