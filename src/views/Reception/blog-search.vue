<template>
  <div class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="alert-card mb-4 p-2">
            <span v-if="tag">>>「{{tag}}」</span>
            <span v-else>>> 搜索「{{keyword}}」的结果</span>
          </div>
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

          <div class="blog-card mb-4 search-block">
            <div class="search-box">
              <form class="form-inline">
                <input
                  id="keyword"
                  type="text"
                  class="animated form-control form-input"
                  v-model.trim="keywordx"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogApi from "@/api/blog";
import $ from "jquery";
import { Page, Icon } from "view-design";
import BlogCard from "./components/blog-card-component";

export default {
  name: "blogSearch",
  watch: {
    $route(to, from) {
      this.tag = this.$route.params.tag;
      this.getArticleList();
    }
  },
  data() {
    return {
      keyword: "",
      keywordx: "",
      articleLists: [],
      pageSize: 5,
      pageNum: 1,
      total: 0,
      tag: ""
    };
  },
  mounted() {
    console.log(this.$route);
    if (this.$route.params.keyword) {
      this.keyword = this.$route.params.keyword;
    }
    if (this.$route.params.tag) {
      this.tag = this.$route.params.tag;
    }

    this.getArticleList();
  },
  methods: {
    searchTag(tag) {
      this.tag = tag;
      this.getArticleList();
    },
    handleSearch() {
      if (!this.keywordx) {
        $("#keyword").addClass("shake");
        setTimeout(function() {
          $("#keyword").removeClass("shake");
        }, 2000);
        return;
      }

      this.pageSize = 5;
      this.pageNum = 1;

      this.keyword = this.keywordx;
      this.keywordx = "";
      this.tag = "";
      this.getArticleList();
    },

    goDetail(id) {
      let skip = this.$router.push({
        name: "博客内容",
        params: {
          id: id
        }
      });
    },
    change(index) {
      this.pageNum = index;
      this.getArticleList();
    },
    getArticleList() {
      if (this.tag != "") {
        blogApi
          .searchTag(this.pageSize, this.pageNum, this.tag)
          .then(response => {
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
          });
        return;
      }
      blogApi
        .queryListByExample(this.pageSize, this.pageNum, this.keyword)
        .then(response => {
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
  components: {
    Page,
    BlogCard,
    Icon
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