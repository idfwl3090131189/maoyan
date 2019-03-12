<template>
    <div class="movie-detail">
        <div class="mheader">
            <span class='sign' @click='back'> 返回 </span>
            <p>{{params.nm}}</p>
        </div>
        <div class='movie-bg'>
            <img :src="params.img" alt="">
        </div>
        <div class="m-link">
            <img :src="params.img" alt="">
            <div class='link-right'>
                <h4>{{params.nm}}</h4>
                <p class='enm'>{{datas.enm}}</p>
                <p class='ping'>
                    <span class="sc">{{datas.sc}}</span> 
                    <span class='snum'>({{(datas.snum/10000).toFixed(1)}}万人评论)</span>
                    
                </p>
                <p class='imax'>{{datas.cat}} 
                    <img src="../../../common/img/imax.png" alt="" v-show='datas.version'>
                </p>
                <p>{{datas.src}}/{{datas.dur}}分钟</p>
                <p>{{datas.pubDesc}}</p>
            </div>
            <span class='jt'></span>
        </div>

        <div class='addr-link'>
            <ul class='day'>
                <li 
                v-for='(item,index) in movList' 
                :key='index' @click='go(index)' 
                :class="sel==index?'red':''"
                >
                    {{item.day}}
                </li>
            </ul>
            <ul class='addrDetail'>
                <li v-for='text in movList[index].detail[0].cinemas'>
                    <h4>{{text.nm}} <span><i>{{text.sellPrice}}</i>元起</span></h4>
                    <h5><em>{{text.addr}}</em> <span>{{text.distance}}</span></h5>
                    <h6>
                        <span v-if='text.tag.allowRefund'>退</span>
                        <span v-if='text.tag.endorse' class='blue'>改签</span>
                        <span v-if='text.tag.snack'>小吃</span>
                        <span v-if='text.tag.vipTag'>{{text.tag.vipTag}}</span>
                        <span v-if='text.tag.hallType' 
                            v-for='(hal,index) in text.tag.hallType' 
                            :key='index' 
                            class='blue hal'>
                                {{hal}}
                        </span>
                    </h6>
                    <p v-if='text.promotion.cardPromotionTag'><img src="../../../common/img/ka.png" alt="">{{text.promotion.cardPromotionTag}}</p>
                    <p>近期场次：{{text.showTimes}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Data from "data/moviedetail.js"
export default {
    name:'moviedetail',
    data(){
        return {
           datas:{},
           movList:[{day:'',detail:[{}],movieId:''}],
           index:0,
           sel:0
        }
    },
    methods:{
        go(index){
            this.index = index
            this.sel = index
        },
        back(){
            this.$router.back()
        },
        normalData(Data){
            let arr = []
            for( var i = 0 ; i < Data.length ; i++ ){
                arr.push({
                    day:(new Date(Data[i].day).getMonth()+1)+'月'+(new Date(Data[i].day).getDate())+'日',
                    detail:[{cinemas:Data[i].cinemas}],
                    movieId:Data[i].movieId
                })
            }
            console.log(arr); 
            this.movList = arr   
       
        },
    },
    computed:{
        params(){
           // console.log(this.$route.params)
            return this.$route.params
        },
    },
    created(){
       if(!this.$route.params.nm){//params 没有的时候是个空对象
            return this.$router.replace('/movie/being')
        }
        //获取电影详情
        let url=`/xixi/ajax/detailmovie?movieId=${this.params.id}`
        this.$axios.get(url)
            .then((res)=>{
                let data = res.detailMovie
                // console.log(res)
                this.datas = data
            })
            .catch((err)=>{
                console.log(err)
            })
        //获取影院信息
        setTimeout(()=>{
          // console.log(Data)
            this.normalData(Data)
            //this.movList = Data.cinemas
            // this.date.push(
            //     (new Date(Data.day).getMonth()+1)+'月'+(new Date(Data.day).getDate())+'日'
            // )
        },500)
    
    }
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.movie-detail{
    background:#fff;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:9;
    overflow:scroll;
    height:100%;
    .mheader{
        .h(50);
        color: #fff;
        background: #e54847;
        border-bottom: 1px solid #e54847;
        display:flex;
        .sign{
            display:block;
            .h(50);
            .w(50);
            font-size:@font-size-m;
            .l_h(50);
            text-align:center;
        }
        p{
            text-align:center;
            font-size:@font-size-l;
            .l_h(50);
            flex:1;
            .padding(0,30,0,0);
        }
    }
    .movie-bg{
        position:absolute;
        .top(50);
        .h(188);
        width:100%;
        z-index:-10;
        background-color: #333;
        img{
            width:100%;
            .h(170);
            opacity:.55;
            filter:blur(20px);      
            }
    }
    .m-link{
        .h(150);
        .padding(19,30,19,15);
        display:flex;
        position:relative;
        .jt{
            display:block;
            .w(10);
            .h(15);
            background:url('../../../common/img/jt.png');
            position:absolute;
            top:50%;
            right:10%;
            background-size: contain;
            background-repeat: no-repeat;
        }
        img{
            .h(150);
            .w(110);
        }
        .link-right{
            .margin(0,0,0,13);
            color:#fff;
            p{
                margin-top: 6px;
                font-size: 12px;
                opacity: .8;
            }
            h4{
                font-size: 20px;
                font-weight: 700;
            }
            .enm{
                font-size: 12px;
                opacity: .8;
            }
            .imax{
                img{
                    .w(42);
                    .h(13)
                }
            }
            .ping{
                
               .sc{
                   font-size: 18px;
                    font-weight: 700;
                    color: #fc0;
               } 
               .snum{
                        font-size: 12px;
                        opacity: .8;
               }
            }
        }
   
    }
    .addr-link{
        .day{
            
            font-size: 14px;
            text-align: center;
            display: inline-block;
            width:100%;
            line-height: 43px;
            margin-left: 4.5px;
            display:flex;
            .red{
               border-bottom: 2px solid #f03d37;
            color: #f03d37; 
            }
            li{
                .w(115);
            }
        }
        .addrDetail{
            font-size:0px;
            li{
                padding: 13px 15px 13px 0;
                margin-left: 15px;
                background-color: #fff;
                position: relative;
                overflow: hidden;
                font-family: PingFangSC-Regular,Hiragino Sans GB,sans-serif;
                border-bottom:1px solid #efefef;
                h4{
                    line-height: 23px;
                    font-size: 16px;
                    color: #000;
                    span{
                        color: #f03d37;
                        font-size:11px;
                        i{
                            font-style:normal;
                            font-size:16px;
                        }
                    }
                }
                h5{
                    font-size: 11px;
                    color: #666;
                    display:flex;
                    em{
                        display:inline-block;
                        .w(290);
                        font-style:normal;
                        text-overflow:ellipsis;
                        overflow:hidden;
                        white-space:nowrap;
                    }
                    span{
                        .margin(0,18,0,0);
                    }
                }
                h6{
                    span{
                    display: inline-block;
                    padding: 0 3px;
                    height: 15px;
                    line-height: 15px;
                    border-radius: 2px;
                    font-size: 10px;
                    color: #f90;
                    border: 1px solid #f90;
                    .margin(2,0,2,0);
                    }
                    .hal{
                       .margin(0,3,0,3); 
                    }
                    .blue{
                        color: #589daf;
                        border: 1px solid #589daf
                    }
                    
                }
                p{
                    color: #999;
                    font-size:11px;
                    .padding(3,0,3,0);
                    img{
                        .w(15);
                        .h(14);
                        .margin(2,4,0,0);
                        float:left;
                    }
                }
            }
        }
    }

}
</style>


