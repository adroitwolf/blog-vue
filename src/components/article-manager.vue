<template>
<div>
    <Card class="b-card">
        <Table :columns="managerColumns" :data="articleData" stripe :loading="loading">
            <div slot-scope='{row}' slot="status">
                <div v-if="row.status === 'PUBLISHED'">
                <Badge status='success' text="已发布"/>
                </div>
                <div v-else-if='row.status === "RECYCLE"'>
                <Badge status='error' text="回收站"/>                    
                </div>
            </div>
            <div slot-scope="{ row, index}" slot="action">
                <div v-if="row.status === 'PUBLISHED'">
                <Button type="primary"  style="margin-right: 5px" @click="eidtArticle(row)">编辑</Button>

                 <Poptip
                    confirm
                    title="确定要讲这篇文章放入回收站么?"
                    @on-ok="totrash(row,'RECYCLE')">
                    <Button type="error">回收站</Button>
                </Poptip>

                </div>
                <div v-else-if='row.status === "RECYCLE"'>
                <Button type="primary"  style="margin-right: 5px" @click="totrash(row,'PUBLISHED')">还原</Button>
                
                <Poptip
                    confirm
                    title="确定要删除这篇文章么?"
                    @on-ok="deleteArticle(row)">
                        <Button type="error">删除</Button>
                </Poptip>
                </div>
                
            </div>
        </Table>
        <!-- 分页列表 -->
        <div style="margin: 10px;overflow: hidden">
            
            <div style="float: right;">
                <Page :total="total"  :current="pageNum" @on-change="changepage" 
                @on-page-size-change="_nowPageSize"
                :page-size-opts="page"
                show-total show-sizer
                :page-size="pageSize"
                ></Page>
            </div>
    </div>
    </Card>
</div>
    
</template>
<script>

import {Page,Card,Table,Badge,Poptip,Notice} from 'iview'
import {mapGetters,mapActions} from 'vuex'
import router from '@/router'
import articleApi from '@/api/article'

    export default {
        name:'articleManager',
        components:{
            Page,
            Card,
            Table,
            Badge,
            Poptip
        },
        data () {
            return {
                
              loading:false,
               pageSize:5,
               pageNum:1,
                page:[5,10,20,50]
            }
        },
        methods: {
            ...mapActions(["getArticleList","updateArticleStatus"]),
            deleteArticle(row){
                console.log(row);
                articleApi.deleteArticle(row.id).then(response=>{
                    Notice.success({
                        title:'删除文章成功！',
                        desc:'注意，此操作不可逆'
                    });
                    this.loading = true;
                    this.getArticleList({pageSize:this.pageSize,pageNum:this.pageNum}).then(response=>{
                        this.loading = false
                    })

                })
            },
            totrash(row,status){
                this.loading = true;
               this.updateArticleStatus({index:row._index,id:row.id,status:status}).then(response=>{
                   this.loading = false;
               })
            },
            eidtArticle(row){
                

                articleApi.getDetail(row.id).then(response=>{
                    var article = response.data.data;
                    console.log(article);
                    this.$router.push({
                    name:'写文章',
                    params:article
                    })
                })

            },
            //点击，切换页面
            changepage(index) {
                
                this.loading = true;
                this.getArticleList({pageSize:this.pageSize,pageNum:index}).then(response=>{
                    this.pageNum = index
                    this.loading = false;
                })
            },
            
            //每页显示的数据条数
             _nowPageSize(size) {

                 this.loading = true;
                //实时获取当前需要显示的条数
                this.getArticleList({pageSize:size,pageNum:this.pageNum}).then(response=>{
                    this.pageSize = size;
                    this.loading = false;
                })

            },
        },
        computed: {
            ...mapGetters({
                total:'getTotal',
                managerColumns:'getManagerColumns',
                articleData:'getArticleData'
            })
        },
        mounted()  {
            this.loading = true;
             this.getArticleList({pageSize:this.pageSize,pageNum:this.pageNum}).then(response=>{
                    this.loading = false
                })
        },
    }
</script>


<style scoped>
.b-card{
    padding: 10px 10px;
}
.ivu-table-wrapper{
    position: static!important;
}
</style>
