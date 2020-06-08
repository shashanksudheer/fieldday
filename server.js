var express = require('express');
var app = express();
var server = require('http').Server(app);
var playerClass = require('./player');
var roomClass = require('./room');


//set up io variable to listen
var io = require('socket.io').listen(server);

//houses all players in the server
var players = {};

//houses all the rooms in the server
var rooms = [];

//houses all the rooms in the server

//Set Folder For Serving Files in the Client Side
app.use(express.static(__dirname + '/public'));


/* --------------------- ROUTES --------------------------------- */

//home route
app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});


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

  //if the room is full, start game
  if (myRoom.players.length >= 2) {  }
  
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
        io.emit('dealHand', players[player.socket_id].hand);
      }
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

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
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