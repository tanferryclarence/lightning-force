import { manifest } from '../../manifest.js'
import ScreenManager from '../ScreenManager.js'
import TitleScreen from './TitleScreen.js'

export default class LoadingScreen extends PIXI.Container {
    constructor(app) {
        super()

        this.app = app
        this.app.resources = {}
        this.alpha = 0.0
        this.loadingBarWidth = this.app.renderer.width * 0.80
        this.loadingBarHeight = 4

        this.loadingBarBorder = new PIXI.Graphics()
        this.loadingBarBorder.lineStyle({
            width: 1,
            color: 0xffffff,
            alignment: 1
        })
        this.loadingBarBorder.beginFill(0x000000)
        this.loadingBarBorder.drawRect(0, 0, this.loadingBarWidth, this.loadingBarHeight)
        this.loadingBarBorder.endFill()
        this.loadingBarBorder.x = (this.app.renderer.width - this.loadingBarWidth) / 2
        this.loadingBarBorder.y = (this.app.renderer.height - this.loadingBarHeight) * 0.95

        this.loadingBarFill = new PIXI.Graphics()
        this.loadingBarFill.beginFill(0xff2400)
        this.loadingBarFill.drawRect(0, 0, this.loadingBarWidth, this.loadingBarHeight)
        this.loadingBarFill.endFill()
        this.loadingBarFill.scale.x = 0.0

        this.loadingBarBorder.addChild(this.loadingBarFill)
        this.addChild(this.loadingBarBorder)

        this.pixiLoader = PIXI.Loader.shared

        manifest.forEach((name, url) => {
            this.pixiLoader.add(name, url)
        })

        this.pixiLoader.load((loader, resources) => {
            for(let [key, value] of Object.entries(resources)) {
                this.app.resources[key] = value.texture
            }
        })
        this.pixiLoader.onProgress.add((loader) => {
            this.loadingBarFill.scale.x = loader.progress / 100
        })
        this.pixiLoader.onComplete.add(() => {
            ScreenManager.prototype.ChangeScreen(new TitleScreen(this.app))
        })
    }

    ApplyRendererScale() {
        this.loadingBarWidth = this.app.renderer.width * 0.80
        this.loadingBarBorder.width = this.loadingBarWidth
        this.loadingBarBorder.x = (this.app.renderer.width - this.loadingBarWidth) / 2
        this.loadingBarBorder.y = (this.app.renderer.height - this.loadingBarHeight) * 0.95
    }
}
