import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: process.env.SITE_CONFIG,
    pending: 0,
    username: '',
    token: ''
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
    }
  }
});
