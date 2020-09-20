import Vue from "vue";
import Router from "vue-router";
import Game from "@/components/Game.vue";
import Selectcards from "@/components/SelectCards.vue";
import Auth from "@/components/Auth.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      name: "start",
      component: Auth
    },
    {
      path: "/selectcards",
      name: "selectcards",
      component: Selectcards
    },
    {
      path: "/mesa",
      name: "mesa",
      component: Game
    }
  ]
});
