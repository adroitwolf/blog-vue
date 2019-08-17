<template>
    <Row type='flex' justify="space-around">
        <Col span="8">
        <Card class="profileCard">
            <Row type='flex' justify="center" align="middle"> 
                <Col span="12">
                  <div class="profile">
                    <!-- 判断用户是否有头像 -->
                    <div v-if="avatarIdx">
                        <img  :src="avatarIdx" />
                    </div>
                    <div v-else>
                    <img  :src='avatarUrl' />
                    </div>
                     
                </div>
                </Col>
            </Row>
           <Row type='flex' justify="center" align="middle">
               <Col span="12" push="3">
                   <h1>{{usernamex}}</h1>
               </Col>
           </Row>
            <Row type='flex' justify="center" align="middle" class-name="profile-detail">
                <Col span="6">
                    <h1><Icon type="ios-call-outline" size='24'/>:</h1>
                </Col>
                <Col span="12">
                    <h1>{{phonex?phonex:"暂无"}}</h1>
                </Col>
            </Row>
            <Row type='flex' justify="center" align="middle" class-name="profile-detail">
                <Col span="6" >
                    <h1><Icon type="ios-mail-outline" size='24'/>:</h1>
                </Col>
                <Col span="12">
                    <h1><a href="#">{{emailx?emailx:"暂无"}}</a></h1>
                </Col>
            </Row>
             <Divider />
             <Row type='flex' justify="start"  class-name="profile-detail">
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
                       <Form  label-position="top">
                        <FormItem label="用户名">
                            <Input :value='usernamex' @on-blur="changeUsername" ></Input>
                        </FormItem>
                        <FormItem label="手机号">
                            <Input :value='phonex' @on-blur="changePhone" placeholder="试着填写一下手机号吧"></Input>
                        </FormItem>
                        <FormItem label="邮箱">
                            <Input :value='emailx' @on-blur="changeEmail" placeholder="试着填写一下邮箱呢"></Input>
                        </FormItem>
                        <FormItem label="个人说明" >
                            <Input :value="aboutMex" @on-blur="changeAboutMe" type="textarea" :rows="4" 
                            placeholder="试着介绍一下自己" />
                        </FormItem> 

                        <FormItem>
                            <Button type='primary' @click="updateUserProfile">修改</Button>
                        </FormItem>


                        </Form>
                    </TabPane>
                    <TabPane label="修改密码" name="name2">
                         <Form  label-position="top">
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
                                <Button type='primary' @click="updatePassword">提交</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        </Col>
    </Row>
</template>

<script>

import {mapGetters,mapActions} from 'vuex'
import {Avatar,Divider,Tabs,TabPane,Form,FormItem,Message,Notice} from 'iview'


export default {

    name:'UserProfile',
    data() {
        return {
            opassword:'',
            password:'',
            cpassword:'',
            aboutMe:'',
            username:'',
            avatarId:'',
            phone:'',
            email:'',
            avatarUrl:require('@/assets/img/avatar.png'),
            articleCount:0
        }
    },
    components:{
        Avatar,
        Divider,
        Tabs,
        TabPane,
        Form,
        FormItem,
        Message
    },
    computed: {
        ...mapGetters({
            usernamex:'getUsername',
            avatarIdx:'getAvatarId',
            phonex:'getPhone',
            emailx:'getEmail',
            aboutMex:'getAboutMe'
        })
    },
created() {
    this.getArticleCount().then(response=>{
        this.articleCount = response.data.data;
    })
},
    methods: {
        ...mapActions(['changePassword',"updateProfile","getArticleCount"]),
        changeUsername(e){
            console.log(e)
            this.username = e.target.value;
            
        },
        changePhone(e){
            this.phone = e.target.value;
        },
        changeEmail(e){
             this.email = e.target.value;
        },
        changeAboutMe(e){
             this.aboutMe = e.target.value;
        },

        updateUserProfile(){
           
            this.updateProfile({username:this.username,phone:this.phone,email:this.email,aboutMe:this.aboutMe}).then(response =>{
                Notice.success({
                    title: '更新个人资料成功',
                });
            })
            
        },
        updatePassword(){
            if(!this.opassword){
                Message.error("旧密码不能为空！")
                return ;
            }
            if(!this.password||!this.cpassword){
                Message.error("密码不能为空！")
                return ;
            }

            if(!(this.password === this.cpassword)){
                Message.error("两次密码不一致！")
                return ;
            }
            this.changePassword({opassword:this.opassword,password:this.password}).then(response=>{
                Message.success("修改密码成功！");
            })
        }
    },
}
</script>

<style scoped>
*{
    font-size: 16px;
}
.profileCard{

}

.profile-detail{
    margin: 10px 0;
    overflow: hidden;
}

.profile img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
</style>
