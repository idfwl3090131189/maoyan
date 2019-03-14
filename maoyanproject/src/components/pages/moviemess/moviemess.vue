<template>
    <div class="xq">
        <div class="hd">
            <span class="go" @touchstart="go">返回</span>
            {{index?'':movieme.aka[0]}}
        </div>
        <div class="ts">
          <img :src="index?'':movieme.images.small" width="107" height="150">
          <div class="yc">
              <p>{{index?'':movieme.aka[0]}}</p>
              <p>{{movieme.collect_count}}想看</p>
              <span v-for="(item,index) in movieme.genres"
              :key="index">
                  {{item}}
              </span>
          </div>
        </div>
    </div>
    <!-- <div class="xq">
        此功能使用了豆瓣的接口，与猫眼接口movieid不一致，故暂未开放此功能
        <div class="fh">
            <input type="button" value="点我返回主页面哦" @click="fh">
        </div>
    </div> -->
</template>
<script>
export default {
    data() {
        return {
            movieme:[],
            index:true
        }
    },
    computed: {
        params(){
            return this.$route.params;
        }

    },
    methods: {
        go(){
            this.$router.back();
        }
    },
    created() {
        let url=`/xq/v2/movie/subject/${this.params.id}`;
        console.log(url);
        this.$axios.get(url)
        .then((res)=>{
          console.log(res);
         this.movieme=res;
          this.$nextTick(()=>{
               this.index=false;
          })
         console.log(this.movieme);
        })
    },
}   
</script>
<style lang="less" scoped>
@import '~style/index.less';
.xq{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 10;
}
.hd{
    .w(375);
    .h(50);
    .l_h(50);
    background: #e54847;
    font-size: @font-size-l;
    color:#fff;
    text-align: center;
    box-sizing: border-box;
}
.ts{
    .w(375);
    .h(183);
    background: #40454d;
    display: flex;
    img{
        border: 2px solid #333;
        .margin(10,10,10,10);
    }
    .yc{
        p{
            font-size: @font-size-m;
            color: #fff;
            .padding(10,0,0,0);
        }
        :nth-child(2){
            color: #f90;
        }
        span{
            font-size: @font-size-m;
        }
    }
}
.fh{
    input{
    .w(375);
    .h(100);
    font-size: @font-size-l;  
    }
    
}
.go{
    float: left;
    .padding(0,0,0,10);
}
</style>
