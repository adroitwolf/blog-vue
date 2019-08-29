<template>
    <div class="mt-5">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                 <div id="article-list">
                     <div v-for="(article,index) in articleLists" :key="index">
                            <div class="article-card blog-card">
                                <div class="article-date">
                                    <span class="month">{{article.month}}</span>
                                    <span class="day">{{article.day}}</span>
                                </div>
                                <div class="article-title">
                                    <h1><router-link tag='a' target="_blank" :to="{name:'博客内容', query:{id: article.id}}"><span class="title-blog">{{article.title}}</span></router-link>
                                        </h1>
                                    <!-- <h1><a @click="goDetail(article.id)"><span class="title-blog">{{article.title}}</span></a>
                                        </h1> -->
                                    </div>
                                
                                <!-- 新增 tag标签片段 -->
                                
                                <div class="article-tag my-2 d-flex justify-content-around">
                                    <div class="btn-hover" v-if="article.tagsTitle.length >0">
                                        <div style="display:inline-block" v-for="(tag,index) in article.tagsTitle" :key="index">
                                            <div v-if="index != 0" style="display:inline-block;" class="px-1">&nbsp;|&nbsp;</div>      
                                            <a >
                                             <Icon type="ios-pricetag-outline" style="padding-right:5px;"/><span class="tag" @click="searchTag(tag)">{{tag}}</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="btn-hover" v-else>
                                            <Icon type="ios-pricetag-outline" style="padding-right:5px;"/>暂无
                                        </div>
                                </div>
                                 <!-- 新增 tag标签片段结束 -->
                                
                                <div class="article-img">
                                    <img :src="article.img?article.img:imglist[index%pageSize]" alt="">
                                </div>
                                <div class="article-summary">
                                    {{article.summary}}
                                </div>
                            </div>
                     </div>
                 </div>
                 <div class="article-page">
                    <Page :total="total"  :current="pageNum" @on-change="change"
                show-total
                :page-size="pageSize"
                ></Page>
                 </div>
            </div>
            <div class="col-md-4">
            <!-- 搜索方法 -->

            <div class="blog-card mb-4 search-block">
                <div class="search-box">
                    <form class="form-inline">
                        <input id="keyword" type="text" class="animated form-control form-input" v-model.trim='keyword' placeholder="试着搜索一下文章吧">                        
                        <button type="button" class="btn btn-danger" @click="handleSearch()"><Icon type="ios-search-outline" /></button>
                    </form>
                </div>
            </div>

            <!-- 搜索方法结束 -->

            <!-- 登陆表单 -->
                <div class="blog-card">
                    <div v-if="username">
                        <div class="form-title text-center">
                            欢迎你
                        </div>
                        <div class="user-info">
                            <div class="py-2 row">
                                 <div v-if="avatarId" class="col-md-4">
                                    <Avatar  :src='avatarId' size="large"  />
                                    </div>
                                    <div v-else class="col-md-4">
                                    <Avatar  :src='baseAvatar' size="large"  />
                                 </div>
                                <div class="username col-md-6">{{username}} </div>
                            </div>
                            
                            <button @click="toStatus" class="btn btn-fluid btn-inverse-primary">状态表</button>
                        </div>
                    </div>
                    <div v-else>
                        <div class="form-title text-center ">
                        请登陆
                    </div>
                    <div class="form-login">
                        <form >
                             <div class="form-group ">
                                 <div class="input-group">
                                      <div class="form-group-icon ">
                                    <Icon type="ios-person-outline" /> 
                                 </div>
                                 <input class="form-control form-input" v-model="account"></input>
                                 </div>
                             </div>
                              <div class="form-group">
                                <div class="input-group">
                                  <div class="form-group-icon ">
                                    <Icon type="ios-person-outline" /> 
                                 </div>
                                 <input class="form-control form-input" type="password" v-model="password"></input>
                                 </div>
                             </div>
                             <div class="form-group d-flex flex-row justify-content-between">
                                  <button class="btn btn-inverse-primary btn-half center-block" type="button" @click="handleSubmit">登陆</button>
                                <button type="button" class="btn btn-inverse-primary btn-half center-block" @click="toRegister">注册</button>
                             </div>
                               
                        </form>

                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import animate from 'animate.css'
    import $ from 'jquery'
    import {Page,Avatar,Notice,Message} from 'iview'
    import blogApi from '@/api/blog'
    import {mapGetters, mapActions} from 'vuex'
    

    export default {
        name: 'blogIndex',
        computed: {
        ...mapGetters({
            username:"getUsername",
            avatarId:"getAvatarId"
        })
    },
    methods: {
        ...mapActions(["getProfile","login"]),
        searchTag(tag){
            this.$router.push({name:'博客搜索',params:{tag:tag}});
        },
        handleSearch(){
            if(!this.keyword){
                $('#keyword').addClass('shake');
                setTimeout(function(){ 
                    $('#keyword').removeClass('shake');
                 },2000)
                return 
            }

            this.$router.push({name:'博客搜索',params:{keyword:this.keyword}});
        },
        toRegister(){
            this.$router.push({
                name:'注册'
            })
        },
        handleSubmit(){
            if(!this.account){
                    Message.warning('用户名不能为空！');
                    return 
                }
                if(!this.password){
                    Message.warning('密码不能为空！')
                    return 
                }
            
                this.login({username:this.account,password: this.password}).then(response=>{
                  Notice.success({
                        title: '登陆成功',
                    });
                  this.getProfile();
                })
        },
        goDetail(id){
            let skip = this.$router.push({
                name:'博客内容',
                params:{
                    id:id
                }
                });
            
        },
        toStatus(){
            this.$router.push({name:'状态面板'});
            
        },
        change(index){
            this.pageNum = index;
            this.getArticleList();

        },
        getArticleList(){
            blogApi.getAllList(this.pageSize,this.pageNum).then(response=>{
                this.total = response.data.total;
                this.articleLists = response.data.rows;
                // 转换日期
                for(var i=0;i<this.articleLists.length;i++){
                   this.articleLists[i].releaseDate = this.articleLists[i].releaseDate.split(' ')[0];
                   this.articleLists[i].releaseDate = this.articleLists[i].releaseDate.split('-');
                   var month = this.articleLists[i].releaseDate[1];
                   month = parseInt(month).toString() + "月";
                   this.articleLists[i].month = month;
                   this.articleLists[i].day = this.articleLists[i].releaseDate[2];

           
           }
            // 返回顶部
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            })
        }
    },
    created() {
        this.getArticleList();
        this.getProfile();

    },
    components:{
        Page,
        Avatar,
        Notice,
        Message,
    },
        data() {
            return {
            baseAvatar:require('../assets/img/avatar.png'),
            articleLists:[],
            imglist:[
                require('../assets/img/0.jpg'),
                require('../assets/img/1.jpg'),
                require('../assets/img/2.jpg'),
                require('../assets/img/3.jpg'),
                require('../assets/img/4.jpg'),
                require('../assets/img/5.png'),
                require('../assets/img/6.jpg'),
                require('../assets/img/7.jpg'),
                require('../assets/img/8.jpg'),
                require('../assets/img/9.jpg'),
                
            ],
            pageSize:5,
            pageNum:1,
            total:0,
            account:"",
            password:"",
            keyword:""
            }
        }
    }
</script>


<style lang="sass" scoped>


@import '../assets/style/custom.scss'

@import "node_modules/bootstrap/scss/bootstrap";


</style>


<style scoped>
    @import '../assets/style/blog.css';
</style>

<style>
/* 修改的iview分页样式 */
.ivu-page-total{
    color:black ;
    opacity: .8 ;
}
.ivu-page-prev,.ivu-page-item,.ivu-page-next{
    background: transparent;
    color: black;
}


</style>