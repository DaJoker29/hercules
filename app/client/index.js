import Vue from 'vue';
import App from '@app/client/App';
import axios from 'axios';
import NProgress from 'nprogress';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('body');

axios.interceptors.request.use(config => {
  NProgress.configure({
    parent: '.app-container'
  });
  NProgress.start();
  return config;
});

axios.interceptors.response.use(response => {
  NProgress.done();
  return response;
});
