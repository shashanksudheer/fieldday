import Phaser from "phaser";
import Game from "./scenes/game.js";

const config = {
    type: Phaser.AUTO,
    scene: [
        Game
    ],
    scale: {
        parent: 'game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 900,
    },
    dom: {
        createContainer: true
    },
};

const game = new Phaser.Game(config);