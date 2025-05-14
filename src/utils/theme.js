import { watch } from 'vue'
import store from '../store'
import { THTME_DARK, THTME_LIGHT } from '../constants'

export default () => {
  watch(
    () => store.getters.themeType,
    (theme) => {
      let themeClassName = ''
      switch (theme) {
        case THTME_LIGHT:
          themeClassName = 'light'
          break
        case THTME_DARK:
          themeClassName = 'dark'
      }
      document.querySelector('html').className = themeClassName
    },
    { immediate: true }
  )
}
