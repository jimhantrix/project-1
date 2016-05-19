
$(document).ready(function() {
  game();

});

function game() {
  function buildDeck() {
    var faceCards = {
      11: 'J',
      12: 'Q',
      13: 'K',
      1:  'A'
    },
    deck = {
      push: function(card) {
        this.cards.push(card);
      },
      cards: []
    },
    card;

    for(var c = 1; c <= 13; c++) {
      for(var n = 0; n <= 3; n++) {
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
  function getPlayers() {
    var players = [];


    while(players.length <= 2) {
      var name = prompt('Please enter the next player\'s name.' +
          '\nIf there are no more players just press enter.');

      if(String(name).length === 0)
          break;


      players.push(Player(name));
    }

    // console.log(players);

    return players;

  }
  function Player(name) {
    return {
      name: name,
      hand: [],
      score: 0
    }
  }
  function deal(players, deck) {
    players.forEach(function(player) {
      for(var c = 0; c < 2; c++) {
        player.hand.push(deck.cards[Math.floor(Math.random() * deck.cards.length)]);
      }

    });
    // console.log(players);
  }

  var deck = buildDeck(),
    players = getPlayers();

  if(players.length > 0) {
    deal(players, deck);

    console.log(players);

    players.forEach(function(player){
        console.log(players.hand);
        var player1Card1 = document.getElementById("playerC1");
        player1Card1.innerHTML = players[0].hand[0];
        var player1Card2 = document.getElementById("playerC2");
        player1Card2.innerHTML = players[0].hand[1];
        var dealerCard1 = document.getElementById("dealerC1");
        dealerCard1.innerHTML = players[1].hand[0];
    })


    } else {
    alert("Uh Oh! There can't be a poker game without any players.");
  }
}
