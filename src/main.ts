import Phaser from 'phaser'

import HelloWorldScene from './davep/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 1024,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 30 },
      debug: false
    },
  },
  scene: [HelloWorldScene],
}

export default new Phaser.Game(config)