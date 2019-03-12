<template>
    <div class="xq">
        <div class="hd">
            {{movieme.aka[0]}}
        </div>
        <div class="ts">
          <img :src="movieme.images.small" width="107" height="150">
          <div class="yc">
              <p>{{movieme.aka[0]}}</p>
              <p>{{movieme.collect_count}}想看</p>
              <span v-for="(item,index) in movieme.genres"
              :key="index">
                  {{item}}
              </span>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            movieme:[{}]
        }
    },
    computed: {
        params(){
            return this.$route.params;
        }
    },
    created() {
        let url=`/xq/v2/movie/subject/${this.params.id}`;
        console.log(url);
        this.$axios.get(url)
        .then((res)=>{
          console.log(res);
          this.movieme=res;
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
</style>
