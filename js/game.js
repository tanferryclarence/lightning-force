import ScreenManager from './game/ScreenManager.js'

export default class Game {
    Initialize(app) {
        this.app = app

        ScreenManager.prototype.Initialize(this.app)

        this.app.ticker.add((delta) => {
            this.Update(delta)
        })
    }

    Update(delta) {
        ScreenManager.prototype.Update(delta)
    }
}
