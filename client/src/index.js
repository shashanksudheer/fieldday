import Phaser from "phaser";
import Game from "./scenes/game.js";

const config = {
    type: Phaser.AUTO,
    scene: [
        Game
    ],
    scale: {
        parent: 'game',
        mode: Phaser.Scale.ENVELOP,
        width: 1600,
        height: 900
    }
};

const game = new Phaser.Game(config);