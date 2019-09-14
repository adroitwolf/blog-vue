<template>
  <div>
    <div class="article-card blog-card">
      <div class="article-date">
        <span class="month">{{article.month}}</span>
        <span class="day">{{article.day}}</span>
      </div>
      <div class="article-title">
        <h1>
          <router-link tag="a" target="_blank" :to="{name:'博客内容', query:{id: article.id}}">
            <span class="title-blog">{{article.title}}</span>
          </router-link>
        </h1>
        <!-- <h1><a @click="goDetail(article.id)"><span class="title-blog">{{article.title}}</span></a>
        </h1>-->
      </div>

      <!-- 新增 tag标签片段 -->

      <div class="article-tag my-2 d-flex justify-content-around">
        <div class="btn-hover" v-if="article.tagsTitle.length >0">
          <div style="display:inline-block" v-for="(tag,index) in article.tagsTitle" :key="index">
            <div v-if="index != 0" style="display:inline-block;" class="px-1">&nbsp;|&nbsp;</div>
            <a>
              <Icon type="ios-pricetag-outline" style="padding-right:5px;" />
              <span class="tag" @click="searchTag(tag)">{{tag}}</span>
            </a>
          </div>
        </div>
        <div class="btn-hover" v-else>
          <Icon type="ios-pricetag-outline" style="padding-right:5px;" />暂无
        </div>
      </div>
      <!-- 新增 tag标签片段结束 -->

      <div class="article-img">
        <img
          :src="article.picture?Global.baseUrl + '/' + article.picture:imglist[index%pageSize]"
          alt
        />
      </div>
      <div class="article-summary">{{article.summary}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: ["article", "index", "pageSize"],
  methods: {
    searchTag(tag) {
      this.$router.push({ name: "博客搜索", query: { tag: tag } });
    }
  },
  data() {
    return {
      imglist: [
        require("../assets/img/0.jpg"),
        require("../assets/img/1.jpg"),
        require("../assets/img/2.jpg"),
        require("../assets/img/3.jpg"),
        require("../assets/img/4.jpg"),
        require("../assets/img/5.png"),
        require("../assets/img/6.jpg"),
        require("../assets/img/7.jpg"),
        require("../assets/img/8.jpg"),
        require("../assets/img/9.jpg")
      ]
    };
  }
};
</script>

