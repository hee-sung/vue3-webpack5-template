import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/users/:id(\\d+)',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '/src/component/User')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router