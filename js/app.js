import Controller from './includes/Controller.js';
import View from './includes/View.js';
import Hand from './includes/Hand.js';

import Style from '../sass/style.sass';
// import * as styles from '../sass/style.sass';

function init() {
  Controller.createGrid();
  Hand.renderHand();
  View.setupHandlers();
  Hand.drawCard();
  Hand.drawCard();
  Hand.drawCard();
  Hand.drawCard();
  Hand.drawCard();
}


init();

