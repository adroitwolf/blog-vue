<template>
  <div class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="p-4 blog-card text-dark mb-5">
            <div class="blog-title mb-1">{{title}}</div>

            <div class="auth-box my-2">
              <div class="avatar">
                <Avatar  :src="avatarId?avatarId:baseAvatar" size="large" />
              </div>

              <div class="post-info ml-2">
                <div class="post-info-date">
                  <Icon type="ios-calendar-outline" size="12" />
                  <span>POST ON:{{date}}</span>
                </div>
                <div class="post-info-auth">
                  <Icon type="ios-contact-outline" size="12" />
                  <span>{{username}}</span>
                  <span>&nbsp;|&nbsp;</span>
                </div>
                <!-- 新增 tag标签片段  8-24-19 WHOAMI-->
                <div class="post-info-tags">
                  <Icon type="ios-pricetag-outline" size="12" />
                  <span v-if="tagsTitle.length >0">
                    <span v-for="(tag,index) in tagsTitle" :key="index">
                      {{tag}}
                      <span v-if="index != tagsTitle.length-1">&nbsp;-&nbsp;</span>
                    </span>
                  </span>
                  <span v-else>暂无</span>
                </div>
                <!--  新增 tag标签片段结束-->
              </div>
            </div>
            <div class="article-img">
              <img v-lazy="picture?this.baseUrl + '/' +picture:imglist[blogId%imglist.length]" alt />
            </div>
            <div class="blog-html-content my-2 markdown-body" v-html="content"></div>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "mavon-editor/dist/css/index.css";
import "mavon-editor/dist/markdown/github-markdown.min.css";
import $ from "jquery";
import {BASE_URL} from '@/config/global.var'
import blogApi from "@/api/blog";
import { Avatar, Icon } from "view-design";
export default {
  name: "blogDetail",
  components: {
    Avatar,
    Icon
  },

  data() {
    return {
      baseUrl:BASE_URL,
      blogId: "",
      height: "",
      baseAvatar: require("@/assets/img/avatar.png"),
      title: "",
      content: "",
      date: "",
      username: "",
      avatarId: "",
      tagsTitle: [],
      picture: "",
      imglist: [
        require("@/assets/img/0.jpg"),
        require("@/assets/img/1.jpg"),
        require("@/assets/img/2.jpg"),
        require("@/assets/img/3.jpg"),
        require("@/assets/img/4.jpg"),
        require("@/assets/img/5.png"),
        require("@/assets/img/6.jpg"),
        require("@/assets/img/7.jpg"),
        require("@/assets/img/8.jpg"),
        require("@/assets/img/9.jpg")
      ]
    };
  },
  mounted() {
    let blogId = this.$route.query.id;
    if (blogId) {
      blogApi.getDetail(blogId).then(response => {
        let data = response.data;
        this.blogId = blogId;
        this.title = data.title;
        this.content = data.content;
        this.date = data.releaseDate;
        this.username = data.username;
        this.tagsTitle = data.tagsTitle;
        this.picture = data.picture;
        console.log(data.avatarId);
        var re = /^[ ]*$/;
        if (null != data.avatarId && !re.test(data.avatarId)) {
          this.avatarId = this.baseUrl + "/" + data.avatarId;
        }
      });
    }

    //  设置100% 填充

    // let h = document.body.clientHeight || document.documentElement.clientHeight;
    // console.log("height:"+h);
  }
};
</script>


<style lang="sass" scoped>


    @import '../../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap";


</style>


<style scoped>
@import "../../assets/style/blog.css";
</style>