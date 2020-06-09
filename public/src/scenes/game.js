import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';

//a phaser scene allows for having mutliple different 'pages' that can be separate from one another
export default class Game extends Phaser.Scene {
  constructor() {
      super({
          key: 'Game'
      });
  }

  //function that preloads all required assets 
  preload() {
      //load in all the card assets 
      this.load.image('0p', 'src/assets/0p.png');
      this.load.image('1c', 'src/assets/1c.png');
      this.load.image('1d', 'src/assets/1d.png');
      this.load.image('1h', 'src/assets/1h.png');
      this.load.image('1j', 'src/assets/1j.png');
      this.load.image('1s', 'src/assets/1s.png');
      this.load.image('2c', 'src/assets/2c.png');
      this.load.image('2d', 'src/assets/2d.png');
      this.load.image('2h', 'src/assets/2h.png');
      this.load.image('2j', 'src/assets/2j.png');
      this.load.image('2s', 'src/assets/2s.png');
      this.load.image('3c', 'src/assets/3c.png');
      this.load.image('3d', 'src/assets/3d.png');
      this.load.image('3h', 'src/assets/3h.png');
      this.load.image('3s', 'src/assets/3s.png');
      this.load.image('4c', 'src/assets/4c.png');
      this.load.image('4d', 'src/assets/4d.png');
      this.load.image('4h', 'src/assets/4h.png');
      this.load.image('4s', 'src/assets/4s.png');
      this.load.image('5c', 'src/assets/5c.png');
      this.load.image('5d', 'src/assets/5d.png');
      this.load.image('5h', 'src/assets/5h.png');
      this.load.image('5s', 'src/assets/5s.png');
      this.load.image('6c', 'src/assets/6c.png');
      this.load.image('6d', 'src/assets/6d.png');
      this.load.image('6h', 'src/assets/6h.png');
      this.load.image('6s', 'src/assets/6s.png');
      this.load.image('7c', 'src/assets/7c.png');
      this.load.image('7d', 'src/assets/7d.png');
      this.load.image('7h', 'src/assets/7h.png');
      this.load.image('7s', 'src/assets/7s.png');
      this.load.image('8c', 'src/assets/8c.png');
      this.load.image('8d', 'src/assets/8d.png');
      this.load.image('8h', 'src/assets/8h.png');
      this.load.image('8s', 'src/assets/8s.png');
      this.load.image('9c', 'src/assets/9c.png');
      this.load.image('9d', 'src/assets/9d.png');
      this.load.image('9h', 'src/assets/9h.png');
      this.load.image('9s', 'src/assets/9s.png');
      this.load.image('10c', 'src/assets/10c.png');
      this.load.image('10d', 'src/assets/10d.png');
      this.load.image('10h', 'src/assets/10h.png');
      this.load.image('10s', 'src/assets/10s.png');
      this.load.image('11c', 'src/assets/11c.png');
      this.load.image('11d', 'src/assets/11d.png');
      this.load.image('11h', 'src/assets/11h.png');
      this.load.image('11s', 'src/assets/11s.png');
      this.load.image('12c', 'src/assets/12c.png');
      this.load.image('12d', 'src/assets/12d.png');
      this.load.image('12h', 'src/assets/12h.png');
      this.load.image('12s', 'src/assets/12s.png');
      this.load.image('13c', 'src/assets/13c.png');
      this.load.image('13d', 'src/assets/13d.png');
      this.load.image('13h', 'src/assets/13h.png');
      this.load.image('13s', 'src/assets/13s.png');
  }

  //method that renders all the information as required
  create() {
    this.socket = io();
    this.readyUp = this.add.text(75, 350, ['Ready Up']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
    let self = this;
   
    this.socket.on('dealHand', function(hand) {
      self.dealCards(hand);
    });
    
    this.dealCards = (hand) => {
      for (let i = 0; i < 5; i++) {
        let playerCard = new Card(this);
        playerCard.render(475 + (i * 100), 800, hand[i]);
      }
    }

    this.readyUp.on('pointerdown', function () {
      self.socket.emit('readyUp');
    });

    this.readyUp.on('pointerover', function () {
      self.readyUp.setColor('#ff69b4');
    });

    this.readyUp.on('pointerout', function () {
      self.readyUp.setColor('#00ffff');
    })

    //  A drop zone
    var zone = this.add.zone(500, 300, 300, 300).setRectangleDropZone(300, 300);

    //  Just a visual display of the drop zone
    var graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.input.on('dragstart', function (pointer, gameObject) {

        this.children.bringToTop(gameObject);

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = pointer.x;
        gameObject.y = pointer.y;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

        graphics.clear();
        graphics.lineStyle(2, 0x00ffff);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {

        gameObject.x = dropZone.x;
        gameObject.y = dropZone.y;

        gameObject.input.enabled = false;

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }

        graphics.clear();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    });
  
  } //end create()

  update() {
  
  }
}