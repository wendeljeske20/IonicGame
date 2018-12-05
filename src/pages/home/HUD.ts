import { GameObject } from "./GameObject";
import { game, objects, player, spawner } from "./home";
import { Sprite, Button, Color } from "phaser-ce";
import { Player } from "./Player";

export class HUD extends GameObject {

    //objectsText: Phaser.Text;
    //bulletsText: Phaser.Text;
    //rocksText: Phaser.Text;
    scoreText: Phaser.Text;
    playerLifeText: Phaser.Text;
    playerXpText: Phaser.Text;
    playerLvlText: Phaser.Text;
    downHUD: Phaser.Sprite;

    gameOverTitle: Phaser.Sprite;
    gameOverQuitButton: Button;
    gameOverTryAgainButton: Button;



    constructor() {
        super();
        this.downHUD = game.add.sprite(0, 501, 'downHUD');
        //this.objectsText = this.GetText(40, 15, "0", "15px Arial", "#ffffff");
        //this.bulletsText = this.GetText(120, 15, "0", "15px Arial", "#ffffff");
        //this.rocksText = this.GetText(200, 15, "0", "15px Arial", "#ffffff");
        this.scoreText = this.GetText(315, 580, "0", "35px Arial", "#000000");
        this.playerLvlText = this.GetText(315, 535, "0", "35px Arial", "#000000");
        this.playerLifeText = this.GetText(60, 545, "0", "30px Arial", "#000000");



       // this.OpenGameOverScreen();
    }

    Update() {
        //this.objectsText.text = "Objects: " + objects.length.toString();
        //this.bulletsText.text = "Bullets: " + player.weapon.bullets.length.toString();
        //this.rocksText.text = "Rocks: " + spawner.rocks.length.toString();
        this.scoreText.text = player.score.toString();
        this.playerLvlText.text = player.playerLevel.toString();
        this.playerLifeText.text = player.life.toString();
    }

    GetText(x: number, y: number, text: string, fontSize: string, fillColor: string): Phaser.Text {
        let t = game.add.text(x, y, text, { font: fontSize, fill: fillColor, align: "center" });
        t.anchor.setTo(0.5, 0.5);
        return t;
    }

    OpenGameOverScreen() {
        this.gameOverTitle = game.add.sprite(game.world.centerX, 200, "game_over");
        this.gameOverTryAgainButton = game.add.button(game.world.centerX, 270, "try_again");
        this.gameOverTryAgainButton.onInputUp.add(this.ButtonTryAgainUp, this);
        this.gameOverQuitButton = game.add.button(game.world.centerX, 330, "quit");

        this.gameOverTitle.anchor.setTo(0.5, 0.5);
        this.gameOverTryAgainButton.anchor.setTo(0.5, 0.5);
        this.gameOverQuitButton.anchor.setTo(0.5, 0.5);
    }

    ButtonTryAgainUp() {
        this.Restart();
        this.CloseGameOverScreen();
       
    }

    Restart()
    {
        player.Start();
        spawner.Start();

    }

    CloseGameOverScreen() {
        this.gameOverTitle.kill();
        this.gameOverTryAgainButton.kill();
        this.gameOverQuitButton.kill();

    }
}