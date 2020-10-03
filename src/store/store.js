import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export let store = new Vuex.Store({
  state: {
    nroSala: 0,
    cartaMandadaTuya:0,

    jugadorActivo:"**",    
    seeOthersCards:false,

    yaseleciono: false,
    yavoto: false,

    nrojugadores:0,
    nrocartas:0,
    puntajeEndgame:0,
    step: "esperando",
    createdGame: false,
    players: [],
    votacion: []
  },

  actions: {
    SOCKET_newGame(state, server) {
      console.log("SOCKET_newGame");
      store.replaceState(server);
    },
    SOCKET_newConection(state, server) { 
      console.log("SOCKET_newConection");
      store.state.players = server;
    },
    SOCKET_statusja(state, server) {
      console.log("SOCKET_statusja");
      store.state.yaseleciono = server.yaseleciono;
      store.state.yavoto = server.yavoto;
    },
    SOCKET_changestatus(state, server) {
      console.log("SOCKET_changestatus");
      store.state.step = server;
    },
    SOCKET_cuentacuentos(state, server) {
      console.log("SOCKET_cuentacuentos");
      store.state.step= "eligiendo";
      store.state.players = server;
      store.state.votacion = [];
    },
    SOCKET_eligiendo(state, server) {
      console.log("SOCKET_eligiendo");
      store.state.step= "votacion";
      store.state.votacion = server;
    },
    SOCKET_votacion(state, server) {
      console.log("SOCKET_votacion");
      store.state.step= "cuentacuentos";
      store.state.votacion = server;
    },
    SOCKET_resultados(state, server) {
      console.log("SOCKET_resultados");
      store.state.players = server;
      
      let ja = store.state.players.find(element => element.name == store.state.jugadorActivo)
      if (ja && ja.cuentacuentos) store.state.yaseleciono= false;
    },
    
    SOCKET_changePlayers(state, server) {
      console.log("SOCKET_changePlayers");
      store.state.players = server;
    },
    SOCKET_changeVotos(state, server) {
      console.log("SOCKET_changeVotos");
      store.state.votacion = server;
    },                   

    SOCKET_INIT(state, server) {
      if (server && server.createdGame) store.replaceState(server);
    },
    SOCKET_SUCCSESS(state, server) {
      console.log(server.message);
    },
    SOCKET_SIGINT(state, server) {
      console.log(server.message);
    }
  }
});
