import Controller from './includes/Controller.js';
import View from './includes/View.js';
import Hand from './includes/Hand.js';
import States from './includes/States.js';
import Socket from './includes/Socket.js';
import setupSubscriptions from './includes/Subscriptions.js';

import Style from '../sass/style.sass';

function init() {
  Controller.createGrid();
  Hand.renderHand();
  View.setupHandlers();

  // draw 5 random cards
  for(let x = 0; x < 5; x++) {
    Hand.drawRandomCard();
  }


  Socket.setupSocketHandlers();
  setupSubscriptions();
  // States.beginTurn();
}



init();

