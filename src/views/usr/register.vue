<template>
  <div class="blog-content">
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="logo-brand">
            <img class="logo" :src="registerImg">
          </div>
          <div class="blog-card">
            <div class="form-title register-title"><span>注册账号</span></div>
            <div class="register-card">
              <div class="row row-margin">
                <div class="form-group col-lg-6">
                  <label for="account">登录账号</label>
                  <input type="text" id="account" class="form-control" v-model="account"/>
                </div>
                <div class="form-group col-lg-6">
                  <label for="account">用户名称</label>
                  <input type="text" class="form-control" v-model="nickname"/>
                </div>

              </div>
              <div class="row row-margin">
                <div class="form-group col-lg-6">
                  <label for="email">邮箱</label>
                  <div class="input-group">
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="form-control col-7"
                    />
                    <select class="custom-select input-group-append col-5" id="email_postfix">
                      <option value="@qq.com">@qq.com</option>
                      <option value="@163.com">@163.com</option>
                      <option value="@foxmail.com">@foxmail.com</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-lg-6">
                  <label for="email">邮箱验证码</label>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="code"/>
                    <div class="input-group-append">
                      <button id="code" class="btn btn-primary" type="btn" @click="getCode">获取验证码</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row row-margin">
                <div class="form-group col-lg-6">
                  <label for="passwd">密码</label>
                  <div class="input-group">
                    <input type="password" id="passwd" class="form-control" v-model="password"/>
                  </div>
                </div>
                <div class="form-group col-lg-6">
                  <label for="passwd">确认密码</label>
                  <div class="input-group">
                    <input type="password" class="form-control" v-model="passwordc"/>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button
                    type="button"
                    class="btn btn-fluid btn-inverse-primary"
                    @click="toRegister"
                >立 即 注 册
                </button>
              </div>
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
import {Message, Notice} from "view-design";
import {mapActions, mapGetters} from "vuex";
import {error} from "util";

export default {
  name: "register",
  methods: {
    ...mapActions(["register", "verCode"]),
    getCode() {
      if (!this.codeFlase) {
        return;
      }
      this.codeFlase = false;
      if (!this.email) {
        Message.error("邮箱字段不能为空！");
        return;
      }
      //拼接select
      let email = this.email + $("#email_postfix").val();

      this.verCode(email).then(res => {
        Message.info("验证码发送成功，请前往邮箱查看");
      })
      let that = this;
      var timer = setInterval(function () {
        that.time--;

        $("#code").text(that.time + "s后重新获取");
        $("#code").addClass("disabled");
        if (that.time == 0) {
          that.time = 60;
          clearInterval(timer);
          $("#code").text("获取验证码");
          $("#code").removeClass("disabled");
          that.codeFlase = true;
        }
      }, 1000);

    },
    toRegister() {
      if (!this.email || !this.code) {
        Message.error("邮箱相关字段不能为空！");
        return;
      }
      // 组装email地址
      let email = this.email + $("#email_postfix").val();
      if (!this.nickname || !this.account) {
        Message.error("用户信息字段");
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
      userInfo.username = this.nickname;
      userInfo.password = this.password;
      userInfo.email = email;
      userInfo.code = this.code;
      userInfo.account = this.account;
      this.register(userInfo)
          .then(response => {
            Notice.success({
              title: response,
              desc: "即将返回到主页界面！ "
            });
            let _that = this;
            setTimeout(function () {
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
  computed: {
    ...mapGetters([ "registerImg"])
  },
  data() {
    return {
      nickname: "",
      account: "",
      password: "",
      passwordc: "",
      email: "",
      phone: "",
      sideUrl: require("../../assets/img/side.jpg"),
      code: '',
      step: 0,
      time: 60,
      codeFlase: true
    };
  },
  components: {
    Header,
    Message,
    Notice
  }
};
</script>


<style lang="sass" scoped>


@import '../../assets/style/custom.scss'

@import "node_modules/bootstrap/scss/bootstrap"


</style>


<style scoped>
@import "../../assets/style/blog.css";


input{
  color: #ffffc0 !important;
}
.logo-brand{
  margin: 20px 0;
  margin-bottom: 40px;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #666;
  text-align: center;
}

.logo{
  width: 150px;
  height: 150px;
  border: #ee5253 3px solid;
  border-radius: 50%;
}

.register-title {
  padding: 5px 100px;
}

.register-box {
  top: 40%;
  left: 24%;
  position: absolute;
  min-width: 770px;
}

.register-card {
  padding: 10px 5px;
}

.row-margin {
  margin-right: 0;
  margin-left: 0;
}
</style>