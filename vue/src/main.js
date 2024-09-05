import { createApp } from "vue";
import store from "./store";
import router from "./router";
import "./index.css";
import App from "./App.vue";
import VueCookies from "vue-cookies";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import * as jqueryExports from "jquery";
window.$ = jqueryExports.default;

createApp(App)
  .use(store)
  .use(router)
  .use(VueCookies)
  .use(VueSweetalert2)
  .mount("#app");
