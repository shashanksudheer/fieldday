import io from 'socket.io-client';
import Zone from '../helpers/zone.js';

//a phaser scene allows for having mutliple different 'pages' that can be separate from one another
export default class Game extends Phaser.Scene {
  constructor() {
      super({
          key: 'Game'
      });

      //set up socket to connect to server
      this.socket = io('http://localhost:8081');

      this.hand = [];
  };

  //function that preloads all required assets 
  preload() {
      //load in all the card assets/cards
      this.load.image('0p', 'src/assets/cards/0p.png');
      this.load.image('1c', 'src/assets/cards/1c.png');
      this.load.image('1d', 'src/assets/cards/1d.png');
      this.load.image('1h', 'src/assets/cards/1h.png');
      this.load.image('1j', 'src/assets/cards/1j.png');
      this.load.image('1s', 'src/assets/cards/1s.png');
      this.load.image('2c', 'src/assets/cards/2c.png');
      this.load.image('2d', 'src/assets/cards/2d.png');
      this.load.image('2h', 'src/assets/cards/2h.png');
      this.load.image('2j', 'src/assets/cards/2j.png');
      this.load.image('2s', 'src/assets/cards/2s.png');
      this.load.image('3c', 'src/assets/cards/3c.png');
      this.load.image('3d', 'src/assets/cards/3d.png');
      this.load.image('3h', 'src/assets/cards/3h.png');
      this.load.image('3s', 'src/assets/cards/3s.png');
      this.load.image('4c', 'src/assets/cards/4c.png');
      this.load.image('4d', 'src/assets/cards/4d.png');
      this.load.image('4h', 'src/assets/cards/4h.png');
      this.load.image('4s', 'src/assets/cards/4s.png');
      this.load.image('5c', 'src/assets/cards/5c.png');
      this.load.image('5d', 'src/assets/cards/5d.png');
      this.load.image('5h', 'src/assets/cards/5h.png');
      this.load.image('5s', 'src/assets/cards/5s.png');
      this.load.image('6c', 'src/assets/cards/6c.png');
      this.load.image('6d', 'src/assets/cards/6d.png');
      this.load.image('6h', 'src/assets/cards/6h.png');
      this.load.image('6s', 'src/assets/cards/6s.png');
      this.load.image('7c', 'src/assets/cards/7c.png');
      this.load.image('7d', 'src/assets/cards/7d.png');
      this.load.image('7h', 'src/assets/cards/7h.png');
      this.load.image('7s', 'src/assets/cards/7s.png');
      this.load.image('8c', 'src/assets/cards/8c.png');
      this.load.image('8d', 'src/assets/cards/8d.png');
      this.load.image('8h', 'src/assets/cards/8h.png');
      this.load.image('8s', 'src/assets/cards/8s.png');
      this.load.image('9c', 'src/assets/cards/9c.png');
      this.load.image('9d', 'src/assets/cards/9d.png');
      this.load.image('9h', 'src/assets/cards/9h.png');
      this.load.image('9s', 'src/assets/cards/9s.png');
      this.load.image('10c', 'src/assets/cards/10c.png');
      this.load.image('10d', 'src/assets/cards/10d.png');
      this.load.image('10h', 'src/assets/cards/10h.png');
      this.load.image('10s', 'src/assets/cards/10s.png');
      this.load.image('11c', 'src/assets/cards/11c.png');
      this.load.image('11d', 'src/assets/cards/11d.png');
      this.load.image('11h', 'src/assets/cards/11h.png');
      this.load.image('11s', 'src/assets/cards/11s.png');
      this.load.image('12c', 'src/assets/cards/12c.png');
      this.load.image('12d', 'src/assets/cards/12d.png');
      this.load.image('12h', 'src/assets/cards/12h.png');
      this.load.image('12s', 'src/assets/cards/12s.png');
      this.load.image('13c', 'src/assets/cards/13c.png');
      this.load.image('13d', 'src/assets/cards/13d.png');
      this.load.image('13h', 'src/assets/cards/13h.png');
      this.load.image('13s', 'src/assets/cards/13s.png');
      this.load.image('pileTop', 'src/assets/game-objects/Rectangle 8.png');
      this.load.image('scoreboard', 'src/assets/game-objects/Rectangle 7.png');

      //loading betting sprites
      this.load.image('white', 'src/assets/chips/white.png');
      this.load.image('seven', 'src/assets/chips/seven.png');
      this.load.image('pope', 'src/assets/chips/pope.png');
      this.load.image('joker', 'src/assets/chips/joker.png');

      //loading pile top card suits
      this.load.image('heart', 'src/assets/game-objects/heart.png');
      this.load.image('spade', 'src/assets/game-objects/spade.png');
      this.load.image('club', 'src/assets/game-objects/club.png');
      this.load.image('diamond', 'src/assets/game-objects/diamond.png');

      //Highlighted Card images
      this.load.image('0pH', 'src/assets/cardsH/0pH.png');
      this.load.image('1cH', 'src/assets/cardsH/1cH.png');
      this.load.image('1dH', 'src/assets/cardsH/1dH.png');
      this.load.image('1hH', 'src/assets/cardsH/1hH.png');
      this.load.image('1jH', 'src/assets/cardsH/1jH.png');
      this.load.image('1sH', 'src/assets/cardsH/1sH.png');
      this.load.image('2cH', 'src/assets/cardsH/2cH.png');
      this.load.image('2dH', 'src/assets/cardsH/2dH.png');
      this.load.image('2hH', 'src/assets/cardsH/2hH.png');
      this.load.image('2jH', 'src/assets/cardsH/2jH.png');
      this.load.image('2sH', 'src/assets/cardsH/2sH.png');
      this.load.image('3cH', 'src/assets/cardsH/3cH.png');
      this.load.image('3dH', 'src/assets/cardsH/3dH.png');
      this.load.image('3hH', 'src/assets/cardsH/3hH.png');
      this.load.image('3sH', 'src/assets/cardsH/3sH.png');
      this.load.image('4cH', 'src/assets/cardsH/4cH.png');
      this.load.image('4dH', 'src/assets/cardsH/4dH.png');
      this.load.image('4hH', 'src/assets/cardsH/4hH.png');
      this.load.image('4sH', 'src/assets/cardsH/4sH.png');
      this.load.image('5cH', 'src/assets/cardsH/5cH.png');
      this.load.image('5dH', 'src/assets/cardsH/5dH.png');
      this.load.image('5hH', 'src/assets/cardsH/5hH.png');
      this.load.image('5sH', 'src/assets/cardsH/5sH.png');
      this.load.image('6cH', 'src/assets/cardsH/6cH.png');
      this.load.image('6dH', 'src/assets/cardsH/6dH.png');
      this.load.image('6hH', 'src/assets/cardsH/6hH.png');
      this.load.image('6sH', 'src/assets/cardsH/6sH.png');
      this.load.image('7cH', 'src/assets/cardsH/7cH.png');
      this.load.image('7dH', 'src/assets/cardsH/7dH.png');
      this.load.image('7hH', 'src/assets/cardsH/7hH.png');
      this.load.image('7sH', 'src/assets/cardsH/7sH.png');
      this.load.image('8cH', 'src/assets/cardsH/8cH.png');
      this.load.image('8dH', 'src/assets/cardsH/8dH.png');
      this.load.image('8hH', 'src/assets/cardsH/8hH.png');
      this.load.image('8sH', 'src/assets/cardsH/8sH.png');
      this.load.image('9cH', 'src/assets/cardsH/9cH.png');
      this.load.image('9dH', 'src/assets/cardsH/9dH.png');
      this.load.image('9hH', 'src/assets/cardsH/9hH.png');
      this.load.image('9sH', 'src/assets/cardsH/9sH.png');
      this.load.image('10cH', 'src/assets/cardsH/10cH.png');
      this.load.image('10dH', 'src/assets/cardsH/10dH.png');
      this.load.image('10hH', 'src/assets/cardsH/10hH.png');
      this.load.image('10sH', 'src/assets/cardsH/10sH.png');
      this.load.image('11cH', 'src/assets/cardsH/11cH.png');
      this.load.image('11dH', 'src/assets/cardsH/11dH.png');
      this.load.image('11hH', 'src/assets/cardsH/11hH.png');
      this.load.image('11sH', 'src/assets/cardsH/11sH.png');
      this.load.image('12cH', 'src/assets/cardsH/12cH.png');
      this.load.image('12dH', 'src/assets/cardsH/12dH.png');
      this.load.image('12hH', 'src/assets/cardsH/12hH.png');
      this.load.image('12sH', 'src/assets/cardsH/12sH.png');
      this.load.image('13cH', 'src/assets/cardsH/13cH.png');
      this.load.image('13dH', 'src/assets/cardsH/13dH.png');
      this.load.image('13hH', 'src/assets/cardsH/13hH.png');
      this.load.image('13sH', 'src/assets/cardsH/13sH.png');

      //ready button rectangle
      this.load.image('ready', 'src/assets/game-objects/readyBtn.png');

      this.load.html('nameform', 'src/assets/text/nameform.html');
  };

  //method that essentially runs the game and renders all graphics
  create() {

    //set background color
    this.cameras.main.setBackgroundColor('rgba(162, 170, 164, 1)');
    
    //allow a reference to the scene.
    let self = this;

    //chat box
    var rect = this.add.rectangle(1400, 300, 300, 535, 0x000000).setAlpha(0.7);
    
    var pileCheck;

    //global variable to store current card being dragged & hovered
    var cardKey;

    //zone creation
    const pileX = 300;
    const pileY = 260;
    const pileW = 200;
    const pileL = 300;

    this.zone1 = new Zone(this, "s");
    this.dropZone1 = this.zone1.renderZone(pileX, pileY, pileW, pileL).disableInteractive();
    //this.outline1 = this.zone1.renderOutline(this.dropZone1);
    this.pileTop1 = this.add.image(300, 50, 'pileTop').setScale(0.7, 0.7);
    this.pileSuit1 = this.add.image(300, 50, 'spade').setScale(0.17, 0.17).setTint(0x000000).setAlpha(0.3);

    this.zone2 = new Zone(this, "d");
    this.dropZone2 = this.zone2.renderZone(pileX + 250, pileY, pileW, pileL).disableInteractive();
    //this.outline2 = this.zone2.renderOutline(this.dropZone2);
    this.pileTop2 = this.add.image(550, 50, 'pileTop').setScale(0.7, 0.7);
    this.pileSuit2 = this.add.image(550, 50, 'diamond').setScale(0.17, 0.17).setTint(0x000000).setAlpha(0.3);

    this.zone3 = new Zone(this, "c");
    this.dropZone3 = this.zone3.renderZone(pileX + 500, pileY, pileW, pileL).disableInteractive();
    //this.outline3 = this.zone3.renderOutline(this.dropZone3);
    this.pileTop3 = this.add.image(800, 50, 'pileTop').setScale(0.7, 0.7).setAlpha(0.8);
    this.pileSuit1 = this.add.image(800, 50, 'club').setScale(0.2, 0.2).setTint(0x000000).setAlpha(0.3);

    this.zone4 = new Zone(this, "h");
    this.dropZone4 = this.zone4.renderZone(pileX + 750, pileY, pileW, pileL).disableInteractive();
    //this.outline4 = this.zone4.renderOutline(this.dropZone4);
    this.pileTop4 = this.add.image(1050, 50, 'pileTop').setScale(0.7, 0.7).setAlpha(0.8);
    this.pileSuit1 = this.add.image(1050, 50, 'heart').setScale(0.2, 0.2).setTint(0x000000).setAlpha(0.3);

    
    //section of code to deal with displaying names on the scoreboard
    var nameGroup = this.add.group();

        //display betting chips
    this.add.sprite(75, 600, 'white').setScale(0.3, 0.3).setInteractive();
    this.add.sprite(75, 500, 'joker').setScale(0.3, 0.3).setInteractive();
    this.add.sprite(75, 800, 'pope').setScale(0.3, 0.3).setInteractive();
    this.add.sprite(75, 700, 'seven').setScale(0.3, 0.3).setInteractive(); 

    this.scoreboard = this.add.sprite(1405, 765, 'scoreboard').setScale(2.5, 2.5);

    //ready up button creation
    var readyCreate = () => {
      var readyUp = this.add.group();

      var readyBox = this.add.sprite(1400, 610, 'ready').setScale(2, 2).setAlpha(0.9);
      this.ready = this.add.text(1360, 597, ['READY']).setInteractive().setStyle({
        fontSize: '24px',
        fontFamily: 'Nunito',
        fontStyle: '700',
        color: '#DDFFE6',
      }); 

      readyUp.add(readyBox);
      readyUp.add(this.ready);

      //functions to deal with 'Ready Up' button interactiveness
      this.ready.on('pointerdown', function () {
        self.socket.emit('readyUp');
      });

      this.ready.on('pointerover', function () {
        self.ready.setColor('#b8d6c0');
      });

      this.ready.on('pointerout', function () {
        self.ready.setColor('#DDFFE6');
      });

      return this.ready;
    }

    var readyButton = readyCreate().disableInteractive();

    //Add name input field as HTML DOM element
    var nameSetter = this.add.dom(700, 300).createFromCache('nameform');
    nameSetter.addListener('click');
    nameSetter.on('click', function (event) {
      if (event.target.name === 'playButton') {
          var inputText = this.getChildByName('nameField');
          //  Have they entered anything?
          if (inputText.value !== '') {
              //  Turn off the click events
              this.removeListener('click');

              //  Hide the login element
              this.setVisible(false);
              self.socket.emit('setName', inputText.value);
              readyButton.setInteractive();
          }
      }
    });
    
    var pileNumGroup = this.add.group();

    //make sure to refresh pile numbers on top
    var updatePileNums = function(s, d, c, h) {
      pileNumGroup.clear(true, true);
      var p1pts = s;
      var p2pts = d;
      var p3pts = c;
      var p4pts = h;

      var x = 0;
      var y = 0;
      var z = 0;
      var w = 0;

      if (p1pts > 9) { x = 6; } 
      if (p2pts > 9) { y = 6; } 
      if (p3pts > 9) { z = 6; } 
      if (p4pts > 9) { w = 6; } 
      pileNumGroup.add(self.add.text(330 - x, 34, p1pts).setFontSize(28).setFontFamily('Nunito').setColor('#000000').setAlpha(0.4));
      pileNumGroup.add(self.add.text(580 - y, 34, p2pts).setFontSize(28).setFontFamily('Nunito').setColor('#000000').setAlpha(0.4));
      pileNumGroup.add(self.add.text(830 - z, 34, p3pts).setFontSize(28).setFontFamily('Nunito').setColor('#000000').setAlpha(0.4));
      pileNumGroup.add(self.add.text(1080 - w, 34, p4pts).setFontSize(28).setFontFamily('Nunito').setColor('#000000').setAlpha(0.4));
    }

    //groups
    var pileGroups = this.add.group();

    //function that adds a card to pile graphically
    var addCardToPile = (gameObject, dropZone) => {
      //update the number of cards in pile to calculate offset dynamically
      dropZone.data.values.cards++;

      //set the pile to be centered horizontally and near the top of the zone 
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y  - 70 + (dropZone.data.values.cards * 25);

      //make the card smaller and make it a static object
      gameObject.disableInteractive();
      pileGroups.add(gameObject);
    }

    //*** CARD MANIPULATION (dragging and such)
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;

      //wait for response from server
      if (pileCheck == 1) {
        self.pileTop1.setAlpha(1);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(0.2);
        
        self.dropZone1.setInteractive();
      }
      else if (pileCheck == 2) {
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(1);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(0.2);

        self.dropZone2.setInteractive();
      }
      else if (pileCheck == 3) {
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(1);
        self.pileTop4.setAlpha(0.2);

        self.dropZone3.setInteractive();
      }
      else if (pileCheck == 4) {
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(1);

        self.dropZone4.setInteractive();
      }  

    });//end on drag

    this.input.on('dragstart', function (pointer, gameObject) {
      self.children.bringToTop(gameObject);
      
      //when a card is selected send a request to server to figure out which piles the card can be played on
      cardKey = gameObject.texture.key;

      gameObject.setTexture(cardKey);

      self.socket.emit('checkPiles', cardKey);
      
      //wait for response from server
      if (pileCheck == 0) {

        //highlight the pile tops
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(0.2);

        self.dropZone1.disableInteractive();
        self.dropZone2.disableInteractive();
        self.dropZone3.disableInteractive();
        self.dropZone4.disableInteractive();

      }
      else if (pileCheck == 1) {

        //highlight the pile tops
        self.pileTop1.setAlpha(1);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(0.2);

        self.dropZone2.disableInteractive();
        self.dropZone3.disableInteractive();
        self.dropZone4.disableInteractive();
      }
      else if (pileCheck == 2) {

        //highlight the pile tops
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(1);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(0.2);

        self.dropZone1.disableInteractive();
        self.dropZone3.disableInteractive();
        self.dropZone4.disableInteractive();
      }
      else if (pileCheck == 3) {

        //highlight the pile tops
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(1);
        self.pileTop4.setAlpha(0.2);

        self.dropZone1.disableInteractive();
        self.dropZone2.disableInteractive();
        self.dropZone4.disableInteractive();
      }
      else if (pileCheck == 4) {
        
        //highlight the pile tops
        self.pileTop1.setAlpha(0.2);
        self.pileTop2.setAlpha(0.2);
        self.pileTop3.setAlpha(0.2);
        self.pileTop4.setAlpha(1);

        self.dropZone1.disableInteractive();
        self.dropZone2.disableInteractive();
        self.dropZone3.disableInteractive();
      }
    });//end on dragstart

    //when the card is hovered over the dropzone, make it interactive if it is hovering over the right pile
    this.input.on('dragenter', function(pointer, gameObject, dropZone) {
      if (pileCheck == 1 && dropZone.name == 's') {}
      else if (pileCheck == 2 && dropZone.name == 'd') {}
      else if (pileCheck == 3 && dropZone.name == 'c') {}
      else if (pileCheck == 4 && dropZone.name == 'h') {}
    });//end dragenter

    this.input.on('dragleave', function(point, gameObject, dropZone) {
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {


      //if the card is dropped outside of the dropzone reset it to its original place
      if (!dropped) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
          gameObject.setScale(0.235, 0.235);
      }

      else {
        //if the object has been dropped
        gameObject.setScale(0.17, 0.17);
      }
      
      //reset opacity of all pileTops
      self.pileTop1.setAlpha(1);
      self.pileTop2.setAlpha(1);
      self.pileTop3.setAlpha(1);
      self.pileTop4.setAlpha(1);

    });//end on dragend

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      addCardToPile(gameObject, dropZone);

      //remove the current card from the group (probably not required)
      handGroup.remove(gameObject);

      //when card is dropped update server to add the card to pile object
        //gameObject.texture.key holds the name of the texture (string representation of card)
        //dropZone.name holds the pile name
      self.socket.emit('cardPlayed', gameObject.texture.key, dropZone.name);

      //make cards uninteractive since turn has been completed
      var cards = handGroup.getChildren();
      for (var card of cards) {
        card.disableInteractive();
      }
    }); //end drop

    //hover functions
    var cardHover = function(group) {
      var children = group.getChildren();
      for (var child of children) {
        child.on('pointerover', function(event) {
          this.y -= 20;
          //this.setTexture(cardKey+'H');
        });
    
        child.on('pointerout', function(event) {
          this.y += 20;
          //this.setTexture(cardKey);
        });
      }
    };

    //renders cards as hand on client page
    this.dealCards = (hand) => {
      for (let i = 0; i < 5; i++) {
        this.hand.push(hand[i]);
        let card = handGroup.create(325 + (i * 200), 700, hand[i]).setScale(0.235, 0.235).setInteractive();
          

        this.input.setDraggable(card);

        //make cards uninteractive until it is the players turn
        card.disableInteractive();
      }

      //add the hover stuff
      cardHover(handGroup);

      //disable ready button and replace with rules
      this.ready.disableInteractive();
    };

    /* ------------------------------ SOCKET HANDLERS --------------------------------------- */


    //creating a group for the hand
    var handGroup = this.add.group();

    //when server sends message to refresh hand
    this.socket.on('refreshHand', function(hand) {
      handGroup.clear(true, true);
      self.dealCards(hand);
    });

    this.socket.on('checkPiles', function (piles) {
      pileCheck = piles;
    });

    this.socket.on('refreshPiles', function(s, h, c, d, sP, dP, cP, hP) {
      updatePileNums(sP, dP, cP, hP);

      pileGroups.clear(true, true);

      self.dropZone1.data.values.cards = 0;
      self.dropZone2.data.values.cards = 0;
      self.dropZone3.data.values.cards = 0;
      self.dropZone4.data.values.cards = 0;

      for (var cardS of s) {
        let card = self.add.sprite(0, 0, cardS).setScale(0.17, 0.17);
        addCardToPile(card, self.dropZone1);
      }

      for (var cardS of d) {
        let card = self.add.sprite(0, 0, cardS).setScale(0.17, 0.17);
        addCardToPile(card, self.dropZone2);
      }

      for (var cardS of c) {
        let card = self.add.sprite(0, 0, cardS).setScale(0.17, 0.17);
        addCardToPile(card, self.dropZone3);
      }

      for (var cardS of h) {
        let card = self.add.sprite(0, 0, cardS).setScale(0.17, 0.17);
        addCardToPile(card, self.dropZone4);
      }
    });

    //when server sends dealHand message deal hand to client
    this.socket.on('dealHand', function(hand) {
      self.dealCards(hand);
    });

    //display the names on the scoreboard
    this.socket.on('displayBoard', function(nameArr) {
      var y = 675;
      var i = 0;
      nameGroup.clear(true, true);
      for (var name of nameArr) {
        var newName = self.add.text(1300, y + i, name); //.setFontSize(28).setFontFamily('Nunito').setColor('#FDFDFF');
        newName.setStyle({
          fontSize: '28px',
          fontFamily: 'Nunito',
          fontStyle: '600',
        });
        nameGroup.add(newName);
        i += 45;
      }
    });

    //player can only make a move when it is their turn
    this.socket.on('yourTurn', function() {

      var cards = handGroup.getChildren();
      for (var card of cards) {
        card.setInteractive();
      }
    }); 

    this.socket.on('updateBoardTurn', function(turnName) {
      
      var nameArr = nameGroup.getChildren();

      for (var n of nameArr) {
        if (n.text == turnName) {
          n.setTint(0xc1e3ca);
        }
        else {
          n.setTint(0xFFFFFF);
        }
      }
    });

  } //end create()

  update() {
     
  };//end update
}