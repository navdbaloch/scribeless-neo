import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../pages/home.vue';
import Signup from '../pages/signup.vue';
import Feed from '../pages/feed.vue';
import Login from '../pages/login.vue';
import Search from '../pages/search.vue';
import Favourites from '../pages/favourites.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search/:id?',
    name: 'Search',
    component: Search,
  },
  {
    path: '/signup',
    name: 'About',
    component: Signup,
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
  },
  {
    path: '/favs',
    name: 'Favourites',
    component: Favourites,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
