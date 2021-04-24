<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main class="body" :style="{padding: '0 50px'}">
        <el-breadcrumb separator="/" :style="{margin: '20px 0'}">
          <el-breadcrumb-item v-for="(item,index) in $route.meta.Bread" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer>
      <Foot></Foot>
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import Header from "@/components/header-manager";
import Foot from "@/components/footer";
import { mapGetters, mapActions } from "vuex";

import axios from "axios";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Header,
    Foot
  },
  methods: {
    freshContent() {
      this.$router.push("/index.html/status");
    },
    ...mapActions({
      getProfile: "getProfile"
    })
  },
  computed: {
    ...mapGetters({})
  },
  created() {
    // this.getProfile();
  }
};
</script>


<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  min-height: 800px;
}

/* 
.ivu-layout{
  height: 100%;
}

.ivu-layout .Footer{
  height: 10%;
}
.body{
  height: 80%;
} */

.content {
  /* min-width: 78%;
  min-height: 600px; */
  margin: 24px 24px 0px;
  height: 80%;
}
</style>
