import EventEmitter from 'events'

class ToastReceiver extends EventEmitter {
  constructor() {
    super()
    this.setMaxListeners(1)
  }
}
const toastReceiver = new ToastReceiver() // Unique instance

export { toastReceiver }
