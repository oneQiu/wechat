import { SETNUMS } from './type';

export default {
    namespaced: true,
    state: {},
    mutations: {
        [SETNUMS](x) {
            console.log(x);
        }
    },
    actions: {},
    getters: {}
}