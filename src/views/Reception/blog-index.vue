<template>
  <div class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div id="article-list">
            <div v-for="(article,index) in articleLists" :key="index">
              <BlogCard :article="article" :index="index" :pageSize="pageSize"></BlogCard>
            </div>
          </div>
          <div class="article-page">
            <Page
              :total="total"
              :current="pageNum"
              @on-change="change"
              show-total
              :page-size="pageSize"
            ></Page>
          </div>
        </div>
        <div class="col-md-4">
          <!-- 搜索方法 -->

          <div class="blog-card mb-4 search-block animated fadeInUp">
            <div class="search-box">
              <form class="form-inline">
                <input
                  id="keyword"
                  type="text"
                  class="animated form-control form-input"
                  v-model.trim="keyword"
                  placeholder="试着搜索一下文章吧"
                />
                <button type="button" class="btn btn-danger" @click="handleSearch()">
                  <Icon type="ios-search-outline" />
                </button>
              </form>
            </div>
          </div>

          <!-- 搜索方法结束 -->

          <!-- 登陆表单 -->
          <div class="blog-card mb-4 animated fadeInUp">
            <div v-if="username">
              <div class="form-title text-center slide_username">{{username}}</div>
              <div class="user-info">
                <!-- 修改用户头像卡片 -->
                <div class="py-2">
                  <!-- <div v-if="avatarId" class="col-md-4">
                                    <Avatar  :src='avatarId' size="large"  />
                                    </div>
                                    <div v-else class="col-md-4">
                                    <Avatar  :src='baseAvatar' size="large"  />
                  </div>-->

                  <img
                    @click="toStatus"
                    :src="!avatarId?baseAvatar:avatarId"
                    alt
                    class="slide_avatar"
                  />
                </div>

                <!-- <button class="btn btn-fluid btn-inverse-primary">状态表</button> -->
              </div>
            </div>
            <div v-else>
              <div class="form-title text-center">请登陆</div>
              <div class="form-login">
                <form>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="form-group-icon">
                        <Icon type="ios-person-outline" />
                      </div>
                      <input class="form-control form-input" v-model="account" />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="form-group-icon">
                        <Icon type="ios-person-outline" />
                      </div>
                      <input class="form-control form-input" type="password" v-model="password" />
                    </div>
                  </div>
                  <div class="form-group d-flex flex-row justify-content-between">
                    <button
                      class="btn btn-inverse-primary btn-half center-block"
                      type="button"
                      @click="handleSubmit"
                    >登陆</button>
                    <button
                      type="button"
                      class="btn btn-inverse-primary btn-half center-block"
                      @click="toRegister"
                    >注册</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- 最新文章 -->
          <asideCard class="animated fadeInUp mb-4"></asideCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animate from "animate.css";
import $ from "jquery";
import { Page, Avatar, Notice, Message, Icon } from "view-design";
import blogApi from "@/api/blog";
import { mapGetters, mapActions } from "vuex";
import Global from "@/util/Global";
import BlogCard from "./components/blog-card-component";
import asideCard from "./components/aside-card-component";

export default {
  name: "blogIndex",
  computed: {
    ...mapGetters(["username", "avatarId", "addRouters"])
  },
  methods: {
    ...mapActions(["getProfile", "login", "generateRoutes"]),
    handleSearch() {
      if (!this.keyword) {
        $("#keyword").addClass("shake");
        setTimeout(function() {
          $("#keyword").removeClass("shake");
        }, 2000);
        return;
      }

      this.$router.push({
        name: "博客搜索",
        params: { keyword: this.keyword }
      });
    },
    toRegister() {
      this.$router.push({
        name: "注册"
      });
    },
    handleSubmit() {
      let that = this;
      if (!this.account) {
        Message.warning("用户名不能为空！");
        return;
      }
      if (!this.password) {
        Message.warning("密码不能为空！");
        return;
      }

      this.login({ username: this.account, password: this.password }).then(
        response => {
          Notice.success({
            title: "登陆成功"
          });
          this.getProfile().then(data => {
            this.generateRoutes(data.roles);
            console.log(this.addRouters);
            that.$router.addRoutes(this.addRouters);
          });
        }
      );
    },
    goDetail(id) {
      let skip = this.$router.push({
        name: "博客内容",
        params: {
          id: id
        }
      });
    },
    toStatus() {
      this.$router.push({ name: "状态面板" });
    },
    change(index) {
      this.pageNum = index;
      this.getArticleList();
    },
    getArticleList() {
      blogApi.getAllList(this.pageSize, this.pageNum).then(response => {
        const data = response.data;
        this.total = data.total;
        this.articleLists = data.rows;
        // 转换日期
        for (var i = 0; i < this.articleLists.length; i++) {
          this.articleLists[i].releaseDate = this.articleLists[
            i
          ].releaseDate.split(" ")[0];
          this.articleLists[i].releaseDate = this.articleLists[
            i
          ].releaseDate.split("-");
          var month = this.articleLists[i].releaseDate[1];
          month = parseInt(month).toString() + "月";
          this.articleLists[i].month = month;
          this.articleLists[i].day = this.articleLists[i].releaseDate[2];
        }
        // 返回顶部
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    }
  },
  created() {
    this.getArticleList();
    // this.getProfile();
  },
  components: {
    Page,
    Avatar,
    Notice,
    Message,
    BlogCard,
    asideCard,
    Icon
  },
  data() {
    return {
      baseAvatar: require("@/assets/img/avatar.png"),
      articleLists: [],
      pageSize: 2,
      pageNum: 1,
      total: 0,
      account: "",
      password: "",
      keyword: "",
      tag: "",
      key: ""
    };
  }
};
</script>


<style lang="sass">


@import '../../assets/style/custom.scss'

@import "node_modules/bootstrap/scss/bootstrap";


</style>


<style >
@import "../../assets/style/blog.css";
</style>

<style>
.none {
  display: none;
}
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