import io from 'socket.io-client';
import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';

//a phaser scene allows for having mutliple different 'pages' that can be separate from one another
export default class Game extends Phaser.Scene {
  constructor() {
      super({
          key: 'Game'
      });

      //set up socket to connect to server
      this.socket = io('http://localhost:8081');

      //save hand information on client side (NOT REQUIRED - DOUBLE CHECK)
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

      //Highlighted Card images
      this.load.image('1cH', 'src/assets/1cH.png');

      //ready button rectangle
      this.load.image('ready', 'src/assets/game-objects/readyBtn.png');
  };

  //method that essentially runs the game and renders all graphics
  create() {

    //set background color
    this.cameras.main.setBackgroundColor('rgba(162, 170, 164, 1)');
    
    //allow a reference to the scene.
    let self = this;
   
    //when server sends dealHand message deal hand to client
    this.socket.on('dealHand', function(hand) {
      self.dealCards(hand);
    });

    //creating a group for the hand
    var handGroup = this.add.group();

    //when server sends message to refresh hand
    this.socket.on('refreshHand', function(hand) {
      handGroup.clear(true, true);
      self.dealCards(hand);
    });

    //renders cards as hand on client page
    this.dealCards = (hand) => {
      for (let i = 0; i < 5; i++) {
        this.hand.push(hand[i]);
        let card = handGroup.create(325 + (i * 200), 700, hand[i]).setScale(0.235, 0.235).setInteractive();
        
        //hover functions
        card.on('pointerover', function() {
          card.y -= 20;
        });
        card.on('pointerout', function() {
          card.y += 20;
        });

        this.input.setDraggable(card);
      }
    };

    this.scoreboard = this.add.sprite(1405, 765, 'scoreboard').setScale(2.5, 2.5);

    var readyUp = this.add.group();

    var readyBox = this.add.sprite(1400, 600, 'ready').setScale(2, 2).setAlpha(0.9);

    //ready up button creation
    this.ready = this.add.text(1372, 590, ['READY']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

    readyUp.add(readyBox);
    readyUp.add(this.ready);

    //functions to deal with 'Ready Up' button interactiveness
    this.ready.on('pointerdown', function () {
      self.socket.emit('readyUp');
    });

    this.ready.on('pointerover', function () {
      self.ready.setColor('#ff69b4');
    });

    this.ready.on('pointerout', function () {
      self.ready.setColor('#00ffff');
    });


    var rect = this.add.rectangle(1400, 300, 300, 500, 0x000000).setAlpha(0.7);

    //zone creation
    this.zone1 = new Zone(this, "s");
    this.dropZone1 = this.zone1.renderZone(300, 230, 200, 300);
    this.outline1 = this.zone1.renderOutline(this.dropZone1);

    this.zone2 = new Zone(this, "d");
    this.dropZone2 = this.zone2.renderZone(550, 230, 200, 300);
    this.outline2 = this.zone2.renderOutline(this.dropZone2);

    this.zone3 = new Zone(this, "c");
    this.dropZone3 = this.zone3.renderZone(800, 230, 200, 300);
    this.outline3 = this.zone3.renderOutline(this.dropZone3);

    this.zone4 = new Zone(this, "h");
    this.dropZone4 = this.zone4.renderZone(1050, 230, 200, 300);
    this.outline4 = this.zone4.renderOutline(this.dropZone4);


    //*** CARD MANIPULATION (dragging and such)
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = pointer.x;
        gameObject.y = pointer.y;

    });//end on drag

    this.input.on('dragstart', function (pointer, gameObject) {
      self.children.bringToTop(gameObject);
      gameObject.setTexture(gameObject.texture.key);
      //when a card is selected send a request to server to figure out which piles the card can be played on
      self.socket.emit('checkPiles', gameObject.texture.key);
    });//end on dragstart

    this.input.on('dragend', function (pointer, gameObject, dropped) {

      gameObject.setTexture(gameObject.texture.key);

      //if the card is dropped outside of the dropzone reset it to its original place
      if (!dropped) {
          gameObject.x = gameObject.input.dragStartX;
          gameObject.y = gameObject.input.dragStartY;
          gameObject.setScale(0.235, 0.235);
      }

      else {
        //if the object has been dropped
        gameObject.setScale(0.15, 0.15);
      }
      

    });//end on dragend

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      //update the number of cards in pile to calculate offset dynamically
      dropZone.data.values.cards++;

      //set the pile to be centered horizontally and near the top of the zone 
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y - 100 + (dropZone.data.values.cards * 25);

      //make the card smaller and make it a static object
      gameObject.disableInteractive();

      //remove the current card from the group (probably not required)
      handGroup.remove(gameObject);

      //when card is dropped update server to add the card to pile object
        //gameObject.texture.key holds the name of the texture (string representation of card)
        //dropZone.name holds the pile name
      self.socket.emit('cardPlayed', gameObject.texture.key, dropZone.name);
    }); //end drop

  } //end create()

  update() {
     
  };//end update
}