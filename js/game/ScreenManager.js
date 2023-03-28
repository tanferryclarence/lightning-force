import LoadingScreen from './Screens/LoadingScreen.js'

export default class ScreenManager {
    Initialize(app) {
        this.app = app

        this.currentScreen = null
        this.newScreen = null
        this.isChangingScreen = false
        this.isFadingIn = false
        this.isFadingOut = false
        this.fadeIncrement = 0.015

        this.ChangeScreen(new LoadingScreen(this.app))
    }

    Update(delta) {
        if(this.isChangingScreen) {
            if(this.isFadingIn && !this.isFadingOut) {
                if(this.currentScreen !== null) {
                    this.currentScreen.alpha += this.fadeIncrement * delta

                    if(this.currentScreen.alpha >= 1.0) {
                        this.currentScreen.alpha = 1.0
                        this.isChangingScreen = false
                        this.isFadingIn = false
                        this.isFadingOut = false
                    }
                }
            } else if(this.isFadingOut && !this.isFadingIn) {
                if(this.currentScreen !== null) {
                    this.currentScreen.alpha -= this.fadeIncrement * delta

                    if(this.currentScreen.alpha <= 0.0) {
                        this.currentScreen.destroy()
                        this.app.stage.addChild(this.newScreen)
                        this.currentScreen = this.newScreen

                        this.isFadingIn = true
                        this.isFadingOut = false
                    }
                } else {
                    this.currentScreen = this.newScreen
                    this.app.stage.addChild(this.currentScreen)

                    this.isFadingIn = true
                    this.isFadingOut = false
                }
            }
        }
        
        if(this.currentScreen !== null) {
            if(typeof this.currentScreen.Update === 'function') {
                this.currentScreen.Update(delta)
            }
        }
    }

    ChangeScreen(newScreen) {
        this.newScreen = newScreen
        this.isChangingScreen = true
        this.isFadingIn = false
        this.isFadingOut = true
    }
}
