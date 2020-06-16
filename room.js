class Room {
    constructor(id) {
        this.roomId = id;
        //If no deck data is passed in, the room is created with the state at the initial point in a game
        this.deck = [
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

        //pile data holds arrays of cards in piles
        this.s = [];
        this.d = [];
        this.h = [];
        this.c = [];

        //discarded cards are held in this array
        this.discard = [];

        //boolean that determines if the game is over
        this.over = false;

        //players are stored here
        this.players = [];

        //keeping in track whos turn it is (the current player)
        this.current = 0;
    } //end constructor
    
    //method that starts the game/shuffles deck/deals cards to players/randomly picks a starting player
    startGame() {
        //shuffle the deck
        this.shuffleDeck();
        
        //deal cards out to all players 
        for (var play of this.players) {
            if (play.hand.length == 0) {
                this.dealCards(play, 5);
            }
        }

        //DEBUG CODE
        for (var play of this.players) {
            console.log(play.name + " hand: " + play.hand);
        }

    }

    //function that shuffles deck
    shuffleDeck() {
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
            str = str + " " + this.deck[i];
        }
        return str;
    }

    //removes a card at an index
    removeCard(ind)  {
        return this.deck.splice(ind, 1);
    }

    //deals out amount of cards to a player
    dealCards(player, amount) {
        for (var i = 0; i < amount; i++) {
            player.hand.push(this.deck.shift());
        }
    }

    //check if all players are ready to start game
    checkReady() {
        for (var play of this.players) {
            if (!play.ready) {
                //if a single player is not ready yet, game cannot start
                return false;
            }
        }
        //if all players are ready and there are at least 2 players, game can start
        if (this.players.length >= 2) {
            return true;
        }
    }

}

//export the Room Class to be accessed by other server side files
module.exports = {
    Room: Room,
}