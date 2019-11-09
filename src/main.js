import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Image, Icon, Search, Field, NoticeBar } from "vant";

Vue.config.productionTip = false;
Vue.use(Button)
  .use(Image)
  .use(Icon)
  .use(Search)
  .use(Field)
  .use(NoticeBar);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
