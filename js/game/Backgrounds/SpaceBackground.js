export default class SpaceBackground extends PIXI.Container {
    constructor(app) {
        super()

        this.app = app

        this.starsSmSpeed = 0.15
        this.starsMdSpeed = this.starsSmSpeed + 0.15
        this.starsLgSpeed = this.starsMdSpeed + 0.15

        this.coldNebula = new PIXI.Sprite.from(this.app.resources['cold-nebula'])
        this.hotNebula = new PIXI.Sprite.from(this.app.resources['hot-nebula'])
        this.blueDust = new PIXI.Sprite.from(this.app.resources['blue-dust'])
        this.violetDust = new PIXI.Sprite.from(this.app.resources['violet-dust'])
        this.yellowDust = new PIXI.Sprite.from(this.app.resources['yellow-dust'])
        this.starsSm1 = new PIXI.Sprite.from(this.app.resources['stars-sm'])
        this.starsSm2 = new PIXI.Sprite.from(this.app.resources['stars-sm'])
        this.starsMd1 = new PIXI.Sprite.from(this.app.resources['stars-md'])
        this.starsMd2 = new PIXI.Sprite.from(this.app.resources['stars-md'])
        this.starsLg1 = new PIXI.Sprite.from(this.app.resources['stars-lg'])
        this.starsLg2 = new PIXI.Sprite.from(this.app.resources['stars-lg'])

        this.starsSm2.y = -this.starsSm2.height
        this.starsMd2.y = -this.starsMd2.height
        this.starsLg2.y = -this.starsLg2.height

        this.addChild(this.blueDust)
        this.addChild(this.violetDust)
        this.addChild(this.yellowDust)
        this.addChild(this.coldNebula)
        this.addChild(this.hotNebula)
        this.addChild(this.starsSm1)
        this.addChild(this.starsSm2)
        this.addChild(this.starsMd1)
        this.addChild(this.starsMd2)
        this.addChild(this.starsLg1)
        this.addChild(this.starsLg2)

        this.ApplyRendererScale()
    }

    Update(delta) {
        this.starsSm1.y += this.starsSmSpeed * delta
        this.starsSm2.y += this.starsSmSpeed * delta
        this.starsMd1.y += this.starsMdSpeed * delta
        this.starsMd2.y += this.starsMdSpeed * delta
        this.starsLg1.y += this.starsLgSpeed * delta
        this.starsLg2.y += this.starsLgSpeed * delta

        if(this.starsSm1.y >= this.app.renderer.height) this.starsSm1.y = -this.starsSm1.height
        if(this.starsSm2.y >= this.app.renderer.height) this.starsSm2.y = -this.starsSm2.height
        if(this.starsMd1.y >= this.app.renderer.height) this.starsMd1.y = -this.starsMd1.height
        if(this.starsMd2.y >= this.app.renderer.height) this.starsMd2.y = -this.starsMd2.height
        if(this.starsLg1.y >= this.app.renderer.height) this.starsLg1.y = -this.starsLg1.height
        if(this.starsLg2.y >= this.app.renderer.height) this.starsLg2.y = -this.starsLg2.height
    }

    ApplyRendererScale() {
        this.coldNebula.width = this.app.renderer.width
        this.hotNebula.width = this.app.renderer.width
        this.blueDust.width = this.app.renderer.width
        this.violetDust.width = this.app.renderer.width
        this.yellowDust.width = this.app.renderer.width

        this.coldNebula.height = this.app.renderer.height
        this.hotNebula.height = this.app.renderer.height
        this.blueDust.height = this.app.renderer.height
        this.violetDust.height = this.app.renderer.height
        this.yellowDust.height = this.app.renderer.height

        this.starsSm1.width = this.app.renderer.width
        this.starsSm2.width = this.app.renderer.width
        this.starsMd1.width = this.app.renderer.width
        this.starsMd2.width = this.app.renderer.width
        this.starsLg1.width = this.app.renderer.width
        this.starsLg2.width = this.app.renderer.width

        this.starsSm1.height = this.app.renderer.height
        this.starsSm2.height = this.app.renderer.height
        this.starsMd1.height = this.app.renderer.height
        this.starsMd2.height = this.app.renderer.height
        this.starsLg1.height = this.app.renderer.height
        this.starsLg2.height = this.app.renderer.height

        if(this.starsSm1.y > this.starsSm2.y) this.starsSm2.y = this.starsSm1.y - this.starsSm1.height
        else this.starsSm2.y = this.starsSm1.y + this.starsSm1.height

        if(this.starsMd1.y > this.starsMd2.y) this.starsMd2.y = this.starsMd1.y - this.starsMd1.height
        else this.starsMd2.y = this.starsMd1.y + this.starsMd1.height

        if(this.starsLg1.y > this.starsLg2.y) this.starsLg2.y = this.starsLg1.y - this.starsLg1.height
        else this.starsLg2.y = this.starsLg1.y + this.starsLg1.height
    }
}
