<template>
  <div class="body">
    <div class="container" align="center">
      <h1>LOGIN</h1>
      <!-- :rules="ruleInline" -->
      <Form ref="formInline" @keyup.enter.native="handleSubmit">
        <FormItem prop="user">
          <Input type="text" v-model="username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">登 入</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, FormItem, Message, Button, Input, Icon } from "view-design";
import { mapActions } from "vuex";
import router from "@/router";
export default {
  name: "login",
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Icon
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    handleSubmit() {
      if (!this.username) {
        Message.warning("用户名不能为空！");
        return;
      }
      if (!this.password) {
        Message.warning("密码不能为空！");
        return;
      }

      this.login({ username: this.username, password: this.password }).then(
        response => {
          Message.info("登陆成功");
          router.push({ name: "状态面板" });
        }
      );
    }
  }
};
</script>


<style scoped>
.body {
  margin: 0;
  padding: 0;
  background: url(../../assets/img/bg.png) no-repeat;
  background-size: cover;
  /* width: 100%;
  height: 100%; */
  min-height: 800px;
  max-height: 100%;
}

.container {
  position: absolute;
  width: 280px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}
.container h1 {
  float: left;
  border-bottom: 3px rgba(0, 168, 255, 0.6) solid;
  margin: 20px 4px;
}

button {
  width: 100%;
}
</style>
