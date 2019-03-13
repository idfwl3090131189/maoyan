<template>
    <div class="bot">
       <router-link to="/movie/being" tag="div"
       active-class="sel"
       >
       <p>
           <i class='iconfont'>&#xe6ee;</i><br>
           
       </p>
       <p class="zt">电影</p>
       </router-link>
       <router-link to="/cinema" tag="div"
       active-class="sel"
       >
       <p>
           <i class='iconfont'>&#xe61d;</i>
           
       </p>
       <p class="zt">影院</p>
       </router-link>
       <router-link to="/my" tag="div"
       active-class="sel"
       >
       <p><i class='iconfont'>&#xe615;</i></p>
       <p class="zt">我的</p>
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
    .h(48);
    // .l_h(48);
    display: flex;
    font-size:@font-size-s;
    justify-content: space-around;

    font-size:@font-size-m;
    background: #fff;

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
.zt{
    font-size: 12px !important;
}
</style>