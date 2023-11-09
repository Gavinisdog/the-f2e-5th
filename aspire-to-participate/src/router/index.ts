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
		path: '/demoView',
		name: 'demoView',
		component: async () => import('../../src/components/HelloWorld.vue'),
	},
	{
		path: '/:pathMatch(.*)*', // Match other path
		redirect: '/demoView',
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
