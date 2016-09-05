import math from '../lib/math'
import World from '../proton/World'
import Box from '../components/Box'
import Hero from '../components/Hero'
import Human from './Human.js'

export default class Rules {
  constructor() {
    this.size = {
      w: 500,
      h: 500
    }
    this.world = new World({
      size: this.size
    })
    this.world.run()

    for (let i = 0; i < 10; i++) {
      this.world.add(new Box({
        coord: { x: 150 + i * 40, y: 50 },
        width: 20,
        height: 20,
        rotateSpeed: (Math.random() > 0.5 ? 1 : -1) * Math.PI * 0.1,
        velocity: { x: (Math.random() > 0.5 ? 10 : -10), y: 0 }
      }))
    }
  }

  addHuman(name) {
    const spawnCoord = {
      // x: math.getRandomInt(0, this.size.w),
      // y: math.getRandomInt(0, this.size.h)
      x: 100,
      y: 100
    }
    const hero = new Hero({
      coord: spawnCoord,
      name
    }, this.world)
    this.world.add(hero)

    return new Human({
      world: this.world,
      entity: hero
    })
  }

  getEntities() {
    return this.world.export()
  }

  getWorldInfo() {
    return this.world.getInfo()
  }

  countOnlineNumber() {
    return this.world.query('Hero').length
  }
}
