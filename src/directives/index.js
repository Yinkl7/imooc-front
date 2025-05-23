import lazy from './modules/lazy'

export default {
  install(app) {
    // app.directive('lazy', lazy)
    const directives = import.meta.glob('./modules/*.js', { eager: true })
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      app.directive(name, value.default)
    }
  }
}
