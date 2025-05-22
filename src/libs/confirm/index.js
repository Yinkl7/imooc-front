import { h, render } from 'vue'
import confirmComponent from './index.vue'

export const confirm = (
  title,
  content,
  concelText = '取消',
  confirmText = '确定'
) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }

    const close = () => {
      render(null, document.body)
    }

    const confirmHandler = () => {
      resolve()
    }

    const cancelHandler = () => {
      reject(new Error('点击取消按钮'))
    }

    const vnode = h(confirmComponent, {
      title,
      content,
      concelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })

    render(vnode, document.body)
  })
}
