import Units from './Units.js';
import Controller from './Controller.js';
import Hand from './Hand.js';

const View = {
  
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
  
//   renderTileMenu: function(x, y, tile) {
//     this.clearTileMenu();

//     const optionMarkup = this.createTileMenuOptions();

//     const menuStyle = `style="top: ${y}px; left: ${x}px;"`;
//     const menuMarkup = `<ul class="tile-menu" data-tile-index="${tile.tileIndex}" ${menuStyle}>${optionMarkup}</ul>`;

//     // const div = document.createElement('div');
//     // div.innerHTML = menuMarkup;
//     const menu = this.stringToNode(menuMarkup);

//     menu.addEventListener('click', Controller.handleTileMenuClick);
//     return menu;
//   },
  
//   createTileMenuOptions: function() {
//     const options = Units.data.map(option => {

//       // const hotkey = option.name.indexOf(option.id);
//       // const optionName = '';
//       // console.log(option.name);
//       const optionNameArray = option.name.split('');
//       const optionName = optionNameArray.map(letter => {
//         // console.log(letter);
//         if(letter === option.id) {
//           return `<span class="keyword">${letter}</span>`;
//         } else {
//           return letter;
//         }
//       }).join('');

//       return (
//         `<li class="tile-menu__option" data-id="${option.id}">${optionName}</li>`
//       );
//     }).join('');

//     return options;
//   },
  
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
  
//   moveCardInHand: function(x, y, card) {
//     // let transform = `translate(${x}, ${y})`;
//     let top = x + 'px';
//     let left = y + 'px';
    
//     card.classList.add('active');
//     card.style.top = top;
//     card.style.left = left;
//   },
    
  setupHandlers: function() {
    window.handlers = {
      placeRandomUnit: function() {
        Controller.placeRandomUnit();
      },
      createGrid: function() {
        Controller.createGrid();
      },
      drawCard: function() {
        Hand.drawCard();
      }
    };
    
    
    // const body = document.querySelector('body');
    // body.addEventListener('mousedown', Controller.handleMouseDown);
    // body.addEventListener('mouseup', Controller.handleMouseUp);
    // body.addEventListener('drag', Controller.handleDrag);
    
    const gridContainer = document.getElementById('grid-container');
    // gridContainer.addEventListener('click', Controller.handleTileClick);
    gridContainer.addEventListener('drop', Controller.handleGridDrop);
    gridContainer.addEventListener('dragover', Controller.handleGridDragOver);
    gridContainer.addEventListener('dragenter', Controller.handleGridDragEnter);
    gridContainer.addEventListener('dragleave', Controller.handleGridDragLeave);
    
    const hand = document.getElementById('hand');
    // hand.addEventListener('mousedown', Controller.handleHandMouseDown);
    hand.addEventListener('drag', Controller.handleHandDrag);
    // hand.addEventListener('mouseup', Controller.handleHandMouseUp);
    
    
    
  },
    
}

export default View;