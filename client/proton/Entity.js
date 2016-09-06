import CoreEntity from '../../server/proton/Entity'
import Interpolation from './Interpolation'

export default class Entity extends CoreEntity {
  constructor(...args) {
    super(...args)
    this.interpolation = new Interpolation(this)
  }

  update(dt) {
    super.update(dt)
    this.interpolation.update(dt)
  }
}
