<template>
  <div>
    <Row type="flex" justify="space-around">
      <Col span="8">
        <Card class="profileCard">
          <Row type="flex" justify="center" align="middle">
            <Col span="12">
              <div class="profile">
                <!-- 判断用户是否有头像 -->
                <img :src="avatar?avatar:baseAvatar" />
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle">
            <Col span="12" push="3">
              <h1>{{nickname}}</h1>
            </Col>
          </Row>
          <!-- <Row type="flex" justify="center" align="middle" class-name="profile-detail">
            <Col span="6">
              <h1>
                <Icon type="ios-call-outline" size="24" />:
              </h1>
            </Col>
            <Col span="12">
              <h1>{{phone?phone:"暂无"}}</h1>
            </Col>
          </Row> -->
          <!-- <Row type="flex" justify="center" align="middle" class-name="profile-detail">
            <Col span="6">
              <h1>
                <Icon type="ios-mail-outline" size="24" />:
              </h1>
            </Col>
            <Col span="12">
              <h1>
                <a href="#">{{email?email:"暂无"}}</a>
              </h1>
            </Col>
          </Row> -->
          <Divider />
          <Row type="flex" justify="start" class-name="profile-detail">
            <Col span="12" offset="3">
              <h1>累计发表了{{articleCount}}篇文章</h1>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span="10">
        <Card>
          <p slot="title">个人资料</p>
          <Tabs value="name1">
            <TabPane label="基本资料" name="name1">
              <Form label-position="top">
                <FormItem label="用户名">
                  <Input v-model="nicknamex"></Input>
                </FormItem>
                <!-- <FormItem label="手机号">
                  <Input v-model="phonex" placeholder="试着填写一下手机号吧"></Input>
                </FormItem>
                <FormItem label="邮箱">
                  <Input v-model="emailx" placeholder="试着填写一下邮箱呢"></Input>
                </FormItem> -->
                <FormItem label="个人说明">
                  <Input v-model="aboutMex" type="textarea" :rows="4" placeholder="试着介绍一下自己" />
                </FormItem>

                <FormItem>
                  <Button type="primary" @click="updateUserProfile">修改</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="修改密码" name="name2">
              <Form label-position="top">
                <FormItem label="旧密码">
                  <Input v-model="opassword" type="password"></Input>
                </FormItem>
                <FormItem label="新密码">
                  <Input v-model="password" type="password"></Input>
                </FormItem>
                <FormItem label="确认密码">
                  <Input v-model="cpassword" type="password"></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="updatePassword">提交</Button>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="上传头像" name="name3">
              <Upload
                :show-upload-list="false"
                accept="image/jpg, image/jpeg, image/png, image/bmp"
                type="drag"
                :before-upload="handleUpload"
              >
                <div style="padding: 20px 0" id="upload-box">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>上传一些好看的头像吧~</p>
                </div>
                <div style="padding:20px 0" id="avatar-box" class="hidden">
                  <img style="height:auto;max-width:100%" :src="idBefore" alt />
                </div>
              </Upload>
              <div class="mt-4 flex">
                <Button type="primary" @click="open = true">修剪照片</Button>
                <Button type="primary" @click="uploadAvatar">上传</Button>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>

    <!-- 照片遮罩层 -->
    <Modal v-model="open" @on-ok="crppper" title="建议是200x200规格的哦">
      <div style="width:360px;height:360px;">
        <img :src="idBefore" style="max-width:100%;height:auto;" id="avatar" alt />
      </div>
    </Modal>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import $ from "jquery";
import Cropper from "cropperjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import { mapGetters, mapActions } from "vuex";
import {
  Avatar,
  Divider,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Message,
  Notice,
  Upload,
  Modal,
  Button,
  Input,
  Icon,
  Card,
  Row,
  Col
} from "view-design";

export default {
  name: "UserProfile",
  data() {
    return {
      idBefore: "",
      avatarx: null,
      opassword: "",
      password: "",
      cpassword: "",
      aboutMex: "",
      nicknamex: "",
      articleCount: 0,
      cropper: "",
      open: false
    };
  },
  components: {
    Avatar,
    Divider,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Message,
    Upload,
    Modal,
    Button,
    Input,
    Icon,
    Card,
    Row,
    Col
  },
  computed: {
    ...mapGetters(["nickname", "avatar", "aboutMe","baseAvatar"])
  },
  created() {
    this.getArticleCount().then(value => {
      this.articleCount = value;
    });
  },
  mounted() {
    // 初始化修改个人配置信息信息项
    this.nicknamex = this.nickname;

    let that = this;
    let image = document.getElementById("avatar");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      zoomable: false,
      scalable: false,
      movable: false,
      minContainerWidth: 360,
      minContainerHeight: 360
    });
  },
  methods: {
    ...mapActions([
      "changePassword",
      "updateProfile",
      "getArticleCount",
      "uploadAvatarId"
    ]),
    crppper() {
      let that = this;
      const canvas = this.cropper.getCroppedCanvas();
      this.idBefore = canvas.toDataURL("image/png");
      canvas.toBlob(function(blob) {
        that.avatarx = blob;
      });
    },
    uploadAvatar() {
      if (this.avatarx == null) {
        Message.error("请先上传图片！");
        return false;
      }

      this.uploadAvatarId({ file: this.avatarx }).then(response => {
        Notice.success({
          title: "更新个人头像成功"
        });
      });
    },
    handleUpload(file) {
      this.avatarx = file;
      this.idBefore = window.URL.createObjectURL(this.avatarx);

      $("#upload-box").addClass("hidden");
      $("#avatar-box").removeClass("hidden");

      if (this.cropper) {
        this.cropper.replace(this.idBefore);
        this.open = true;
      }

      return false;
    },
    updateUserProfile() {
      this.updateProfile({
        nickname: this.nicknamex,
        aboutMe: this.aboutMex
      }).then(response => {
        Notice.success({
          title: "更新个人资料成功"
        });
      });
    },
    updatePassword() {
      if (!this.opassword) {
        Message.error("旧密码不能为空！");
        return;
      }
      if (!this.password || !this.cpassword) {
        Message.error("密码不能为空！");
        return;
      }

      if (!(this.password === this.cpassword)) {
        Message.error("两次密码不一致！");
        return;
      }
      this.changePassword({
        opassword: this.opassword,
        password: this.password
      }).then(response => {
        Message.success("修改密码成功！");
      });
    }
  }
};
</script>

<style scoped>
* {
  font-size: 16px;
}
.profileCard {
}

.profile-detail {
  margin: 10px 0;
  overflow: hidden;
}

.profile img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.hidden {
  display: none;
}
</style>
