import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '/src/component/Users')
  },
  {
    path: '/users/:id(\\d+)',
    name: 'User',
    component: () => import(/* webpackChunkName: "users" */ '/src/component/User')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router