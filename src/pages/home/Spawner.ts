import { GameObject } from "./GameObject";
import { Rock } from "./Rock";
import { objects } from "./home";

export class Spawner extends GameObject {

    spawnRate: number;
    nextSpawnRate: number;
    rocks: Rock[];
    level: number;

    constructor() {
        super();
        this.spawnRate = 200;
        this.nextSpawnRate = 0;
        this.rocks = [];
        this.level = 1;
    }

    Update() {
        if (this.rocks.length < 4) {
            this.nextSpawnRate++;
            if (this.nextSpawnRate >= this.spawnRate) {
                /* this.SpawnRandomRock(Phaser.Math.random(50, 300), 150, Phaser.Math.roundTo(Phaser.Math.random(100, 500)), Phaser.Math.random(1, 2));
                this.nextSpawnRate = 0; */
                this.level = Phaser.Math.roundTo(Phaser.Math.random(1, 5));
                this.SpawnRock(Phaser.Math.random(50, 300), 150,this.level);
                this.nextSpawnRate = 0;
            }
        }
    }
    SetSpawnRate(sr: number)
    {
        this.spawnRate = sr;
    }
    SetRockColorAndLevel(level: number, rock: Rock)
    {
        switch (level) {
            case 1:
                rock.sprite.tint = Phaser.Color.GREEN;
                rock.SetMaxHealth(25);
                rock.SetSize(0.8);
                break;
            case 2:
                rock.sprite.tint = Phaser.Color.BLUE;
                rock.SetMaxHealth(30);
                rock.SetSize(1.2);
                break;
            case 3:
                rock.sprite.tint = Phaser.Color.AQUA;
                rock.SetMaxHealth(50);
                rock.SetSize(1.5);
                break;
            case 4:
                rock.sprite.tint = Phaser.Color.VIOLET;
                rock.SetMaxHealth(70);
                rock.SetSize(1.8);
                break;
            case 5:
                rock.sprite.tint = Phaser.Color.BLACK;
                rock.SetMaxHealth(100);
                rock.SetSize(2);
                break;
        }
    }
    RandomColor(rock: Rock) {
        let random = Phaser.Math.roundTo(Phaser.Math.random(0, 4))
        switch (random) {
            case 0:
                rock.sprite.tint = Phaser.Color.GREEN;
                break;
            case 1:
                rock.sprite.tint = Phaser.Color.BLUE;
                break;
            case 2:
                rock.sprite.tint = Phaser.Color.AQUA;
                break;
            case 3:
                rock.sprite.tint = Phaser.Color.VIOLET;
                break;
            case 4:
                rock.sprite.tint = Phaser.Color.BLACK;
                break;

        }
    }
    SpawnRandomRock(x: number, y: number, maxHealth: number, size: number) {
        let rock = new Rock(x, y, maxHealth, size);

        this.RandomColor(rock);
        objects.push(rock);
        this.rocks.push(rock);
    }
    SpawnRock(x: number, y: number, level:number) {
        let rock = new Rock(x, y, 1, 1);
        this.SetRockColorAndLevel(level, rock);
        objects.push(rock);
        this.rocks.push(rock);
    }
}