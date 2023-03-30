class EventBus {
  constructor(name: string) {
    this.name = name
  }
  name: undefined | string = undefined
  private funcList: Function[] = []
  subscribe = (func: Function) => this.funcList.push(func)
  publish = () => {
    this.funcList.forEach((func) => {
      func && func()
    })
  }
}

export const dragEvents = null
