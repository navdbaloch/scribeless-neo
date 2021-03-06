import Vue from 'vue';
import Vuex from 'vuex';
import { loader } from './modules/loader';
import { session } from './modules/session';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { loader, session },
});
