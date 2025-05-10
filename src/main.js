import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { useRem } from '@/utils/flexible.js'
import libs from './libs'
import 'virtual:svg-icons-register'

useRem()

createApp(App).use(router).use(libs).mount('#app')
