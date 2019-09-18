<template>
  <div class="layout">
    <Layout>
      <Header></Header>
      <Content class="body" :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem v-for="(item,index) in $route.meta" :key="index">{{item}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="content">
          <router-view></router-view>
        </div>
      </Content>
      <Foot></Foot>
    </Layout>
  </div>
</template>


<script>
import Header from "@/components/common/header-manager";
import Foot from "@/components/common/footer";
import { mapGetters, mapActions } from "vuex";
import { Breadcrumb, BreadcrumbItem, Content, Layout, Message } from "iview";
import axios from "axios";

export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Header,
    Foot,
    Layout,
    Breadcrumb,
    BreadcrumbItem,
    Content
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
    this.getProfile();
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
