<template>
    <div>
        <div class="hed">
            影院
        </div>
        <div class="topbar">
            <div class="search-nav">
                <div class="position">
                    <span class="cityname">北京</span>
                    <i class="city-entry-arrow"></i>
                </div>
                <div class="ipt">                  
                        <img src="../../../common/img/search.png" alt="">
                        <span>搜影院</span>                                     
                </div>
            </div>
            <div class="add-nav">
                <p  class="item">全城<i class="drop"></i></p>
                <p  class="item">品牌<i class="drop"></i></p>
                <p  class="item special" >特色<i class="drop"></i></p>
            </div>
        </div>
        <div class="cinema wrapper">
            <ul class="content">
                <li v-for="(item,index) in cinemaList"
                :key="index"
                @click='getCinemaDetail(item)'
                >
                    <div class="nm">{{item.nm}}<span>{{item.sellPrice}}<b>元起</b></span></div>
                    <div class="addr"><p>{{item.addr}} </p><span>{{item.distance}}</span></div>
                    <div class="tag" v-if="item.tag.vipTag||item.tag.hallTypeVOList">
                        <span class='blue' v-if='item.tag.allowRefund'>退</span>
                        <span class='blue' v-if="item.tag.endorse">改签</span>
                        <span v-if="item.tag.snack">小吃</span>
                        <span v-if="item.tag.sell">折扣卡</span>
                        <span  v-show="item.tag.hallTypeVOList"
                        v-for='(ele,index) in item.tag.hallTypeVOList'
                        :key="index"
                        class="blue"
                        >{{ele.name}}</span>
                    </div>
                    <div class="discount-block"
                    v-if="item.promotion.cardPromotionTag"
                    >
                    <img src="../../../common/img/card.png" alt="">
                    <span>{{item.promotion.cardPromotionTag}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return {
            cinemaList:[],
        }
    },
    methods:{
        getCinemaDetail(item){
           // console.log(item)
            this.$router.push({name:"cinemadetail",params:item})
        }
    },
    created(){
        let url=`/hehe/ajax/cinemaList?day=2019-03-11&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1552273691186&cityId=1`
        this.$axios.get(url)
        .then((res)=>{
            this.cinemaList=res.cinemas;
           // console.log(res.cinemas)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    mounted(){
        let scroll = new BScroll('.cinema',{click:true}) 
    }
}
</script>
<style lang="less" scoped>
@import "~style/index.less";
.hed{
    .h(50);
    .w(375);
    .l_h(50);
    background: #e54847;
    color: #fff;
    font-size: @font-size-m;
    text-align: center;
    position:fixed;
    top:0;
    left:0;
}
.topbar{
    .h(84);
    .w(375);
    position:fixed;
    .top(50);
    .left(0);
    .search-nav{
        width:100%;
        .h(44);
        .l_h(44);
        background:#F5f5f5;
        font-size:@font-size-m;
        color:#777;
        display: flex;
        .position{
            .padding(0,0,0,15);
            i{
                margin-right: 5px;
                width: 0;
                height: 0;
                border: 4px solid #b0b0b0;
                border-left-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                display: inline-block;
                margin-left: 4px;
                margin-top: 5px;
            }
        }
        .ipt{
                .margin(10,0,0,10);         
                .w(280);
                .h(26);
                border-radius: 3px;
                border: 0;
                background: #fff;
                text-align: center;
                font-size:0;
                display:flex;
                justify-content: center;
                }
                span{
                        font-size: @font-size-ms;
                        color: #b2b2b2;
                        .h(26);
                        .l_h(26);
                }
                img{
                    .w(14);
                    .h(14);
                    .margin(6,4,0,4);
                }
        }
    }
    .add-nav{
        .h(40);
        width:100%;
        display:flex;
        //justify-content: space-around;
        font-size:@font-size-ms;
        border-bottom:1px solid #f5f5f5;
        p{
            flex:1;
            .h(20);
            .l_h(20);
            .margin(10,0,10,0);
            border-right:1px solid #f5f5f5;
            text-align:center;
            position:relative;
            .drop{
                width:0;
                height:0;
                display: inline-block;
                position: absolute;
                .top(8);
                width: 0;
                height: 0;
                .margin(0,0,0,4);
                border: 4px solid transparent;
                border-top-color: #b0b0b0;
            }
        }
        .special{
             border-right:0;
        }
    }

.cinema{
    position:fixed;
    .top(134);
    .bottom(21);
    .left(0);
    .right(0);
    overflow:hidden;
    ul{
        .padding(0,15,0,15);
        li{
            font-size:0;
            border-bottom:1px solid #f5f5f5;
            .padding(13,0,13,0);
            .nm{
                .h(30);
                font-size: @font-size-m;
                color:#000;
                span{                    
                    .margin(0,0,0,20);
                    color: #f03d37;
                    font-size: @font-size-l;
                    b{
                        font-weight: 100;
                        font-size:@font-size-ms;
                    }
                } 

            }
            .addr{
                    font-size: @font-size-ms;
                    color: #666;
                    display:flex;
                p{
                    .w(277);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                };
                span{

                };
            }
            .tag{
                .h(24);
                .l_h(24);
                span{
                        color: #f90;
                        border: 1px solid #f90;
                        font-size:@font-size-s;
                        .margin(5,5,5,0);
                        border-radius:3px;
                }
                .blue{
                    color: #589daf;
                    border: 1px solid #589daf;
                }
            }
            .discount-block{
                .h(18);
                .l_h(18);
                display:flex;
                img{
                    .w(14);
                    .h(14);
                    display: block;
                    .margin(3,3,0,0)
                }
                span{
                    color:#999;
                    font-size:@font-size-s;
                }
            }
        }
    } 
}
</style>