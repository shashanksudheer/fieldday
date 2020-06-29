class Room {
    constructor(id) {
        this.roomId = id;
        //If no deck data is passed in, the room is created with the state at the initial point in a this
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

        //array holds cumulative point values of piles
        this.points = [0, 0, 0, 0];

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
        if (this.players.length >= 1) {
            return true;
        }
    }

    getPlayerNames() {
        var nameArr = [];
        for (var player of this.players) {
            nameArr.push(player.name);
        }
        return nameArr;
    }

       
    /*
        Main function that determines which pile a card can be placed on
        RETURNS
        0 = card cannot be placed down anywhere
        1 = card can be placed into spades pile
        2 = card can be placed into diamonds pile
        3 = card can be placed into clubs pile
        4 = card can be placed into hearts pile 
        5 - ace to win
        6 = A pope can be placed
        7 = A Joker can be placed
        8 = A 3 can be played meaning a pile may be stolen
        9 = A 7 is in play meaning
    */
    ruleCheck(s) {
        var card = {
            suit: s.slice(-1),
            val: s.substring(0, s.length - 1)
        };

        console.log(card);
    
        //Check for spades 
        if (card.suit == 's') {
            //check to see if empty pile
            if (this.s.length == 0) {
                //is it a face card?
                if (card.val > 10) {
                    return 0;
                }
                return 1;
            }
            //check for ace pile win condition
            else if (card.val == 1 && this.s.length >= 3) {
                return 1;
            } 
            //check to see if current card has value greater than card on top of pile
            else if (card.val < this.s[this.s.length-1].substring(0, this.s[this.s.length-1].length-1)) {   
                return 0;
            }
            return 1;
        }
    
        //check for hearts
        else if (card.suit == 'h') {
            //check to see if empty pile
            if (this.h.length == 0) {
                //is it a face card?
                if (card.val > 10) {
                    return 0;
                }
                return 4;
            }
            //check for ace pile win condition
            else if (card.val == 1 && this.h.length >= 3) {
                return 4;
            } 
            //check to see if current card has value greater than card on top of pile
            else if (card.val < this.h[this.h.length-1].substring(0, this.h[this.h.length-1].length-1)) {   
                return 0;
            }
            return 4;
        }
    
        //check for diamonds
        else if (card.suit == 'd') {
            //check to see if empty pile
            if (this.d.length == 0) {
                //is it a face card?
                if (card.val > 10) {
                    return 0;
                }
                return 2;
            }
            //check for ace pile win condition
            else if (card.val == 1 && this.d.length >= 3) {
                return 2;
            } 
            //check to see if current card has value greater than card on top of pile
            else if (card.val < this.d[this.d.length-1].substring(0, this.d[this.d.length-1].length-1)) {   
                return 0;
            }
            return 2;
        }
    
        //check for clubs
        else if (card.suit == 'c') {
            //check to see if empty pile
            if (this.c.length == 0) {
                //is it a face card?
                if (card.val > 10) {
                    return 0;
                }
                return 3;
            }
            //check for ace pile win condition
            else if (card.val == 1 && this.c.length >= 3) {
                return 3;
            } 
            //check to see if current card has value greater than card on top of pile
            else if (card.val < this.c[this.c.length-1].substring(0, this.c[this.c.length-1].length-1)) {   
                return 0;
            }
            return 3;
        }
    
        //check if pope
        else if (card.suit == 'p') {  
            return 6;
        }
    
        //check if joker
        else if (card.suit = 'j') {
            return 7;
        }
    }//end rulecheck

    //calculate points of piles and store updated points in array
    calculatePoints() {
        var sum = 0;
        //calc for spades
        for (var card of this.s) {
            sum += Number(card.substring(0, card.length - 1));
        }
        this.points[0] = sum;

        sum = 0;
        for (var card of this.d) {
            sum += Number(card.substring(0, card.length - 1));
        }
        this.points[1] = sum;

        sum = 0;
        for (var card of this.c) {
            sum += Number(card.substring(0, card.length - 1));
        }
        this.points[2] = sum;

        sum = 0;
        for (var card of this.h) {
            sum += Number(card.substring(0, card.length - 1));
        }
        this.points[3] = sum;
    }
}

//export the Room Class to be accessed by other server side files
module.exports = {
    Room: Room,
}