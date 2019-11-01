<template>
  <div class="body">
    <Form label-position="left">
      <FormItem>
        <Input placeholder="请输入文章标题" v-model="title"></Input>
      </FormItem>
      <FormItem>
        <div id="editor">
          <mavon-editor v-model="contentMd" :ishljs="true" :toolbars="toolbars" @change="saveHtml" />
        </div>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="toDrawer">发布</Button>
      </FormItem>

      <Drawer title="文章设置" width="50%" :closable="true" v-model="DrawerStatus">
        <Form label-position="top" @submit.native.prevent>
          <FormItem label="文章分类">
            <!--修改代码 -> 增加文章标签处理 日期 8-23-19 处理人：WHOMAI -->
            <!-- <Input type="text" v-model="tag"></Input> -->
            <Tag
              v-for="(item,index) in tagList"
              :key="index"
              :name="item"
              closable
              @on-close="handleCloseTag(index)"
            >{{item}}</Tag>
            <Button icon="ios-add" type="dashed" size="small" @click="handleAdd" v-if="addTag">添加标签</Button>
            <Input
              v-model.trim="tagTemp"
              size="small"
              style="width:20%;"
              autofocus
              @keyup.enter.native="handleTagComplelte()"
              v-else
            ></Input>
            <!-- 增加文章标签处理 结束 -->
          </FormItem>

          <Divider />
          <FormItem label="文章摘要">
            <Input v-model="summary" type="textarea" :rows="4" placeholder="随便写一点" />
          </FormItem>
          <Divider />
          <FormItem label="文章缩略图">
            <div style="width:350px;height:200px">
              <img
                :src="picture?Global.baseUrl+'/'+picture:uploadImgUrl"
                alt
                style="width:100%;height:200px;"
                @click="uploadImgStatus = !uploadImgStatus"
              />
            </div>
          </FormItem>
        </Form>
        <div class="drawer-footer">
          <Button type="primary" @click="submit">发布</Button>
        </div>
      </Drawer>
      <Drawer title="照片库" :closable="true" :width="600" v-model="uploadImgStatus">
        <Row type="flex" justify="space-between" style="padding-bottom:10px;">
          <Col
            span="11"
            v-for="(item,index) in attachmentList"
            :key="index"
            style="margin-bottom:20px;"
          >
            <img
              @click="picChoose(item)"
              style="width:100%;height:100%;"
              :src="Global.baseUrl+'/'+item.path"
              :alt="item.id"
            />
          </Col>
        </Row>
        <Divider />
        <Page :total="total" show-total :page-size="5" />
        <Divider />
        <div class="drawer-footer">
          <Button type="primary" @click="uploadModoal = !uploadModoal">上传附件</Button>
        </div>
      </Drawer>
    </Form>
    <Modal v-model="uploadModoal" title="上传文件" @on-ok="upload" width="500">
      <Upload multiple type="drag" :before-upload="handleUpload" action>
        <div style="padding: 20px 0" id="upload-box">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>Click or drag files here to upload</p>
        </div>
        <div style="padding:20px 0" id="file-box" class="hidden">
          <img style="height:auto;max-width:100%" :src="idBefore" alt />
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script>
import $ from "jquery";
import { mavonEditor } from "mavon-editor";
import {
  Form,
  FormItem,
  Drawer,
  Divider,
  Message,
  Notice,
  Tag,
  Upload,
  Modal,
  Page
} from "view-design";
import "mavon-editor/dist/css/index.css";
import { mapActions } from "vuex";
import articleApi from "@/api/article";
import attachmentApi from "@/api/attachment";
import Global from "@/util/Global";

export default {
  name: "articleWrite",
  components: {
    Global,
    FormItem,
    Form,
    Drawer,
    mavonEditor,
    Divider,
    Tag,
    Upload,
    Modal,
    Page
  },
  mounted() {
    let row = this.$route.params;
    if (row) {
      this.title = row.title;
      this.tagList = row.tagsTitle == null ? [] : row.tagsTitle;
      this.summary = row.summary;
      this.content = row.content;
      this.contentMd = row.contentMd;
      this.id = row.id;
      this.picture= row.picture;
    }
    attachmentApi
      .getAttachmentList(this.pageSize, this.pageNum)
      .then(response => {
        console.log(response.data);
        this.attachmentList = response.data.rows;
        this.total = response.data.total;
      });
  },
  methods: {
    ...mapActions(["postArticle"]),
    picChoose(item) {
      this.uploadImgStatus = !this.uploadImgStatus;
      this.picture = item.path;
    },
    /*上传文章缩略图*/

    handleUpload(file) {
      this.file = file;
      this.idBefore = window.URL.createObjectURL(file);
      $("#upload-box").addClass("hidden");
      $("#file-box").removeClass("hidden");
      return false;
    },
    upload() {
      if (this.file == null) {
        Message.error("请先上传文件！");
        return;
      }
      attachmentApi.uploadFile(this.file).then(response => {
        attachmentApi
          .getAttachmentList(this.pageSize, this.pageNum)
          .then(response => {
            const data = response.data;
            this.attachmentList = data.rows;
            this.total = data.total;
          });
      });
    },
    /*上传结束*/

    /* 处理文章Tag的所有函数*/

    handleCloseTag(index) {
      this.tagList.splice(index, 1); //从start的位置开始向后删除delCount个元素
    },
    handleTagComplelte() {
      this.tagList.push(this.tagTemp);
      this.tagTemp = "";
      this.addTag = !this.addTag;
    },
    handleAdd() {
      this.tagTemp = "";
      this.addTag = !this.addTag;
    },
    /* 处理文章Tag的所有函数结束*/
    /* 处理文章详细信息的所有函数 */
    toDrawer() {
      if (!this.title) {
        Message.warning("请输入文章标题");
        return;
      }
      if (!this.contentMd || !this.content) {
        Message.warning("请输入文章内容");
        return;
      }

      this.DrawerStatus = true;
    },
    saveHtml(value, render) {
      this.content = render;
    },
    submit() {
      if (!this.summary) {
        Message.warning("请输入文章摘要");
        return;
      }
      if (this.id) {
        let articleParams = {};
        articleParams.title = this.title;
        articleParams.tagList = this.tagList;
        articleParams.summary = this.summary;
        articleParams.content = this.content;
        articleParams.contentMd = this.contentMd;
        articleParams.picture = this.picture;
        articleApi
          .updateArticle(this.id, articleParams)
          .then(response => {
            Notice.success({
              title: "文章更新成功！"
            });
            this.DrawerStatus = false;
          })
          .catch(error => {
            console.log(error)
            Message.error("文章更新失败！");
          });
        return;
      }
      this.postArticle({
        title: this.title,
        tagList: this.tagList,
        picture: this.picture,
        summary: this.summary,
        content: this.content,
        contentMd: this.contentMd,
        id: this.id
      })
        .then(response => {
          Message.success("发布文章成功！");
          this.title = "";
          this.tagList = [];
          this.summary = "";
          this.content = "";
          this.contentMd = "";
          this.DrawerStatus = false;
        })
        .catch(error => {
          Message.error("文章发布失败！");
          this.DrawerStatus = false;
        });
    }
    /* 处理文章详细信息的所有函数结束 */
  },
  computed: {},
  data() {
    return {
      total: 0,
      attachmentList: [],
      idBefore: null,
      file: null,
      uploadModoal: false,
      pageSize: 5,
      pageNum: 1,
      uploadImgStatus: false,
      uploadImgUrl: require("../assets/img/upload.png"),
      id: "",
      title: "",
      tag: "",
      picture: "",
      tagList: [],
      addTag: true,
      summary: "",
      content: "",
      contentMd: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: false, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      DrawerStatus: false
    };
  }
};
</script>

<style scoped>
/* .body{
    height: 100%;
    overflow: auto;
} */
</style>
<style>
.v-note-wrapper {
  z-index: 10 !important;
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

.hidden {
  display: none;
}
</style>
