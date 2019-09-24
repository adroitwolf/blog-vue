<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route: function(to, from) {
      if (to.meta.title) {
        document.title = to.meta.title;
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  min-height: 800px;
  width: 100%;
  /* font-family: "微软雅黑"; */
  font-family: Lato, "Microsoft Jhenghei", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif !important;
  /*font-family: 'Rajdhani',sans-serif;*/
}
</style>
