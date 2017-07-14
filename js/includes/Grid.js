import View from './View.js';

const Grid = {
  rows: 5,
  columns: 5,
  data: [],
  
  clearGridArray: function() {
    while(this.data.length > 0) {
      this.data.pop();
    }
  },

  getTile: function(tileIndex) {
    // tileIndex is a string of two numbers XY
    // X = rowIndex && Y = columnIndex
    const row = Number(tileIndex[0]);
    const column = Number(tileIndex[1]);
    return this.data[row][column];
  },
  
  
};

export default Grid;