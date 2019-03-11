<template>
    <div class="bot">
       <router-link to="/movie/being" tag="span"
       active-class="sel"
       >电影</router-link>
       <router-link to="/cinema" tag="span"
       active-class="sel"
       >影院</router-link>
       <router-link to="/my" tag="span"
       active-class="sel"
       >我的</router-link>
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
@import '~style/index.less';
.bot{
    position: fixed;
    bottom: 0;
    .w(375);
    display: flex;
    justify-content: space-around;
    font-size:@font-size-m;
    .sel{
        color:red;
    }
}
</style>