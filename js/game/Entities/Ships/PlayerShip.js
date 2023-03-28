import { input } from '../../../config.js'
import ExplosionSpawner from '../Spawners/ExplosionSpawner.js'

// Main class for player ship, this can be extended
export default class PlayerShip extends PIXI.Container {
    constructor(app, hitRadius, upgrades, moveSpeed, jetOffset, fireTime) {
        super()

        this.tag = 'player'

        this.app = app
        this.invulnerable = false
        this.hitRadius = hitRadius
        this.upgrades = upgrades
        this.moveSpeed = moveSpeed // ONGOING BASED ON SCREEN SCALE
        this.jetOffset = jetOffset

        this.moveDirection = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        this.rotateTurret = {
            CCW: false,
            CW: false
        }

        this.slow = false
        this.firing = false
        this.currentFireTime = 0.0
        this.fireTime = fireTime

        this.x = this.app.renderer.width * 0.50
        this.y = this.app.renderer.height * 0.85

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case input.up:
                    this.moveDirection.up = true
                    break
                case input.down:
                    this.moveDirection.down = true
                    break
                case input.left:
                    this.moveDirection.left = true
                    break
                case input.right:
                    this.moveDirection.right = true
                    break
                case input.slow:
                    this.slow = true
                    break
                case input.fire:
                    this.firing = true
                    break
                case input.rotateTurretCCW:
                    this.rotateTurret.CCW = true
                    break
                case input.rotateTurretCW:
                    this.rotateTurret.CW = true
                    break
            }
        })
        document.addEventListener('keyup', (e) => {
            switch(e.key) {
                case input.up:
                    this.moveDirection.up = false
                    break
                case input.down:
                    this.moveDirection.down = false
                    break
                case input.left:
                    this.moveDirection.left = false
                    break
                case input.right:
                    this.moveDirection.right = false
                    break
                case input.slow:
                    this.slow = false
                    break
                case input.fire:
                    this.firing = false
                    if(this.currentFireTime != 0.0) this.currentFireTime = 0.0
                    break
                case input.rotateTurretCCW:
                    this.rotateTurret.CCW = false
                    break
                case input.rotateTurretCW:
                    this.rotateTurret.CW = false
                    break
            }
        })

        // DEBUG
        this.hitCircle = new PIXI.Graphics()
        this.hitCircle.beginFill(0x00FF00)
        this.hitCircle.drawCircle(0, 0, this.hitRadius * 2)
        this.hitCircle.endFill()

        this.ApplyRendererScale()
    }

    Update(delta) {
        if(this.visible) {
            if(this.moveDirection.up && !this.moveDirection.down) this.y -= this.moveSpeed * delta * (this.slow ? 0.5 : 1.0)
            if(this.moveDirection.down && !this.moveDirection.up) this.y += this.moveSpeed * delta * (this.slow ? 0.5 : 1.0)
            if(this.moveDirection.left && !this.moveDirection.right) this.x -= this.moveSpeed * delta * (this.slow ? 0.5 : 1.0)
            if(this.moveDirection.right && !this.moveDirection.left) this.x += this.moveSpeed * delta * (this.slow ? 0.5 : 1.0)

            if(this.x <= this.width / 2) this.x = this.width / 2
            else if(this.x >= this.app.renderer.width - (this.width / 2)) this.x = this.app.renderer.width - (this.width / 2)
            if(this.y <= this.height / 2) this.y = this.height / 2
            else if(this.y >= ((this.app.renderer.height + (this.jetOffset * this.scale.y)) - (this.height / 2))) this.y = (this.app.renderer.height + (this.jetOffset * this.scale.y)) - (this.height / 2)

            if(this.firing) {
                if(this.currentFireTime === 0.0) {
                    this.Fire()
                }

                this.currentFireTime += delta / PIXI.settings.TARGET_FPMS

                if(this.currentFireTime >= this.fireTime) {
                    this.currentFireTime = 0.0
                }
            }
        }
    }

    ApplyDamage() {
        if(this.visible && !this.invulnerable) {
            this.visible = false

            new ExplosionSpawner(this.app, 'explosion-04', this.x, this.y, 8, 8, 3)

            this.x = this.app.renderer.width * 0.50
            this.y = this.app.renderer.height * 0.85

            if(this.app.lives > 0) {
                this.app.lives--
                this.app.UpdateLives()

                if(this.app.lives === 0) {
                    // GAME OVER
                } else {
                    this.visible = true
                }
            }
        }
    }

    ApplyRendererScale() {
        this.scale.set(this.app.renderer.width / this.app.targetWidth, this.app.renderer.height / this.app.targetHeight)
    }
}
