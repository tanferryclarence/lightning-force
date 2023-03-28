import Game from './game.js'

const targetWidth = 1920
const targetHeight = 1080

PIXI.utils.skipHello()

const app = new PIXI.Application({
    view: document.getElementById('pixi-canvas'),
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
})

app.targetWidth = targetWidth
app.targetHeight = targetHeight

// ONGOING WHEN MARGIN IN TOP AND BOTTOM IS 0 WIDTH IS BUGGING
function RefreshRendererScale() {
    const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    const scale = Math.min(screenWidth / targetWidth, screenHeight / targetHeight)

    const enlargedWidth = Math.floor(scale * targetWidth)
    const enlargedHeight = Math.floor(scale * targetHeight)

    const horizontalMargin = (screenWidth - enlargedWidth) / 2
    const verticalMargin = (screenHeight - enlargedHeight) / 2

    app.renderer.resize(enlargedWidth, enlargedHeight)
    app.view.style.marginLeft = app.view.style.marginRight = `${horizontalMargin}px`
    app.view.style.marginTop = app.view.style.marginBottom = `${verticalMargin}px`

    app.stage.children.forEach((child) => {
        if(typeof child.ApplyRendererScale === 'function') {
            child.ApplyRendererScale()
        }
    })
}

RefreshRendererScale()
window.onresize = RefreshRendererScale
document.body.appendChild(app.view)

new FontFaceObserver('Text').load()
new FontFaceObserver('Counter').load()
new Game().Initialize(app)
