import { GameObject } from "./GameObject";
import { game, objects, x, z, hud } from "./home";
import { Weapon } from "./Weapon";





export class Player extends GameObject {

    moveLeftButton: Phaser.Key;
    moveRightButton: Phaser.Key;

    primaryAttackButton: Phaser.DeviceButton;


    weapon: Weapon;
    score: number;
    speed: number;

    life: number;
    playerLevel: number;
    xp: number;


    constructor(x: number, y: number, spriteName: string) {
        super();
        this.sprite = game.add.sprite(x, y, spriteName)
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.sprite);

        //this.primaryAttackButton = game.input.activePointer.leftButton;
        this.moveLeftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.moveRightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.Start();

    }

    Start() {
        this.weapon = new Weapon(this.sprite, 'bullet', -30, 90, 0);
        //this.weapon.SetAttributes()
        this.score = 0;
        this.speed = 3;

        this.life = 100;
        this.playerLevel = 1;
        this.xp = 0;
    }

    Update() {
        this.Controls();
        this.weapon.Update();

        if(this.life <= 50)
        {
            hud.OpenGameOverScreen();
        }
    }

    Fire() {
        this.weapon.Fire();
    }
    AddXp(addXp: number) {
        this.xp += addXp;
    }

    Controls() {


        if (this.moveLeftButton.isDown && this.sprite.x > 40 || x > 1 && this.sprite.x > 40) {
            this.sprite.x -= this.speed * 2;
        }
        if (x > 1 && this.sprite.x > 40) {
            this.sprite.x -= this.speed * (x / 1.4);
        }
        if (this.moveRightButton.isDown && this.sprite.x < 334 || x < -1 && this.sprite.x < 334) {
            this.sprite.x += this.speed * 2;
        }
        if ( x < -1 && this.sprite.x < 334) {
            this.sprite.x += this.speed * (-x / 1.4);
        }

        // if (this.primaryAttackButton.isDown) {
        //     this.Fire();

        // }
        this.Fire();





    }
}