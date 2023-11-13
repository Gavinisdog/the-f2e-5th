import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/router/index.ts";

import { Icon } from "@iconify/vue";
import PrimeVue from "primevue/config";
import ScrollTop from "primevue/scrolltop";
import SplitButton from "primevue/splitbutton";

// import "@/main.scss";

const app = createApp(App);
app.use(router);
app.use(PrimeVue, { unstyled: true });

app.component("Icon", Icon);
app.component("ScrollTop", ScrollTop);
app.component("SplitButton", SplitButton);
app.mount("#app");
