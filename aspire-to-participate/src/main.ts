import { createApp } from "vue";
// import "./main.scss";
import App from "./App.vue";
import router from "../src/router/index.ts";
import PrimeVue from "primevue/config";
import { Icon } from '@iconify/vue';
const app = createApp(App);
app.component('Icon', Icon)

app.use(router);
app.use(PrimeVue);

app.mount("#app");
