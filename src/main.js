import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import store from '@/store/index.js'
import { useRem } from '@/utils/flexible.js'
import libs from './libs'
import 'virtual:svg-icons-register'

useRem()

createApp(App).use(router).use(store).use(libs).mount('#app')
