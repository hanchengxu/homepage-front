<template>
    <div class="container-fluid hcare-container" style="min-height: 1300px;">
        <div class="row-top row d-flex justify-content-center mb-4" style="padding-top:180px">
            <div class="col-sm-12 col-md-5 col-lg-4 me-lg-5 col-xl-4 me-xl-1">
                <h1>HamsterCare🐹</h1>
                <h1 class="title-one">{{ $t("hamsterCare.pageOne.tilteOne") }}</h1>
                <p class="pt-4" style="max-width:500px;line-height: 2rem;">{{ $t("hamsterCare.pageOne.titleTwo") }}</p>
            </div>          
            <div class="col-sm-12 col-md-6 col-lg-4 ms-lg-5 col-xl-3 ms-xl-1 d-flex justify-content-sm-center justify-content-center">
                <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/hamster-wheel.png" style="width:16rem;height:16rem">
            </div>
            <div class="col-12 d-flex justify-content-center align-items-center">
                <div class="mouse-icon"><span class="mouse-wheel"></span></div>
                <div class="ms-3 mouse-text">Scroll</div>
            </div>
        </div>
        <!-- 运动折线图 -->
        <div class="row d-flex justify-content-center" style="margin-top:150px;line-height: 1.8rem;">
            <div :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-6', 'col-xxl-5', 'mx-4', showDayChart?'anima-chart-left':'anima-chart-hidden']" 
                >
                <div :id="dayChartId" style="width: 100%;" class="shadow rounded-3 dayChart"></div>
            </div>
            <div id="dayChartDesc" :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-4', 'col-xxl-3', 'mt-4', showDayChartDesc?'anima-chart-right':'anima-chart-hidden']">
                <h3>{{ $t("hamsterCare.pageTwo.title") }}</h3>
                <p class="pt-2">{{ $t("hamsterCare.pageTwo.p1",{age: getAge,age_of_moon:getAgeOfMoon}) }}</p>
                <p>{{ $t("hamsterCare.pageTwo.p2") }}</p>
                <p v-html="$tc('hamsterCare.pageTwo.p3',{sys_name:'<strong> HamsterCare</strong>🐹'})"></p>
            </div>
        </div>
        <!-- 运动增量柱状图 -->
        <div class="row d-flex justify-content-center " style="margin-top:150px;line-height: 1.8rem;">
            <div id="hourChartDesc" :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-4', 'ms-xl-5', 'col-xxl-3', 'ms-xxl-5', 'mt-4',showHourChartDesc?'anima-chart-left':'anima-chart-hidden']" >
                <h3>{{ $t("hamsterCare.pageFour.title") }}</h3>
                <p class="pt-2">{{ $t("hamsterCare.pageFour.p1") }}</p>
                <p class="">{{ $t("hamsterCare.pageFour.p2") }}</p>
                <span v-for="hourChartDate in hourChartDates" :key="hourChartDate.index">
                    <button :class="['btn', 'hamster-btn', 'm-1',selectedHourChartDate==hourChartDate?'hamster-btn-focus':'']" @click="selectHourChartDate(hourChartDate)">{{ hourChartDate }}</button>
                </span>
            </div>
                <div :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-6', 'col-xxl-5', 'm-4', showHourChart?'anima-chart-right':'anima-chart-hidden']">
                <div :id="hourChartId" style="width: 100%;" class="shadow rounded-3 dayChart"></div>
            </div>
        </div>
        <!-- 平均运动折线图 -->
        <div class="row d-flex justify-content-center hour-chart-div" style="margin-top:150px;margin-bottom:50px;line-height: 1.8rem;">
            <div :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-6', 'col-xxl-5', 'mx-4', showHourAvgChart?'anima-chart-right':'anima-chart-hidden']">
                <div :id="hourAvgChartId" style="width: 100%;" class="shadow rounded-3 dayChart"></div>
            </div>
            <div id="hourAvgChartDesc" :class="['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-4', 'ms-xl-5', 'col-xxl-3', 'ms-xxl-5', 'mt-4',showHourAvgChartDesc?'anima-chart-left':'anima-chart-hidden']" >
                <h3>{{ $t("hamsterCare.pageThree.title") }}</h3>
                <p class="pt-2">{{ $t("hamsterCare.pageThree.p1") }}</p>
                <p>{{ $t("hamsterCare.pageThree.p2") }}</p>
                <p>{{ $t("hamsterCare.pageThree.p3") }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import showOnScreen  from '@/components/Common/showOnScreen';
import setChartOptions from './setChartOptions';
import { dayChartOption,hourChartOption,hourAvgChartOption } from '@/components/Common/echartOptions';
import * as echarts from 'echarts';
import moment from 'moment';

export default {
  components: { },
    name: 'HamsterCare',
    props:{
        //echart首次加载显示，但在router路由回来后显示空白，经过查询，需要将chart的 id 换成动态id。
        dayChartId:{type:String,default(){return "dayChart"+Math.floor(Math.random()*100)},require:false},
        hourChartId:{type:String,default(){return "hourChart"+Math.floor(Math.random()*100)},require:false},
        hourAvgChartId:{type:String,default(){return "hourAvgChart"+Math.floor(Math.random()*100)},require:false}
    },
    data(){
        return {
            birthDay:'2020-07-15',
            hourChartDates:[
               moment(new Date()).subtract(5,'days').format('yyyy-MM-DD'),
               moment(new Date()).subtract(4,'days').format('yyyy-MM-DD'),
               moment(new Date()).subtract(3,'days').format('yyyy-MM-DD'),
               moment(new Date()).subtract(2,'days').format('yyyy-MM-DD'),
               moment(new Date()).subtract(1,'days').format('yyyy-MM-DD'),
               moment(new Date()).format('yyyy-MM-DD')
            ]
        }
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
        const showHourAvgChart = showOnScreen(props.hourAvgChartId);

        const showDayChartDesc = showOnScreen('dayChartDesc');
        const showHourAvgChartDesc = showOnScreen('hourAvgChartDesc');

        //运动增量柱状图
        const showHourChart = showOnScreen(props.hourChartId);
        const showHourChartDesc = showOnScreen('hourChartDesc');
        

        setChartOptions(props.dayChartId,showDayChart,dayChartOption);
        setChartOptions(props.hourAvgChartId,showHourAvgChart,hourAvgChartOption);
        let {hourChartDatas,selectedHourChartDate}= setChartOptions(props.hourChartId,showHourChart,hourChartOption);

         //画面size变更再刷新图表
        window.onresize = function () {
            let chart1 = echarts.getInstanceByDom(document.getElementById(props.dayChartId));
            chart1.resize();
            let chart2 = echarts.getInstanceByDom(document.getElementById(props.hourAvgChartId));
            chart2.resize();
            let chart3 = echarts.getInstanceByDom(document.getElementById(props.hourChartId));
            chart3.resize();
        };

        return{
            showDayChart,
            showHourAvgChart,
            showDayChartDesc,
            showHourAvgChartDesc,
            showHourChart,
            showHourChartDesc,
            hourChartDatas,
            selectedHourChartDate
        }
       
    },
    computed: {
        getAgeOfMoon(){
            return moment().diff(moment(this.birthDay,"yyyy-MM-DD"),'months');
        },
        getAge(){
            return moment().diff(moment(this.birthDay,"yyyy-MM-DD"),'years',true).toFixed(1);
        }
    },
    methods: {
        selectHourChartDate(targetDate){
            this.selectedHourChartDate = targetDate
        }
    }
}
</script>
<style scoped>
.title-one{
    font-weight: 100;
}
.row-top{
    /* background-color: #3bb7c2; */
    background-image: linear-gradient(#3bb7c275, #3bb7c2d5);
    min-height: 800px;
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
    background-color: white;
}

.hour-chart-div{
    padding-top: 200px;
    padding-bottom: 50px;
    background-image: linear-gradient(#0d7bc5, #11527e);
    clip-path: polygon(0 6%, 100% 19%, 100% 100%, 0 100%);
    color:rgb(217, 237, 255);
}

.mouse-icon{
    border: 2px solid white;
    border-radius: 15px;
    height: 45px;
    position: relative;
    text-align: center;
    width: 25px;
    top:-50px;
    /* box-shadow: 10px 5px 15px rgb(139, 214, 214); */
}
.mouse-wheel{ 
    animation: 1.6s infinite x;
    background-color: white;
    border-radius: 50%;
    display: block;
    height: 6px;
    margin: 4px auto 0;
    position: relative;
    width: 4px;
}
.mouse-text{
    position: relative;
    top:-50px;
    font-weight: bold;
}
@keyframes x {
    0% {
        margin-top: 4px;
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        margin-top: 14px;
        opacity: 0;
    }
}
@media screen and (max-width: 900px) {
    .dayChart{
        height: 300px;
    }
}
@media screen and (max-width: 767px) {
 .mouse-icon{
        top:0px;
    }
    .mouse-text{
        top:0px;
    }
}
@media screen and (max-width: 500px) {
    .dayChart{
        height: 250px;
    }
    .mouse-icon{
        top:-10px;
    }
    .mouse-text{
        top:-10px;
    }
}

.hamster-btn{
    color: white;
    text-decoration:none;
    padding: 0.5rem 1rem 0.5rem 1rem;
    border: #3bb7c2d5;
    background: #34b8c4d5;
    border-radius: 5px;
    
}

.hamster-btn:hover{
    background: #23919bd5;
}
.hamster-btn-focus,
.hamster-btn:focus{
    box-shadow: 0 0 0 0.25rem #2eb2be63;
}

</style>