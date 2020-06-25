/*
    Field Day Card Game
*/



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
            img.src = "/assets/cards/" + game.hand[handInd].getCard() + ".png";
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
    img.src = "/assets/cards/" + game.hand[handInd].getCard() + ".png";
    img.classList.add('pile-card');
    img.classList.add("neg-margin");

    game.hand.splice(handInd, 1);    //remove card from hand
    var nextCard = game.gameDeck.removeCard(0)[0];        //remove new card from deck
    game.hand.unshift(nextCard);


    chosen.appendChild(img);

    showCards(game);
}

