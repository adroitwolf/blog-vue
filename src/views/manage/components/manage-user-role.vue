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
                    :src="item.avatar?item.avatar:baseAvatar"
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
                <span>注册时间:</span>
                <span>{{ item.registerDate }}</span>
              </div>
              <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px;display: flex; align-items: center">
                <span>用户角色:</span>
                <CheckboxGroup v-model="item.roles" @on-change="updateRoles(item.id,item.roles)">
                  <Checkbox label="USER" border>普通用户</Checkbox>
                  <Checkbox label="ADMIN" border>管理员</Checkbox>
                </CheckboxGroup>
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
<!--          @on-change="changePage"-->
<!--          :current="pageInfo.pageNum"-->
<!--          :total="pageInfo.total"-->
<!--          show-elevator-->
<!--      />-->
    </Card>
  </div>
</template>

<script>
import adminApi from "../../../api/manage/admin";
import {mapGetters} from 'vuex'
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
  Col,
  CheckboxGroup,
  Checkbox
} from "view-design";

export default {
  name: "manage-user-role",
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
    Col,
    CheckboxGroup,
    Checkbox
  },
  data() {
    return {
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
  computed: {
    ...mapGetters(['baseAvatar'])
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
      adminApi.listUser(this.pageInfo,this.queryParams).then(response => {
        console.log(response.data);
        this.datasources = response.data.rows;
        this.pageInfo.total = response.data.total;
      });
    },
    updateRoles(userId,roles){
      if(roles.length == 0){
        Message.error("请选择至少一个用户，默认为:普通用户");
      }

      adminApi.updateRoles(userId,roles).then(response=>{
          let status = response.status;
          if(status == 200){
            Message.success ("更新成功！")
          }else{
            this.handleList();
            Message.error("更新失败！");
          }
      });
    }
  },
  created() {
    this.handleList();
  }
}
</script>

<style scoped>
.mt {
  margin-top: 20px;
}
</style>