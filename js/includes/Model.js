import Hand from './Hand.js';
import Units from './Units.js';
import Grid from './Grid.js';

const Model = {
    turnNumber: 0,
    Hand: Hand,
    Units: Units,
    Grid: Grid,
    startGame: function() {

        // reset turnNumber
        Model.turnNumber = 0;

        // 

    },

    endTurn: function() {
        console.log(`turn ${Model.turnNumber} ended`);
        Model.turnNumber++;
    },
}

export default Model;