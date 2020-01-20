<template>
  <div id="app">
    <Navbar />
    <!-- <Notification/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100%;

  font-family: "Roboto", helvetica, arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-rendering: optimizeLegibility;
  margin: 0;
  padding: 0;
}
</style>
