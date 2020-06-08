/*
    Field Day Card Game
*/

import io from './node_modules/socket.io-client/dist/socket.io.js';

//CHANGE THIS IN PRODUCTION
socket = io('http://localhost:5000');
socket.on('connect', function () {
    console.log('Connected!');
});


//GLOBALS
const SUITS = ["s", "d", "c", "h"];
const VALS = ["1","2","3","4","5","6","7","8","9","10","11", "12","13"];

//Card Class
class Card {
    //constructor gets passed in a suit and a value
    constructor(suit, val) {
        this.suit = suit;
        this.val = val;
    }

    //returns the string format of the card
    getCard() {
        return this.val + this.suit;
    }
}

//Deck Class
class Deck {
    //Creates a pre-shuffled deck and stores it into the deck array
    constructor() {
        this.deck = []
        for (var i = 0; i < VALS.length; i++) {
            for (var j = 0; j < SUITS.length; j++) {
                var card = new Card(SUITS[j], VALS[i]);
                this.deck.push(card);
            }
        }
        var j1 = new Card("j", 1);
        var j2 = new Card("j", 2);
        var p = new Card("p", 0);
        this.deck.push(j1);
        this.deck.push(j2);
        this.deck.push(p);
        this.shuffle();
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
        var str = "Top -->";
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

//Main class that handles the state of the game
class Game {
    constructor() {
        this.gameDeck = new Deck();
        this.hand = [this.gameDeck.deck[0], this.gameDeck.deck[1], this.gameDeck.deck[2], this.gameDeck.deck[3], this.gameDeck.deck[4]];
        this.s = [];
        this.h = [];
        this.d = [];
        this.c = [];
        //remove the first five cards from the deck (Hand 1)
        for (var i = 0; i < 5; i++) {
            this.gameDeck.deck.shift();
        }
    }

    showHand() {
        var str = "";
        for (var i = 0; i < 5; i++) {
            if (this.hand[i]) {
                str += this.hand[i].getCard() + " ";
            }
        }
        return str;
    }
}



function showCards(game) {
    var handCont = document.getElementById("hand");
    if (handCont.hasChildNodes()) {
        for (var i = 0; i < 4; i++) {
            while (handCont.hasChildNodes()) {  
                handCont.removeChild(handCont.firstChild);
            }
        }
    }
    for (var i = 0; i < game.hand.length; i++) {
        var str = "c" + i;
        var btn = document.createElement("input");
        btn.id = str;
        btn.onclick = createMenu;
        //btn.onblur = resetPlace;
        btn.setAttribute("type", "radio");
        btn.setAttribute("name", "card-btn");
        btn.setAttribute("class", "radio-btn");
        handCont.appendChild(btn);

        var strLabel = "l" + i;
        var img = document.createElement("label");
        var imgLoc = "/static/assets/cards/" + game.hand[i].getCard() + ".png";
        img.style.backgroundImage ="url('" + imgLoc + "')";
        img.classList.add('card');
        img.id = strLabel;
        img.setAttribute("for", str);
        handCont.appendChild(img);
    }
}
//START OF GAME
function startGame() {
    
    var gameDeck = new Deck();
    var hand = [gameDeck.deck[0], gameDeck.deck[1], gameDeck.deck[2], gameDeck.deck[3], gameDeck.deck[4]];
    showCards(hand);
    
   return game;
}

var game = new Game();
showCards(game);
console.log("trying to show cards");


function resetPlace(disable) {
    var menu = document.getElementById("menu");
    var btn = document.createElement("button");
    btn.id = "place-btn";
    btn.classList.add("menu-btn");

    if(disable) {
        btn.classList.add("btn-disabled");
        btn.disabled = true;
    }

    btn.value = "Place";
    btn.innerHTML = "Place";
    btn.onclick = place;
    menu.appendChild(btn);
}
 
function createMenu() {
    //remove piles 
    var menu = document.getElementById("menu");
        while (menu.hasChildNodes()) {
            menu.removeChild(menu.lastChild);
    }

    var menu = document.getElementById("menu");
    var placeBtn = document.getElementById("place-btn");
    var card = game.hand[this.id[1]];
    var rulePassed = ruleCheck(this.id[1]);

    if (rulePassed == 0) {
        resetPlace(true);
        var btn = document.createElement("button");
        btn.id = "ko-btn";
        btn.classList.add("menu-btn");
        btn.innerHTML = "KO";
        btn.onclick = knockout;
        menu.appendChild(btn);
    }
    else if (rulePassed == 1) {
        resetPlace(false);
    }
    else {
        var menu = document.getElementById("menu");
        while (menu.hasChildNodes()) {
            menu.removeChild(menu.lastChild);
        }
        createPiles(rulePassed);
    }
}

function knockout() {
    var check = document.querySelector('input[name="card-btn"]:checked');
    var handInd = check.id[1];
    game.hand.splice(handInd, 1);    //remove card from hand
    var nextCard = game.gameDeck.removeCard(0)[0];        //remove new card from deck
    game.hand.unshift(nextCard);
    showCards(game);
}


/*
    RETURNS
    0 = card cannot be placed down anywhere
    1 = card can be placed into one pile
    2 = An ace can be played to win pile
    3 = A pope can be placed
    4 = A Joker can be placed
    5 = A 3 is in play meaning a pile may be stolen
    6 = A 7 is in play meaning
*/
function ruleCheck(ind) {
    var card = game.hand[ind];

    //Check for spades 
    if (card.suit == 's') {
        //check to see if empty pile
        if (game.s.length == 0) {
            //is it a face card?
            if (card.val > 10) {
                return 0;
            }
            return 1;
        }
        //check for ace pile win condition
        else if (card.val == 1 && game.s.length >= 3) {
            return 2;
        } 
        //check to see if current card has value greater than card on top of pile
        else if (card.val < game.s[game.s.length-1].val) {   
            return 0;
        }
        return 1;
    }

    //check for hearts
    else if (card.suit == 'h') {
        //check to see if empty pile
        if (game.h.length == 0) {
            //is it a face card?
            if (card.val > 10) {
                return 0;
            }
            return 1;
        }
        //check for ace pile win condition
        else if (card.val == 1 && game.h.length >= 3) {
            return 2;
        } 
        //check to see if current card has value greater than card on top of pile
        else if (card.val < game.h[game.h.length-1].val) {   
            return 0;
        }
        return 1;
    }

    //check for diamonds
    else if (card.suit == 'd') {
        //check to see if empty pile
        if (game.d.length == 0) {
            //is it a face card?
            if (card.val > 10) {
                return 0;
            }
            return 1;
        }
        //check for ace pile win condition
        else if (card.val == 1 && game.d.length >= 3) {
            return 2;
        } 
        //check to see if current card has value greater than card on top of pile
        else if (card.val < game.d[game.d.length-1].val) {   
            return 0;
        }
        return 1;
    }

    //check for clubs
    else if (card.suit == 'c') {
        //check to see if empty pile
        if (game.c.length == 0) {
            //is it a face card?
            if (card.val > 10) {
                return 0;
            }
            return 1;
        }
        //check for ace pile win condition
        else if (card.val == 1 && game.c.length >= 3) {
            return 2;
        } 
        //check to see if current card has value greater than card on top of pile
        else if (card.val < game.c[game.c.length-1].val) {   
            return 0;
        }
        return 1;
    }

    //check if pope
    else if (card.suit == 'p') {  
        return 3;
    }

    //check if joker
    else if (card.suit = 'j') {
        return 4;
    }
}


//function finds card that is picked and updates game state
function place() {

    var check = document.querySelector('input[name="card-btn"]:checked');
    if (check != null) {
        var handInd = check.id[1];
            var chosen;
            var label = "l" + handInd;
            var card = game.hand[handInd];
            var chkFirst = true;  //check to see if first card in pile or not (so that css class with negative margin can be added)
            if (card.suit == "s") {
                chosen = document.getElementById("spades");
                game.s.push(game.hand[handInd]);
                if (game.s.length > 1) {
                    chkFirst = false;
                }
            }
            else if (card.suit == "h") {
                chosen = document.getElementById("hearts");
                game.h.push(game.hand[handInd]);
                if (game.h.length > 1) {
                    chkFirst = false;
                }
            }
            else if (card.suit == "d") {
                chosen = document.getElementById("diam");
                game.d.push(game.hand[handInd]);
                if (game.d.length > 1) {
                    chkFirst = false;
                }
            }
            else if (card.suit == "c") {
                chosen = document.getElementById("clubs");
                game.c.push(game.hand[handInd]);
                if (game.c.length > 1) {
                    chkFirst = false;
                }
            }
    
            var img = document.createElement("img");
            img.src = "/static/assets/cards/" + game.hand[handInd].getCard() + ".png";
            img.classList.add('pile-card');
            if (!chkFirst) {
                img.classList.add("neg-margin");
            }
    
    
            game.hand.splice(handInd, 1);    //remove card from hand
            var nextCard = game.gameDeck.removeCard(0)[0];        //remove new card from deck
            game.hand.unshift(nextCard);
    
    
            chosen.appendChild(img);
    
    
            showCards(game);

    }
}

function createPiles(rulePassed) {
    var menu = document.getElementById("menu");
    var chkArr = function(rulePassed) {
        var arr = [true, true, true, true];
        
    }
    for (i = 1; i < 5; i++) {                                
            var btn = document.createElement("button");
            btn.classList.add("menu-btn");
            btn.id = "p" + i;
            btn.innerHTML = "Pile " + i;
            btn.onclick = pileHandler;
            menu.appendChild(btn);
    }
}

function pileHandler() {
    var check = document.querySelector('input[name="card-btn"]:checked');
    var handInd = check.id[1];
    var pile = this.id[1];
    if (pile == 1) {
        chosen = document.getElementById("spades");
        game.s.push(game.hand[handInd]);
    }
    else if (pile == 2) {
        chosen = document.getElementById("hearts");
        game.h.push(game.hand[handInd]);
    }
    else if (pile == 3) {
        chosen = document.getElementById("diam");
        game.d.push(game.hand[handInd]);
    }
    else if (pile == 4) {
        chosen = document.getElementById("clubs");
        game.c.push(game.hand[handInd]);
    }

    var img = document.createElement("img");
    img.src = "/static/assets/cards/" + game.hand[handInd].getCard() + ".png";
    img.classList.add('pile-card');
    img.classList.add("neg-margin");

    game.hand.splice(handInd, 1);    //remove card from hand
    var nextCard = game.gameDeck.removeCard(0)[0];        //remove new card from deck
    game.hand.unshift(nextCard);


    chosen.appendChild(img);

    showCards(game);
}

