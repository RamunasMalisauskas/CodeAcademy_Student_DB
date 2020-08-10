<template>
  <div id="app">
    <Header />
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",
  components: { Header },
};
</script>

<style scoped>
.wrapper {
  width: 768px;
  margin: 0 auto;
  min-height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
