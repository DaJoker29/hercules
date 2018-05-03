import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    pending: 0,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || ''
  },
  getters: {
    isLoading: state => {
      return state.pending > 0;
    },
    getSiteName: state => {
      return state.config.name;
    },
    getUsername: state => {
      return state.username;
    }
  },
  mutations: {
    increment(state) {
      ++state.pending;
    },
    decrement(state) {
      --state.pending;
    },
    clear(state) {
      state.pending = 0;
    },
    setUsername(state, payload) {
      state.username = payload;
      localStorage.setItem('username', payload);
    },
    setToken(state, payload) {
      state.token = payload;
      localStorage.setItem('token', payload);
    }
  },
  actions: {
    addPending({ commit }) {
      commit('increment');
    },
    removePending({ commit }) {
      commit('decrement');
    },
    clearPending({ commit }) {
      commit('clear');
    },
    setUsername({ commit }, username) {
      commit('setUsername', username);
    },
    setToken({ commit }, token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
      commit('setToken', token);
    }
  }
});
