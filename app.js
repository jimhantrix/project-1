
$(document).ready(function() {
  game();

});
//Game start building a deck
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
  //prompt for player names
  function getPlayers() {
    var players = [];


    while(true) {
      var name = prompt('Please enter the next player\'s name.' +
          '\nIf there are no more players just press enter.');

      if(String(name).length === 0) {
        break;
      }
      // console.log('pushing player with name', name);
      players.push(Player(name));
    }

    //  console.log(players);

    return players;

  }
  //object, of the player name
  function Player(name) {
    return {
      name: name,
      hand: [],
      score: 0
    }
  }
  // deal
  function deal(players, deck) {
    players.forEach(function(player) {
      for(var c = 0; c < 2; c++) {
        var card = deck.cards.splice(Math.floor(Math.random() * deck.cards.length),1);
        console.log(deck.cards.length);
        player.hand.push(card[0]);
      }

    });

   for (var c = 0; c < 2; c++) {
      var card = deck.cards.splice(Math.floor(Math.random() * deck.cards.length),1);
      dealer.hand.push(card[0]);

    }
    console.log(players,dealer);

  }
  //Creating Dom elements
  function addElement(tag, id, elemClass) {
    var elem = document.createElement(tag);

    if('undefined' !== typeof id) {
      elem.id = id;
    }

    if('undefined' !== elemClass) {
      elem.setAttribute('class', elemClass);
    }

    return elem;
  }

  var deck = buildDeck(),
    players = getPlayers(),
    dealer = Player("dealer");

//Getting the winner
  hitListener();

  if(players.length > 0) {
    deal(players, deck);

    players.forEach(function(player, i) {
      player.hand.forEach(function(card, i) {
        if(i === 0) {
          var elem = $('#playerC1');
        }
        else {
          var elem = $('#playerC2');
        }
        elem.html(card);
      });
        // console.log(players.hand);
        // var player1Card1 = $("#playerC1");
        // player1Card1.html(players[0].hand[0]);
        // var player1Card2 = $("#playerC2");
        // player1Card2.html(players[0].hand[1]);
        // var dealerCard1 = $("#dealerC1");
        // dealerCard1.html(players[1].hand[0]);
        // var dealerCard2 = $("#dealerC2").hide();
        // dealerCard2.html(players[1].hand[1]);
    });
    dealer.hand.forEach(function(card, i) {
      if(i === 0){
        var elem =$("#dealerC1");
      }
      else{
        var elem = $("#dealerC2");
      }

      if(i === 0){
        elem.html(card);
      }
      console.log(elem,card);
    });
      console.log(dealer);
      }
    else {
    alert("Uh Oh! There can't be a poker game without any players.");
    }
//creating an event listener
  function hitListener() {
    $("#hitbutton").on("click", function() {
      hit(players[0]);

      // manipulate players hand by 1
      // var player1Card3 = $("");
      // player1Card2.html(players[0].hand[2]);
      // var dealerCard3 = $("#hit");
      // hit(players[0]);
      //  to check if that player busts

      // if they bust end the game
    });
  }
  //
  function hit(player) {
    // value of player's hand
    var card = deck.cards.splice(Math.floor(Math.random() * deck.cards.length),1);
    console.log('going to hit player', player, 'with card', card);
    console.log('current deck cards are', deck.cards);
    // then get a new card and push it into the player's hand
    player.hand.push(card);

    // Add the card to the dom
    var div = addElement('div', 'playerC4', 'board'),
      span = addElement('span');

    span.innerHTML = card;

    div.appendChild(span);

    var pMove = document.getElementById('playerMove');

    pMove.appendChild(div);

    var card = deck.cards.splice(Math.floor(Math.random() * deck.cards.length),1);

    var div = addElement('div','Dealerc3','board'),

      span = addElement('span');

    span.innerHTML = card;

    div.appendChild(span);

    var pMove = document.getElementById('dealerMove');

    pMove.appendChild(div);

    winner(player,dealer);

    // adding the values of all of his cards to see if its > 21

  }


  function stay() {
    $("#dealerC2").show()
  }

  function winner(player,dealer) {
    var pTotal = total(player.hand);

    var dTotal = total(dealer.hand);

    if(pTotal > 21){
      alert("Dealer wins");
    }
    else if(dTotal > 21 ){
      alert("Player Wins");
    }
    else if(pTotal < dTotal){
      alert("Dealer Wins");
    }
    else if (pTotal === dTotal){
      alert("Tie");
    }
    else {
      aler("Player Wins")
    }

    console.log("Total of ", pTotal, dTotal);
  }
  function total(hand) {
   return hand.reduce(function(p, n) {
     return getVal(p, p) + getVal(n, p);
   }, 0);
  }
  //getting value of player and dealer and the assigning face cards
  function getVal(card, curTot) {
    if('string' === typeof card) {
     if('A' === card) {
       if(curTot + 11 > 21) {
         return 1;
       }
       else {
         return 11;
       }
     }
     else {
       return 10;
     }
   }
   else {
     return Number(card);
   }
  }


}
