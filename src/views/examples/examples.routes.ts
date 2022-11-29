import type { RouteRecordRaw } from 'vue-router';
import Examples from '@/views/examples/Examples.vue' 

export const examplesRoutes: RouteRecordRaw[] = [
  {
    name: 'examples',
    path: '/examples',
    component: Examples
  }
]