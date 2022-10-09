import { createDecorator, VueDecorator } from 'vue-class-component'

export default function Debounce(ms: number): VueDecorator {
  return createDecorator((opts, handler) => {
    if (!opts.methods) throw new Error('This decorator must be used on a vue component method.')

    const originalFn = opts.methods[handler]
    let timeoutId: NodeJS.Timeout | null

    const clear = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }

    opts.methods[handler] = function(...args: any[]) {
      clear()
      timeoutId = setTimeout(() => {
        timeoutId = null
        originalFn.apply(this, args)
      }, ms)
    }
  })
}
