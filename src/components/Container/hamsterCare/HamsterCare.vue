<template>
    <div class="container-fluid hcare-container" style="min-height: 1300px;">
        <div class="row-top row d-flex justify-content-center mb-4" style="padding-top:180px">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <h1>HamsterCare🐹</h1>
                <h1 class="title-one">{{ $t("hamsterCare.pageOne.tilteOne") }}</h1>
                <p class="pt-1" style="max-width:500px">{{ $t("hamsterCare.pageOne.titleTwo") }}</p>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/hamster-wheel.png" width="300">
            </div>
        </div>
        <div class="row d-flex justify-content-center" style="margin-top:100px">
            <div :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-6', 'col-xxl-5', 'mx-4', showDayChart?'anima-chart-left':'anima-chart-hidden']" 
                >
                <div :id="dayChartId" style="width: 100%;" class="shadow rounded-3 dayChart"></div>
            </div>
            <LazyShow transName="topslip" :isOpen="showDayChart">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-3 mt-4">
                    <h3>{{ $t("hamsterCare.pageTwo.title") }}</h3>
                    <p class="pt-2">{{ $t("hamsterCare.pageTwo.p1") }}</p>
                    <p>{{ $t("hamsterCare.pageTwo.p2") }}</p>
                    <p v-html="$tc('hamsterCare.pageTwo.p3',{sys_name:'<strong> HamsterCare</strong>🐹'})"></p>
                </div>
            </LazyShow>
        </div>
        <div class="row d-flex justify-content-center" style="margin-top:150px;margin-bottom:50px">
            <LazyShow transName="topslip" :isOpen="showHourChart">
                <div class="col-sm-12 col-md-12 col-lg-12 col-xl-4 ms-xl-5 col-xxl-3 ms-xxl-5 mt-4">
                    <h3>{{ $t("hamsterCare.pageThree.title") }}</h3>
                    <p class="pt-2">{{ $t("hamsterCare.pageThree.p1") }}</p>
                    <p>{{ $t("hamsterCare.pageThree.p2") }}</p>
                    <p>{{ $t("hamsterCare.pageThree.p3") }}</p>
                </div>
            </LazyShow>
             <div :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-6', 'col-xxl-5', 'mx-4', showHourChart?'anima-chart-right':'anima-chart-hidden']">
                <div :id="hourChartId" style="width: 100%;" class="shadow rounded-3 dayChart"></div>
            </div>
        </div>
    </div>
</template>
<script>
import LazyShow from '@/components/Common/LazyShow.vue';
import showOnScreen  from '@/components/Common/showOnScreen';
import setChartOptions from './setChartOptions';
import { dayChartOption,hourChartOption } from '@/components/Common/echartOptions';
import * as echarts from 'echarts';
export default {
  components: { LazyShow },
    name: 'HamsterCare',
    props:{
        //echart首次加载显示，但在router路由回来后显示空白，经过查询，需要将chart的 id 换成动态id。
        dayChartId:{type:String,default(){return "dayChart"+Math.floor(Math.random()*100)},require:false},
        hourChartId:{type:String,default(){return "hourChart"+Math.floor(Math.random()*100)},require:false}
    },

    //setup期间，无法使用data和method
    //因为 setup 是围绕 beforeCreate 和 created 生命周期钩子运行的
    setup(props) {

        //为了给echart处理数据而预备的方法
        String.prototype.endWith=function(str){
            var reg=new RegExp(str+"$");
            return reg.test(this);
        }
        

        //判断元素是否出现在可视区域
        const showDayChart = showOnScreen(props.dayChartId);
        const showHourChart = showOnScreen(props.hourChartId);
        

        setChartOptions(props.dayChartId,showDayChart,dayChartOption);
        setChartOptions(props.hourChartId,showHourChart,hourChartOption);

         //画面size变更再刷新图表
        window.onresize = function () {
            let chart1 = echarts.getInstanceByDom(document.getElementById(props.dayChartId));
            chart1.resize();
            let chart2 = echarts.getInstanceByDom(document.getElementById(props.hourChartId));
            chart2.resize();
        };

        return{
            showDayChart,
            showHourChart
        }
       
    },
}
</script>
<style scoped>
.title-one{
    font-weight: 100;
}
.row-top{
    /* background-color: #3bb7c2; */
    background-image: linear-gradient(#3bb7c275, #3bb7c2d5);
    min-height: 600px;
    -webkit-clip-path: polygon(0 0,100% 0,100% calc(100% - 6vw),0 100%);
    clip-path: polygon(0 0,100% 0,100% calc(100% - 6vw),0 100%);
    color: white
}
.anima-chart-hidden{
    visibility: hidden;
}
.anima-chart-left{
    visibility:visible;
    animation: disp-left 1.5s ease-in-out;
}
.anima-chart-right{
    visibility:visible;
    animation: disp-right 1.5s ease-in-out;
}
@keyframes disp-left {
    from{
        transform: translateX(-100px);
        opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes disp-right {
    from{
        transform: translateX(100px);
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