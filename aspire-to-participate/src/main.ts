import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/router/index.ts";

import { Icon } from "@iconify/vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import ScrollTop from "primevue/scrolltop";
import SplitButton from "primevue/splitbutton";
import Sidebar from "primevue/sidebar";

import "@/main.scss";
import "primevue/resources/themes/lara-light-purple/theme.css";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import DialogService from "primevue/dialogservice";
const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.component("Icon", Icon);
app.component("Button", Button);
app.component("ScrollTop", ScrollTop);
app.component("SplitButton", SplitButton);
app.component("Sidebar", Sidebar);
app.mount("#app");
