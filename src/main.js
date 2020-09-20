import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./registerServiceWorker";
import {store} from "./store/store";
import VueSocketio from "vue-socket.io";
import SocketIO from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

const lolo =new VueSocketio({
  //connection: SocketIO("http://localhost:3000/"),
  connection: SocketIO("https://server-dixit.herokuapp.com/"),
  vuex: {
      store,
      actionPrefix: "SOCKET_"
  }
})
Vue.use(lolo);

Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

new Vue({
  el: "#app",
  router,
  store,
  lolo,
  components: { App },
  render: h => h(App)
});