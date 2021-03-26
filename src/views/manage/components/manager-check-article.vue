<template>
  <div>
    <Card>
      <Form @submit.native.prevent label-postion="left" inline :label-width="100">
        <FormItem label="关键词:">
          <Input type="text" v-model="queryParams.keyword"></Input>
        </FormItem>

        <FormItem label="文件类型:">
          <Select clearable v-model="queryParams.status" style="width:200px">
            <Option value="PUBLISHED">已发布</Option>
            <Option value="RECYCLE">回收站</Option>
            <Option value="CHECK">审核中</Option>
            <Option value="NO">审核失败</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleList()">查询</Button>
        </FormItem>
      </Form>
    </Card>
    <Card class="b-card" style="margin:20px 0">
      <Table
        id="data"
        :columns="managerColumns"
        :data="articleData"
        align="center"
        stripe
        :loading="loading"
      >
        <div slot-scope="{row}" slot="status">
          <div v-if="row.status === 'PUBLISHED'">
            <Badge status="success" text="已发布" />
          </div>
          <div v-else-if="row.status === 'RECYCLE'">
            <Badge status="error" text="回收站" />
          </div>
          <div v-else-if="row.status === 'CHECK'">
            <Badge status="warning" text="审核中" />
          </div>
          <div v-else-if="row.status === 'NO'">
            <Badge color="yellow" text="审核失败" />
          </div>
        </div>
        <div slot-scope="{row}" slot="nickname">
        {{row.author.nickname}}
        </div>
        <div slot-scope="{row}" slot="tagsTitle">
          <Tag color="error" v-for="(item,index) in row.tagsTitle" :key="index">{{item}}</Tag>
        </div>
        <div slot-scope="{ row, index}" slot="action">
          <div v-if="row.status=== 'CHECK'">
            <Button type="error" style="margin-right: 5px" @click="handleCheck(row.id)">开始审核</Button>
          </div>
          <div v-else>
            <Button type="error" disabled style="margin-right: 5px">开始审核</Button>
          </div>
        </div>
      </Table>
      <!-- 分页列表 -->
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
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
    <Modal v-model="checkStatus" fullscreen :title="post.title" footer-hide>
      <div v-html="post.content"></div>
      <Divider orientation="right">博文结束</Divider>
      <div v-if="post.tagsTitle.length >0">
        <Tag color="error" v-for="(item,index) in post.tagsTitle" :key="index">{{item}}</Tag>
      </div>
      <div v-else>博文未设置标签</div>
      <Divider orientation="right">标签结束</Divider>
      <Button size="large" type="success" @click="handleResult(post.id,'PUBLISHED')">审核通过</Button>
      <Button size="large" type="error" @click="handleResult(post.id,'NO')">驳回博文</Button>
    </Modal>
  </div>
</template>

<script>
import articleAdmin from "@/api/articleAdmin";
export default {
  components: {
  },
  name: "checkArticle",
  data() {
    return {
      checkStatus: false,
      post: {
          tagsTitle:[]
      },
      loading: false,
      pageInfo: {
        pageSize: 5,
        pageNum: 1,
        page: [5, 10, 20, 50],
        total: 0
      },
      queryParams: {
        keyword: "",
        status: ""
      },
      managerColumns: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "状态",
          slot: "status"
        },
        {
          title: "用户账号",
          slot: "nickname"
        },
        {
          title: "标签",
          slot: "tagsTitle"
        },
        {
          title: "更新时间",
          key: "nearestModifyDate"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      articleData: []
    };
  },
  methods: {
    handleResult(id,result){ //返回结果
    let that = this;
    let content = result=== "PUBLISHED" ? "您确定通过这篇博文么？":"您确定将这篇博文驳回么?";
        Modal.confirm({
        title: "通知",
        content:
          content,
        onOk: () => {
            articleAdmin.updateDetail(id,result).then(response=>{
                that.queryArticleList();
                that.checkStatus = !that.checkStatus;
                Notice.success({
                    title: '审核成功',
                    desc:'成功审核一篇文章(注意，此操作不可逆)'
                });
            })
        }
      });
    },
    handleCheck(id) {
      Modal.confirm({
        title: "通知",
        content:
          "您作为一名管理员，审核文章的时候请遵守《博文审核相关条例》(赞无)为用户做成公正的判断！并自愿接受用户的上诉",
        onOk: () => {
          articleAdmin
            .getDetail(id)
            .then(response => {
              this.post = response.data;
              this.checkStatus = !this.checkStatus;
            })
            .catch(error => {
              Message.error(error);
            });
        }
      });
    },
    queryArticleList() {
      this.loading = true;
      articleAdmin
        .getList(this.pageInfo, this.queryParams)
        .then(response => {
          this.articleData = response.data.rows;
          this.pageInfo.total = response.data.total;
          this.loading  = false;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    handleList() {
      this.pageInfo.pageNum = 1;
      this.pageInfo.pageSize = 5;
      this.queryArticleList();
    },
    //点击，切换页面
    changepage(index) {
      this.pageInfo.pageNum = index;
      this.queryArticleList();
    },
    //每页显示的数据条数
    _nowPageSize(size) {
      this.pageInfo.pageSize = size;
      //实时获取当前需要显示的条数
      this.queryArticleList();
    }
  },
  mounted() {
    this.queryArticleList();
  }
};
</script>
