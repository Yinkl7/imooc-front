export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        // D:\综合面试\imooc-front\src\views\layout\components\main.vue
        component: () => import('@/views/main/index.vue')
      }
    ]
  }
]
