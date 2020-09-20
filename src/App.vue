<template>
  <div id="app">
     <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {    
  },
 methods: {         
  }
};
</script>

<style>
body{  
    background-image: url(/img/fond1.jpg);
}

#app{
    padding: 40px 16px;
    /* max-width: 1200px;*/
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    justify-content: center;  
}
</style>
