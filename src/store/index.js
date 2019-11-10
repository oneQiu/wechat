import Vue from "vue";
import Vuex from "vuex";
import IndexStore from "./idx";
import { SETUSER } from "./type";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    IndexStore
  },
  state: {
    username: "",
    password: ""
  },
  mutations: {
    [SETUSER](state, obj) {
      state.username = obj.username;
      state.password = obj.password;
    }
  },
  actions: {},
  getters: {}
});
