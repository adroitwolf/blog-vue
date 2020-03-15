<template>
  <div>
    <Menu mode="horizontal" :theme="theme1" class="header">
      <!-- 用户操作的菜单模块 -->
      <div class="menu">
        <template v-for="(menu,index) in menus" >
          <MenuItem  v-if="!menu.children" :key="index" :name="index" :to="menu.path">
            <Icon :type="menu.meta.icon" />
            {{menu.name}}
          </MenuItem>
          <Submenu v-if="menu.children" :key="index" :name="index">
            <template slot="title">
              <Icon :type="menu.meta.icon" />
              <span v-text="menu.name"></span>
            </template>
            <Menu-Item v-for="thirdMenu in menu.children"
                       :name="thirdMenu.name"
                       :key="thirdMenu.name"
                       :to="thirdMenu.path"
                       >
                       {{thirdMenu.name}}
            </Menu-Item>
          </Submenu>
        </template>
        
      </div>
      <div>
        <div class="accessory">
          <router-link to="/index.html">
            <Icon type="ios-link-outline" size="20" />
          </router-link>
        </div>
        <Dropdown @on-click="checkProfile">
          <div class="profile">
            <!-- 判断用户是否有头像 -->
            <Avatar :src="avatar?avatar:baseAvatar" size="large" />
          </div>
          <DropdownMenu slot="list">
            <DropdownItem name="个性管理">
              <Icon type="ios-person" />个人资料
            </DropdownItem>
            <DropdownItem name="logout">
              <Icon type="ios-log-out" />退出登陆
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </div>
</template>
<script>
import {
  Message,
  Menu,
  MenuItem,
  Submenu,
  MenuGroup,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Icon
} from "view-design";
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
    Menu,
    MenuItem,
    MenuGroup,
    Submenu,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Message,
    Icon
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
