import Game from "./scenes/game.js";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 1920,
    height: 1080,
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);