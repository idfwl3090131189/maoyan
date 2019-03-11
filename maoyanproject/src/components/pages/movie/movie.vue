<template>
    <div>
    <div class="hed">
        猫眼电影
    </div>
        <toptab></toptab>
    </div>
</template>
<script>
import toptab from 'common/top-tab/top-tab'
export default {
    components:{
        toptab,
    }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.hed{
    .h(50);
    .w(375);
    .l_h(50);
    background: #e54847;
    color: #fff;
    font-size: @font-size-m;
    text-align: center;
}
</style>
