<template>
    <div class="blog-content">
        <Header></Header>
        <div class="mt-4">
            <div class="container">
                <div id="register">
                    <div class="title-box form-title text-center"><h3>逝痕<span class=" text-danger">枫</span>舞</h3></div>
                    <div class="register-box">
                        <form>
                            <div class="form-group">
                                <label for="account" class="text-dark">账户:</label>
                                <input type="text" id="account" v-model="account" class="form-control form-input">
                            </div>
                            <div class="form-group">
                                <label for="username" class="text-dark">昵称:</label>
                                    <input type="text" id="username" v-model="username" class="form-control form-input">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-dark">密码:</label>
                                <input type="password" id="password" v-model="password" class="form-control form-input">
                            </div>
                            <div class="form-group">
                                <label for="passwordc" class="text-dark">确认密码:</label>
                                <input type="password" id="passwordc" v-model="passwordc" class="form-control form-input">
                            </div>
                            <button type="button" class="btn btn-fluid btn-inverse-primary" @click="toRegister">注册</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Header from '@/components/common/header'
    import { Message,Notice } from 'iview';
    import adminApi from '@/api/admin'
    export default {
        name: 'register',
        methods: {
           
            toRegister(){
                if(!this.account || !this.username || !this.password ||!this.passwordc){
                    Message.error("字段名称不能为空！");
                    return ;
                }
                if(this.password != this.passwordc){
                    Message.error("两次密码不一致！");
                    return ;
                }

                adminApi.register(this.account,this.username,this.password).then(response=>{
                        let data = response.data;
                        if(200 != data.status){
                            Message.error(data.message);
                            return ;
                        }
                    Notice.success({
                    title: '注册成功',
                    desc: '即将返回到主页界面！ '
                });
                let _that = this;
                setTimeout(function(){ 
                    _that.$router.push({
                        name:'博客'
                    })
                 },2000)
                })
                


            }
        },
        data() {
            return {
                account:"",
                password:"",
                passwordc:'',
                username:''
            }
        },
        components:{
            Header,
            Message,
            Notice
        }
    }
</script>

<style lang="sass" scoped>


    @import '../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap";


</style>


<style scoped>
    @import '../assets/style/blog.css';

    
    #register{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: rgba(230, 238, 232, 0.5);
        box-shadow: black 0px 0px 8px;
        width: 400px;
    }

    .register-box{
        padding:10px 20px;
    }
</style>