export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setDisplaySize(150, 239).setInteractive();
            card.input.hitArea.setSize(150, 239);
            scene.input.setDraggable(card);
            return card;
        }
    }
}