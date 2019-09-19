<template>
  <div id="app">
    <!-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8DbemF3tiQlMVTPoYllB6bLBxeuCNFN-XX-D-XRQsKqpKt_g"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import "./assets/home.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
