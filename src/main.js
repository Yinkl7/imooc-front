import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { useRem } from '@/utils/flexible.js'

useRem()

createApp(App).use(router).mount('#app')
