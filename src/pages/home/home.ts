import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion'

import "pixi";
import "p2";
import * as Phaser from "phaser-ce";
import { Player } from './Player';
import { GameObject } from './GameObject';
import { Rock } from './Rock';
import { HUD } from './HUD';
import { Spawner } from './Spawner';

export let game: Phaser.Game;
export let player: Player;
export let objects: GameObject[];


export let hud: HUD;
export let ground: Phaser.Sprite;
export let spawner: Spawner;

export let x: any = 0;
export let y: any = 0;
export let z: any = 0;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  id: any;
  constructor(public navCtrl: NavController, platform: Platform, public deviceMotion: DeviceMotion) {
    
    platform.ready().then((readySource) => {

      console.log('Width: ' + platform.width() + ', Height: ' + platform.height());
      this.buildPhaserRenderer(platform.width(), platform.height());

    });




  }
  Start() {
    try {
      var option: DeviceMotionAccelerometerOptions =
      {
        frequency: 100
      }
      this.id = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {
        x = acc.x;
        y = acc.y;
        z = acc.z;
        
      }
      );
    } catch (err) {
      alert('Error ' + err);
    }
  }

  Stop() {
    this.id.unsubscribe();

  }

  private buildPhaserRenderer(width, height) {
    game = new Phaser.Game(width, height, Phaser.CANVAS, 'gamePanel',
      { preload: Preload, create: Create, update: Update, render: Render });
  }
}


function Preload() {
  game.load.image('backgroud', '././assets/sprites/backgroud.png');
  game.load.image('ground', '././assets/sprites/ground.png');
  game.load.image('cannon', '././assets/sprites/cannon.png');
  game.load.image('bullet', '././assets/sprites/bullet.png');
  game.load.image('rock', '././assets/sprites/rock.png');
  game.load.image('downHUD', '././assets/sprites/DownHUD.png');
  game.load.image('game_over', '././assets/sprites/game_over.png');
  game.load.image('try_again', '././assets/sprites/try_again.png');
  game.load.image('quit', '././assets/sprites/quit.png');

}
function Create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  objects = [];


  let background = game.add.sprite(0, 0, 'backgroud');

  ground = game.add.sprite(0, 550, 'ground');
  game.physics.arcade.enable(ground);
  ground.visible = false;
  ground.body.immovable = true;

  //sprite.events.onInputDown.add(onDown, this);


  //game.input.addPointer();



  player = new Player(game.world.centerX, 520, 'cannon');
  hud = new HUD();
  spawner = new Spawner();


  objects.push(player);
  objects.push(hud);
  objects.push(spawner);

}

function Update() {



  for (let i = 0; i < objects.length; i++) {

    objects[i].Update();
  }
  CollisionTest();

}

function CollisionTest() {
  for (let i = 0; i < player.weapon.bullets.length; i++) {
    for (let j = 0; j < spawner.rocks.length; j++) {
      if (spawner.rocks[j] && player.weapon.bullets[i]) {

        if (game.physics.arcade.overlap(spawner.rocks[j].sprite, player.weapon.bullets[i].sprite)) {
          spawner.rocks[j].TakeDamage(10);
          player.weapon.bullets[i].Destroy();
        }
      }

    }
  }
  for (let j = 0; j < spawner.rocks.length; j++) {
    if (game.physics.arcade.overlap(spawner.rocks[j].sprite, player.sprite)) {
      spawner.rocks[j].Destroy();
      player.life -= 6 * spawner.level;
    }
  }
}
function Render() {
}

function onDown(s) {
  s.x += 5;
}

export function RemoveArray(array, object) {
  let index = array.indexOf(object, 0)
  if (index > -1) {
    delete array[index];
    array.splice(index, 1);
  }

}
