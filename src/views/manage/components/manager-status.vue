<template>
  <div class="body">
    <Row type="flex" justify="space-around" class="code-row-bg">
      <Col span="4">
        <Card>
          <div slot="title" class="title">
            <span>文章数</span>
            <router-link :to="{name:'所有文章'}">
              <Icon type="ios-link" class="link" size="25" />
            </router-link>
          </div>
          <h1><span>{{count}}</span></h1>
        </Card>
      </Col>
    </Row>
    <div class="content">
      <Row type="flex" justify="space-around" class="code-row-bg">
        <Col span="8">
          <Card>
            <p slot="title">最新文章</p>
            <Table :columns="column" :data="articleData" :show-header="false"></Table>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import { Content, Card, Table, LoadingBar, Icon, Row, Col } from "view-design";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "status",
  data() {
    return {
      count: 0
    };
  },
  computed: {
    ...mapGetters(["column", "articleData", "status"])
  },
  components: {
    Content,
    Card,
    Table,
    LoadingBar,
    Icon,
    Row,
    Col
  },
  methods: {
    ...mapActions(["getArticleList", "getArticleCount"])
  },
  created() {
    LoadingBar.start();
    let that = this;
    let postParams = {};
    this.getArticleList({ pageSize: 5, pageNum: 1, postParams: postParams });
    this.getArticleCount().then(response=>{
      that.count  = response;
    })
    LoadingBar.finish();
  }
};
</script>

<style scoped>
.title span {
  font-size: 25px;
}
.link {
  position: absolute;
  right: 20px;
  top: 20px;
}
.content {
  margin-top: 40px;
}
.card-content {
  align: center;
}
</style>
