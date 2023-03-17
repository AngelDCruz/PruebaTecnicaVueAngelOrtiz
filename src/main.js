import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';



Vue.use(VueSweetalert2);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

let routes = [
  {
    path: "*",
    name: "xx",
    component: require("./views/ruleta-juego.vue").default,
  },
  {
    name: "apuesta",
    path: "/Apuesta",
    component: require("./views/ruleta-juego.vue").default,
  },
];

let router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App)
}).$mount("#app");
