<template>
    <nav  class="navbar navbar-inverse navbar-expand-md  bg-darkx py-0 " >
            <div class="container">
                <div class="navbar-header">
                    <a  href="#"><div class="navbar-brand text-white"><h1>逝痕<span class=" text-danger">枫</span>舞</h1></div></a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                         <li class="navbar-item mx-2 nav-link">
                           <a href="#" class="nav-link text-light">首页</a>  
                        </li>
                        <li class="navbar-item mx-2 nav-link">
                             <a href="#" class="nav-link text-light">留言板</a>  
                        </li>
                    </ul>
                </div>
            </div>
    </nav >
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                
            }
        }
    }
</script>


<style lang="sass" scoped>


    @import '../../assets/style/custom.scss'

    @import "node_modules/bootstrap/scss/bootstrap";


</style>

<style scoped>
    @import '../../assets/style/blog.css';
</style>