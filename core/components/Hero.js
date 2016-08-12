import PolarEntity from '../proton/PolarEntity'
import Bullet from '../components/Bullet'

export default class Hero extends PolarEntity {
  constructor(bundle, world) {
    bundle = Object.assign({
      width: 10,
      height: 10
    }, bundle)
    super(bundle)

    this.color = bundle.color
    this.name = bundle.name || '匿名'
    this.world = world
  }

  applyInput(dt, activeMap) {
    this.speedOfRotate = 0
    this.speed = 0
    if (activeMap.left) {
      this.speedOfRotate = -180
    }
    if (activeMap.right) {
      this.speedOfRotate = 180
    }
    if (activeMap.top) {
      this.speed = 100
    }
    if (activeMap.bottom) {
      this.speed = -100
    }
    super.update(dt)
  }

  onEmitBullets(e) {
    if (e.keyName === 'space' && e.type === 'end') {
      this.world.add(new Bullet({
        coord: this.centerCoord,
        velocity: this.direction.clone().scale(200, 200)
      }))
    }
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.centerCoord.x, this.centerCoord.y)
    ctx.rotate(this.radiansOfAngle)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, (-this.height / 2) - 3)
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore()

    ctx.save()
    ctx.translate(this.centerCoord.x, this.coord.y)
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fontSize = 12
    ctx.fillText(this.name, 0, -5)
    ctx.restore()
  }

  export() {
    return Object.assign(super.export(), {
      color: this.color,
      name: this.name
    })
  }
}
