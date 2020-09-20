<template>
  <div>
    <b-jumbotron>
      <template v-slot:header>Jugando</template>
      <template v-slot:lead>
        Status: <b>#{{$store.state.step}}#</b>
<!--         <br>
        Mesa nro: <b>45</b> -->
      </template>
      <hr class="my-4">

      <div>
        <p>Puntajes:  <!-- {{$store.state}} --><p/>
        <b-list-group style="max-width: 300px;">
         
          <b-list-group-item v-for="(player, index) in $store.state.players" :key="index" class="d-flex align-items-center">
            <b-spinner v-if="player.cuentacuentos" variant="light" type="grow" label="Spinning"></b-spinner>
            <b-avatar v-if="player.extrapoints" v-bind:badge="'+'+player.extrapoints" badge-offset="-2px" badge-variant="danger" class="mr-3" variant="info" v-bind:src="'/img/icons/cara'+player.perfil+'.png'"></b-avatar>
            <b-avatar v-else class="mr-3" variant="info" v-bind:src="'/img/icons/cara'+player.perfil+'.png'"></b-avatar>
            <span class="mr-auto">{{player.name}}</span>            
            <h3><b-badge variant="success">{{player.puntaje}}</b-badge></h3>
          </b-list-group-item> 
          
        </b-list-group>
      </div>

      <br>
     <!--  <b-button variant="danger" style="width: -webkit-fill-available;"> Actualizar <b-icon icon="watch"></b-icon></b-button>
       <br> <br> -->
      <b-button pill variant="info"  @click="siguiente(false)" style="width: -webkit-fill-available; background-color: #8a42c1">Ver mano <b-icon icon="search"></b-icon></b-button>
      <br><br>
      <b-button pill variant="warning" :disabled="$store.state.step != 'votacion'" @click="siguiente(true)" style="width: -webkit-fill-available;  background-color: #17a2b8;">Votar <b-icon icon="person-check-fill"></b-icon></b-button>   
      <br><br>
      <b-button pill variant="dark" :disabled="$store.state.step != 'cuentacuentos'" @click="siguiente(true)" style="width: -webkit-fill-available;">Ver votacion <b-icon icon="award"></b-icon></b-button>   
    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: 'Game',
  components: {
  },

  data () {
    return {    
      name: "",
    }
  },
  created: function () {
    if (this.$store.state.jugadorActivo == "**") {
      this.$router.push("start");
    }
  },
  methods: {
    siguiente: function (seeOthersCards) {  
      this.$store.state.seeOthersCards = seeOthersCards;
      this.$router.push("selectcards");
    }
  }
}
</script>

<style scoped>
.jumbotron {  
    background-image: url(/img/fond3.jpg);
    color: white;
    background-size: cover;    
    font-weight: bold;
    text-shadow: 0.1em 0.1em 0.05em #333;
    font-family: "cursive";
}

hr { 
  border-top: 3px solid #fdfdfe;
}

.lead{
  font-weight: unset; 
  background-color: rgba(255, 35, 0, 0.59);
}

button{
  font-weight: bold;
}

.list-group-item {
  background-color: rgba(0, 123, 255, 0.25);
  border: 1px solid #fdfdfe;
}
/* 
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666; 
}

.mb-5, .my-5 {
   margin-bottom: 0 !important;
} */
</style>
