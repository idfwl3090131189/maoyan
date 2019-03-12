<template>
    <div class="bot">
       <router-link to="/movie/being" tag="div"
       active-class="sel"
       >
       <p><i class='iconfont'>&#xe6ee;</i></p>
       <p>电影</p>
       </router-link>
       <router-link to="/cinema" tag="div"
       active-class="sel"
       >
       <p><i class='iconfont'>&#xe61d;</i></p>
       <p>影院</p>
       </router-link>
       <router-link to="/my" tag="div"
       active-class="sel"
       >
       <p><i class='iconfont'>&#xe615;</i></p>
       <p>我的</p>
       </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
<style lang="less" scoped>
@import url("../../../common/iconfont/iconfont.css");
@import '~style/index.less';
.bot{
    position: fixed;
    bottom: 0;
    .w(375);
    display: flex;
    font-size:@font-size-s;
    justify-content: space-around;
    background: #fff;
    border:1px solid #f5f5f5;
    .padding(5,0,3,0);
    div{
        flex:1;
        text-align: center;
       
    }
    .iconfont{
       font-size:25px;
    }
    .sel{
        color:red;
    }
}
</style>