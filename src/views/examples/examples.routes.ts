import type { RouteRecordRaw } from 'vue-router'
import Examples from '@/views/examples/Examples.vue'
import Route1 from '@/views/examples/Route1.vue'
import Route2 from '@/views/examples/Route2.vue'

export const examplesRoutes: RouteRecordRaw[] = [
  {
    name: 'examples',
    path: '/examples',
    component: Examples
  },
  {
    name: 'route1',
    path: '/route1',
    component: Route1
  },
  {
    name: 'route2',
    path: '/route2',
    component: Route2
  }
]
