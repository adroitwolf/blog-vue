<template>
  <div>
    <Card>
      <Form @submit.native.prevent label-postion="left" inline :label-width="100">
        <FormItem label="用户名称:">
          <Input type="text" v-model="queryParams.keyword"></Input>
        </FormItem>
        <FormItem label="用户状态:">
          <Select clearable v-model="queryParams.status" style="width:200px">
            <Option
                v-for="(userType,index) in userStatus"
                :key="index"
                :value="userType.value"
            >{{ userType.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleList()">查询</Button>
        </FormItem>
      </Form>
    </Card>

    <Card class="mt">
      <Row :gutter="16" v-if="datasources.length>0">
        <Col span="6" v-for="(item,index) in datasources" :key="index">
          <Card>
            <p slot="title">{{ item.nickname }}</p>
            <a href="#" slot="extra" @click="deleteUser(item.id)">
              删除
              <Icon type="ios-trash-outline"/>
            </a>
            <div>
              <div>
                <img
                    :src="item.avatar?item.avatar:avatarUrl"
                    :alt="item.nickname"
                    style="width: 70px;height: 70px;"
                />
              </div>
              <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
                <span>账号:</span>
                <span>{{ item.username }}</span>
              </div>
              <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
                <span>电子邮箱:</span>
                <span>{{ item.email }}</span>
              </div>
              <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
                <span>手机:</span>
                <span>{{ item.phone }}</span>
              </div>
              <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
                <span>注册时间:</span>
                <span>{{ item.registerDate }}</span>
              </div>
              <div
                  style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px;display: flex; align-items: center"
              >
                <span>用户状态:</span>

                <i-switch
                    size="large"
                    :value="item.isEnabled"
                    true-color="#13ce66"
                    false-color="#ff4949"
                    true-value="YES"
                    false-value="NO"
                    :before-change="()=>handleBeforeChangeUserStatus(item.id,item.isEnabled)"
                    style="margin-left:10px;"
                >
                  <span slot="open">使用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              </div>
            </div>
          </Card>

        </Col>
      </Row>

      <span v-else>暂无数据</span>
      <Divider class="mt"></Divider>
      <!--      <Page-->
      <!--        @on-change="changePage"-->
      <!--        :current="pageInfo.pageNum"-->
      <!--        :total="pageInfo.total"-->
      <!--        show-elevator-->
      <!--      />-->
    </Card>
  </div>
</template>

<script>
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
import {BASE_URL} from "@/config/global.var";
import userManageApi from "@/api/manage/user";

export default {
  name: "UserManager",
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
  data() {
    return {
      baseUrl: BASE_URL,
      avatarUrl: require("@/assets/img/avatar.png"),
      queryParams: {
        keyword: "",
        status: ""
      },
      userStatus: [
        {
          label: "正常",
          value: "YES"
        },
        {
          label: "封禁",
          value: "NO"
        }
      ],
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      datasources: {}
    };
  },
  methods: {
    handleBeforeChangeUserStatus(id, status) {
      return new Promise(resolve => {
        Modal.confirm({
          title: "警告！",
          content: "您确定是否要封禁该用户？",
          onOk: () => {
            console.log(status);
            let updatedStatus = status === "YES" ? "NO" : "YES";
            console.log(updatedStatus);
            userManageApi
                .updateUserStatus(id, updatedStatus)
                .then(response => {
                  this.handleList();
                  resolve();
                })
                .catch(error => {
                });
          }
        });
      });
    },
    deleteUser(id) {
      Modal.confirm({
        title: "警告！",
        content: "您确定是否要删除该用户？",
        onOk: () => {
          userManageApi.deleteUser(id).then(response => {
            this.handleList();
          });
        }
      });
    },
    handleList() {
      userManageApi.listUser(this.queryParams, this.pageInfo).then(response => {
        console.log(response.data);
        this.datasources = response.data.rows;
        this.pageInfo.total = response.data.total;
      });
    }
  },
  created() {
    this.handleList();
  }
};
</script>

<style scoped>
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