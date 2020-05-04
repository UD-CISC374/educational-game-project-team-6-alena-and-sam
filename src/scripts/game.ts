import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import store from './scenes/store';
import news from './scenes/news';
import winScene from './scenes/winScene';
import GameConfig = Phaser.Types.Core.GameConfig;


const DEFAULT_WIDTH = 700;
const DEFAULT_HEIGHT = 400;


const config: GameConfig = {
    backgroundColor: '#e0ddee',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, store, news, winScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 400 }
        }
    },
    render:{pixelArt: true}
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
