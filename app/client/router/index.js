import Vue from 'vue';
import Router from 'vue-router';
import Home from '@app/client/components/Home';
import AuthorPage from '@app/client/components/AuthorPage';
import LoginPage from '@app/client/components/LoginPage';
import CreatePostPage from '@app/client/components/CreatePostPage';
import CategoryPage from '@app/client/components/CategoryPage';
import NProgress from 'nprogress';

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: '/post/new',
      name: 'createPost',
      component: CreatePostPage
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: CategoryPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
