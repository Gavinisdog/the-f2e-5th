declare module '*.vue' {
	import type {DefineComponent} from 'vue';
	const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
	export default component;
}
declare module 'vue/types/vue' {
	import {type Route} from 'vue-router';
	import type VueRouter from 'vue-router';
  type Vue = {
  	$router: VueRouter; // 这表示this下有这个东西
  	$route: Route;
  	$http: any;
  	$Message: any;
  	$Modal: any;
  };
}
