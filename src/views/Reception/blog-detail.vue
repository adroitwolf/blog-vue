<template>
  <div class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="p-4 blog-card text-dark mb-5">
            <div class="blog-title mb-1">{{postDetail.title}}</div>

            <div class="auth-box my-2">
              <div class="avatar">
                <Avatar :src="postDetail.author.avatar?postDetail.author.avatar:baseAvatar" size="large" />
              </div>

              <div class="post-info ml-2">
                <div class="post-info-date">
                  <Icon type="ios-calendar-outline" size="12" />
                  <span>POST ON:{{postDetail.date}}</span>
                </div>
                <div class="post-info-auth">
                  <Icon type="ios-contact-outline" size="12" />
                  <span >{{postDetail.author.nickname}}</span>
                  <span>&nbsp;|&nbsp;</span>
                </div>
                <!-- 新增 tag标签片段  8-24-19 WHOAMI-->
                <div class="post-info-tags">
                  <Icon type="ios-pricetag-outline" size="12" />
                  <span v-if="postDetail.tagsTitle.length >0">
                    <span v-for="(tag,index) in postDetail.tagsTitle" :key="index">
                      {{tag}}
                      <span v-if="index != postDetail.tagsTitle.length-1">&nbsp;-&nbsp;</span>
                    </span>
                  </span>
                  <span v-else>暂无</span>
                </div>
                <!--  新增 tag标签片段结束-->
              </div>
            </div>
            <div class="article-img">
              <img
                v-lazy="postDetail.picture?postDetail.picture:imgList[postDetail.id/3%imgList.length]"
                alt
              />
            </div>
            <div class="blog-html-content my-2 markdown-body" v-html="postDetail.content"></div>
          </div>
          <div class="mb-5 blog-card">
            <CommentText :comment="comment" v-on:pushComment="pushComment()"></CommentText>
            <h3 class="ml-3">
              <div class="flex_div">全部评论</div>
            </h3>
            <div class="mb-5">
              <div  v-for="(item,index) in comments" :key="index">
                <Comment :comment="item" :id="item.id" v-on:disPlayCommentText="disPlayCommentText(index,item.id,'BLOG_COMMENT',item.user.id)"> </Comment>
                 <div v-if="item.children_count>0">
                    <div v-for="child in item.children" :key="child.id">
                      <Comment class="ml-5" :comment="child" :id="child.id" v-on:disPlayCommentText="disPlayCommentText(index,item.id,'COMMENT_COM',child.user.id)"> </Comment>
                    </div>
                  </div>
                  <CommentText v-if="item.pushStatus"  :comment="comment" v-on:pushComment="pushComment()"></CommentText>
                 <Divider />
              </div>
            </div>
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
import { mapGetters } from "vuex";
import blogApi from "@/api/blog";
import { Avatar, Icon,Message,Divider  } from "view-design";
import CommentText from "./components/comment-text-card"
import Comment from "./components/comment"
export default {
  name: "blogDetail",
  components: {
    Avatar,
    Icon,
    Message,
    Divider,
    CommentText,
    Comment
  },
  computed: {
    ...mapGetters(["token", "avatar","imgList","baseAvatar"])
  },
  methods:{
    disPlayCommentText(index,pid,type,toId){
      // this.comments = this.comments.map(element =>{
      //   element.pushStatus = false;
      //   return element;
      // })
      this.currentComment.pid = pid;
      this.currentComment.type = type;
      this.currentComment.toId = toId;
      this.comments[index].pushStatus = true;
    },
    pushComment(){
      // 先判断是否已经登陆，这样就不会浪费一次连接请求时间
      if(!this.token){
        Message.info("请先登录哦！");
        return ;
      }

      if(!this.comment.content){
        Message.info("您似乎并未发表任何高见哦");
        return ;
      }

      this.comment.pid =this.currentComment.pid;

      this.comment.objectId = this.postDetail.id;

      this.comment.toId = this.currentComment.toId;


      this.comment.type = this.currentComment.type;

      blogApi.pushComment(this.comment).then(response=>{
        this.comment.content = "";

        this.comment.pid = null;
        this.comment.toId = null;
        this.comment.type = null;

        Message.info("评论成功！");

        this.getCommentsList(this.postDetail.id,this.commentType[0]);
      }).catch(error=>{
        console.log(error);
      })
    },
    getPostDetail(blogId){
      blogApi.getDetail(blogId).then(response => {
        let data = response.data;
        this.postDetail = data;
        console.log(this.postDetail);
      });
    },
    getCommentsList(blogId,type){
      let params = this.pageInfo;
      params.type = type;
      blogApi.getCommentsList(blogId,params).then(response=>{
        var data = response.data;
        var comments = data.rows;
        comments = comments.map(element =>{
        element.pushStatus = false;
        return element;
      });
        this.comments = comments;
      }).catch(error=>{
        console.log("失败");
      })
    }
  },
  data() {
    return {
      currentComment:{
        pid:0,
        type: 'BLOG_COMMENT',
        toId: 0
      },
      postDetail: {
        id: "",
        title: "",
        content: "",
        date: "",
        tagsTitle: [],
        picture: "",
        author:{
          id:"",
          nickname:"",
          avatar:""
        }
      },
      comment: {
        content: "",
        objectId: "",
        toId: "",
        type: "",
        pid: ""
      },
      commentType:["BLOG_COMMENT","COMMENT_COM"],
      pageInfo:{
        pageSize: 5,
        pageNum:1,
        sortName:"create_time",
        sortOrder:"desc"
      },
      comments:[
            {
                "id": "420937361245863936",
                "pushStatus":false,
                "content": "很实用！！！！",
                "createTime": "2020-02-01 10:55:53",
                "user": {
                    "id": "412727960840175616",
                    "nickname": "whoami",
                    "avatar": "http://localhost:8099\\ac6d4be6eaa14ac0927d4601f61e0934.jpg"
                },
                "children_count": 0,
                "children": []
            },
            {
                "id": "420958787709435904",
                "content": "给个赞",
                "pushStatus":false,
                "createTime": "2020-02-01 12:21:02",
                "user": {
                    "id": "412727960840175616",
                    "nickname": "whoami",
                    "avatar": "http://localhost:8099\\ac6d4be6eaa14ac0927d4601f61e0934.jpg"
                },
                "children_count": 0,
                "children": []
            },
            {
                "id": "421082621863264256",
                "content": "太顶了啊",
                "pushStatus":false,
                "createTime": "2020-02-01 20:33:06",
                "user": {
                    "id": "412727960840175616",
                    "nickname": "whoami",
                    "avatar": "http://localhost:8099\\ac6d4be6eaa14ac0927d4601f61e0934.jpg"
                },
                "children_count": 0,
                "children": []
            }
        ]
    };
  },
  mounted() {
    let blogId = this.$route.query.id;
    if (blogId) {
      this.getPostDetail(blogId);
      this.getCommentsList(blogId,this.commentType[0]);
    }
  }
};
</script>


<style lang="sass" scoped>


    @import '../../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap";


</style>


<style scoped>
@import "../../assets/style/blog.css";
.section {
  padding: 20px;
}
.comment_box {
  margin-top: 0;
  margin-bottom: 48px;
  flex-grow: 1;
}
#comment {
  padding: 12px 16px;
  width: 100%;
  height: 90px;
  font-size: 13px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fafafa;
  resize: none;
  display: inline-block;
  vertical-align: top;
  outline-style: none;
  overflow: auto;
}

.button-box {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 14px;
  color: #969696;
}
.comment_size{
      color: #34495e;
    text-decoration: none;
}
.comment_size span{
  font-weight: 700;
    font-size: 22px;
    font-style: italic;
    font-family: Constantia, Georgia;
}

.flex_div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid #2711f0e5;
    font-size: 18px;
    font-weight: 500;
    height: 20px;
    line-height: 20px;
    color:#050505;
}
</style>