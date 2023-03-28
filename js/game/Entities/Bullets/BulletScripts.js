import Bullet from './Bullet.js'

// _001
export class BulletScript001 {
    constructor(app, firedBy, bulletName, x, y, velocity, radius, damage, aim) {
        this.app = app
        
        let bullet = null

        if(aim) {
            this.app.stage.children.forEach((child) => {
                if(child.playerShip !== undefined) {
                    if(child.playerShip.tag === 'player') {
                        const playerPosX = child.playerShip.position.x
                        const playerPosY = child.playerShip.position.y

                        const bulletRotation = Math.atan2(playerPosY - y, playerPosX - x)

                        bullet = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation, radius, damage)
                    }
                }
            })
        } else {
            bullet = new Bullet(this.app, firedBy, bulletName, x, y, velocity, Math.atan2(1, 0), radius, damage)
        }

        this.app.bullets.push(bullet)
        this.app.stage.addChild(bullet)
    }
}

// _002
export class BulletScript002 {
    constructor(app, firedBy, bulletName, x, y, velocity, radius, damage, aim) {
        this.app = app
        
        let bullets = []

        if(aim) {
            this.app.stage.children.forEach((child) => {
                if(child.playerShip !== undefined) {
                    if(child.playerShip.tag === 'player') {
                        const playerPosX = child.playerShip.position.x
                        const playerPosY = child.playerShip.position.y

                        const bulletRotation = Math.atan2(playerPosY - y, playerPosX - x)

                        bullets[0] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation, radius, damage)
                        bullets[1] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation - 0.15, radius, damage)
                        bullets[2] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation + 0.15, radius, damage)
                    }
                }
            })
        } else {
            const bulletRotation = Math.atan2(1, 0)

            bullets[0] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation, radius, damage)
            bullets[1] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation - 0.15, radius, damage)
            bullets[2] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation + 0.15, radius, damage)
        }

        for(let i = 0; i < bullets.length; i++) {
            this.app.bullets.push(bullets[i])
            this.app.stage.addChild(bullets[i])
        }
    }
}

// _003
export class BulletScript003 {
    constructor(app, firedBy, bulletName, x, y, velocity, radius, damage, aim) {
        this.app = app
        
        let bulletCount = 6
        let bullets = []

        if(aim) {
            this.app.stage.children.forEach((child) => {
                if(child.playerShip !== undefined) {
                    if(child.playerShip.tag === 'player') {
                        const playerPosX = child.playerShip.position.x
                        const playerPosY = child.playerShip.position.y

                        const bulletRotation = Math.atan2(playerPosY - y, playerPosX - x)

                        bullets[0] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation, radius, damage)

                        for(let i = 1; i < bulletCount; i++) {
                            bullets[i] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation - (i * ((Math.PI * 2) / bulletCount)), radius, damage)
                        }
                    }
                }
            })
        } else {
            const bulletRotation = Math.atan2(1, 0)

            bullets[0] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation, radius, damage)

            for(let i = 1; i < bulletCount; i++) {
                bullets[i] = new Bullet(this.app, firedBy, bulletName, x, y, velocity, bulletRotation - (i * ((Math.PI * 2) / bulletCount)), radius, damage)
            }
        }

        for(let i = 0; i < bullets.length; i++) {
            this.app.bullets.push(bullets[i])
            this.app.stage.addChild(bullets[i])
        }
    }
}
