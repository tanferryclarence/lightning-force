import SparkSpawner from '../Spawners/SparkSpawner.js'

export default class Bullet extends PIXI.Container {
    constructor(app, firedBy, bulletName, x, y, velocity, rotation, radius, damage) {
        super()

        this.app = app
        this.firedBy = firedBy
        this.bulletName = bulletName
        this.sprite = new PIXI.Sprite.from(this.app.resources[this.bulletName])
        this.sprite.anchor.set(0.5, 0.5)
        this.x = x
        this.y = y
        this.velocity = velocity
        this.rotation = rotation
        this.radius = radius // ONGOING
        this.damage = damage

        this.addChild(this.sprite)

        this.ApplyRendererScale()
    }

    Update(delta) {
        this.x += (this.velocity * Math.cos(this.rotation)) * delta
        this.y += (this.velocity * Math.sin(this.rotation)) * delta

        if(this.firedBy.tag === 'enemy') {
            for(let i = 0; i < this.app.stage.children.length; i++) {
                const child = this.app.stage.children[i]

                if(child.playerShip !== undefined) {
                    if(child.playerShip.tag === 'player' && child.playerShip.visible) {
                        const playerPosX = child.playerShip.position.x
                        const playerPosY = child.playerShip.position.y
                        const distance = Math.sqrt(Math.pow(playerPosX - this.x, 2) + Math.pow(playerPosY - this.y, 2))

                        if(distance - this.radius - child.playerShip.hitRadius <= this.velocity) {
                            child.playerShip.ApplyDamage()
                            this.app.bullets.splice(this.app.bullets.indexOf(this), 1)
                            this.sprite.destroy()
                            this.destroy()
                            this.sprite = null
                            return
                        }
                    }
                }
            }
        } else if(this.firedBy.tag === 'player') {
            for(let i = 0; i < this.app.stage.children.length; i++) {
                const child = this.app.stage.children[i]

                if(child.tag === 'enemy') {
                    const enemyPosX = child.position.x
                    const enemyPosY = child.position.y
                    const distance = Math.sqrt(Math.pow(enemyPosX - this.x, 2) + Math.pow(enemyPosY - this.y, 2))

                    if(distance - this.radius - child.hitRadius <= this.velocity) {
                        child.ApplyDamage(this.damage)
                        this.app.bullets.splice(this.app.bullets.indexOf(this), 1)

                        new SparkSpawner(this.app, 'spark-01', this.x, this.y, 4, 100)

                        this.sprite.destroy()
                        this.destroy()
                        this.sprite = null
                        return
                    }
                }
            }
        }

        if(this.x <= -(this.app.renderer.width / 2)
            || this.x >= this.app.renderer.width + (this.app.renderer.width / 2)
            || this.y <= -(this.app.renderer.height / 2)
            || this.y >= this.app.renderer.height + (this.app.renderer.height / 2)
        ) {
            this.app.bullets.splice(this.app.bullets.indexOf(this), 1)
            this.destroy()
            this.sprite = null
        }
    }

    ApplyRendererScale() {
        this.scale.set(this.app.renderer.width / this.app.targetWidth, this.app.renderer.height / this.app.targetHeight)
    }
}
