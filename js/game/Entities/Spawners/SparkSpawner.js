export default class SparkSpawner {
    constructor(app, sparkSprite, x, y, sparkCount, ttl) {
        this.app = app
        this.sparkSprite = sparkSprite
        this.sparkCount = sparkCount
        this.currentTime = 0.0
        this.ttl = ttl
        this.sparks = []

        for(let i = 0; i < sparkCount; i++) {
            let spr = new PIXI.Sprite.from(this.app.resources[this.sparkSprite])
            let sprScale = (Math.floor(Math.random() * 100) + 50) / 100

            spr.x = x
            spr.y = y
            spr.anchor.set(0.5, 0.5)
            spr.scale.set(sprScale, sprScale)
            spr.rotation = ((Math.floor(Math.random() * 100)) / 100) * (Math.PI * 2)
            spr.velocity = Math.floor(Math.random() * 10) + 1

            this.sparks.push(spr)
            this.app.stage.addChild(spr)
        }

        this.app.ticker.add((delta) => this.Update(delta))
    }

    Update(delta) {
        this.sparks.forEach((spark) => {
            spark.x += spark.velocity * Math.cos(spark.rotation) * delta
            spark.y += spark.velocity * Math.sin(spark.rotation) * delta
        })

        if(this.currentTime >= this.ttl) {
            this.currentTime = this.ttl

            this.sparks.forEach((spark) => {
                spark.alpha -= 0.15 * delta

                if(spark.alpha <= 0.0) {
                    const index = this.sparks.indexOf(spark)

                    this.sparks.splice(index, 1)
                    spark.destroy()
                    spark = null
                }
            })
        } else
            this.currentTime += delta / PIXI.settings.TARGET_FPMS
    }
}
