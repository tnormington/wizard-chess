import Units from './Units.js';
import View from './View.js';
import Controller from './Controller.js';

const Hand = {
  max: 5,
  handCount: 0,
  data: [],
  
  drawCard: function() {
    // if the handCount is at max, break
    if(this.handCount >= this.max) return;
    const unit = Units.getRandomUnit();
    console.log(unit);
    const cardInHand = this.addUnitToHand(unit);
    
    // have to use an old fashioned function because lame-sauce
    cardInHand.addEventListener('dragstart', function(e) {
      Controller.handleCardDragStart(e);
    });
  },
  
  addUnitToHand: function(unit) {
    const card =
      `<div class="hand__card" id="${unit.content}" draggable="true">${unit.name}
        <span class="hand__card__cost">
          ${unit.cost}
        </span>
      </div>`;
    const cardNode = View.stringToNode(card);
    const hand = document.querySelector('.hand');
    
    this.handCount++;
    return hand.appendChild(cardNode);
  },
  
  removeCardFromHand: function(card) {
    const hand = document.querySelector('.hand');
    hand.removeChild(card);
    this.handCount--;
  },
  
  renderHand: function() {
    const hand = `<div class="hand" id="hand"></div>`;
    const handNode = View.stringToNode(hand);
    const body = document.querySelector('body');
    
    return body.appendChild(handNode);
  }
};

export default Hand;