import {
  createRouter,
  createWebHashHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from "vue-router";
// RouterRecordRaw
const routes: RouteRecordRaw[] = [
  {
    path: "/demoView",
    name: "demoView",
    component: () => import("../../src/components/HelloWorld.vue"),
  },
  {
    path: "/:pathMatch(.*)*", // match other path
    redirect: "/demoView",
  },
];

// RouterOptions
const options: RouterOptions = {
  history: createWebHashHistory(),
  routes,
};

// Router
const router: Router = createRouter(options);

export default router;
