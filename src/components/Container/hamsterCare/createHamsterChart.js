import * as echarts from 'echarts';
import lo from 'lodash';
import axios from 'axios';
import {onMounted} from 'vue';

export default function createHamsterChart(props){

    //组件mounted后
    onMounted(() => {
        String.prototype.endWith=function(str){
            var reg=new RegExp(str+"$");
            return reg.test(this);
        }

        let lapCountByDay = echarts.init(document.getElementById(props.dayChartId));//每日运动折线图
        let lapCountByTime = echarts.init(document.getElementById(props.hourChartId));//24小时平均运动量图
        //每日运动折线图 初始化参数
        let lapCountByDayOption1 = {
            color: ["#2ec7c9"],
            grid:{ left:'13%',right:'5%'},
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 96,
                    end: 100,
                    brushSelect:false,
                    zoomLock:false
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 96,
                    end: 100,
                    zoomLock:true
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
                data: ["","",""],
                axisLabel: {
                    textStyle : {
                        fontSize:12
                    },
                    formatter: function(value){
                        if (value.endWith("01") || value.endWith("5")|| value.endWith("10") 
                            || value.endWith("15") || value.endWith("20")|| value.endWith("25")|| value.endWith("30"))
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

        //copy一份上面的配置，直接修改参数用于 24小时平均运动量图的显示
        let lapCountByTimeOption = lo.cloneDeep(lapCountByDayOption1);
        delete lapCountByTimeOption.dataZoom;
        lapCountByTimeOption.series[0].lineStyle.normal.width=2;
        lapCountByTimeOption.series[0].smooth = true;
        lapCountByTimeOption.series[0].itemStyle.normal.label.show= false;
        lapCountByTimeOption.series[0].markPoint = {data:[{type:'max',name :'max'}]};
        lapCountByTimeOption.series[0].markLine = {data:[{type:'average',name :'average'}]};
        lapCountByTimeOption.series[0].showSymbol= false;
        lapCountByTimeOption.series[0].markArea = {
            silent:true,
            label:{fontSize:14,offset:[0,-23]},
            data: [[{name: '🌞 Daytime',xAxis: '06',itemStyle: {color: 'rgba(223, 175, 53, 0)'}}, {xAxis: '19'}],
                    [{name: '🌙 Nighttime',xAxis: '00',itemStyle: {
                        color: { type: 'linear',x:0.5,colorStops: [{offset: 0, color: 'DarkGray'},{offset: 1, color: 'rgba(255, 255, 255, 0)'}],}
                    },}, {xAxis: '08'}],
                    [{name: '🌙 Nighttime',xAxis: '15',itemStyle: {
                        color: { type: 'linear',x:0.1,colorStops: [{offset: 0, color: 'rgba(255, 255, 255, 0)'},{offset: 1, color: 'DarkGray'}],}
                    },}, {xAxis: '23'}]]
        }
        lapCountByTimeOption.grid.left = '12%';
        lapCountByTimeOption.grid.right = '10%';
        delete lapCountByTimeOption.xAxis.axisLabel.formatter;
        lapCountByTimeOption.tooltip= {
                trigger: 'axis',
                animation: true,
                formatter:function(params){
                    var result = '';
                    params.forEach(function (item) {
                        result += item.marker + item.axisValue+'時<br><b>&nbsp&nbsp&nbsp'+item.value+'圈</b>';
                    });
                    return result;
                }
            }
        lapCountByTime.setOption(lapCountByTimeOption);
        lapCountByTime.showLoading();
        
        //请求后台数据
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
        
        axios.get('https://hanchengxu.com/hamster/getScatterByHour')
            .then(function (response) {
                lapCountByTimeOption.xAxis.data = response.data.xAxis;
                lapCountByTimeOption.series[0].data = response.data.series;
                lapCountByTime.setOption(lapCountByTimeOption);
                lapCountByTime.hideLoading();
            })
            .catch(function (error) {
                console.log(error);
                lapCountByTime.hideLoading();
            });

        //画面size变更再刷新图表
        window.onresize = function () {
            lapCountByDay.resize();
            lapCountByTime.resize();
        };
    });
}