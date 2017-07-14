/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Units = __webpack_require__(2);

var _Units2 = _interopRequireDefault(_Units);

var _Controller = __webpack_require__(1);

var _Controller2 = _interopRequireDefault(_Controller);

var _Hand = __webpack_require__(3);

var _Hand2 = _interopRequireDefault(_Hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var View = {

  unHighlightAll: function unHighlightAll(rowIndex) {
    var tiles = document.querySelectorAll('.tile');
    console.log('removing highlight classes from: ', tiles);
    tiles.forEach(function (tile) {
      tile.classList.remove('highlight', 'highlight-alt', 'highlight-warn');
    });
  },

  highlightRow: function highlightRow(rowIndex) {
    var tiles = document.querySelectorAll('[data-index^="' + rowIndex + '"]');
    tiles.forEach(function (tile) {
      tile.classList.add('highlight');
    });
  },

  deactivateAllTiles: function deactivateAllTiles() {
    var tiles = document.querySelectorAll('.tile');
    tiles.forEach(function (tile) {
      tile.classList.remove('active');
    });
  },

  removeAllTileMarkup: function removeAllTileMarkup() {
    var gridContainer = document.getElementById('grid-container');
    while (gridContainer.hasChildNodes()) {
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

  stringToNode: function stringToNode(string) {
    var div = document.createElement('div');
    div.innerHTML = string;
    var node = div.firstChild;
    return node;
  },

  clearTileMenu: function clearTileMenu() {
    var menus = document.querySelectorAll('.tile-menu');
    if (menus.length) {
      menus.forEach(function (menu) {
        menu.classList.remove('active');
        menu.addEventListener('transitionend', function (e) {
          // console.log(e);
          if (e.propertyName === 'transform') {
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

  setupHandlers: function setupHandlers() {
    window.handlers = {
      placeRandomUnit: function placeRandomUnit() {
        _Controller2.default.placeRandomUnit();
      },
      createGrid: function createGrid() {
        _Controller2.default.createGrid();
      },
      drawCard: function drawCard() {
        _Hand2.default.drawCard();
      }
    };

    // const body = document.querySelector('body');
    // body.addEventListener('mousedown', Controller.handleMouseDown);
    // body.addEventListener('mouseup', Controller.handleMouseUp);
    // body.addEventListener('drag', Controller.handleDrag);

    var gridContainer = document.getElementById('grid-container');
    // gridContainer.addEventListener('click', Controller.handleTileClick);
    gridContainer.addEventListener('drop', _Controller2.default.handleGridDrop);
    gridContainer.addEventListener('dragover', _Controller2.default.handleGridDragOver);
    gridContainer.addEventListener('dragenter', _Controller2.default.handleGridDragEnter);
    gridContainer.addEventListener('dragleave', _Controller2.default.handleGridDragLeave);

    var hand = document.getElementById('hand');
    // hand.addEventListener('mousedown', Controller.handleHandMouseDown);
    hand.addEventListener('drag', _Controller2.default.handleHandDrag);
    // hand.addEventListener('mouseup', Controller.handleHandMouseUp);

  }

};

exports.default = View;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Grid = __webpack_require__(5);

var _Grid2 = _interopRequireDefault(_Grid);

var _View = __webpack_require__(0);

var _View2 = _interopRequireDefault(_View);

var _Units = __webpack_require__(2);

var _Units2 = _interopRequireDefault(_Units);

var _Hand = __webpack_require__(3);

var _Hand2 = _interopRequireDefault(_Hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controller = {

  createGrid: function createGrid() {
    _Grid2.default.clearGridArray();
    _View2.default.removeAllTileMarkup();
    for (var rowIndex = 0; rowIndex < _Grid2.default.rows; rowIndex++) {
      // loop over each row
      var row = [];
      for (var columnIndex = 0; columnIndex < _Grid2.default.columns; columnIndex++) {
        // loop over each column
        var tile = {
          tileIndex: '' + rowIndex + columnIndex,
          content: null
        };
        row.push(tile);
      }
      _Grid2.default.data.push(row);
    }
    // console.table(grid);
    this.renderGrid();
  },

  updateTile: function updateTile(newTile) {
    var row = Number(newTile.tileIndex[0]);
    var column = Number(newTile.tileIndex[1]);
    console.log('oldTile: ', _Grid2.default.data[row][column]);
    console.log('newTile: ', newTile);

    newTile.tileIndex = _Grid2.default.data[row][column].tileIndex;

    // console.log('TEST: ', newTile.tileIndex === grid[row][column].tileIndex);
    _Grid2.default.data[row][column] = newTile;
    this.renderGrid();
  },

  placeRandomUnit: function placeRandomUnit() {
    var randomRow = Math.floor(Math.random() * _Grid2.default.rows);
    var randomColumn = Math.floor(Math.random() * _Grid2.default.columns);

    var tileIndex = String('' + randomRow + randomColumn);

    // console.log('random tileIndex: ', tileIndex);

    var randomUnit = _Units2.default.getRandomUnit(tileIndex);

    // console.log(randomUnit);


    this.updateTile(randomUnit);
    // console.log(tileIndex);
  },

  renderGrid: function renderGrid() {
    var gridMarkup = _Grid2.default.data.map(function (row) {
      // loop over each row
      return row.map(function (tile) {
        // loop over each tile
        return '<div class="tile" data-index="' + tile.tileIndex + '">\n            ' + (tile.content ? tile.content : '') + '\n           </div>';
      }).join('');
    }).join('');

    var gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = gridMarkup;
  },

  handleTileClick: function handleTileClick(e) {
    // return if this is not a tile
    if (!e.target.classList.contains('tile')) return;
    // console.log(e.target.offsetTop);

    // console.dir(e.target);
    // destructure the event
    var _e$target = e.target,
        tileX = _e$target.offsetLeft,
        tileY = _e$target.offsetTop,
        tileW = _e$target.clientWidth,
        tileH = _e$target.clientHeight;


    var x = tileX + tileW / 2;
    var y = tileY + tileH + 5;

    var index = e.target.dataset.index;

    var tile = _Grid2.default.getTile(index);

    var body = document.querySelector('body');
    var tileMenu = body.appendChild(_View2.default.renderTileMenu(x, y, tile));

    // For entrance animation, add .active class after 10ms
    setTimeout(function () {
      tileMenu.className += ' active';
    }, 10);
    _View2.default.deactivateAllTiles();
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

  handleHandDrag: function handleHandDrag(e) {
    // console.log(e);
  },

  handleCardDragStart: function handleCardDragStart(e) {
    console.log('dragStart');
    // return if not dragging on a hand__card
    if (!e.target.classList.contains('hand__card')) return;

    // setup hand__card id for retrieval on drop event
    e.dataTransfer.setData("text/plain", e.target.id);

    // highlight player row
    _View2.default.highlightRow(4);
  },

  handleGridDrop: function handleGridDrop(e) {
    e.preventDefault();

    console.log('drop grid');

    // remove the highlight class from the tiles
    _View2.default.unHighlightAll();

    // return if not on a tile
    if (!e.target.classList.contains('tile')) return;

    // return if tile is not on player dropzone
    var tileIndex = e.target.dataset.index;
    console.log(tileIndex);
    if (tileIndex < 40) return;

    // get card id and remove from hand
    var id = e.dataTransfer.getData("text");
    var card = document.getElementById(id);
    _Hand2.default.removeCardFromHand(card);

    // update grid with new tile
    var unit = _Units2.default.getUnitById(id);

    var newTile = {
      content: unit.name,
      tileIndex: tileIndex
    };

    Controller.updateTile(newTile);

    console.log(tileIndex);
  },

  handleGridDragEnter: function handleGridDragEnter(e) {
    e.preventDefault();
    if (!e.target.classList.contains('tile')) return;
    console.log('drag enter tile');

    // check if unit can go here
    var tileIndex = e.target.dataset.index;
    if (tileIndex >= 40) {
      if (!e.target.classList.contains('highlight-alt')) {
        e.target.classList.add('highlight-alt');
      }
    } else {
      if (!e.target.classList.contains('highlight-warn')) {
        e.target.classList.add('highlight-warn');
      }
    }
  },

  handleGridDragLeave: function handleGridDragLeave(e) {
    e.preventDefault();

    // remove highlight class from tile
    // View.unHighlightAll();
    if (e.target.classList.contains('highlight-alt')) {
      e.target.classList.remove('highlight-alt');
    }

    if (e.target.classList.contains('highlight-warn')) {
      e.target.classList.remove('highlight-warn');
    }

    // return if not a tile
    if (!e.target.classList.contains('tile')) return;
    console.log('drag exit tile');
  },

  handleGridDragOver: function handleGridDragOver(e) {
    e.preventDefault();
    var tileIndex = e.target.dataset.index;
    if (tileIndex && tileIndex < 40) {
      e.dataTransfer.dropEffect = 'none';
    } else {
      e.dataTransfer.dropEffect = 'copy';
    }
  }

};

exports.default = Controller;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Units = {
  data: [{
    name: 'Warrior',
    id: 'W',
    cost: 2
  }, {
    name: 'Mage',
    id: 'M',
    cost: 4
  }, {
    name: 'Rogue',
    id: 'R',
    cost: 3
  }, {
    name: 'Archer',
    id: 'A',
    cost: 4
  }, {
    name: 'Bruiser',
    id: 'Br',
    cost: 5
  }, {
    name: 'Wizard',
    id: 'Wz',
    cost: 6
  }],

  getRandomUnit: function getRandomUnit() {
    var tileIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var randomIndex = Math.floor(Math.random() * Units.data.length);
    var unit = this.data[randomIndex];

    var randomUnit = {
      content: unit.id,
      tileIndex: tileIndex,
      name: unit.name,
      cost: unit.cost
    };

    return randomUnit;
  },

  getUnitById: function getUnitById(id) {
    // console.log('getting unit: ' + id);
    return this.data.find(function (unit) {
      return unit.id === id;
    });
  }

};

exports.default = Units;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Units = __webpack_require__(2);

var _Units2 = _interopRequireDefault(_Units);

var _View = __webpack_require__(0);

var _View2 = _interopRequireDefault(_View);

var _Controller = __webpack_require__(1);

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hand = {
  max: 5,
  handCount: 0,
  data: [],

  drawCard: function drawCard() {
    // if the handCount is at max, break
    if (this.handCount >= this.max) return;
    var unit = _Units2.default.getRandomUnit();
    console.log(unit);
    var cardInHand = this.addUnitToHand(unit);

    // have to use an old fashioned function because lame-sauce
    cardInHand.addEventListener('dragstart', function (e) {
      _Controller2.default.handleCardDragStart(e);
    });
  },

  addUnitToHand: function addUnitToHand(unit) {
    var card = '<div class="hand__card" id="' + unit.content + '" draggable="true">' + unit.name + '\n        <span class="hand__card__cost">\n          ' + unit.cost + '\n        </span>\n      </div>';
    var cardNode = _View2.default.stringToNode(card);
    var hand = document.querySelector('.hand');

    this.handCount++;
    return hand.appendChild(cardNode);
  },

  removeCardFromHand: function removeCardFromHand(card) {
    var hand = document.querySelector('.hand');
    hand.removeChild(card);
    this.handCount--;
  },

  renderHand: function renderHand() {
    var hand = '<div class="hand" id="hand"></div>';
    var handNode = _View2.default.stringToNode(hand);
    var body = document.querySelector('body');

    return body.appendChild(handNode);
  }
};

exports.default = Hand;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Controller = __webpack_require__(1);

var _Controller2 = _interopRequireDefault(_Controller);

var _View = __webpack_require__(0);

var _View2 = _interopRequireDefault(_View);

var _Hand = __webpack_require__(3);

var _Hand2 = _interopRequireDefault(_Hand);

var _style = __webpack_require__(6);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as styles from '../sass/style.sass';

function init() {
  _Controller2.default.createGrid();
  _Hand2.default.renderHand();
  _View2.default.setupHandlers();
  _Hand2.default.drawCard();
  _Hand2.default.drawCard();
  _Hand2.default.drawCard();
  _Hand2.default.drawCard();
  _Hand2.default.drawCard();
}

init();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _View = __webpack_require__(0);

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = {
  rows: 5,
  columns: 5,
  data: [],

  clearGridArray: function clearGridArray() {
    while (this.data.length > 0) {
      this.data.pop();
    }
  },

  getTile: function getTile(tileIndex) {
    // tileIndex is a string of two numbers XY
    // X = rowIndex && Y = columnIndex
    var row = Number(tileIndex[0]);
    var column = Number(tileIndex[1]);
    return this.data[row][column];
  }

};

exports.default = Grid;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);