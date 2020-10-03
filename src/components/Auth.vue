<template>
  <div >
    <b-jumbotron>
      <template v-slot:header>««Dixit»»</template>
      <template v-slot:lead>
        Jueguito casero ® y berreta 
      </template>
      <hr class="my-4">
      <p>
       <!--  {{$store.state}} -->
        Quien sos? quien te conoce?
      </p>
      <b-form-input type="text" v-model="name" maxlength=9 placeholder="Enter your name, gato"></b-form-input>
      <br>
      <b-button v-b-toggle.collapse-1 variant="primary" style="width: -webkit-fill-available;">New Game</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          Nro de jugadores<b-form-input type="number" min="4" max="21" v-model="nrojugadores" placeholder="cuantos son?"></b-form-input>
          Cartas a repartir<b-form-input type="number" min="4" max="12" v-model="nrocartas" placeholder="<6>"></b-form-input>
          Puntaje endgame<b-form-input type="number" min="30" max="999" v-model="puntajeEndgame" placeholder="<999>"></b-form-input>
          <br>
          <b-button variant="dark" @click="newgame()">            
           <!--  <b-spinner variant="primary" small label="Text Centered"></b-spinner>  -->Crear juego </b-button>
        </b-collapse>
      <br><br>
      <b-button variant="info" :disabled="!$store.state.createdGame" @click="unirse()" style="width: -webkit-fill-available;" >   
        <!-- <b-spinner variant="danger" small label="Text Centered"></b-spinner> --> Unirse
      </b-button>
      <!-- <b-form-input type="number" min="1" max="999" v-model="codigoGame" placeholder="Código, aquí"></b-form-input> -->
      <br><br>

      <div style="width: 100%; text-align: center;">
          <b-button v-b-toggle.collapse-help variant="secondary">Reglas</b-button>
      </div>    
        <b-collapse id="collapse-help" class="mt-2">
          <b-card tag="article" bg-variant="secondary" text-variant="white" style="max-width: 20rem;" class="mb-2" >
            <b-card-text class="serif">
            <u>El cuentacuentos:</u>  <br>
            Uno de los jugadores hace de cuentacuentos en cada uno de los turnos. Observa sus
            6 cartas de la mano y, de una de ellas, debe construir una frase y decirla por videollamada, o en voz alta si se encuentran todos presentes.
            Si el juego acaba de comenzar, el primero que seleccione una carta se trasformará en el cuentacuentos inicial y luego irán rotando entre los demás jugadores. 
            Esta primer acción podría presentar errores en el juego, es recomendable que antes de seleccionar la carta, éste se pronuncie ante el resto para advertir que él será el 1° cuentacuentos. <br><br>
            <u>Seleccionar una carta para el cuentacuentos:</u>  <br>
            El resto de jugadores seleccionará de entre sus cartas la que mejor se adapte a la
            frase construida por el cuentacuentos. Entonces, cada jugador elige una de sus cartas, nadie mas podrá verla hasta que sea la fase de votación.<br><br>
            <u>Encontrar la carta del cuentacuentos : el voto</u>  <br>
            El objetivo de los jugadores es adivinar cuál de las cartas es la que el cuentacuentos
            usó para construir su frase. Si la frase del cuentacuentos describe la carta de forma demasiado precisa, todos los
            jugadores adivinarán fácilmente la carta por lo que no obtendría ningún punto. En el
            caso contrario, si su frase es demasiado extraña y tiene poco que ver con la carta,
            nadie podrá adivinarla, por lo que tampoco obtendría puntos. Por lo tanto, la dificultad
            está en encontrar una frase que no sea ni demasiado obvia ni demasiado abstracta,
            para que haya posibilidades de que algún jugador acierte, pero no todos.<br>
            Nota : No se permite votar la carta propia.<br><br>
            <font color="yellow"><u>Puntuación:</u>  <br>
            - Si todos los jugadores aciertan la carta del cuentacuentos, o si ningún jugador la
            acierta, todos los jugadores excepto el cuentacuentos ganan 2 puntos.<br>
            - En cualquier otro caso, tanto el cuentacuentos como los jugadores que hayan acertado,
            obtienen 3 puntos.<br>
            - Todos los jugadores, excepto el cuentacuentos, ganan un punto por cada voto que
            reciba su carta.<br>
            - Cuando sólo un jugador adivina la carta del cuentacuentos, los dos ganan
            4 puntos en lugar de 3.</font><br><br>
            <u>Final del turno y juego:</u>  <br>
            Cada jugador obtiene nuevas cartas hasta tener 6 en su mano. Ahora el cuentacuentos será otro
            jugador y se repite para completar la ronda de jugadores.<br>
            El juego termina cuando se roba la última carta. El jugador que más lejos haya llegado
            en la escala de puntuación es el ganador.
            </b-card-text>
          </b-card>
        </b-collapse>

    </b-jumbotron>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  components: {
  },

  data () {
    return {    
      name: "",
      nrojugadores: null,
      nrocartas: 6,
      puntajeEndgame:999
    }
  },
  methods: {
    newgame: function () {
      if(this.name.length != 0 && this.nrojugadores > 2 && this.nrojugadores < 22  && this.nrocartas > 3 && this.nrocartas < 13 && 
        this.puntajeEndgame > 30 && this.puntajeEndgame < 1000 ) {
        
        this.createGame();        
        this.$router.push("mesa")
      }
      else {
        this.nrojugadores = null
        this.nrocartas = 6
        this.puntajeEndgame= 999
      }
    },
    unirse: function () {
      if(this.name.length != 0) {    
        this.$store.state.jugadorActivo = this.name  
        this.$socket.emit("newConection", {name: this.name});
        this.$router.push("mesa")
      }
    },
    createGame: function () {
      this.$store.state.jugadorActivo = this.name
      this.$store.state.yaseleciono= false
      this.$store.state.yavoto= false
      this.$store.state.seeOthersCards = false
      this.$store.state.cartaMandadaTuya = 0

      this.$store.state.nrojugadores = this.nrojugadores
      this.$store.state.nrocartas = this.nrocartas 
      this.$store.state.puntajeEndgame = this.puntajeEndgame
      this.$store.state.step= "esperando"
      this.$store.state.createdGame= true
      this.$store.state.players=[];
      this.$store.state.votacion=[];

      this.$store.state.players.push({
          name: this.name, 
          puntaje: 0, 
          perfil: 1, 
          extrapoints: 0, 
          cuentacuentos: false, 
          yaseleciono: false, 
          yavoto: false, 
          position: 0, 
          hand: []
      })

      this.$socket.emit("newGame",this.$store.state);
    }
  }
}
</script>

<style scoped>
.serif {
  font-family: "Times New Roman", Times, serif;
}

.jumbotron {  
    background-image: url(/img/fond2.jpg);
    font-weight: bold;
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
