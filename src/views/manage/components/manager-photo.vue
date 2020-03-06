<template>
  <div>
    <Card>
      <Form @submit.native.prevent label-postion="left" inline :label-width="100">
        <FormItem label="图片名称:">
          <Input type="text" v-model="queryParams.keywords"></Input>
        </FormItem>

        <FormItem label="图片类型:">
          <Select
            v-model="queryParams.mediaType"
            @click.native="getAllMediaType()"
            :loading="loading"
            clearable
            :loading-text="loading_text"
            style="width:200px"
          >
            <Option
              v-for="(mediaType,index) in mediaTypes"
              :key="index"
              :value="mediaType"
            >{{mediaType}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleList()">查询</Button>
        </FormItem>
      </Form>

      <Button type="primary" @click="uploadModoal = !uploadModoal">
        <Icon type="md-add" />上传
      </Button>
    </Card>

    <Card class="mt">
      <Row :gutter="16" v-if="datasources.length>0">
        <div v-for="(item,index) in datasources" :key="index" @click="checkInfo(item.id)">
          <Col span="6">
            <Card :bordered="true">
              <div>
                <div class="attach-thumb">
                  <img :src="item.path" />
                </div>
                <span class="attachment-span">{{item.title}}</span>
              </div>
            </Card>
          </Col>
        </div>
      </Row>
      <span v-else>暂无数据</span>
      <Divider class="mt"></Divider>
      <Page @on-change="changePage" :total="total" show-elevator />
    </Card>
    <Modal v-model="uploadModoal" title="上传附件" @on-ok="upload" width="500">
      <Upload multiple type="drag" :before-upload="handleUpload" action>
        <div style="padding: 20px 0" id="upload-box">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击此处上传附件</p>
        </div>
        <div style="padding:20px 0" id="file-box" class="hidden">
          <img style="height:auto;max-width:100%" :src="idBefore" alt />
        </div>
      </Upload>
    </Modal>

    <!-- 图片详细信息抽屉 -->
    <Drawer title="详细信息" :closable="false" width="30" v-model="infoStatus">
      <Form label-position="top">
        <FormItem label="图片名称">
          <Input v-model="info.title" :disabled="info.title === '用户头像'? true:false"></Input>
        </FormItem>
        <FormItem label="媒体类型">
          <Input v-model="info.mediaType" disabled></Input>
        </FormItem>
        <FormItem label="图片大小">
          <Input v-model="info.size" disabled></Input>
        </FormItem>
        <FormItem label="图片格式">
          <Input v-model="info.suffx" disabled></Input>
        </FormItem>
        <FormItem label="当前使用次数">
          <Input v-model="info.citeNum" disabled></Input>
        </FormItem>
        <FormItem label="图片宽度">
          <Input v-model="info.width" disabled></Input>
        </FormItem>
        <FormItem label="图片高度">
          <Input v-model="info.height" disabled></Input>
        </FormItem>
      </Form>
      <div class="drawer-footer" v-if="info.title !='用户头像'">
        <Row :gutter="16">
          <Col span="6">
            <Button type="error" @click="delPic(info.id)">删除附件</Button>
          </Col>
          <Col span="6">
            <Button type="primary" @click="updateInfo(info.title,info.id)">修改名称</Button>
          </Col>
        </Row>
      </div>
    </Drawer>
  </div>
</template>

<script>
import $ from "jquery";
import {
  Form,
  FormItem,
  Card,
  Select,
  Option,
  Page,
  Divider,
  Modal,
  Upload,
  Drawer,
  Message,
  Button,
  Input,
  Icon,
  Row,
  Col
} from "view-design";
import attachmentApi from "@/api/attachment";
import { BASE_URL } from "@/config/global.var";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Photo",
  components: {
    Form,
    FormItem,
    Card,
    Select,
    Option,
    Page,
    Divider,
    Modal,
    Upload,
    Drawer,
    Message,
    Button,
    Input,
    Icon,
    Row,
    Col
  },
  computed: { ...mapGetters(["mediaTypes"]) },
  methods: {
    ...mapActions(["listAllMediaType"]),
    getAllMediaType() {
      this.loading = true;
      this.listAllMediaType()
        .then(response => {})
        .catch(error => {});
      this.loading = false;
    },
    getList() {
      attachmentApi
        .getAttachmentList(this.pageSize, this.pageNum, this.queryParams)
        .then(response => {
          console.log(response.data);
          this.datasources = response.data.rows;
          this.total = response.data.total;
        });
    },
    // 获取图片详细信息
    checkInfo(id) {
      attachmentApi.getAttachmentInfo(id).then(response => {
        let data = response.data;
        this.info = data;
        this.infoStatus = true;
      });
    },
    /*上传文章缩略图*/
    upload() {
      if (this.file == null) {
        Message.error("请先上传文件！");
        return;
      }
      attachmentApi.uploadFile(this.file).then(response => {
        this.getList();
      });
    },
    /*上传结束*/
    handleUpload(file) {
      this.file = file;
      this.idBefore = window.URL.createObjectURL(file);
      $("#upload-box").addClass("hidden");
      $("#file-box").removeClass("hidden");
      return false;
    },
    // 分页代码
    changePage(index) {
      this.loading = true;
      this.pageNum = index;
      this.getList();
    },
    //更新图片名称
    updateInfo(title, id) {
      attachmentApi.updateAttachmentInfo(title, id).then(response => {
        Message.success("更新图片成功！");
        this.infoStatus = false;
        this.getList();
      });
    },
    //条件查询

    handleList() {
      this.getList();
    },
    //删除附件
    delPic(id) {
      attachmentApi.deletePic(id).then(response => {
        Message.success("删除图片成功！");
        this.infoStatus = false;
        this.getList();
      });
    }
  },
  created() {
    this.getList();
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      loading: true,
      loading_text: "正在查询服务器",
      datasources: {},
      total: 0,
      uploadModoal: false,
      idBefore: null,
      file: null,
      info: {},
      infoStatus: false,
      queryParams: {
        mediaType: "",
        keywords: ""
      }
    };
  }
};
</script>

<style  scoped>
.mt {
  margin-top: 20px;
}
.attach-thumb {
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-bottom: 56%;
  overflow: hidden;
}

.attach-thumb img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.attachment-span {
  background: rgb(247, 236, 236);
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  color: #9b9ea0;
}
.hidden {
  display: none;
}

.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>