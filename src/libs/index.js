import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index'
export { message } from './message/index'

export default {
  install(app) {
    /**
     * 通用组件动态注册
     * 1、获取所有组件
     * 2、遍历拿到组件
     * 3、动态注册
     */
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const cpnName = `m-` + fullPath.replace('./', '').split('/')[0]
      app.component(cpnName, defineAsyncComponent(fn))
    }
  }
}
