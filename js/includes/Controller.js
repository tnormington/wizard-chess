import View from './View.js';
import Model from './Model.js';

import postal from 'postal';

const Controller = {

  endTurn: function() {
    Model.endTurn();
  },

  // takeTurn: new Promise((resolve, reject) => {
  //   const activePlayer = Model.turnNumber % 2;

  //   console.log('taking player turn');

  //   if( 1 === 1 ) {
  //     resolve('Turn promise resolved');
  //     Controller.endTurn();
  //   } else {
  //     reject(Error('turn promise rejected'));
  //   }

  // }),


  // endTurn: function() {
  //   Model.turnNumber++;
  //   Controller.takeTurn.then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // },
  
  createGrid: function() {
    Model.Grid.clearGridArray();
    View.removeAllTileMarkup();
    for(let rowIndex = 0; rowIndex < Model.Grid.rows; rowIndex++) {
      // loop over each row
      let row = [];
      for(let columnIndex = 0; columnIndex < Model.Grid.columns; columnIndex++) {
        // loop over each column
        let tile = {
          tileIndex: ('' + rowIndex) + columnIndex,
          content: null,
          unitId: null,
        };
        row.push(tile);
      }
      Model.Grid.data.push(row);
    }
    // console.table(grid);
    this.renderGrid();
  },
  
  updateTile: function(newTile) {
    const row = Number(newTile.tileIndex[0]);
    const column = Number(newTile.tileIndex[1]);
    // console.log('oldTile: ',Grid.data[row][column]);
    // console.log('newTile: ',newTile);

    newTile.tileIndex = Model.Grid.data[row][column].tileIndex;

    // console.log('TEST: ', newTile.tileIndex === grid[row][column].tileIndex);
    Model.Grid.data[row][column] = newTile;
    this.renderGrid();

    postal.publish({
      channel: "playerAction",
      topic: "grid.updateTile",
      data: {
        message: "tile updated",
        tile: newTile
      }
    });
  },
  
  placeRandomUnit: function() {
    const randomRow = Math.floor(Math.random() * Model.Grid.rows);
    const randomColumn = Math.floor(Math.random() * Model.Grid.columns);

    const tileIndex = String(('' + randomRow) + randomColumn);

    // console.log('random tileIndex: ', tileIndex);

    const randomUnit = Model.Units.getRandomUnit(tileIndex);

    // console.log(randomUnit);

    
    this.updateTile(randomUnit);
    // console.log(tileIndex);
  },
  
  renderGrid: function() {
    const gridMarkup = Model.Grid.data.map(row => {
      // loop over each row
      return row.map(tile => {
        // loop over each tile
        return (
          `<div class="tile"
            data-index="${tile.tileIndex}"
            ${tile.unitId ? 'data-unit-id="' + tile.unitId  + '"' : '' }>
            ${tile.content ? tile.content : ''}
           </div>`
        );
      }).join('')
    }).join('');

    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = gridMarkup;
  },
  
  handleTileClick: function(e) {
    // return if this is not a tile
    if(!e.target.classList.contains('tile')) return;
    // return if this doesn't have a unit in it
    if(e.target.dataset.unitId === undefined) return;

    
    // get the unit being clicked
    const unit = Model.Units.getUnitById(e.target.dataset.unitId);

    // destructure the event
    const {
      offsetLeft: tileX,
      offsetTop: tileY,
      clientWidth: tileW,
      clientHeight: tileH
    } = e.target;

    const x = tileX + tileW / 2;
    const y = tileY + tileH + 5;

    const tileIndex = e.target.dataset.index;

    View.renderUnitMenu(unit, tileIndex);
    // const index = e.target.dataset.index;


    // const tile = Grid.getTile(index);

    // const body = document.querySelector('body');
    // const tileMenu = body.appendChild(View.renderTileMenu(x, y, tile));


    // For entrance animation, add .active class after 10ms
    // setTimeout(() => {
    //   tileMenu.className += ' active';
    // }, 10);
    // View.deactivateAllTiles();
    // e.target.className += ' active';

  },
  
  handleUnitMenuClick: function(e) {
    if(!e.target.classList.contains('unit-menu__option')) return;
    const unit = Model.Units.getUnitById(e.target.parentNode.dataset.unitId);
    const abilityFunction = e.target.dataset.abilityFunction;

    const tileIndex = e.target.parentNode.dataset.tileIndex;

    console.log(tileIndex);

    unit.tileIndex = tileIndex;

    console.log(abilityFunction);
    console.log(unit);

    const fn = Model.Units[abilityFunction];

    
    fn(unit);
    // console.log(unit.);
    // View.clearUnitMenu();
  },
  
  handleHandDrag: function(e) {
    // console.log(e);
  },
  
  handleCardDragStart: function(e) {
    console.log('dragStart');
    // return if not dragging on a hand__card
    if(!e.target.classList.contains('hand__card')) return;
    
    // setup hand__card id for retrieval on drop event
    e.dataTransfer.setData("text/plain", e.target.id);
    
    // highlight player row
    View.highlightRow(4);
  },
  
  handleGridDrop: function(e) {
    e.preventDefault();
    
    console.log('drop grid');
    
    // remove the highlight class from the tiles
    View.unHighlightAll();
    
    // return if not on a tile
    if(!e.target.classList.contains('tile')) return;

    // return if tile is not on player dropzone
    const tileIndex = e.target.dataset.index;
    console.log(tileIndex);
    if(tileIndex < 40) return;
    
    // get card id and remove from hand
    const id = e.dataTransfer.getData("text");
    const card = document.getElementById(id);
    Model.Hand.removeCardFromHand(card);
    
    // update grid with new tile
    const unit = Model.Units.getUnitById(id);
    
    
    const newTile = {
      content: unit.name,
      tileIndex: tileIndex,
      unitId: unit.id,
    };
    
    Controller.updateTile(newTile);

    postal.publish({
      channel: "playerAction",
      topic: "hand.playedCard",
      data: {
        message: 'card placed: ' + newTile.content,
        newTile: newTile
      }
    });
    
    console.log(tileIndex);
  },
  
  handleGridDragEnter: function(e) {
    e.preventDefault();
    if(!e.target.classList.contains('tile')) return;
    console.log('drag enter tile');
    
    // check if unit can go here
    const tileIndex = e.target.dataset.index;
    if(tileIndex >= 40) {
      if(!e.target.classList.contains('highlight-alt')) {
        e.target.classList.add('highlight-alt');
        postal.publish({
          channel: "playerAction",
          topic: "hand.hoverTile",
          data: {
            message: "tile hovered",
            tile: e.target
          }
        });
      }
    } else {
      if(!e.target.classList.contains('highlight-warn')) {
        e.target.classList.add('highlight-warn');   
      }
    }
  },
  
  handleGridDragLeave: function(e) {
    e.preventDefault();
    
    // remove highlight class from tile
    // View.unHighlightAll();
    if(e.target.classList.contains('highlight-alt')) {
      e.target.classList.remove('highlight-alt');
    }
    
    if(e.target.classList.contains('highlight-warn')) {
      e.target.classList.remove('highlight-warn');   
    }
    
    // return if not a tile
    if(!e.target.classList.contains('tile')) return;
    console.log('drag exit tile');
  },
  
  handleGridDragOver: function(e) {
    e.preventDefault();
    const tileIndex = e.target.dataset.index;
    if(tileIndex && tileIndex < 40) {
      e.dataTransfer.dropEffect = 'none';
    } else {
      e.dataTransfer.dropEffect = 'copy';
    }
  },

  handleBodyDrop: function(e) {
    console.log('body drop');
    View.unHighlightAll();
  }
  
  
  
  
};

export default Controller;