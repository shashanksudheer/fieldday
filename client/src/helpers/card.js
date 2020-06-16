export default class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y);

        this.name = name;


        super.setDataEnabled();
        super.setData('name', name);

        this.render = (x, y, sprite) => {
            let card = scene.add.sprite(x, y, sprite).setScale(0.15, 0.15).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }

    getName() {
        return super.getData('name');
    }
}