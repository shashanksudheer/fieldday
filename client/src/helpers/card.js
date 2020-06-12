export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.sprite(x, y, sprite).setScale(0.15, 0.15).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}