import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || ''
  },
  getters: {
    getSiteName: state => {
      return state.config.name;
    },
    getUsername: state => {
      return state.username;
    },
    getWordTarget: state => {
      return state.config.settings.wordTarget;
    }
  },
  mutations: {
    setUsername(state, payload) {
      state.username = payload;
      localStorage.setItem('username', payload);
    },
    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    logout(state) {
      state.token = '';
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  },
  actions: {
    login({ commit }, { token, username }) {
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
      commit('setToken', token);
      commit('setUsername', username);
    },
    logout({ commit }) {
      delete axios.defaults.headers.common['Authorization'];
      commit('logout');
    }
  }
});
