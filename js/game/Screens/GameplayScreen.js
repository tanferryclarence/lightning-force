import SpaceBackground from '../Backgrounds/SpaceBackground.js'
import MantisShip from '../Entities/Ships/Mantis/MantisShip.js'
import EnemySpawner from '../Entities/Spawners/EnemySpawner.js'
import { spawnList } from '../../spawn-config.js'

export default class GameplayScreen extends PIXI.Container {
    constructor(app) {
        super()

        this.app = app
        this.app.enemies = [] // List of enemies
        this.app.bullets = [] // List of bullets
        this.app.totalGameTime = 0.0
        this.app.lives = 5
        this.app.score = 0
        this.app.highScore = 0

        this.alpha = 0.0
        this.resetSeconds = 0

        spawnList.forEach((list) => {
            if(this.resetSeconds === 0 || list.spawnTimeFrame > this.resetSeconds) {
                this.resetSeconds = (list.spawnTimeFrame + 5)
            }
        })

        this.spaceBackground = new SpaceBackground(this.app)
        this.playerShip = new MantisShip(this.app) // ONGOING - CHANGE SHIP SWITCH CASE
        this.enemySpawner = new EnemySpawner(this.app)

        this.livesText = new PIXI.Text('LIVES ' + this.app.lives, {
            fontFamily: 'Counter',
            fontSize: 32,
            fill: 0x00ff00
        })
        this.livesText.x = 32
        this.livesText.y = 32

        this.scoreText = new PIXI.Text('SCORE ' + this.app.score, {
            fontFamily: 'Counter',
            fontSize: 32,
            fill: 0x00ff00
        })
        this.scoreText.x = 32
        this.scoreText.y = 68

        this.app.UpdateLives = () => {
            this.livesText.text = 'LIVES ' + this.app.lives
        }

        this.app.UpdateScore = () => {
            this.scoreText.text = 'SCORE ' + this.app.score
        }

        this.addChild(this.spaceBackground)
        this.addChild(this.playerShip)
        this.addChild(this.livesText)
        this.addChild(this.scoreText)
    }

    Update(delta) {
        if(Math.floor(this.app.totalGameTime / 1000) >= this.resetSeconds) {
            this.app.totalGameTime = 0.0
            this.enemySpawner.ResetSpawnList()
        }

        this.spaceBackground.Update(delta)
        this.playerShip.Update(delta)
        this.enemySpawner.Update(delta)

        this.app.enemies.forEach((enemy) => {
            if(!enemy.destroyed) enemy.Update(delta)
        })

        this.app.bullets.forEach((bullet) => {
            if(!bullet.destroyed) bullet.Update(delta)
        })

        this.app.totalGameTime += delta / PIXI.settings.TARGET_FPMS
    }

    ApplyRendererScale() {
        this.spaceBackground.ApplyRendererScale()
        this.playerShip.ApplyRendererScale()

        this.app.enemies.forEach((enemy) => {
            enemy.ApplyRendererScale()
        })
        
        this.app.bullets.forEach((bullet) => {
            bullet.ApplyRendererScale()
        })
    }
}
