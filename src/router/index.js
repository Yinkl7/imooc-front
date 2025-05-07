import { createRouter, createWebHistory } from 'vue-router'
import mobileRoutes from './modules/mobile-routes'
import pcRoutes from './modules/pc-routes'
import { isMobileTerminal } from '../utils/flexible'

const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes
})

export default router
