<template>
    <div>
        <div class="blog-card text-center">
            <div class="form-title">{{name}}</div>
            <div class="">
                <div v-if="datasource">
                    <ul class="list-group" v-for="(article,index) in datasource" :key="index">
                        
                        <li class="list-group-item">
                            <router-link tag="a" target="_blank" :to="{name:'博客内容', query:{id: article.id}}">
                            <span class="post-title">{{article.blogName}}</span>
                            <span class="badge" style=" background-color: rgb(217, 83, 79);">{{article.clickcount}}℃</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: 'asideCard',
        props:["name","icon","datasource"],
        data() {
            return {
            }
        },
    }
</script>

<style>

.list-group{
    max-height: 500px;
    width: 100%;
    
}
.list-group-item{
    background:rgba(255, 255, 255,.1);
    border: 1px solid rgba(0, 0, 0, 0.521);
    padding:10px;
    display: inline-block;
    transition: all .3s ease;
    cursor: pointer;
}

.list-group-item .badge{
    float: right;
    color:rgba(255, 255, 255,.9);
}
.list-group-item:hover{
    background:rgba(255, 255, 255,.9);
}
.list-group-item a span:nth-child(1){
    width: 75%;
}

.list-group-item a span:nth-child(2){
    width: 20%;
}
.post-title{
    
    /* 溢出..号 */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color:#666666;
}


</style>



