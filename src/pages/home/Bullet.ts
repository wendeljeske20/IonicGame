import { game, objects, RemoveArray, player } from "./home";
import { GameObject } from "./GameObject";

export class Bullet extends GameObject {


    damage: number;

    speed: number;
    maxSpeed: number;


    constructor(x: number, y: number, spriteName: string, speed: number, damage: number) {
        super();
        this.Start(x, y, spriteName);
        this.speed = speed;
        this.maxSpeed = speed;
        this.damage = damage;

       
    }
    Start(x: number, y: number, spriteName) {

        this.sprite = game.add.sprite(x, y, spriteName)
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(0.5, 0.5);
        //this.sprite.renderOrderID = 100;
        game.physics.arcade.enable(this.sprite);
    }

    Update() {
        this.sprite.y -= this.speed;
        if (this.sprite.y < 20) {

            this.Destroy();
        }

    }

    Destroy() {

        // this.explosionAnim.play(50, false);
        this.sprite.kill();
        RemoveArray(objects, this);
        RemoveArray(player.weapon.bullets, this);


    }


}

