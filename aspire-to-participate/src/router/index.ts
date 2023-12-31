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
		name: 'home',
		component: async () => import('@/pages/Home/index.vue'),
	},
	{
		path: '/vote',
		name: 'vote',
		component: async () => import('@/pages/Vote/index.vue'),
	},
	{
		path: '/map',
		name: 'map',
		component: async () => import('@/pages/Map/index.vue'),
	},
	{
		path: '/:pathMatch(.*)*', // Match other path
		redirect: '/',
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
