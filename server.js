// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

//Start the express app
var app = express();
var server = http.Server(app);
var io = socketIO(server);

//app config
app.set('port', 5000);
app.use('/static', express.static(path.join(__dirname, '/static')));



// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '/static/index.html'));
  });


  // Starts the server.
server.listen(5000, function() {
    console.log('Starting server on port 5000');
    console.log(path.join(__dirname, '/static'));
  });



//-----------------------------------------------------------------------------------------//



//Game Logic
/*
    Field Day Card Game
*/

//GLOBALS
const SUITS = ["s", "d", "c", "h"];
const VALS = ["1","2","3","4","5","6","7","8","9","10","11", "12","13"];
const INITIAL_DECK = [
  '1s',  '1d',  '1c',  '1h',  '2s',  '2d', 
  '2c',  '2h',  '3s',  '3d',  '3c',  '3h', 
  '4s',  '4d',  '4c',  '4h',  '5s',  '5d', 
  '5c',  '5h',  '6s',  '6d',  '6c',  '6h', 
  '7s',  '7d',  '7c',  '7h',  '8s',  '8d', 
  '8c',  '8h',  '9s',  '9d',  '9c',  '9h', 
  '10s', '10d', '10c', '10h', '11s', '11d',
  '11c', '11h', '12s', '12d', '12c', '12h',
  '13s', '13d', '13c', '13h', '1j', '2j', '0p'
];

const INITIAL_PLAYER_DATA = {
  points: 0,
  hand: []
}

//Template JSON object for how a game state looks 
const INITIAL_DATA = {
  deck: INITIAL_DECK,
  pile1: [],
  pile2: [],
  pile3: [],
  pile4: [],
  players = [],
  discard: []
};



//Deck Class
class Deck {
    //Creates a pre-shuffled deck and stores it into the deck array
    constructor(deck=INITIAL_DECK) {
        this.deck = deck
        this.shuffle();
        console.log(this.deck);
    }

    //Shuffles by choosing two random locations within the deck and swapping the cards at the locations
    shuffle() {
        for (var i = 0; i < 1000; i++)
        {
            var location1 = Math.floor((Math.random() * this.deck.length));
            var location2 = Math.floor((Math.random() * this.deck.length));
            var tmp = this.deck[location1];
    
            this.deck[location1] = this.deck[location2];
            this.deck[location2] = tmp;
        }
        return;
    }

    //returns string representation of the deck one card at a time
    getDeck() {
        var str = "";
        for (var i = 0; i < this.deck.length; i++) {
            str = str + " " + this.deck[i].getCard();
        }
        return str;
    }

    //removes a card at an index
    removeCard(ind)  {
        return this.deck.splice(ind, 1);
    }
}

//A room is an object with all the players currently playing and the state of the game
class Room {
  constructor(data=INITIAL_DATA) {
    //If no deck data is passed in, the room is created with the state at the initial point in a game
    this.deck = data.deck;

    //pile data holds arrays of cards in piles
    this.pile1 = data.pile1;
    this.pile2 = data.pile2;
    this.pile3 = data.pile3;
    this.pile4 = data.pile4;

    //boolean that determines if the game is over
    this.over = false;

    //players are stored here
    this.players = data.players;

    //discarded cards are held in this array
    this.discard = data.discard;

    //keeping in track whos turn it is (the current player)
    this.current = 0;

  }
}

//player class that contains the socket connection id and the players current revealed game state info
class Player {
  constructor(id=null, data=INITIAL_PLAYER_DATA) {
    this.id = id;
    this.hand = data.hand;
    this.points = data.points;
  }
}


//-----------------------------------------------------------------------------------------//


var SOCKET_LIST= {}

//BACK TO SOCKET STUFF
// On a socket connection run this function
io.on('connection', function(socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  var player = Player(socket.id);
});

//REMOVE AFTER DONE TESTING
setInterval(function() {

  }, 1000);


