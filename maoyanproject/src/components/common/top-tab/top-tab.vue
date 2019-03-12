<template>
    <div>
        <div class="tab">
           <!-- <span @click="tz" 
       :class="col?'sel':''"
       >正在热映</span>
       <span  @click="ts"
       :class="col?'sel':''"
       >即将上映</span>  -->
       <span v-for="(item,index) in list"
       :key="index"
       :class="{'sel':index == navActive}"
       @click="tz(index)"
       >
           {{item}}
       </span>
        </div>
       <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navActive:0,
            list:['正在热映','即将上映']
        }
    },
    methods: {
        tz(index){
            this.navActive=index;
            if(index==0){
               this.$router.push({name:'being'});
            }else{
               this.$router.push({name:'soon'}); 
            }
        }
        // tz(){
        //  this.$router.push({name:'being'});
        //  this.col=true;
        // },
        // ts(){
        // this.$router.push({name:'soon'});
        // this.col=true;
        // }
    },
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.tab{
    .w(375);
    .h(44);
    .l_h(44);
    border-bottom:1px solid #efefef;
    background: #fff;
    font-size: @font-size-m;
    font-weight: 200;
    display: flex;
    justify-content: center;
    :nth-child(2){
        .margin(0,0,0,24);
    }
    .sel{
        color: red;
        border-bottom: 2px solid red;
    }
}
</style>
