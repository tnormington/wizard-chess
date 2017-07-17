import Controller from './Controller.js';
import Model from './Model.js';

const View = {
  body: document.getElementsByTagName('body'),
  unitMenu: document.getElementById('unit-menu'),

  renderUnitMenu: function(unit, tileIndex) {
    if(unit.abilities) {
      const abilities = unit.abilities.map( ability => {
        return `<li 
          class="unit-menu__option ability ${ability.name.toLowerCase().replace(' ', '-')}"
          data-ability-function="${ability.function}">${ability.name}</li>`;
      }).join('');
      const list = this.stringToNode(`<ul data-unit-id="${unit.id}" data-tile-index="${tileIndex}">${abilities}</ul>`);
      this.clearUnitMenu();
      this.unitMenu.appendChild(list);
      this.unitMenu.classList.add('active');
    }
  },

  clearUnitMenu: function() {
    this.unitMenu.innerHTML = '';
    this.unitMenu.classList.remove('active');
  },
  
  unHighlightAll: function(rowIndex) {
    const tiles = document.querySelectorAll('.tile');
    console.log('removing highlight classes from: ', tiles);
    tiles.forEach((tile) => {
      tile.classList.remove('highlight', 'highlight-alt', 'highlight-warn');
    });
  },
  
  highlightRow: function(rowIndex) {
    const tiles = document.querySelectorAll(`[data-index^="${rowIndex}"]`);
    tiles.forEach((tile) => {
      tile.classList.add('highlight');
    });
  },
  
  deactivateAllTiles: function() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.classList.remove('active');
    })
  },
  
  removeAllTileMarkup: function() {
    const gridContainer = document.getElementById('grid-container');
    while(gridContainer.hasChildNodes()) {
      gridContainer.removeChild(gridContainer.lastChild);
    }
  },
  
  
  stringToNode: function(string) {
    const div = document.createElement('div');
    div.innerHTML = string;
    const node = div.firstChild;
    return node;
  },
  
  clearTileMenu: function() {
    const menus = document.querySelectorAll('.tile-menu');
    if(menus.length) {
      menus.forEach(menu => {
        menu.classList.remove('active');
        menu.addEventListener('transitionend', (e) => {
          // console.log(e);
          if(e.propertyName === 'transform') {
            menu.parentNode.removeChild(menu); 
          }
        });
      });
    }
  },
  
    
  setupHandlers: function() {
    window.handlers = {
      placeRandomUnit: function() {
        Controller.placeRandomUnit();
      },
      createGrid: function() {
        Controller.createGrid();
      },
      drawCard: function() {
        Model.Hand.drawRandomCard();
      },
      endTurn: function() {
        Controller.endTurn();
      },
      closeUnitMenu: function() {
        View.clearUnitMenu();
      },
    };
    
    
    // body.addEventListener('mousedown', Controller.handleMouseDown);
    // body.addEventListener('mouseup', Controller.handleMouseUp);
    // body.addEventListener('drag', Controller.handleDrag);

    // View.body.addEventListener('drop', Controller.handleBodyDrop);
    
    const gridContainer = document.getElementById('grid-container');
    gridContainer.addEventListener('click', Controller.handleTileClick);
    gridContainer.addEventListener('drop', Controller.handleGridDrop);
    gridContainer.addEventListener('dragover', Controller.handleGridDragOver);
    gridContainer.addEventListener('dragenter', Controller.handleGridDragEnter);
    gridContainer.addEventListener('dragleave', Controller.handleGridDragLeave);
    
    const hand = document.getElementById('hand');
    // hand.addEventListener('mousedown', Controller.handleHandMouseDown);
    hand.addEventListener('drag', Controller.handleHandDrag);


    this.unitMenu.addEventListener('click', Controller.handleUnitMenuClick);

    // hand.addEventListener('mouseup', Controller.handleHandMouseUp);
    
    
    
  },
    
}

export default View;