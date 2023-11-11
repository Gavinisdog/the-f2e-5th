import {
	createRouter,
	createWebHashHistory,
	type RouterOptions,
	type Router,
	type RouteRecordRaw,
} from 'vue-router';
// RouterRecordRaw
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/Layout/DefaultLayout.vue'),
    children: [
      {
        name: 'F2E',
        path: 'F2E', // 移除斜杠
        component: () => import('@/views/F2E/F2E.vue'),
        children: [ // 添加 children 配置
          {
            name: 'Site',
            path: 'Site',
            component: () => import('@/views/F2E/Site.vue') // 假设有 test1.vue 文件
          },
          {
            name: 'Map',
            path: 'Map', // 移除斜杠
            component: () => import('@/views/F2E/Map.vue') // 假设有 test2.vue 文件
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component: ()=> import('@/components/Login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'Error',
    component: () => import('../Layout/Error.vue')
  }
];

// RouterOptions
const options: RouterOptions = {
	history: createWebHashHistory(),
	routes,
};

// Router
const router: Router = createRouter(options);

export default router;
