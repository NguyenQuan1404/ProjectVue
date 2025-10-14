// import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import store from "/src/store.js"; 
createApp(App).use(store).use(router).mount("#app");


const app = createApp(App);

app.use(router);
app.use(store); 

app.mount("#app");