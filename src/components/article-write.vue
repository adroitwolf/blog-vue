<template>
    <div class="body">

        <Form label-position="left">
            <FormItem >
                <Input placeholder="请输入文章标题" v-model="title"></Input>
            </FormItem>
            <FormItem >
                <div id="editor">
                <mavon-editor 
                v-model="content" 
                :ishljs = "true" 
                :toolbars="toolbars"
                @change="saveHtml"/>
                </div>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="toDrawer">发布</Button>
            </FormItem>

             <Drawer title="文章设置" width="30%" :closable="true" v-model="DrawerStatus">
                <Form  label-position="top" @submit.native.prevent>
                    <FormItem  label="文章分类">
                        <!--修改代码 -> 增加文章标签处理 日期 8-23-19 处理人：WHOMAI -->
                        <!-- <Input type="text" v-model="tag"></Input> -->
                        <Tag v-for="(item,index) in tagList" :key="index" :name="item" closable @on-close="handleCloseTag(index)">{{item}}</Tag>
                        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd" v-if="addTag">添加标签</Button>
                        <Input v-model.trim="tagTemp" size="small" style="width:20%;" autofocus  @keyup.enter.native='handleTagComplelte()' v-else></Input>
                        <!-- 增加文章标签处理 结束 -->
                    </FormItem >
                    
                    <Divider />
                    <FormItem label="文章摘要">
                        <Input v-model="summary" type="textarea" :rows="4" placeholder="随便写一点" />
                    </FormItem>
                    <Divider/>
                    <FormItem>
                        <Button type="primary" @click='submit'>发布</Button>
                    </FormItem>
                </Form>
             </Drawer>
        </Form>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import {Form,FormItem,Drawer,Divider,Message,Notice,Tag} from 'iview'
import 'mavon-editor/dist/css/index.css'
import {mapGetters,mapActions} from 'vuex'
import articleApi from '@/api/article'

export default {
    
    name:'articleWrite',
    components:{
        FormItem,
        Form,
        Drawer,
        mavonEditor,
        Divider,
        Tag
    },
    mounted() {
        let row = this.$route.params;
        if(row){
            this.title = row.title;
            this.tagList = row.tagsTitle;
            this.summary = row.summary;
            this.htmlContent = row.content;
            this.content = row.contentMd;
            this.id = row.id;

        }
    },
    methods: {
        ...mapActions(["postArticle"]),
        /* 处理文章Tag的所有函数*/ 
        handleCloseTag(index){

            this.tagList.splice(index,1);//从start的位置开始向后删除delCount个元素

        },
        handleTagComplelte(){
           this.tagList.push(this.tagTemp);
           this.tagTemp = '';
           this.addTag = !this.addTag;
        },
        handleAdd(){
           this.tagTemp = '';
           this.addTag = !this.addTag;
        },
        /* 处理文章Tag的所有函数结束*/
        /* 处理文章详细信息的所有函数 */
        toDrawer(){
            if(!this.title){
               Message.warning("请输入文章标题"); 
               return ;
            }
            if(!this.content || !this.htmlContent){
                Message.warning("请输入文章内容")
                return ;
            }

            this.DrawerStatus = true;
        },
        saveHtml(value,render){
            this.htmlContent = render;
        },
        submit(){
            if(!this.summary){
                Message.warning("请输入文章摘要");
                return ;
            }
            if(this.id){
                let articleParams = {};
                articleParams.title = this.title;
                articleParams.tagList = this.tagList;
                articleParams.summary = this.summary;
                articleParams.htmlContent = this.htmlContent;
                articleParams.content = this.content;
                articleApi.updateArticle(this.id,articleParams).then(response=>{
                 
                    Notice.success({
                        title:"文章更新成功！"
                    })
                    this.DrawerStatus = false;
                }).catch(error =>{
                    Message.error("文章更新失败！");
                })
                return;
            }
            this.postArticle({title: this.title, tagList:this.tagList, summary:this.summary, htmlContent:this.htmlContent, content:this.content,id:this.id}).then(response=>{
                Message.success('发布文章成功！');
                this.title = '';
                this.tagList = [];
                this.summary = '';
                this.htmlContent = "";
                this.content = "";
                this.DrawerStatus = false;
                
            }).catch(error=>{
                Message.error("文章发布失败！");
                this.DrawerStatus = false;
            })
        }
        /* 处理文章详细信息的所有函数结束 */
    },
    computed: {
       
    },
    data() {
        return {
            id:'',
            title:'',
            tag: '',
            tagList:[],
            addTag:true,
            summary: '',
            htmlContent: '',
            content: '',
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
                preview: true, // 预览
             },
             DrawerStatus: false,
        }
    },
    
    
}
</script>

<style scoped>
    /* .body{
    height: 100%;
    overflow: auto;
} */
</style>
<style>

.v-note-wrapper{
    z-index: 10!important;
}
</style>
