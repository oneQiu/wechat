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
        path: "/a",
        name: "a",
        component: () => import("../views/section.vue")
      }
    ]
  },
  {
    path: "*",
    redirect: "/a"
  }
];

const router = new VueRouter({
  routes
});

export default router;
