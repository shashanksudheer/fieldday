const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
var playerClass = require('./player');
var roomClass = require('./room');


//houses all players in the server
var players = {};

//houses all the rooms in the server
var rooms = [];


/* --------------------- ROUTES --------------------------------- */



/* --------------------- SOCKET --------------------------------- */

//logic to listen for connections and disconnections
io.on('connection', function (socket) {

  // create a new player and add it to the players object
  var newPlayer = new playerClass.Player("player " + socket.id, socket.id);
  players[socket.id] = newPlayer;
  //DEBUG
  console.log(newPlayer.name + " connected");


  //check to see if a room exists with a slot for the player
  var myRoom = null;
  var roomFound = false;
  //check if no rooms exist
  if (rooms.length == 0) {
    //store newly created room in global room collection
    var newRoom = new roomClass.Room(rooms.length);
    rooms.push(newRoom);

    //set the room for the player
    myRoom = rooms[0];

    //ensure player info is stored within room and that player knows which room it is in
    myRoom.players.push(players[socket.id]);
    players[socket.id].roomId = myRoom.roomId;
  }
  //if rooms do exist find the first one with an empty slot
  else {
    for (i = 0; i < rooms.length; i++) {
      if (rooms[i].players.length < 4) {
        //set the room for the player
        myRoom = rooms[i];
        
        //ensure player info is stored within room
        myRoom.players.push(players[socket.id]);
        roomFound = true;        
      }
    }
    //if no rooms are found then create a new room
    if (!roomFound) {
      var newRoom = new roomClass.Room(rooms.length);
      //ensure player info is stored within room and that player knows which room it is in
      newRoom.players.push(players[socket.id]);
      players[socket.id].roomId = newRoom.roomId;

      //store newly created room in global room collection
      rooms.push(newRoom);
      myRoom = newRoom;
    }
  }

  //myRoom.joinMessage(players[socket.id]);
  
  /*
  // send the players object to the player
  socket.on('dealHands', function() {
    io.emit('dealHand', players);
  });
  */


  //check to see if all players are ready and start the game
  socket.on('readyUp', function() {

    //if player is clicking ready for first time change status to READY
    if (!players[socket.id].ready) {
      players[socket.id].ready = true;
    }

    //check to see if all players are ready
    if (myRoom.checkReady()) {
      myRoom.startGame();
      //iterate through players in room and deal their specific hand to them
      for (var player of myRoom.players) {
        console.log(players[player.socket_id].hand);
        io.to(player.socket_id).emit('dealHand', players[player.socket_id].hand);
      }
    }
  });

  //when a card is played update the room data to show the changes in the pile
  socket.on('cardPlayed', function(card, pile) {
    //if in spades pile
    if (pile == "s") {
      myRoom.s.push(card);
    }
    //if in diamonds pile
    else if (pile == "d") {
      myRoom.d.push(card);
    }
    //if in hearts pile
    else if (pile =="h") {
      myRoom.h.push(card);
    }
    //if in clubs pile
    else if (pile =="c") {
      myRoom.c.push(card);
    }

    //remove the card from the players hand
    const ind = players[socket.id].hand.indexOf(card);
    players[socket.id].hand.splice(ind, 1);


    //add a new card to the players hand from the deck
    if (myRoom.deck.length > 0) {
      players[socket.id].hand.push(myRoom.deck.shift());

      //redisplay cards on the clients screen
      io.to(socket.id).emit('refreshHand', players[socket.id].hand);
    } 
  });

  //What to do when a user disconnects
  socket.on('disconnect', function () {
    //When a player disconnects remove them from the room by searching through the array of players until socket_id is found
    for (i = 0; i < 4; i++) {
      if (myRoom.players[i].socket_id == socket.id) {
        myRoom.players.splice(i, 1);
        break;
      } 
    }
    //Then check if there are still people within the room (in case prev player just disconnected)
    //if no other players delete the room
    if (myRoom.players.length == 0) {
      rooms.splice(myRoom.roomId, 1);
    }

    //DEBUG CODE
    console.log(players[socket.id].name + ' disconnected');
    delete players[socket.id];
  }); //end socket.on('disconnect')
}); //end io.on('connection')

http.listen(8081, function () {
  console.log('Server Started!');
}); 


/* ------------------------------ DEBUG FUNCTIONS ------------------------------------------ */
var getPlayersFromRooms = function() {
  for (i = 0; i < rooms.length; i++) {
    for (j = 0; j < 4; j++) {
      rooms[i].players[i].name
    }
  }
}

var numRooms = function() {
  return rooms.length;
}