import Vue from 'vue';
import Router from 'vue-router';

import About from '../views/About'
import Home from '../views/Home'
import Login from '../views/Login'
import NotFound from '../views/NotFound'
import Register from '../views/Register'
import Users from '../views/Users'
import store from '../store'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home},
    { path: '/about', name: 'about', component: About, meta: {requiresAuth: true}},
    { path: '/users', name: 'users', component: Users, meta: {requiresAuth: true} },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '*', name: 'notfound', component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = store.getters['auth/loggedIn'];
  if (authRequired && !loggedIn) {
    next({
      name: 'login',
      params: { nextUrl: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
