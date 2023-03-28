import ScreenManager from '../ScreenManager.js'
import GameplayScreen from './GameplayScreen.js'

export default class TitleScreen extends PIXI.Container {
    constructor(app) {
        super()

        this.app = app
        this.interactive = true
        this.alpha = 0.0
        this.starsSmSpeed = 0.05
        this.starsMdSpeed = this.starsSmSpeed + 0.05
        this.starsLgSpeed = this.starsMdSpeed + 0.05

        this.starsSm1 = new PIXI.Sprite.from(this.app.resources['stars-sm'])
        this.starsSm2 = new PIXI.Sprite.from(this.app.resources['stars-sm'])
        this.starsMd1 = new PIXI.Sprite.from(this.app.resources['stars-md'])
        this.starsMd2 = new PIXI.Sprite.from(this.app.resources['stars-md'])
        this.starsLg1 = new PIXI.Sprite.from(this.app.resources['stars-lg'])
        this.starsLg2 = new PIXI.Sprite.from(this.app.resources['stars-lg'])

        this.starsSm2.y = -this.starsSm2.height
        this.starsMd2.y = -this.starsMd2.height
        this.starsLg2.y = -this.starsLg2.height

        this.titleText = new PIXI.Text('LIGHTNING FORCE', {
            fontFamily: 'Text',
            fontSize: 64,
            fill: 0xffffff
        })
        this.titleText.anchor.set(0.5, 0.5)
        this.titleText.x = this.app.renderer.width / 2
        this.titleText.y = this.app.renderer.height * 0.45

        this.interactionText = new PIXI.Text('<CLICK/TAP ANYWHERE TO START>', {
            fontFamily: 'Text',
            fontSize: 28,
            fill: 0xffffff
        })
        this.interactionText.anchor.set(0.5, 0.5)
        this.interactionText.x = this.app.renderer.width / 2
        this.interactionText.y = this.app.renderer.height * 0.55
        this.interactionText.alpha = 1.0
        this.interactionText.alphaIncrement = -0.05

        this.addChild(this.starsSm1)
        this.addChild(this.starsSm2)
        this.addChild(this.starsMd1)
        this.addChild(this.starsMd2)
        this.addChild(this.starsLg1)
        this.addChild(this.starsLg2)

        this.addChild(this.titleText)
        this.addChild(this.interactionText)

        this.ApplyRendererScale()

        this.on('mousedown', this.Proceed)
        this.on('tap', this.Proceed)
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

        this.interactionText.alpha += this.interactionText.alphaIncrement * delta

        if(this.interactionText.alpha >= 1.0) {
            this.interactionText.alpha = 1.0
            this.interactionText.alphaIncrement *= -1
        }
        if(this.interactionText.alpha <= 0.0) {
            this.interactionText.alpha = 0.0
            this.interactionText.alphaIncrement *= -1
        }
    }

    ApplyRendererScale() {
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

        this.titleText.scale.x = this.app.renderer.width / this.app.targetWidth
        this.titleText.scale.y = this.app.renderer.height / this.app.targetHeight

        this.interactionText.scale.x = this.app.renderer.width / this.app.targetWidth
        this.interactionText.scale.y = this.app.renderer.height / this.app.targetHeight

        this.titleText.x = this.app.renderer.width / 2
        this.titleText.y = this.app.renderer.height * 0.45

        this.interactionText.x = this.app.renderer.width / 2
        this.interactionText.y = this.app.renderer.height * 0.55
    }

    Proceed() {
        this.off('mousedown', this.Proceed)
        this.off('tap', this.Proceed)

        ScreenManager.prototype.ChangeScreen(new GameplayScreen(this.app))
    }
}
