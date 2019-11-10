import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Image,
  Icon,
  Search,
  Field,
  NoticeBar,
  Notify,
  Divider,
  Toast,
  Dialog,
  Tag
} from "vant";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(Button)
  .use(Image)
  .use(Icon)
  .use(Search)
  .use(Field)
  .use(NoticeBar)
  .use(Notify)
  .use(Toast)
  .use(Divider)
  .use(Dialog)
  .use(Tag)
  .use(
    new VueSocketIO({
      debug: true,
      connection:
        window.location.protocol + "//" + window.location.hostname + ":8888",
      vues: {}
    })
  );
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
