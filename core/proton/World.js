import Retrieve from './quarks/Retrieve'

export default class World {

  constructor(config) {
    this.objects = []

    this.retrieve = new Retrieve(this.objects)
    this.timer = config.timer
  }

  add(obj) {
    if (this.objects.indexOf(obj) > -1) {
      return;
    }
    this.objects.push(obj)
  }

  remove(obj) {
    const index = this.objects.indexOf(obj)
    if (index === -1) {
      return
    }
    this.objects.splice(index, 1)
  }

  run() {
    const round = (dt, time) => {
      this.timer.requestFrame(round)
      this.onIterate(this.objects, dt, time)
    }
    this.timer.requestFrame(round)
  }

  onIterate(objs, dt) {
    objs.forEach(item => {
      if (item.isDead) {
        return this.remove(item)
      }
      return item.update(dt, this)
    })
  }

  pause() {
    this.timer.cancelAnimationFrame()
  }

  destroy() {

  }

  export() {
    return this.objects.map(item => (item.export ? item.export() : item))
  }

  query(...args) {
    return this.retrieve.query(...args)
  }
}