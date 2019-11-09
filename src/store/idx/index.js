import { SETNUMS } from "./type";

export default {
  namespaced: true,
  state: {},
  mutations: {
    [SETNUMS](state) {
      console.log(state);
    }
  },
  actions: {},
  getters: {}
};
