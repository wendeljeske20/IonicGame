import { GameObject } from "./GameObject";
import { game, objects, player, RemoveArray, spawner, ground } from "./home";

export class Rock extends GameObject {

    currentHealth: number;
    maxHealth: number;
    healthText: Phaser.Text;

    constructor(x: number, y: number, maxHealth: number, size: number) {
        super();

        this.sprite = game.add.sprite(x, y, 'rock');  //sprite.inputEnabled = true;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.scale.setTo(size, size);


        this.StartBody();

        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.healthText = this.GetText(x, y, "0", "20px Arial", "#ffffff");


    }

    Update() {

        if (!player.alive) {
            this.Destroy();
        }
        this.healthText.text = this.currentHealth.toString();
        this.healthText.position.setTo(this.sprite.x, this.sprite.y);
        if (ground)
            game.physics.arcade.collide(this.sprite, ground);

        if (this.currentHealth <= 0) {
            this.PlayerReward(this.maxHealth);
            this.Destroy();
        }
    }
    PlayerReward(mh: number) {

        player.AddXp(100);
        player.score += 100;

    }
    SetMaxHealth(mh: number) {
        this.maxHealth = mh;
        this.currentHealth = mh;
    }
    SetSize(size: number) {
        this.sprite.scale.setTo(size, size);
    }
    StartBody() {
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.y = 1;
        this.sprite.body.bounce.x = 1;
        this.sprite.body.gravity.y = 300;
        this.sprite.body.velocity.x = 70;
    }

    TakeDamage(damage: number) {
        this.currentHealth -= damage;
    }

    GetText(x: number, y: number, text: string, fontSize: string, fillColor: string): Phaser.Text {
        let t = game.add.text(x, y, text, { font: fontSize, fill: fillColor, align: "center" });
        t.anchor.setTo(0.5, 0.5);
        return t;
    }

    Destroy() {

        // this.explosionAnim.play(50, false);

        this.sprite.kill();
        this.healthText.kill();
        RemoveArray(objects, this);
        RemoveArray(spawner.rocks, this);


    }



}