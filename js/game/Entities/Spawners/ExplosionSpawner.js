export default class ExplosionSpawner {
    constructor(app, explosionSpriteAtlas, x, y, rows, cols, frameTime) {
        this.app = app

        this.currentTime = 0.0
        this.frameTime = frameTime
        this.rowIndex = 0
        this.colIndex = 0

        this.explosionSpriteAtlas = new PIXI.Sprite.from(this.app.resources[explosionSpriteAtlas])
        this.explosionSpriteAtlas.x = x
        this.explosionSpriteAtlas.y = y
        this.explosionSpriteAtlas.rows = rows
        this.explosionSpriteAtlas.cols = cols
        this.explosionSpriteAtlas.pivot.set(
            (this.explosionSpriteAtlas.width / this.explosionSpriteAtlas.cols / 2) + ((this.explosionSpriteAtlas.width / this.explosionSpriteAtlas.cols) * this.colIndex),
            (this.explosionSpriteAtlas.height / this.explosionSpriteAtlas.rows / 2) + ((this.explosionSpriteAtlas.height / this.explosionSpriteAtlas.rows) * this.rowIndex)
        )

        this.explosionMask = new PIXI.Graphics()
        this.explosionMask.beginFill(0xFFFFFF)
        this.explosionMask.drawRect(
            0, 0,
            this.explosionSpriteAtlas.width / this.explosionSpriteAtlas.cols,
            this.explosionSpriteAtlas.height / this.explosionSpriteAtlas.rows
        )
        this.explosionMask.endFill()

        this.explosionMask.x = x
        this.explosionMask.y = y
        this.explosionMask.pivot.set(
            (this.explosionSpriteAtlas.width / this.explosionSpriteAtlas.cols) / 2,
            (this.explosionSpriteAtlas.height / this.explosionSpriteAtlas.rows) / 2
        )
        this.explosionSpriteAtlas.mask = this.explosionMask

        this.app.stage.addChild(this.explosionSpriteAtlas)
        this.app.stage.addChild(this.explosionMask)

        this.explosionTicker = new PIXI.Ticker
        this.explosionTicker.add((delta) => this.Update(delta))
        this.explosionTicker.start()
    }

    Update(delta) {
        if(this.currentTime >= this.frameTime) {
            this.currentTime = 0.0
            this.colIndex++

            if(this.colIndex > this.explosionSpriteAtlas.cols) {
                this.colIndex = 0
                this.rowIndex++

                if(this.rowIndex > this.explosionSpriteAtlas.rows) {
                    this.rowIndex = 0

                    this.explosionSpriteAtlas.destroy()
                    this.explosionSpriteAtlas = null
                    this.explosionMask.clear()
                    this.explosionTicker.destroy()
                    this.explosionTicker = null

                    return
                }
            }
        }

        this.explosionSpriteAtlas.pivot.set(
            (this.explosionSpriteAtlas.width / this.explosionSpriteAtlas.cols / 2) + ((this.explosionSpriteAtlas.width / this.explosionSpriteAtlas.cols) * this.colIndex),
            (this.explosionSpriteAtlas.height / this.explosionSpriteAtlas.rows / 2) + ((this.explosionSpriteAtlas.height / this.explosionSpriteAtlas.rows) * this.rowIndex)
        )

        this.currentTime += delta / PIXI.settings.TARGET_FPMS
    }
}
