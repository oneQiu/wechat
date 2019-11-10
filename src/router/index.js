import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
    children: [
      {
        path: "/",
        name: "login",
        component: () => import("../views/login.vue")
      },
      {
        path: "/talk",
        name: "talk",
        component: () => import("../views/section.vue")
      }
    ]
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
