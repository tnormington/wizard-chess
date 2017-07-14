import Grid from './Grid.js';
import View from './View.js';
import Units from './Units.js';
import Hand from './Hand.js';

const Controller = {
  
  createGrid: function() {
    Grid.clearGridArray();
    View.removeAllTileMarkup();
    for(let rowIndex = 0; rowIndex < Grid.rows; rowIndex++) {
      // loop over each row
      let row = [];
      for(let columnIndex = 0; columnIndex < Grid.columns; columnIndex++) {
        // loop over each column
        let tile = {
          tileIndex: ('' + rowIndex) + columnIndex,
          content: null
        };
        row.push(tile);
      }
      Grid.data.push(row);
    }
    // console.table(grid);
    this.renderGrid();
  },
  
  updateTile: function(newTile) {
    const row = Number(newTile.tileIndex[0]);
    const column = Number(newTile.tileIndex[1]);
    console.log('oldTile: ',Grid.data[row][column]);
    console.log('newTile: ',newTile);

    newTile.tileIndex = Grid.data[row][column].tileIndex;

    // console.log('TEST: ', newTile.tileIndex === grid[row][column].tileIndex);
    Grid.data[row][column] = newTile;
    this.renderGrid();
  },
  
  placeRandomUnit: function() {
    const randomRow = Math.floor(Math.random() * Grid.rows);
    const randomColumn = Math.floor(Math.random() * Grid.columns);

    const tileIndex = String(('' + randomRow) + randomColumn);

    // console.log('random tileIndex: ', tileIndex);

    const randomUnit = Units.getRandomUnit(tileIndex);

    // console.log(randomUnit);

    
    this.updateTile(randomUnit);
    // console.log(tileIndex);
  },
  
  renderGrid: function() {
    const gridMarkup = Grid.data.map(row => {
      // loop over each row
      return row.map(tile => {
        // loop over each tile
        return (
          `<div class="tile" data-index="${tile.tileIndex}">
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
    // console.log(e.target.offsetTop);

    // console.dir(e.target);
    // destructure the event
    const {
      offsetLeft: tileX,
      offsetTop: tileY,
      clientWidth: tileW,
      clientHeight: tileH
    } = e.target;

    const x = tileX + tileW / 2;
    const y = tileY + tileH + 5;


    const index = e.target.dataset.index;


    const tile = Grid.getTile(index);

    const body = document.querySelector('body');
    const tileMenu = body.appendChild(View.renderTileMenu(x, y, tile));


    // For entrance animation, add .active class after 10ms
    setTimeout(() => {
      tileMenu.className += ' active';
    }, 10);
    View.deactivateAllTiles();
    e.target.className += ' active';

  },
  
//   handleTileMenuClick: function(e) {
//     let t = null;
//     if(e.target.classList.contains('tile-menu')) return;
//     e.preventDefault();
    
//     console.dir(e.target);
    
//     if(e.target.nodeName === 'SPAN') {
//       t = e.target.parentNode;
//     } else {
//       t = e.target;
//     }
    
    
    
//     const id = t.dataset.id;
//     const tileIndex = this.dataset.tileIndex;

//     console.log(id);
    
//     console.log(this);
//     console.dir(t);
    
//     const unit = Units.getUnitById(id);
    
    
//     const newTile = {
//       tileIndex: tileIndex,
//       content: unit.name,
//     };
    
    

//     View.clearTileMenu();
//     View.deactivateAllTiles();
//     Controller.updateTile(newTile);
//   },
  
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
    Hand.removeCardFromHand(card);
    
    // update grid with new tile
    const unit = Units.getUnitById(id);
    
    
    const newTile = {
      content: unit.name,
      tileIndex: tileIndex
    };
    
    Controller.updateTile(newTile);
    
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
  
  
  
  
};

export default Controller;