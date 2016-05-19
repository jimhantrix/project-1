$(document).ready(function() {
  game();
});

//fae cards
function game() {
  function buildDeck() {
    var faceCards = {
      11: 'J',
      12: 'Q',
      13: 'K',
      1: 'A'
    },
    //building a deck
    deck = {
      push: function(card) {
        this.cards.push(card);
      },
      cards: []
    },
    card;
      // if card is k (faceCards)
    for(var c = 1; c <= 13; c++) {
      //checking if card is A (face card)
      for(var n = 0; n <= 3; n++) {
      //if card is !number card then its (face card)
        if('undefined' !== typeof faceCards[c]) {
          card = faceCards[c];
        }
        else {
          card = c;
        }
        deck.push(card);
      }
    }
    return deck;
  }

 //message prompt players
  function getPlayers() {
    var players = [];
    while(true) {
      var name = prompt('Please enter the next player\'s name.' +
          '\nIf there are no more players just press enter.');
      if(String(name).length === 0) break;
      players.push(Player(name));
    }
    console.log(players);
    return players;
  }
  //keeping score of each players
  function Player(name) {
    return {
      name: name,
      hand: [],
      score: 0
    }
  }
  //
  function deal(players, deck) {
    players.forEach(function(player) {
      for(var c = 0; c < 2; c++) {
        player.hand.push(deck.cards[Math.floor(Math.random() * deck.cards.length)]);
      }
    });
    console.log('after deal');
    console.log(players);
  }

  var deck = buildDeck(),
    players = getPlayers();
  if(players.length > 0) {
    deal(players, deck);
    console.log(players, deck);
    // while(true) {
    //
    // }
  }
  else {
    alert("Uh Oh! There can't be a poker game without any players.");
  }
}
