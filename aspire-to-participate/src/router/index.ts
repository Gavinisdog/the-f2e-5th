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
		path: '/:pathMatch(.*)*', // Match other path
		redirect: '/home',
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
