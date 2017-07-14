const Units = {
  data: [
    {
      name: 'Warrior',
      id: 'W',
      cost: 2
    },
    {
      name: 'Mage',
      id: 'M',
      cost: 4
    },
    {
      name: 'Rogue',
      id: 'R',
      cost: 3
    },
    {
      name: 'Archer',
      id: 'A',
      cost: 4
    },
    {
      name: 'Bruiser',
      id: 'Br',
      cost: 5
    },
    {
      name: 'Wizard',
      id: 'Wz',
      cost: 6
    }
  ],
  
  getRandomUnit: function(tileIndex = null) {
    const randomIndex = Math.floor(Math.random() * Units.data.length);
    const unit = this.data[randomIndex];

    const randomUnit = {
      content: unit.id,
      tileIndex: tileIndex,
      name: unit.name,
      cost: unit.cost
    };

    return randomUnit;
  },
  
  getUnitById: function(id) {
    // console.log('getting unit: ' + id);
    return this.data.find((unit) => { return unit.id === id; } );
  },
  
};

export default Units;