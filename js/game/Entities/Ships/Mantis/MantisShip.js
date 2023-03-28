import PlayerShip from '../PlayerShip.js'
import Bullet from '../../Bullets/Bullet.js'

// Mantis ship derived from player ship, extends and overrides some functions
export default class MantisShip extends PlayerShip {
    constructor(app) {
        super(app, 4, 3, 6.0, 65, 100)

        this.app = app
        this.jetIncrement = 0.50
        
        this.hull = new PIXI.Sprite.from(this.app.resources['mantis-hull'])
        this.jet = new PIXI.Sprite.from(this.app.resources['mantis-jet'])
        this.upgrade1 = new PIXI.Sprite.from(this.app.resources['mantis-upgrade-01'])
        this.upgrade2 = new PIXI.Sprite.from(this.app.resources['mantis-upgrade-02'])
        this.upgrade3 = new PIXI.Sprite.from(this.app.resources['mantis-upgrade-03'])

        this.hull.anchor.set(0.5, 0.5)
        this.jet.pivot.set(this.jet.width / 2, 99)
        this.upgrade1.anchor.set(0.5, 0.5)
        this.upgrade2.anchor.set(0.5, 0.5)
        this.upgrade3.anchor.set(0.5, 0.5)

        this.jet.y = 20
        this.bullet01 = 'player-bullet-01'
        this.bullet02 = 'player-bullet-02'
        this.bullet03 = 'player-bullet-03'

        this.upgrade1.visible = true
        this.upgrade2.visible = true
        this.upgrade3.visible = true

        this.addChild(this.upgrade1)
        this.addChild(this.upgrade2)
        this.addChild(this.jet)
        this.addChild(this.hull)
        this.addChild(this.upgrade3)

        // DEBUG
        this.hitCircle.x = 0
        this.hitCircle.y = 0
        this.addChild(this.hitCircle)
    }

    Update(delta) {
        super.Update(delta)

        this.jet.alpha += this.jetIncrement * delta
        this.jet.scale.y += this.jetIncrement * delta

        if(this.jet.alpha > 1.0) {
            this.jet.alpha = 1.0
            this.jet.scale.y = 1.0
            this.jetIncrement *= -1
        }
        else if(this.jet.alpha < 0.0) {
            this.jet.alpha = 0.0
            this.jet.scale.y = 0.0
            this.jetIncrement *= -1
        }

        if(this.rotateTurret.CCW && !this.rotateTurret.CW) {
            this.upgrade3.rotation -= 0.05 * delta
        }
        if(this.rotateTurret.CW && !this.rotateTurret.CCW) {
            this.upgrade3.rotation += 0.05 * delta
        }
    }

    Fire() {
        const mainBulletDamage = 5
        const sideBulletDamage = 5
        const turretBulletDamage = 10
        const mainBulletSpeed = 75 * (this.scale.x / this.scale.y)
        const mainMagnitude = 16 * (this.scale.x / this.scale.y)
        const lMain = new Bullet(this.app, this, this.bullet01, this.x - (mainMagnitude * this.scale.x), this.y - ((this.hull.height * this.scale.y) / 2), mainBulletSpeed, this.rotation - (Math.PI / 2), 0, mainBulletDamage)
        const rMain = new Bullet(this.app, this, this.bullet01, this.x + (mainMagnitude * this.scale.x), this.y - ((this.hull.height * this.scale.y) / 2), mainBulletSpeed, this.rotation - (Math.PI / 2), 0, mainBulletDamage)

        this.app.bullets.push(lMain)
        this.app.bullets.push(rMain)
        this.app.stage.addChild(lMain)
        this.app.stage.addChild(rMain)

        if(this.upgrades >= 1 && this.upgrade1.visible) {
            const speed = 75 * (this.scale.x / this.scale.y)
            const magnitudeX = 20 * this.scale.x
            const magnitudeY = 44 * this.scale.y
            const lSide = new Bullet(this.app, this, this.bullet02, this.x - (magnitudeX * this.scale.x), this.y - ((magnitudeY * this.scale.y) / 2), speed, (this.rotation - (Math.PI / 2)) - 0.10, 0, sideBulletDamage)
            const rSide = new Bullet(this.app, this, this.bullet02, this.x + (magnitudeX * this.scale.x), this.y - ((magnitudeY * this.scale.y) / 2), speed, (this.rotation - (Math.PI / 2)) + 0.10, 0, sideBulletDamage)

            this.app.bullets.push(lSide)
            this.app.bullets.push(rSide)
            this.app.stage.addChild(lSide)
            this.app.stage.addChild(rSide)
        }
        if(this.upgrades >= 2 && this.upgrade2.visible) {
            const speed = 75 * (this.scale.x / this.scale.y)
            const magnitudeX = 34 * this.scale.x
            const magnitudeY = 24 * this.scale.y
            const lSide = new Bullet(this.app, this, this.bullet02, this.x - (magnitudeX * this.scale.x), this.y - ((magnitudeY * this.scale.y) / 2), speed, (this.rotation - (Math.PI / 2)) - 0.20, 0, sideBulletDamage)
            const rSide = new Bullet(this.app, this, this.bullet02, this.x + (magnitudeX * this.scale.x), this.y - ((magnitudeY * this.scale.y) / 2), speed, (this.rotation - (Math.PI / 2)) + 0.20, 0, sideBulletDamage)

            this.app.bullets.push(lSide)
            this.app.bullets.push(rSide)
            this.app.stage.addChild(lSide)
            this.app.stage.addChild(rSide)
        }
        if(this.upgrades >= 3 && this.upgrade3.visible) {
            const speed = 100 * (this.scale.x / this.scale.y)
            const magnitude = 28 * (this.scale.x / this.scale.y)

            const lSide = new Bullet(this.app, this, this.bullet03, this.upgrade3.worldTransform.tx + (magnitude * Math.cos(this.upgrade3.rotation - (Math.PI / 2))), this.upgrade3.worldTransform.ty + (magnitude * Math.sin(this.upgrade3.rotation - (Math.PI / 2))), speed, (this.upgrade3.rotation - (Math.PI / 2)) - 0.20, 0, turretBulletDamage)
            const rSide = new Bullet(this.app, this, this.bullet03, this.upgrade3.worldTransform.tx + (magnitude * Math.cos(this.upgrade3.rotation - (Math.PI / 2))), this.upgrade3.worldTransform.ty + (magnitude * Math.sin(this.upgrade3.rotation - (Math.PI / 2))), speed, (this.upgrade3.rotation - (Math.PI / 2)) + 0.20, 0, turretBulletDamage)
            const center = new Bullet(this.app, this, this.bullet03, this.upgrade3.worldTransform.tx + (magnitude * Math.cos(this.upgrade3.rotation - (Math.PI / 2))), this.upgrade3.worldTransform.ty + (magnitude * Math.sin(this.upgrade3.rotation - (Math.PI / 2))), speed, (this.upgrade3.rotation - (Math.PI / 2)), 0, turretBulletDamage)

            this.app.bullets.push(lSide)
            this.app.bullets.push(rSide)
            this.app.bullets.push(center)
            this.app.stage.addChild(lSide)
            this.app.stage.addChild(rSide)
            this.app.stage.addChild(center)
        }
    }
}
