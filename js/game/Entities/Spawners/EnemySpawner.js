import FindQueueIDIndex from '../../../lib/helpers/HelperFunctions.js'
import { spawnList, spawnQueue, ResetSpawnList } from '../../../spawn-config.js'
import EnemyShip from '../Ships/EnemyShip.js'

export default class EnemySpawner {
    constructor(app) {
        this.app = app

        spawnList.forEach((list) => {
            list.currentSpawnTime = 0.0

            list.ships.forEach((ship) => {
                ship.bulletProperties.forEach((props) => {
                    props.firing = true
                    props.initialShots = props.shots
                    props.shotCoolingDown = false
                    props.currentShotTime = 0.0
                    props.currentShotCooldown = 0.0
                })
            })
        })

        this.initialSpawnList = structuredClone(spawnList)
    }

    ResetSpawnList() {
        ResetSpawnList(structuredClone(this.initialSpawnList))
    }

    Update(delta) {
        const seconds = Math.floor(this.app.totalGameTime / 1000)

        spawnList.forEach((list) => {
            if(list.spawnTimeFrame === seconds && !FindQueueIDIndex(spawnQueue, list.queueId)) {
                spawnQueue.push(list)
            }
        })

        spawnQueue.forEach((queue) => {
            if(queue.spawning) {
                if(queue.currentSpawnTime === 0.0) {
                    if(queue.spawnCount > 0) {
                        queue.ships.forEach((ship) => {
                            const enemyShip = new EnemyShip(
                                this.app,
                                ship.type,
                                ship.health,
                                ship.hitRadius,
                                ship.x, ship.y,
                                ship.velocity,
                                ship.path,
                                structuredClone(ship.bulletProperties)
                            )

                            this.app.enemies.push(enemyShip)
                            this.app.stage.addChild(enemyShip)
                        })

                        queue.spawnCount--
                    } else {
                        queue.currentSpawnTime = 0.0
                        queue.spawning = false
                    }
                }

                (queue.currentSpawnTime >= queue.spawnTime) ? queue.currentSpawnTime = 0.0 : queue.currentSpawnTime += delta / PIXI.settings.TARGET_FPMS
            }
        })
    }
}
