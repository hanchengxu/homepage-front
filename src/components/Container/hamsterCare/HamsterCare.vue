<template>
    <div class="container-fluid hcare-container" style="min-height: 1300px;">
        <div class="row-top row d-flex justify-content-center mb-4" style="padding-top:180px">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <h1>HamsterCare🐹</h1>
                <h1 class="title-one">{{ $t("hamsterCare.pageOne.tilteOne") }}</h1>
                <p class="pt-1" style="max-width:500px">{{ $t("hamsterCare.pageOne.titleTwo") }}</p>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <img src="../../../assets/imgs/hamster-wheel.png" width="300">
            </div>
        </div>
        <div class="row d-flex justify-content-center mt-4">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-5 mx-4 anima-chart">
                <div :id="dayChartId" style="width: 100%;" class="shadow rounded dayChart"></div>
            </div>
            <LazyShow time="100" transName="topslip">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-3 mt-4">
                    <h3>{{ $t("hamsterCare.pageTwo.title") }}</h3>
                    <p>{{ $t("hamsterCare.pageTwo.p1") }}</p>
                    <p>{{ $t("hamsterCare.pageTwo.p2") }}</p>
                    <p v-html="$tc('hamsterCare.pageTwo.p3',{sys_name:'<strong> HamsterCare</strong>🐹'})"></p>
                </div>
            </LazyShow>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import axios from 'axios';
import {onMounted} from 'vue';
import LazyShow from '../../Common/LazyShow.vue';
export default {
  components: { LazyShow },
    name: 'HamsterCare',
    props:{
        //echart首次加载显示，但在router路由回来后显示空白，经过查询，需要将chart的 id 换成动态id。
        dayChartId:{type:String,default(){return "dayChart"+Math.floor(Math.random()*100)},require:false}
    },
    setup(props) {
        onMounted(() => {
            String.prototype.endWith=function(str){
                var reg=new RegExp(str+"$");
                return reg.test(this);
            }
            // console.log(props.dayChartId);
            let lapCountByDay = echarts.init(document.getElementById(props.dayChartId));
            let lapCountByDayOption1 = {
                color: ["#2ec7c9"],
                grid:{ left:'15%',right:'5%'},
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 96,
                        end: 100,
                        brushSelect:false,
                        zoomLock:true
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 96,
                        end: 100
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    formatter:function(params){
                        var result = '';
                        params.forEach(function (item) {
                            result += item.marker + item.axisValue+'<br><b>&nbsp&nbsp&nbsp'+item.value+'圈</b>';
                        });
                        return result;
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ["2021-03-28","2021-03-29","2021-03-30"],
                    axisLabel: {
                        textStyle : {
                            fontSize:12
                        },
                        formatter: function(value){
                            if (value.endWith("01") || value.endWith("10") || value.endWith("15") || value.endWith("20"))
                                return value;
                            else 
                                return '';
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: { formatter: '{value}圈'},
                    splitLine: {show: true,lineStyle:{type :'dashed'}}
                },
                series: [{
                    data: [100,200,300],
                    type: 'line',
                    itemStyle : { normal: {label : {show: true,fontSize:15}}},
                    lineStyle: {
                        normal: {width: 4}
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#2ec7c9'
                        }, {
                            offset: 1,
                            color: 'rgb(252, 250, 232)'
                        }])
                    }
                }]
            };
            lapCountByDay.setOption(lapCountByDayOption1);
            lapCountByDay.showLoading();
            axios.get('https://hanchengxu.com/hamster/getLapCountByDay')
                .then(function (response) {
                    lapCountByDayOption1.xAxis.data = response.data.xAxis;
                    lapCountByDayOption1.series[0].data = response.data.series;
                    lapCountByDay.setOption(lapCountByDayOption1);
                    lapCountByDay.hideLoading();
                })
                .catch(function (error) {
                    console.log(error);
                    lapCountByDay.hideLoading();
                });
            window.onresize = function () {
                lapCountByDay.resize();
            };
        });
    },
}
</script>
<style scoped>
.title-one{
    font-weight: 100;
}
.row-top{
    background-color: #3bb7c2;
    min-height: 600px;
    -webkit-clip-path: polygon(0 0,100% 0,100% calc(100% - 6vw),0 100%);
    clip-path: polygon(0 0,100% 0,100% calc(100% - 6vw),0 100%);
    color: white
}
.anima-chart{
    animation: disp 1s ease-in-out;
}
@keyframes disp {
    from{
        transform: translateX(-100px);
        opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
}
.dayChart{
    height: 400px;
}
@media screen and (max-width: 900px) {
    .dayChart{
        height: 300px;
    }
}
@media screen and (max-width: 500px) {
    .dayChart{
        height: 250px;
    }
}
</style>