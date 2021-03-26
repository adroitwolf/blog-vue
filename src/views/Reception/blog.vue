<template>
  <div class="blog-content">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/header";

export default {
  name: "blog",
  components: {
    Header
  },
  data() {
    return {};
  }
};
</script>

<style lang="sass" scoped>


@import '@/assets/style/custom.scss'

@import "node_modules/bootstrap/scss/bootstrap"


</style>


<style scoped>
@import "../../assets/style/blog.css";
</style>

<style>
/* 修改的iview分页样式 */
.ivu-page-total {
  color: black;
  opacity: 0.8;
}
.ivu-page-prev,
.ivu-page-item,
.ivu-page-next {
  background: transparent;
  color: black;
}
</style>
