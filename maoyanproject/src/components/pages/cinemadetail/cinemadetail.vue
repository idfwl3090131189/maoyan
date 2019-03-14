<template>
<div class="cmdetail">
        <div class="hed">
            <p class="back" @click="back">返回</p>
            <p class="nm">{{params.nm}}</p>      
        </div>
        <div class="section">
            <div class="cinema-info">
                <div class="location-info">
                    <h3>{{params.nm}}</h3>
                    <p>{{params.addr}}</p>
                </div>
                <div class='location_icon'>
                    <img src="../../../common/img/location_icon.png" alt="">
                </div>
            </div>
                <div class="banner wrapper">
                    <!-- {{moviesList}} -->                 
                        <div class="content">
                            <div  @touchstart="handleChange(index,item.img)"
                                v-for="(item,index) in moviesList"
                                :key="index"
                                class="swipe-item"
                               >
                                <img :src="item.img" alt=""
                                 :class="index===num?'border':''"
                                >
                            </div>
                        </div>
                         <div class="banner_bg">
                            <img :src="src" alt="">
                        </div>                                         
                </div>
                <div class='movie-info'>
                        <h3 v-if="moviesList[num].sc!=='0.0'"><b>{{moviesList[num].nm}}</b><span>{{moviesList[num].sc}}<i>分</i></span></h3>
                        <h3 v-else><b>{{moviesList[num].nm}}</b><span>{{moviesList[num].wish}}<i>人想看</i></span></h3>
                        <p>{{moviesList[num].desc}}</p>
                </div>
                <div class="nav-wrap">
                    <div class="nav-tab"> 
                        <span v-for="(item,index)  in  shows"
                        :key="index"
                        @touchstart="getCineme(index)"
                        :class="cianmeIndex===index?'red':''"
                        >{{item.dateShow}}
                        </span> 
                    </div>  
                    <div class="nav-list">
                        <ul>
                            <li v-for="(item,index) in plist"
                            :key="index"
                            >
                            <div class="tm">
                                    <p class="start">{{item.tm}}</p>
                                    <p class="f5">{{timeSwitch(item.dt+" "+item.tm,dur)}}散场</p>
                            </div>
                            <div class="info-block">
                                <p>{{item.lang}}   {{item.tp}}</p>
                                <p class="f5 th">{{item.th}}</p>
                            </div>
                        <div class="price">
                            <p><span class="vipPrice">￥{{item.vipPrice?item.vipPrice:30}}</span>{{item.vipPriceName}}</p>
                            <p class='f5'>{{item.extraDesc}}</p>
                        </div>
                        <div>
                            <span class="buytick" @touchstart="buytick">购票</span>
                        </div>
                            </li>
                        </ul>
                    </div>
                </div>  
        </div>
        <!-- 影院套餐 -->
        <div class="tuan-list" v-if="tuanDealList.length">
            <h3>影院超值套餐</h3>
            <ul>
                <li v-for="(item,index) in tuanDealList"
                    :key="index"
                > 
                    <div>
                        <img :src="item.img" alt="">
                    </div>
                    <div class="item-info">
                        <p><span class="PersonNum">{{item.recommendPersonNum}}</span>{{item.title}}  </p>
                        <p class="curNumberDesc">{{item.curNumberDesc}}</p>
                        <p><span class="price">￥{{item.price}}</span><span class="buyButton" @touchstart="buytick">去购买</span></p>  
                    </div>
                </li>
            </ul>
        </div>
     
</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data(){
            return {
                moviesList:[{}],
                num:0,//获取点击电影的下标
                tuanDealList:[{}],
                cianmeIndex:0,
                src:'',
            }
        },   
    methods:{  
         //返回按钮
        back(){
            this.$router.back("/cinema")
        },  
         //获取电影所处的数组下标
        handleChange(index,img) {
            this.num=index;
            this.src=img;
            //console.log(index)
        },  
        //获取时间日期对应的数组下标
        getCineme(index){
           // console.log(index)
            this.cianmeIndex=index;
        },  
        //时间转换
        timeSwitch(oldtime,minutes){
            var date = new Date(oldtime);
            var time1 = date.getTime();
            var minutes=minutes*60*1000;
            var nowtime=time1+minutes;
            var date1 = new Date(nowtime);
            var h = date1.getHours();  
            var m = date1.getMinutes();
            h=h<10?"0"+h:h;
            m=m<10?"0"+m:m;
            return h+":"+m ; 
         },
         //购买按钮
         buytick(){
             this.$router.push("/my");
         },
        // 处理电影信息
        normalData(data){
            let lists = []
            for( var i = 0 ; i < data.length ; i++ ){
                let str = data[i].img
                let reg = /w.h/
                let img = str.replace(reg,'128.120')
                lists.push({
                  
                    desc:data[i].desc,
                    img:img,
                    dur:data[i].dur,
                    nm:data[i].nm,
                    sc:data[i].sc,
                    wish:data[i].wish,
                    movieId:data[i].id,
                    globalReleased:data[i].globalReleased,
                    shows:data[i].shows
                })
            }
            this.moviesList = lists 
           // console.log(this.moviesList) 
        },
        // 处理套餐信息
        tuanData(data){
            let lists = []
            for( var i = 0 ; i < data.length ; i++ ){
                let str = data[i].imageUrl
                let reg = /w.h/
                let img = str.replace(reg,'128.120')
                if(data[i].recommendPersonNum===2){
                    data[i].recommendPersonNum="双人"
                }else{
                    data[i].recommendPersonNum="单人"
                }
                lists.push({
                    cardTag:data[i].cardTag,
                    img:img,
                    price:data[i].price,
                    title:data[i].title,
                    curNumberDesc:data[i].curNumberDesc,
                    recommendPersonNum:data[i].recommendPersonNum,
                })
            }
            this.tuanDealList = lists   
        },
        
    },
    computed:{     
            params(){
                return this.$route.params;
            },
            shows(){
                return this.moviesList[this.num].shows?this.moviesList[this.num].shows:[{}];
            },
            plist(){
                return   this.shows[this.cianmeIndex].plist?this.shows[this.cianmeIndex].plist:[{}];
            },
            dur(){
                return  this.moviesList[this.num].dur;
            }
    },
    created() {
       // console.log(this.params)
        if(!this.$route.params.id){//params 没有的时候是个空对象
            return this.$router.replace('/cinema')
        }
        let url=`/hehe/ajax/cinemaDetail?cinemaId=${this.params.id}`
        this.$axios.get(url)
        .then((res)=>{
           // console.log(res) 
            //电影信息    
             this.normalData(res.showData.movies);
              //设置背景图片为默认项
            this.handleChange(0,this.moviesList[0].img);
             this.$nextTick(()=>{
                //banner的better-scroll
                let scrollBanner = new BScroll('.banner',{
                    scrollY:false,
                    scrollX: true,
                    click: true
                })          
             })           
             //套餐信息
             this.tuanData(res.dealList.dealList);          
             //arr.push(res.dealList.divideDealList) 
        })
        .catch((err)=>{
            console.log(err)
        })
        
    },

}
</script>
<style lang="less" scoped>
@import "~style/index.less";
    .cmdetail{
        .w(375);
        height:100%;
       background: #fff;
       position: fixed;
       top:0;
       bottom:0;
       left:0;
       right:0; 
       z-index: 10;
       overflow:scroll;
      .hed{
            .h(50);
            .w(375);
            .l_h(50);
            background: #e54847;
            color: #fff;
            font-size: @font-size-m;
            text-align: center;
            display: flex;
            .back{
                .w(30);
                 flex:0.2;
            }
            .nm{
                .padding(0,60,0,0)
            }
            p{
               flex:0.8;
               text-align: center;
            }
        }
        .section{
            .cinema-info{
                display: flex;
                .padding(15,15,15,15);
                    .location-info{
                        .padding(0,5,0,0);
                        border-right: 1px solid #ccc;
                        h3{
                                font-size: @font-size-l;
                                line-height: 24px;
                                font-weight: 700;
                                color: #333;
                        }
                        p{
                            .h(20);
                            .l_h(20);
                            color:#ccc;
                            font-size:@font-size-ms;
                            .margin(3,0,0,0);
                            .w(280);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow:ellipsis;
                        }       
                    }
                .location_icon{
                         img{
                            .w(19);
                            .h(22);
                            display:block;
                            .margin(5,0,0,25);
                         }
                    }
            }
            .banner{
                .h(135);
                .w(375);
                position: relative;
                overflow: hidden;               
                .content{
                    .h(135);
                    .w(1200);
                    display:flex;
                    // float: left; 
                    align-items :center;
                    justify-content: center;
                    div{
                        .margin(0,5,0,5);
                        img{
                        .w(65);
                        .h(95);
                        display: block;
                        }
                        .border{
                            border:3px solid #fff;
                            .w(74);
                            .h(109);
                        }
                    }                   
                }
                 .banner_bg{
                        position:absolute;
                        bottom:0;
                        top:15px;
                        z-index: -10;
                        .w(375);
                        height:100%;
                        img{
                            width: 100%;
                            height:100%;
                            filter:blur(30px);
                            
                        }
                 }
                
            }
            .movie-info{
                .padding(11,15,11,15);
                h3{
                    .h(24);
                    .l_h(24);
                    font-size: @font-size-l;
                    color: #333;
                    text-align:center;
                    b{
                        font-weight: bold;
                    }
                    span{
                            color: #ffb400;
                            font-size: 16px;
                            font-weight: bold;
                            i{
                                font-style: normal;
                                font-size:@font-size-s;
                            }
                    }
                }
                p{
                    margin-top: 4px;
                    .h(18);
                    .l_h(18);
                    font-size: @font-size-ms;
                    color: #999;
                    text-align:center;
                }
            }
        }
         .nav-wrap{
            .nav-tab{
                display: flex;
                justify-content: space-around;
                span{
                    font-size:@font-size-s;
                }
                .red{
                    color: #f03d37;
                }
                border:1px solid #f5f5f5;
                .padding(10,0,10,0);
            }
            .nav-list{
                ul{
                    .padding(0,0,0,15);
                    li{
                        .padding(17,30,17,0);
                        border-bottom:1px solid #f5f5f5;
                        list-style:none;
                        font-size:@font-size-ms;
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .tm{
                        .start{
                            font-size: @font-size-l;
                            color: #333;
                            white-space: nowrap
                        }
                        
                    }
                    .th{
                        .w(92);   
                    }
                    .f5{
                            .margin(5,0,0,0);
                            color: #999;
                            font-size: @font-size-s;
                            //white-space: nowrap;
                        }
                    .buytick{
                        display: block;
                        width: 100%;
                        .h(27);
                        .l_h(27);
                        font-size:@font-size-s;
                        background-color: #f03d37;
                        color: #fff;
                        border-radius: 4px;
                        text-align: center;
                        .padding(2,5,2,5);
                    }
                    .vipPrice{
                            color: #f03d37;
                            font-size:@font-size-m;
                    }
                    
                }
            }
         }
         .tuan-list{
             .padding(0,0,0,20);
             h3{
                line-height: 45px;
                height: 45px;
                font-size: 15px;
                color: #666;
                border-bottom:1px solid #f5f5f5;
             }
             ul{
                 li{
                     display: flex;
                    border-bottom:1px solid #f5f5f5;
                    .padding(10,0,10,0);
                    img{
                        .w(92);
                        .h(92);
                    }
                    .item-info{
                        .margin(0,0,0,10);
                        p{
                            .w(243);
                            font-size:@font-size-ms;
                            position: relative;
                            .PersonNum{
                                    display: inline-block;
                                    vertical-align: top;
                                    .margin(1,7,0,0);
                                    padding: 0 4px;
                                    font-size: 10px;
                                    line-height: 15px;
                                    height: 15px;
                                    background: #f90;
                                    border-radius: 2px;
                                    color: #fff;
                            }
                            .price{
                                    color: #f03d37;
                                    
                            }
                            .buyButton{
                                position: absolute;
                                right:0;
                                bottom: 0;
                                display: inline-block;
                                .padding(0,8,0,8);
                                .h(27);
                                .l_h(27);
                                font-size:@font-size-s;
                                border-radius: 3px;
                                color: #fff;
                                background-color: #f03d37;
                            }
                        }
                        .curNumberDesc{
                                color:#ccc;
                                text-align: right;
                                .padding(32,0,10,0);
                                font-size:@font-size-s;
                                display: block ;

                        }
                    }
                 }
             }
         }
    }
</style>


