<template>
  <div>
    <el-menu mode="horizontal" :theme="theme1" class="header" background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
      <!-- 用户操作的菜单模块 -->
      <div class="menu">
        <template v-for="(menu,index) in menus" >
          <el-menu-item  v-if="!menu.children" :key="index" :index="index" :name="index" :to="menu.path">
            <i :class="menu.meta.icon" />
            {{menu.name}}
          </el-menu-item>
          <el-submenu v-if="menu.children" :index="index" :key="index" :name="index">
            <template slot="title">
              <i :class="menu.meta.icon" />
              <span v-text="menu.name"></span>
            </template>
            <el-menu-item v-for="thirdMenu in menu.children"
                       :name="thirdMenu.name"
                       :key="thirdMenu.name"
                       :to="thirdMenu.path"
                       >
                       {{thirdMenu.name}}
            </el-menu-item>
          </el-submenu>
        </template>
        
      </div>
      <div>
        <div class="accessory">
          <router-link to="/index.html">
            <i class="ios-desktop-outline"  size="25"/>
          </router-link>
        </div>
        <el-dropdown @on-click="checkProfile">
          <div class="profile">
            <!-- 判断用户是否有头像 -->
            <el-avatar :src="avatar?avatar:baseAvatar" size="large" ></el-avatar>
          </div>
          <el-dropdown-menu slot="list">
            <el-dropdown-item name="个性管理">
              <i class="ios-person" />个人资料
            </el-dropdown-item>
            <el-dropdown-item name="logout">
              <i class="ios-log-out" />退出登陆
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>
<script>

import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "Header",
  data() {
    return {
      theme1: "dark",
      // avatarUrl: require("@/assets/img/avatar.png")
    };
  },
  components: {
  },
  methods: {
    ...mapActions(["logout"]),
    checkProfile(name) {
      if (name === "logout") {
        this.logout().then(response => {
          Message.success("退出成功！");
          this.$router.push({ name: "博客" });
        });
      }
      this.$router.push({ name: name });
    }
  },
  mounted(){
    console.log(this.menus);
  },
  computed: {
    ...mapGetters(["menus", "avatar","baseAvatar"])
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.menu {
  padding: 0 60px;
}
.profile {
  padding: 0 60px;
  line-height: 60px;
}
.ivu-dropdown-item {
  font-size: 16px !important;
}

.accessory {
  color: #fff;
  display: inline-block;
}
</style>
