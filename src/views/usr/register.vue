<template>
  <div class="blog-content">
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 side d-none d-sm-block">
          <img :src="sideUrl" />
        </div>
        <div class="col-md-6" id="register">
          <!-- <Steps :current="step" class="mt-4">
          <Step title="邮箱验证" content="请输入正确的邮箱"></Step>
          <Step title="信息填写" content="填写完成即可开心发帖了"></Step>
          </Steps>-->

          <div>
            <div class="title-box form-title text-center mt-4">
              <h3>账号注册</h3>
            </div>
            <div class="register-box">
              <form>
                <div class="form-group">
                  <input
                    type="email"
                    id="account"
                    v-model="email"
                    placeholder="邮箱"
                    class="form-control form-input"
                  />
                </div>
                <div class="form-row form-group">
                  <div class="col">
                    <input type="text" class="form-control" v-model="code"  placeholder="验证码" />
                  </div>
                  <div class="col">
                    <button type="button" id="code" class="btn btn-primary"  @click="getCode">获取验证码</button>
                  </div>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="nickname" placeholder="昵称" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="password" placeholder="密码" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="passwordc" placeholder="确认密码" />
                </div>
                <div class="form-group">
                  <button
                  type="button"
                  class="btn btn-fluid btn-inverse-primary"
                  @click="toRegister"
                >立 即 注 册</button>
                </div>  
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Header from "@/components/header";
import { Message, Notice, Steps, Step } from "view-design";
import { mapActions } from "vuex";
import { error } from "util";
export default {
  name: "register",
  methods: {
    ...mapActions(["register","verCode"]),
    getCode(){
      if(!this.codeFlase){
        return ;
      }
      this.codeFlase = false;
      if(!this.email){
        Message.error("邮箱字段不能为空！");
        return ;
      }
      var emreg=/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
      if(!emreg.test(this.email)){
        Message.error("邮箱格式不正确！");
        return ;
      }
      this.verCode(this.email).then(res=>{
        Message.info("验证码发送成功，请前往邮箱查看");
      })
      let that = this;
      var timer = setInterval(function(){    
        that.time--;
        
        $("#code").text(that.time+"s后重新获取");
        $("#code").addClass("disabled");
        if (that.time==0) {
          that.time = 60;
          clearInterval(timer); 
          $("#code").text( "获取验证码");
          $("#code").removeClass("disabled");
          that.codeFlase = true;
        }
  },1000);

    },
    toRegister() {
      if(!this.email || !this.code){
        Message.error("邮箱相关字段不能为空！");
        return;
      }
      if(!this.nickname){
        Message.error("昵称不能为空！");
        return;
      }
      if (!this.password || !this.passwordc) {
        Message.error("密码不能为空！");
        return;
      }
      if (this.password != this.passwordc) {
        Message.error("两次密码不一致！");
        return;
      }
      const userInfo = {};
      userInfo.nickname = this.nickname;
      userInfo.password = this.password;
      userInfo.email = this.email;
      userInfo.code = this.code;
      this.register(userInfo)
        .then(response => {
          Notice.success({
            title: response,
            desc: "即将返回到主页界面！ "
          });
          let _that = this;
          setTimeout(function() {
            _that.$router.push({
              name: "博客主页"
            });
          }, 2000);
        })
        .catch(error => {
          Message.error(error);
        });
    }
  },
  data() {
    return {
      nickname: "",
      password: "",
      passwordc: "",
      email: "",
      phone: "",
      sideUrl: require("../../assets/img/side.jpg"),
      code:'',
      step: 0,
      time:60,
      codeFlase: true
    };
  },
  components: {
    Header,
    Message,
    Notice,
    Steps,
    Step
  }
};
</script>



<style lang="sass" scoped>


    @import '../../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap"


</style>


<style scoped>
@import "../../assets/style/blog.css";

#register {
  background: #fff;
  box-shadow: black 0px 0px 8px;
  height: auto;
  padding: 10px 20px;
}

.register-box {
  padding: 50px 100px;
}

.side {
  height: 100%;
  padding: 0;
}

.side img {
  width: 100%;
  height: 100%;
}
</style>