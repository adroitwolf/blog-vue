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
      <Page
          @on-change="changePage"
          :current="pageInfo.pageNum"
          :total="pageInfo.total"
          show-elevator
      />
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
    Col
  }
}
</script>

<style scoped>

</style>