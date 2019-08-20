<template>
    <div class="blog-content">
        <Header></Header>
        <div class="mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="p-4 blog-card text-dark mb-5">
                                <div class="blog-title mb-1">{{title}}</div>
                                <div class="auth-box my-2 ">

                                        <div v-if="avatarId" class="avatar">
                                            <Avatar :src='avatarId' size="large" />                               
                                            </div>
                                            <div v-else  class="avatar ">
                                            <Avatar :src='baseAvatar' size="large" />
                                        </div>

                                        <div class="post-info ml-2">
                                            <div class="post-info-date">
                                                <Icon type="ios-calendar-outline" size="12"/>
                                                <span>POST ON:{{date}}</span>
                                            </div>
                                            <div class="post-info-auth">
                                                <Icon type="ios-contact-outline" size="12" />
                                                <span>{{username}}</span>
                                            </div>
                                           
                                        </div>
                                </div>
                                <div class="blog-html-content my-2 markdown-body " v-html="content"></div>

                        </div>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import 'mavon-editor/dist/css/index.css'
    import 'mavon-editor/dist/markdown/github-markdown.min.css'
    import $ from 'jquery'
    
    import Header from '@/components/common/header'
    import blogApi from '@/api/blog'
    import {Avatar} from 'iview'
    export default {
        name: 'blogDetail',
        components:{
            Header,
            Avatar
        },
        data() {
            return {
                baseAvatar:require('../assets/img/avatar.png'),
                title: "",
                content: "",
                date:"",
                username:"",
                avatarId:""
            }
        },
        mounted() {
  
        
            let blogId = this.$route.query.id;
            if(blogId){
                blogApi.getDetail(blogId).then(response =>{
                    let data = response.data.data;
                    this.title = data.title;
                    this.content = data.content;
                    this.date = data.releaseDate;
                    this.username = data.username;
                    this.avatarId = data.avatarId

                })
            }
        },
    }
</script>


<style lang="sass" scoped>


    @import '../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap";


</style>


<style scoped>
    @import '../assets/style/blog.css';
</style>