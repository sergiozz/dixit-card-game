<template>
  <div v-bind:class="[ 'card-wrap', dataGanador ? 'ganador' : '' ]"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card" :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "card",
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage', 'dataGanador'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null }),

  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 40;
      const rY = this.mousePY * -40;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)` };
    },
    cardBgTransform() {
      const tX = this.mousePX * -10;
      const tY = this.mousePY * -10;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)` };
    },
    cardBgImage() {
      return {
        backgroundImage: `url(img/cards/card%28${this.dataImage}%29.jpg)` };
    } 
  },

  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 500);
    } 
  } 
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* body {
  margin: 40px 0;
  font-family: "Raleway";
  font-size: 14px;
  font-weight: 500;
  background-color: #BCAAA4;
  -webkit-font-smoothing: antialiased;
} */

.ganador{
  box-shadow: var(--warning) 0px 0px 20px 20px;
}
.title {
  font-family: "Raleway";
  font-size: 24px;
  font-weight: 700;
  color: #5D4037;
  text-align: center;
}

p {
  line-height: 1.5em;
}

h1 + p, p + p {
  margin-top: 10px;
}

.container {
  padding: 40px 80px;
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  justify-content: center;
}

.card-wrap {
  margin: 10px;
  -webkit-transform: perspective(800px);
          transform: perspective(800px);
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
  cursor: pointer;
}
.card-wrap:hover .card-info {
  -webkit-transform: translateY(0);
          transform: translateY(0);
}
.card-wrap:hover .card-info p {
  opacity: 1;
}
.card-wrap:hover .card-info, .card-wrap:hover .card-info p {
  -webkit-transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.card-wrap:hover .card-info:after {
  -webkit-transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
  transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 1;
  -webkit-transform: translateY(0);
          transform: translateY(0);
}
.card-wrap:hover .card-bg {
  top: -20px;
  left: -20px;
  padding: 20px;
  
  -webkit-transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 1;
}
.card-wrap:hover .card {
  -webkit-transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
  transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: rgba(255, 255, 255, 0.2) 0 0 40px 5px, white 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px;
}

.card {
  position: relative;
  -webkit-box-flex: 0;
          flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px;
  -webkit-transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

*, *::before, *::after {
    box-sizing: content-box !important;
}

.card-bg {
  position: absolute;

  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  -webkit-transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  pointer-events: none;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  -webkit-transform: translateY(40%);
          transform: translateY(40%);
  -webkit-transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.card-info p {
  opacity: 0;
  text-shadow: black 0 2px 3px;
  -webkit-transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.card-info * {
  position: relative;
  z-index: 1;
}
.card-info:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-blend-mode: overlay;
  opacity: 0;
  -webkit-transform: translateY(100%);
          transform: translateY(100%);
  -webkit-transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.card-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(0, 0, 0, 0.5) 0 10px 10px;
}

.card-info button {
  border: solid;
}

</style>
