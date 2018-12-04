import { player, game, objects } from "./home";
import { GameObject } from "./GameObject";
import { Bullet } from "./Bullet";


export class Weapon extends GameObject {

    fire_sfx: Phaser.Sound;
    spriteName: string;

    trackSprite: Phaser.Sprite;
    fireAngle: number;

    fireRate: number;
    nextFire: number;
    //reloadTime: number;
    //nextReload: number;
    //fireCount: number;
    //nextFireCount: number;
    bullets: Bullet[];
    //shooting: boolean;

    damage: number;
    bulletSpeed: number;


    offsetX: number;
    offsetY: number;

    constructor(trackSprite: Phaser.Sprite, spriteName: string, offsetX: number, offsetY: number, fireAngle: number) {
        super();
        this.trackSprite = trackSprite;
        this.spriteName = spriteName;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.fireAngle = fireAngle;



        this.sprite = game.add.sprite(trackSprite.x, trackSprite.y, null);
        this.sprite.anchor.setTo(0.5, 0.5);

        this.damage = 10;
        this.fireRate = 15;
        this.nextFire = 0;
        this.bulletSpeed = 7;

        //this.shooting = false;

        //this.fireDelay = 0;
        this.bullets = [];




    }


    Update() {
        this.nextFire++;
        this.sprite.x = this.trackSprite.x + (this.offsetX * Math.cos(Phaser.Math.degToRad(this.offsetY)));
        this.sprite.y = this.trackSprite.y + (this.offsetX * Math.sin(Phaser.Math.degToRad(this.offsetY)));
        /*         this.sprite.x = this.trackSprite.x + (this.offsetX * Math.cos(this.trackSprite.rotation + Phaser.Math.degToRad(this.offsetY)));
                this.sprite.y = this.trackSprite.y + (this.offsetX * Math.sin(this.trackSprite.rotation + Phaser.Math.degToRad(this.offsetY))); */

    }


    SetAttributes(damage: number, bulletSpeed: number, fireRate: number, offsetX?: number, offsetY?: number, fireAngle?: number) {
        if (damage) this.damage = damage;
        if (bulletSpeed) this.bulletSpeed = bulletSpeed;
        if (fireRate) this.fireRate = fireRate;

        if (offsetX) this.offsetX = offsetX;
        if (offsetY) this.offsetY = offsetY;
        if (fireAngle) this.fireAngle = fireAngle;

    }


    Fire() {
        if (player == null)
            return;



        if (this.nextFire >= this.fireRate) {
            //this.fire_sfx.allowMultiple = true;
            //this.fire_sfx.play('high_volume', null, this.fire_sfx.volume);
            this.SpawnBullet();

            this.nextFire = 0;
        }



    }





    SpawnBullet() {

        
        var x = this.sprite.x + (Math.cos(this.trackSprite.rotation + Phaser.Math.degToRad(this.fireAngle)));
        var y = this.sprite.y + (Math.sin(this.trackSprite.rotation + Phaser.Math.degToRad(this.fireAngle)));


        let b = new Bullet(x, y, this.spriteName, this.bulletSpeed, this.damage);
        //game.physics.arcade.moveToXY(b.sprite, x, y, this.bulletSpeed);
        // this.fire_sfx.play('high_volume', null, this.fire_sfx.volume);

        //b.sprite.rotation = this.trackSprite.rotation;
        
        this.bullets.push(b);
        objects.push(b);
        


    }


}