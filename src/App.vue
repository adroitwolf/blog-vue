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
  }
  // watch: {
  //     initData () {
  //       let H = document.querySelector('#cdapp')
  //       H.style.height = ''
  //       setTimeout(() => {
  //         console.log(H.offsetHeight)
  //         if (H.offsetHeight < window.innerHeight) {
  //           document.body.style.height = window.innerHeight + 'px'
  //           H.style.height = window.innerHeight - 30 + 'px'
  //         } else {
  //           document.body.style.height = H.offsetHeight + 'px'
  //           H.style.height = ''
  //         }
  //       }, 300)
  //     }
  //   }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

/* html {
    width:100%;
    height: 100%;
} */
/* body{

  min-height: 100vh;
    overflow: auto;
    height: auto;
    
} */

/* html,body{ 
  height: 100%;
  overflow: auto;
} */
#app {
  min-height: 800px;
  width: 100%;
  /* font-family: "微软雅黑"; */
  font-family: Lato, "Microsoft Jhenghei", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif !important;
  /*font-family: 'Rajdhani',sans-serif;*/
}
</style>
