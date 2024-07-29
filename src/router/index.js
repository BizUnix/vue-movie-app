import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import MovieSearch from "@/views/MovieSearch.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MovieSearch,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
