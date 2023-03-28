// !REQUIRED! ADD MORE BULLET SCRIPT HERE
import { enemyShipBulletScripts } from '../../../spawn-config.js'
// !REQUIRED! IMPORT MORE BULLET SCRIPT HERE
import {
    BulletScript001,
    BulletScript002,
    BulletScript003,
} from '../Bullets/BulletScripts.js'

import ExplosionSpawner from '../Spawners/ExplosionSpawner.js'

export default class EnemyShip extends PIXI.Container {
    constructor(app, enemySprite, health, hitRadius, x, y, velocity, path, bulletProperties) {
        super()

        this.app = app

        this.enemySprite = enemySprite
        this.tag = 'enemy'

        this.sprite = new PIXI.Sprite.from(this.app.resources[enemySprite])
        this.sprite.anchor.set(0.5, 0.5)
        this.health = health // ONGOING ADDITION OF MULTIPLIER AS THE GAME PROGRESSES
        this.hitRadius = hitRadius // ONGOING CHANGE TO HIT BOX
        this.maxHealth = health
        this.x = x
        this.y = y
        this.velocity = velocity
        this.path = path // ONGOING
        this.bulletProperties = bulletProperties

        this.addChild(this.sprite)
    }

    Update(delta) {
        this.y += this.velocity * delta // ONGOING DEPENDS ON SCREEN SIZE

        if(this.x <= -(this.app.renderer.width * 0.50)
            || this.x >= this.app.renderer.width + (this.app.renderer.width * 0.50)
            || this.y <= -(this.app.renderer.height * 0.50)
            || this.y >= this.app.renderer.height + (this.app.renderer.height * 0.50)
        ) {
            this.app.enemies.splice(this.app.enemies.indexOf(this), 1)
            this.sprite.destroy()
            this.destroy()
            this.sprite = null
        }

        this.bulletProperties.forEach((props) => {
            if(props.firing) {
                if(!props.shotCoolingDown) {
                    if(props.shots > 0) {
                        if(props.currentShotTime === 0.0) {
                            switch(props.script) {
                                // !REQUIRED! ADD MORE BULLET SCRIPT HERE
                                case enemyShipBulletScripts._001:
                                    new BulletScript001(this.app, this, props.name, this.x, this.y, props.velocity, props.radius, props.damage, props.aim)
                                    break
                                case enemyShipBulletScripts._002:
                                    new BulletScript002(this.app, this, props.name, this.x, this.y, props.velocity, props.radius, props.damage, props.aim)
                                    break
                                case enemyShipBulletScripts._003:
                                    new BulletScript003(this.app, this, props.name, this.x, this.y, props.velocity, props.radius, props.damage, props.aim)
                                    break
                            }

                            props.shots--
                        }

                        props.currentShotTime += delta / PIXI.settings.TARGET_FPMS

                        if(props.currentShotTime >= props.shotTime) props.currentShotTime = 0.0
                    } else {
                        if(props.infinite) {
                            props.shotCoolingDown = true
                        } else {
                            props.firing = false
                        }
                    }
                } else {
                    if(props.currentShotCooldown >= props.shotCooldown) {
                        props.currentShotCooldown = 0.0
                        props.shots = props.initialShots
                        props.shotCoolingDown = false
                    } else {
                        props.currentShotCooldown += delta / PIXI.settings.TARGET_FPMS
                    }
                }
            }
        })
    }

    ApplyDamage(damage) {
        this.health -= damage

        if(this.health <= 0) {
            new ExplosionSpawner(this.app, 'explosion-03', this.x, this.y, 8, 8, 3)

            const index = this.app.enemies.indexOf(this)

            // ONGOING MULTIPLIER TO BE ADDED WHILE GAME PROGRESSES
            switch(this.enemySprite) {
                case 'enemy-scout':
                    this.app.score += 150
                    break
                default:
                    this.app.score += 50
                    break
            }

            this.app.UpdateScore()
            this.app.enemies.splice(index, 1)
            this.sprite.destroy()
            this.destroy()
            this.sprite = null
        }
    }

    ApplyRendererScale() {} // ONGOING
}
