import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import store from '@/store/index.js'
import { useRem } from '@/utils/flexible.js'
import useTheme from '@/utils/theme'
import libs from './libs'
import directives from './directives'
import 'virtual:svg-icons-register'

useRem()
useTheme()
// createApp(App).use(router).use(store).use(libs).use(directives).mount('#app')

const app = createApp(App)
app.use(router)
app.use(store)
app.use(libs)
app.use(directives)
app.mount('#app')
