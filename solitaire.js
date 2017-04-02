window.addEventListener('load', function () {
  let content = document.createDocumentFragment();

  let stockPile = document.createElement('septatrix-deck');
  let wastePile = document.createElement('septatrix-deck');
  let bottomPiles = [
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck')
  ];
  let bottomPilesOptions = {filter:
    function (elem, deck) {
      if (deck.isEmpty()) {
        console.log('empty');
        return true;
      } else if (suitColor(deck.topCard.suit) === suitColor(elem.suit)) {
        console.log('color');
        return true;
      } else {
        return false
      };
    }
  }
  let acePiles = [
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck'),
    document.createElement('septatrix-deck')
  ];
  let acePilesOptions = {filter:
    function (elem, deck) {
      if (deck.isEmpty() && elem.rank === 'ace') {
        return true;
      } else if ((deck.topCard.suit === elem.suit + 1) && deck.topCard.suit === elem.suit) {
        return true;
      } else {
        return false;
      }
    }
  }

  let cards = []
  for (suit of ['spades', 'diamonds', 'hearts', 'clubs']) {
    for (rank of ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']) {
      let card = document.createElement('septatrix-card');
      card.suit = suit;
      card.rank = rank;
      cards.push(card);
    }
  }

  stockPile.style.setProperty('--offset-bottom', '.25px')
  stockPile.addEventListener('click', () => wastePile.addCard(stockPile.topCard));
  stockPile.addEventListener('cardAdded', e => {
    e.detail.card.flipped = true;
  });
  stockPile.addEventListener('cardRemoved', e => {
    e.detail.card.flipped = false;
  });
  stockPile.addEventListener('cardRemoved', e => {
    if (e.detail.cards === 0) {
      while (!wastePile.isEmpty()) {
        stockPile.addCard(wastePile.topCard);
      }
    }
  });
  wastePile.style.setProperty('--offset-bottom', '.25px')

  for (card of cards) {
    stockPile.addCard(card);
  }
  content.appendChild(stockPile);
  content.appendChild(wastePile);

  document.getElementById('game').appendChild(content);
})

function suitColor(suit) {
  return {
    spades: 'black',
    diamonds: 'red',
    hearts: 'red',
    clubs: 'black'
  }[suit];
}
