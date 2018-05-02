import Vue from 'vue';
import Router from 'vue-router';
import Home from '@app/client/components/Home';
import AuthorPage from '@app/client/components/AuthorPage';
import LoginPage from '@app/client/components/LoginPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:username',
      name: 'author',
      component: AuthorPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
});
