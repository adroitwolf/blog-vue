<template>
  <div class="section">
    <div style="display:flex;">
      <img class="avatar_sequare" :src="avatar?avatar:baseAvatar" />
      <div class="comment_box">
        <textarea id="comment" v-model="comment.content" rows="3"></textarea>
        <div class="button-box">
          <div class="comment_size">
            已输入
            <span>{{comment.content.length}}</span>字
          </div>
          <div>
            <button
              class="btn btn-danger"
              @click="pushComment"
              :disabled="!comment.content.length"
            >发布</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "CommentText",
  props: ["comment"],
  data() {
    return {
      
    };
  },
    computed: {
        ...mapGetters([ "avatar","baseAvatar"])
    },
    methods:{
      pushComment(){
        this.$emit('pushComment');
      }
    }
};
</script>

<style lang="sass" scoped>


    @import '../../../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap"


</style>


<style scoped>
@import "../../../assets/style/blog.css"
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