<template>
  <div>
    <Card>
      <div class="wrap">
        <div class="commentList">
          <div class="comment-item" v-for="(comment,index) in commentsList" :key="index">
            <div class="user-avatar">
              <img :src="comment.self.user.avatar?comment.self.user.avatar:baseAvatar" />
            </div>
            <div class="article-wrap">
              <router-link class="pic" :to="{name:'博客内容', query:{id: comment.blog.id}}">
                <img
                  :src="comment.blog.picture?comment.blog.picture:imgList[comment.blog.id/3%imgList.length]"
                />
                <span class="article-title">{{comment.blog.title}}</span>
              </router-link>
            </div>
            <div class="ci-title">
              <span>{{comment.self.user.nickname}}</span>
              <span class="ci-title-split" v-if="comment.parent">回复</span>
              <span v-if="comment.parent">{{comment.parent.user.nickname}}</span>
              <span class="show-parent" :id="'parent_'+index" v-if="comment.parent">
                <span
                @click="ctrlParentComment(index,'block')"
                class="open action" style="display:inline"
              >查看评论</span>
              <span class="close action" style="display:none" @click="ctrlParentComment(index,'none')">收起评论</span>
              <div class="ci-parent-reply" v-if="comment.parent" style="display:none;">
                <div class="cipr-avatar" >
                  <!-- {{comment.parent.id}} -->
                  <img :src="comment.parent.user.avatar?comment.parent.user.avatar:baseAvatar" />
                </div>
                <div class="cipr-head">
                  <span>{{comment.parent.user.nickname}}</span>
                  <div class="cipr-content">{{comment.parent.content}}</div>
                  <div class="cipr-footer">{{comment.parent.createTime}}</div>
                </div>
              </div>
              </span>
            </div>
            <div class="ci-content">{{comment.self.content}}</div>
            <div class="ci-action">
              <span class="data">{{comment.self.createTime}}</span>
              <span class="split">|</span>
              <span class="delete" @click="deleteComment(comment.self.id)">删除</span>
            </div>
          </div>
        </div>
        <div class="page">
          <Page
            :total="pageInfo.total"
            :current="pageInfo.pageNum"
            @on-change="changepage"
            @on-page-size-change="_nowPageSize"
            :page-size-opts="pageInfo.page"
            show-total
            show-sizer
            :page-size="pageInfo.pageSize"
          ></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import $ from "jquery";
import commentManageApi from "@/api/manage/comment";
import { mapGetters } from "vuex";
import { Card, Page,Modal,Message } from "view-design";
export default {
  name: "commentManage",
  components: {
    Card,
    Page,
    Modal,
    Message
  },
  data() {
    return {
      commentsList: [],
      pageInfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0,
        page: [5, 10, 20, 50],
      }
    };
  },
  computed: {
    ...mapGetters(["imgList", "baseAvatar"])
  },
  methods: {
    getList() {
      commentManageApi.manage(this.pageInfo).then(res => {
        let data = res.data;
        this.commentsList = data.rows;
        this.pageInfo.total = data.total;
      });
    },
    ctrlParentComment(index,css) {
      const content  = "#parent_" + index + " .ci-parent-reply";
      const close = "#parent_" + index + " .close";
      const open = "#parent_" + index + " .open";
      if(css === 'none'){ //说明此时点击的是收回评论
        $(close).css("display",css);
        $(open).css("display","inline");
      }else{
        $(close).css("display","inline");
        $(open).css("display","none");
      }
      $(content).css("display",css);
    },
    deleteComment(id){
      let that = this;
      Modal.confirm({
              title: "是否删除该评论？",
              content: "该操作不可逆",
              onOk: () => {
                commentManageApi.delete(id).then(res=>{
                  that.pageInfo.PageSize = 5;
                  that.pageInfo.pageNum = 1;
                  Message.success("成功删除评论");
                  that.getList();
                })
              }
            });
    },
    //点击，切换页面
    changepage(index) {
      this.pageInfo.pageNum = index;
      this.getList();
    },
    //每页显示的数据条数
    _nowPageSize(size) {
      this.loading = true;
      this.pageInfo.pageSize = size;
      //实时获取当前需要显示的条数
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>

.wrap{
  margin: 0px 30px;
}
.commentList {
  margin-top: 10px;
}

.comment-item {
  position: relative;
  padding: 30px 175px 30px 125px;
  border-bottom: 1px solid #f1f3f7;
}

.user-avatar {
  position: absolute;
  left: 54px;
  top: 30px;
  width: 48px;
  height: 48px;
  display: inline-block;
}

.user-avatar img {
  width: 48px;
  height: 48px;
  display: inline-block;
  border-radius: 48px;
}

.article-wrap {
  position: absolute;
  right: 20px;
  top: 30px;
  width: 100px;
  text-align: center;
}

.article-wrap .pic img {
  display: block;
  width: 100px;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.article-wrap .article-title {
  width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ci-title span {
  color: #222;
  font-weight: 700;
}

.ci-title .ci-title-split {
  margin-bottom: 12px;
  color: #99a2aa;
}

.ci-title .show-parent .action{
  color: #00a1d6;
  cursor: pointer;
  margin-left: 25px;
}

.ci-title .ci-parent-reply{
  background-color: #f1f3f7;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    padding: 20px 20px 20px 55px;
    margin-bottom: 20px;
    position: relative;
}


.ci-parent-reply .cipr-avatar{
    
    position: absolute;
    top: 20px;
    left: 20px;
}

.cipr-avatar img{
  width: 24px;
    height: 24px;
    border-radius: 24px;
}
.ci-parent-reply .cipr-head{
  line-height: 1;
  margin-bottom: 10px;
  color: #222;
    font-weight: 700;
}

.cipr-content{
  font-size: 14px;
    line-height: 24px;
    color: #6d757a;
    margin-bottom: 10px;
    word-wrap: break-word;
    word-break: break-all;
}

.cipr-footer{
  color: #99a2aa;
}
.ci-content {
  margin-bottom: 12px;
  line-height: 24px;
  min-height: 1px;
  color: #6d757a;
  font-size: 14px;
  word-wrap: break-word;
}

.ci-action{
  color: #99a2aa;
}

.ci-action .split{
      color: #e5e9ef;
    margin: 0 10px;
}


.page{
  margin-top:10px;
}
</style>