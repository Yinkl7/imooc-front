import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted(el) {
    // console.log(el)
    const tempSrc = el.src
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([isIntersect]) => {
      if (isIntersect) {
        el.src = tempSrc
        stop()
      }
    })
  }
}
