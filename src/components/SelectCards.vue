<template>
  <div id="selectcards"> 
  <div style="width: 100%; text-align: center;">
    <b-button variant="danger" @click="volver()"><b-icon icon="arrow-return-left"></b-icon> Volver</b-button>
  </div>

  <template v-if="$store.state.seeOthersCards"> 
    <card v-for="(carta, index) in $store.state.votacion" :key="index" :data-image="carta.carta" :data-ganador="carta.islacuentacuentos">
      <h1 slot="header">{{carta.votos}}</h1>
      <p v-if="!$store.state.yavoto && $store.state.cartaMandadaTuya != carta.carta" slot="content" style="withd">
        <b-toast :id="'btn_'+carta.carta" variant="danger" auto-hide-delay="1000" no-close-button solid static>
          <b-button variant="danger" @click="seleccion(index, carta.carta)">Confirmamo esta!</b-button>
        </b-toast>
        <b-button @click="$bvToast.show('btn_'+carta.carta)" pill variant="outline-success">Ponele que sea esta</b-button>
      </p>
    </card>
  </template>

  <template v-else> 
    <card v-for="(carta, index) in Jactivo.hand" :key="index" :data-image="carta" :data-ganador="false">
      <h1 slot="header"></h1> 
      <p v-if="!$store.state.yaseleciono" slot="content" style="withd">
        <b-toast :id="'btn'+carta" variant="danger" auto-hide-delay="1000" no-close-button solid static>
          <b-button variant="danger" @click="seleccion(index, carta)">Confirmamo esta!</b-button>
        </b-toast>
        <b-button @click="$bvToast.show('btn'+carta)" pill variant="outline-success">Seleccionar esta cosa</b-button>
      </p>
    </card>
  </template>

  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "Selectcards",
  components: {
    Card
  },
  data () {
    return {    
      Jactivo: this.devolverJA(),
    }
  },
  created: function () {
    if (this.$store.state.jugadorActivo == "**") {
      this.$router.push("start");
    }
  },
 methods: {
    volver: function () {  
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    devolverJA: function () {  
       let JA = this.$store.state.players.find(element => element.name == this.$store.state.jugadorActivo);
       if (JA) return JA;
       else return {};
    },
    seleccion(index_, carta_) {
      let seleccion = {
        index: index_,
        carta: carta_,
        positionja:  this.Jactivo.position,
        votos:"",
        islacuentacuentos: false
      }
      this.$store.state.cartaMandadaTuya = carta_;

      switch (this.$store.state.step) {
        case "arrancamo":
          this.$store.state.yaseleciono= true;
          this.$store.state.yavoto= true;
          this.$store.state.step= "eligiendo";
          this.$socket.emit("cuentacuentos", seleccion);
          break;
        case "cuentacuentos":
          this.$store.state.yaseleciono= true;
          this.$store.state.yavoto= true;             
          this.$socket.emit("cuentacuentos", seleccion);                 
          break;
        case "eligiendo":
          this.$store.state.yaseleciono= true;
          this.$socket.emit("eligiendo", seleccion);
          break;
        case "votacion":
          this.$store.state.yavoto= true;
          this.$socket.emit("votacion", seleccion);
          this.$store.state.cartaMandadaTuya = 0;
          break;  
        default:
          break;
      }
      this.volver();
    }                 
  }
};
</script>

<style>
#selectcards{
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    justify-content: center;
}

.b-toast-danger.b-toast-solid .toast {
    background-color: var(--danger);
}
</style>
