// STRINGS ARE BASED FROM manifest.js ENEMY SHIPS NAME
const enemyShipTypes = {
    scout: 'enemy-scout',
}

const enemyShipBulletNames = {
    _001: 'enemy-bullet-001'
}

export const enemyShipBulletScripts = {
    _001: '001',
    _002: '002',
    _003: '003',
}

// SPAWN LIST GUIDE
/*
    {
        spawnTimeFrame: 1,
        queueId: 'Q001',
        spawning: true,
        spawnCount: 1,
        spawnTime: 250.0,
        ships: [
            {
                type: enemyShipTypes.scout,
                health: 50,
                hitRadius: 12,
                x: window.innerWidth * 0.50,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._003,
                        velocity: 5.0,
                        radius: 8,
                        shots: 1,
                        shotTime: 250.0,
                        shotCooldown: 1000.0,
                        aim: true,
                        infinite: true
                    }
                ]
            }
        ]
    }
*/

export let spawnQueue = []

// START SPAWNLIST
export let spawnList = [
    {
        spawnTimeFrame: 1,
        queueId: 'Q001',
        spawning: true,
        spawnCount: 1,
        spawnTime: 250.0,
        ships: [
            {
                type: enemyShipTypes.scout,
                health: 50,
                hitRadius: 3,
                x: window.innerWidth * 0.25,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._001,
                        velocity: 2.0,
                        radius: 8,
                        shots: 2,
                        shotTime: 250.0,
                        shotCooldown: 1000.0,
                        aim: true,
                        infinite: true
                    }
                ]
            }
        ]
    },
    {
        spawnTimeFrame: 2,
        queueId: 'Q002',
        spawning: true,
        spawnCount: 1,
        spawnTime: 250.0,
        ships: [
            {
                type: enemyShipTypes.scout,
                health: 50,
                hitRadius: 3,
                x: window.innerWidth * 0.50,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._001,
                        velocity: 2.0,
                        radius: 8,
                        shots: 2,
                        shotTime: 250.0,
                        shotCooldown: 1000.0,
                        aim: true,
                        infinite: true
                    }
                ]
            }
        ]
    },
    {
        spawnTimeFrame: 3,
        queueId: 'Q003',
        spawning: true,
        spawnCount: 1,
        spawnTime: 250.0,
        ships: [
            {
                type: enemyShipTypes.scout,
                health: 50,
                hitRadius: 3,
                x: window.innerWidth * 0.75,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._001,
                        velocity: 2.0,
                        radius: 8,
                        shots: 2,
                        shotTime: 250.0,
                        shotCooldown: 1000.0,
                        aim: true,
                        infinite: true
                    }
                ]
            }
        ]
    },
    {
        spawnTimeFrame: 6,
        queueId: 'Q004',
        spawning: true,
        spawnCount: 2,
        spawnTime: 1000.0,
        ships: [
            {
                type: enemyShipTypes.scout,
                health: 50,
                hitRadius: 3,
                x: window.innerWidth * 0.25,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._002,
                        velocity: 2.0,
                        radius: 8,
                        shots: 3,
                        shotTime: 200.0,
                        shotCooldown: 500.0,
                        aim: true,
                        infinite: false
                    }
                ]
            },
            {
                type: enemyShipTypes.scout,
                health: 50,
                hitRadius: 3,
                x: window.innerWidth * 0.75,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._002,
                        velocity: 2.0,
                        radius: 8,
                        shots: 3,
                        shotTime: 200.0,
                        shotCooldown: 500.0,
                        aim: true,
                        infinite: false
                    }
                ]
            }
        ]
    },
    {
        spawnTimeFrame: 10,
        queueId: 'Q005',
        spawning: true,
        spawnCount: 2,
        spawnTime: 1000.0,
        ships: [
            {
                type: enemyShipTypes.scout,
                health: 20,
                hitRadius: 3,
                x: window.innerWidth * 0.45,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._003,
                        velocity: 2.0,
                        radius: 8,
                        shots: 3,
                        shotTime: 500.0,
                        shotCooldown: 500.0,
                        aim: true,
                        infinite: true
                    }
                ]
            },
            {
                type: enemyShipTypes.scout,
                health: 20,
                hitRadius: 3,
                x: window.innerWidth * 0.55,
                y: -128,
                velocity: 3,
                path: [],
                bulletProperties: [
                    {
                        name: enemyShipBulletNames._001,
                        script: enemyShipBulletScripts._003,
                        velocity: 2.0,
                        radius: 8,
                        shots: 3,
                        shotTime: 500.0,
                        shotCooldown: 500.0,
                        aim: true,
                        infinite: true
                    }
                ]
            }
        ]
    }
]
// END SPAWNLIST

export function ResetSpawnList(list) {
    spawnQueue = []
    spawnList = list
}
