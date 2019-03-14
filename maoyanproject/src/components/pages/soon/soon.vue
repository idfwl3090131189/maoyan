<template>
    <div class="wrapper vertic">
    <ul class="content">
<div class="qd">
     <p>近期最受期待</p>
     <div class="wrapper hx">
     <ul class="content oul">
        <li v-for="(item,index) in list" :key="index" class="lb">
            <img :src="item.img" height="115" width="85">
            <h2>{{item.nm}}</h2>
            <h3>{{item.comingTitle}}</h3>
        </li>
  </ul>
 </div>
    </div>
    <div class="db">
       <ul>
           <li v-for="(group,index) in movie"  
           :key="index">
           <p class="tb">{{group.title}}</p>
            <div v-for="(item,index) in group.items" 
            :key="index" 
            class="mov">
                <img :src="item.img" width="64" height="90">
                <div class="yc" @click="tzxq">
                  <span class="moname">{{item.name}}</span>
                  <p class="wish"><span>{{item.wish}}</span>人想看</p>
                  <h2>主演：{{item.star}}</h2>
                  <h3>{{item.rt}}上映</h3>
                </div>
                <div class="ys">
                   <span :class="item.showst==4?'yscl':'xkcl'" @click="skip">
                       {{item.showst==4?'预售':'想看'}}
                   </span>
                </div>
            </div>
           </li>
       </ul>
    </div>
    </ul>
    
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            list:[],
            movie:[]
        }
    },
    methods: {
        tzxq(){
         this.$router.push({name:'moviemess',params:{id:27166442}})
        },
        skip(){
            this.$router.push("/cinema");
        }

    },
    created() {
    let url='/hy/ajax/mostExpected?ci=1&limit=16&offset=0&token=';
    let url2='/sy/ajax/comingList?ci=1&token=&limit=16';
    this.$axios.get(url)
    .then((res)=>{
       for(var item of res.coming){
           item.img=item.img.replace('w.h','64.90');
           item.comingTitle=item.comingTitle.substr(0,5);
       }
       this.list=res.coming;
    })
    this.$axios.get(url2)
    .then((res)=>{
    //    this.list2=res.coming;
      // console.log(res.coming);
       let list2={
           '':{
                    title:'',
                    items:[]
                }
       }
       var data=res.coming;
       for(var item of data){
           //处理图片数据
           item.img=item.img.replace('w.h','64.90');
       }
       for(var i=0;i<data.length;i++){
           if(!list2[data[i].comingTitle]){
                 list2[data[i].comingTitle]={
                     title:data[i].comingTitle,
                     items:[{
                         name:data[i].nm,    //电影名字
                         img:data[i].img,    //图片地址
                         wish:data[i].wish,//想看人数
                         star:data[i].star,   //主演
                         rt:data[i].rt,//上映时间
                         showst:data[i].showst
                     }]
                 }
           }else{
               list2[data[i].comingTitle].items.push({
                   name:data[i].nm,
                   img:data[i].img,
                   wish:data[i].wish,
                   star:data[i].star,
                   rt:data[i].rt,
                   showst:data[i].showst
               })
           }        
        }
       //console.log(list2);
       this.movie=list2;
    })
 },
 mounted() {
     new BScroll('.hx',{scrollX: true});
     new BScroll('.vertic',{click: true});
 },
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.qd{
    .w(343);
    .h(216);
    // background: red;
    .margin(17,0,17,17);
    p{
        font-size: @font-size-m;
    }
    .ban{
        .w(85);
    }
    .mt{
        display: block;
    }
    .wrapper{
        .w(343);
        overflow: hidden;
        .oul{
            display: flex;
            float: left;
            li{
              .w(85);
              .margin(0,10,0,0);
            }
        }
        .lb{
            h2{
                font-size: 14px;
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            h3{
                font-size: 12px;
                color: #333;
            }
        }
    }
}
.db{
    .tb{
            font-size: 14px;
            .margin(0,0,0,10);
            color:#333;
        }
    .mov{
        display: flex;
        .margin(0,0,10,10);
        .moname{
            font-size: @font-size-m;
        }
        .wish{
            font-size: @font-size-m;
            span{
            color:#faaf00;
            font-size: @font-size-l;
            }
            
        }
        img{
            .margin(22,0,0,0);
        }
        .yc{
            .margin(0,0,0,10);
        h2{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .w(207);
        }
        }
       .ys{
           span{
               display: block;
               text-align: center;
               .l_h(27);
               font-size: @font-size-s;
               .w(47);
               .h(27);
               .margin(42,0,0,0);
           }
           .yscl{
               background: #3c9fe6;
               border-radius: 4px;
           }
           .xkcl{
               background: #faaf00;
               border-radius: 4px;
           }
       } 
    }
}
.vertic{
    .w(375);
    position:fixed;
    .top(95);
    bottom: 0;
    overflow: hidden;
}
</style>