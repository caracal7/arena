import Life from './Life'
import SAT from '../lib/SAT'

export default class Box extends Life {
  constructor(...args) {
    super(...args)

    this.inCollision = false
  }

  getCollisionRange() {
    return new SAT.Circle(this.coord.clone(), this.width / 2)
  }

  knock(direction, force) {
    const previousVelocity = this.velocity.clone()
    this.acc = direction.normalize().scale(force, force)
    this.inCollision = true
    this.addInterval(() => { this.inCollision = false }, 100)
    this.addInterval(() => {
      this.acc.copy({ x: 0, y: 0 })
      this.velocity.copy(previousVelocity)
    }, 800)
  }

  update(dt, world) {
    if (this.inCollision) {
      return super.update(dt, world)
    }
    const a = this.getCollisionRange()

    world.query('Box').forEach(box => {
      if (box.gid === this.gid) {
        return false
      }

      const b = box.getCollisionRange()
      if (SAT.testCircleCircle(a, b)) {
        const direction = this.coord.clone().sub(box.coord)
        this.knock(direction, 50)
        box.knock(direction.clone().reverse(), 50)
        return true
      }
      return false
    })

    return super.update(dt, world)
  }
}
