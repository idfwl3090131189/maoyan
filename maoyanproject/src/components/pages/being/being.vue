<template>
        <div>
             <div class="being wrapper">
                <ul class='content'>
                    <li 
                    v-for='(item,index) in movieList' 
                    :key='index'
                    @click='goMovieDetail(item)'
                    >
                    <img :src="item.img" alt="">
                    <div class="detail">
                        <h4>{{item.nm}} <span v-if="item.version" class="max"></span></h4>
                        <p>观众评 <i>{{item.sc}}</i> </p>
                        <p>主演：{{item.star}}</p>
                        <p>{{item.showInfo}}</p>
                    </div>
                    <span class='by' @class='goMovieDetail'>购票</span>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
       
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"being",
    data(){
        return {
            movieList:[],
        }
    },
    methods:{
        goMovieDetail(item){
            this.$router.push({name:'moviedetail',params:item})
        },
        normalData(data){
            let lists = []
            for( var i = 0 ; i < data.length ; i++ ){
                let str = data[i].img
                let reg = /w.h/
                let img = str.replace(reg,'128.120')
                lists.push({
                    id:data[i].id,
                    img:img,
                    nm:data[i].nm,
                    sc:data[i].sc,
                    star:data[i].star,
                    version:data[i].version,
                    showInfo:data[i].showInfo
                })
            }
            this.movieList = lists
            console.log(this.movieList)   
        }
    },
    created(){
        let url = '/hehe/ajax/movieOnInfoList?token='
        let params = {};
       // let url ='http://m.maoyan.com/ajax/moreComingList?token=&movieIds=1228761%2C1225543%2C1261537%2C1212492%2C580298%2C1214652%2C1243239%2C1251817%2C507792%2C344262'
        this.$axios.get(url)
        .then((res)=>{
            console.log(res)
            let data = res.movieList
            this.normalData(data)          
        })
        .catch((err)=>{
            console.log(err)
        })
         setTimeout(()=>{
              this.scroll = new BScroll('.wrapper',{click:true}) //this值得是当前vue
          },20)
    }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.being{
    position:fixed;
    overflow:hidden;
    width:100%;
    .top(95);
    .bottom(21);
    .padding(0,0,0,15);
    ul{
        li{
            display:flex;
            font-size:13px;
            color:@font-color-being;
            //padding: 12px 14px 12px 0;
            .padding(0,14,20,0);
            height: 90px;
            position: relative;
            .by{
                display:block;
                .w(47);
                .h(27);
                line-height: 28px;
                text-align: center;
                box-sizing: border-box;
                background-color: #f03d37;
                color: #fff;
                border-radius: 4px;
                white-space: nowrap;
                font-size: 12px;
                cursor: pointer;
                position:absolute;
                .top(42);
                .left(284);
            }
            img{
                .w(64);
                .h(90);
                .margin(12,12,0,0);
            }
            .detail{
                background-size: 1px 1px;
                .h(114);
                .w(269);
                border-bottom:1px solid #eee;
                h4{
                    font-size: 17px;
                    color: #333;
                    font-weight: 700;
                    padding-right: 5px;
                    box-sizing: border-box;
                     display:flex;
                    .padding(12,0,2,0);
                    .w(207);
                    .max{
                        .margin(5,0,0,5);
                        display:block;
                        .w(43);
                        .h(14);
                        background-image: url("../../../common/img/3d.png") ;
                        background-size: contain;
                        background-repeat: no-repeat;
                        
                    }
                }
                p{
                    .w(202);
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    box-sizing: border-box;
                    overflow: hidden;
                    margin-top: 6px;
                    line-height: 15px;
                    i{
                        font-weight: 700;
                        color: #faaf00;
                        font-size: 15px;
                        font-style:normal;
                    }
                }
            }
        }
    }
}
</style>
