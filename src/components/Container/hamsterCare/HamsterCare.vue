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
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-5 mx-4">
                <div id="lapCountByDay" style="width: 100%;height:400px;" class="shadow rounded"></div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-3 mt-4">
                <h3>如您所见</h3>
                <p>折线图所展示的是我所饲养的一只年龄为15个月的罗布罗夫斯基雄性仓鼠的每日运动信息。</p>
                <p>作为一种夜行性动物🌒，仓鼠通常在深夜😴开启一天的生活。我们往往难以了解他们的夜间活动情况。</p>
                <p>通过<strong>HamsterCare</strong>🐹，可以轻松获取仓鼠夜间的运动信息，并通过这些信息来辅助判断仓鼠的健康状况。</p>
                
                
            </div>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import axios from 'axios';
import {onMounted} from 'vue';
export default {
    name: 'HamsterCare',
    setup() {
        onMounted(() => {
            String.prototype.endWith=function(str){
                var reg=new RegExp(str+"$");
                return reg.test(this);
            }
            let lapCountByDay = echarts.init(document.getElementById('lapCountByDay'));
            let lapCountByDayOption1 = {
                color: ["#2ec7c9"],
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 95,
                        end: 100
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 95,
                        end: 100
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    // formatter:'{b}&nbsp&nbsp<br><b>{c0}圈</b>',
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
                    data: [],
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
                    data: [],
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
</style>