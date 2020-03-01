<template>
    <div class="container-box section" id="comment.id">
        <img class="avatar_sequare" :src="comment.user.avatar?comment.user.avatar:baseAvatar" />
        <div class="comment_box" >
            <div class="comment_user_id slide_username" :id="comment.user.id">
                <span>{{comment.user.nickname}}</span>
            </div>
            <div class="comment_time">
                <span>{{comment.createTime}}</span>
            </div>
            <div class="comment_content">
                <span>{{comment.content}}</span>
            </div>
            <div class="comment_option">
                <button class="chat btn" @click="disPlayCommentText">
                    回复
                </button >
                
            </div>
        </div>

    </div>
</template>

<script>
    import {Icon} from 'view-design';
    import { mapGetters } from "vuex";
    export default {
        name: 'Comment',
        props: ["comment"],
        components:{
            Icon
        },
        data() {
            return {
                
            }
        },
        computed: {
            ...mapGetters(["token","baseAvatar"])
        },
        methods:{
            disPlayCommentText(){
                this.$emit('disPlayCommentText');
            }
        }
    }
</script>


<style lang="sass" scoped>


    @import '../../../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap";


</style>


<style scoped>
@import "../../../assets/style/blog.css";
*{
    color:#222f3e;
}
.section {
  padding: 20px;
}
.comment_box {
  margin-top: 0;
  margin-bottom: 48px;
  flex-grow: 1;
  color:inherit;
}
.container-box{
    display: flex;
    align-items: flex-start;
}
.comment_user_id{
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
}

.comment_time{
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
}
.comment_content{
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
}

.comment_option{
    position: relative;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    font-size: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.chat{
    cursor: pointer;
    position: relative;
    margin-right: 16px;
    border:1px #ee5253 solid;
    /* padding:6px; */
    box-shadow:0 20px 50px rgba(30, 55, 153,.8);
    letter-spacing:2px;
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