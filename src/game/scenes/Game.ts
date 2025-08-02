import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    platform: Phaser.Physics.Arcade.Image;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        var width = this.game.config.width as number;
        var height =this.game.config.height as number;

        this.camera = this.cameras.main;

        this.background = this.add.image(width/2, height/2, 'background');
        this.background.setScale(2);

        this.platform = this.physics.add.image(width/2, height*2.25, 'gameWheel');

        this.platform.setImmovable(true);
        this.platform.setVelocity(0, 0);
        (this.platform.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        this.platform.setScale(1);

        EventBus.emit('current-scene-ready', this);
    }

    update ()
    {
        this.platform.rotation -= 0.001;
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
