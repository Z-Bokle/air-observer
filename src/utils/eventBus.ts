class EventBus {
  constructor(name: string) {
    this.name = name
  }
  private name: undefined | string = undefined
  private funcList: Function[] = []
  subscribe = (func: Function) => this.funcList.push(func)
  publish = () => {
    this.funcList.forEach((func) => {
      func && func()
    })
  }
}

class Event {
  constructor(name: string, func: Function) {
    this.name = name
    this.func = func
  }
  name: string
  func: Function
}

class EventCenter {
  private events: Event[] = []
  public on(name: string, func: Function) {
    const index = this.events.findIndex((event) => event.name === name)
    const event = new Event(name, func)
    if (index < 0) {
      this.events.push(event)
    } else {
      this.events.splice(index, 1, event)
    }
  }
  public emit(name: string, ...args: any[]) {
    this.events.findLast((event) => event.name === name)?.func(...args)
  }
}

export const eventCenter = new EventCenter()
