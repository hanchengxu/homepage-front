import * as echarts from 'echarts';

export const dayChartOption = {
    color: ["#2ec7c9"],
    grid:{ left:'8%',right:'5%'},
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 98,
            end: 100,
            brushSelect:true,
            zoomLock:false
        },
        {
            type: 'inside',
            realtime: true,
            start: 98,
            end: 100,
            zoomLock:true
        }
    ],
    tooltip: {
        trigger: 'axis',
        formatter:function(params){
            var result = '';
            params.forEach(function (item) {
                result += item.marker + item.axisValue+'<br><b>&nbsp&nbsp&nbsp'+item.value+' laps</b>';
            });
            return result;
        }
    },
    xAxis: {
        type: 'category',
        data: [],
        axisLabel: {
            textStyle : {
                fontSize:11
            },
            formatter: function(value){
                if (value.endWith("01") || value.endWith("5")|| value.endWith("10") 
                    || value.endWith("15") || value.endWith("18")|| value.endWith("20")|| value.endWith("25")|| value.endWith("30"))
                    return value;
                else 
                    return '';
            }
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {show: true,lineStyle:{type :'dashed'}},
        axisLabel: {formatter: (value)=>{ return value/10000 +'万'}}
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

export const hourChartOption = {
    color: ["#2ec7c9"],
    grid:{ left:'8%',right:'5%'},
    tooltip: {
        trigger: 'axis',
        animation: true,
        formatter:function(params){
            var result = '';
            params.forEach(function (item) {
                result += item.marker + item.axisValue+'時<br><b>&nbsp&nbsp&nbsp'+item.value+' laps</b>';
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
        splitLine: {show: true,lineStyle:{type :'dashed'}},
        axisLabel: {formatter: (value)=>{ return value/1000 +'千'}}
    },
    series: [{
        data: [],
        type: 'line',
        itemStyle : { normal: {label : {show: false}}},
        lineStyle: { normal: {width: 2}},
        markPoint: {data:[{type:'max',name :'max'}]},
        markLine: {data:[{type:'average',name :'average',label:{position:'middle',formatter: '平均値: {c}laps'}}]},
        showSymbol: false,
        markArea: {
            silent:true,
            label:{fontSize:14,offset:[0,-23]},
            data: [[{name: '🌞 Daytime',xAxis: '06',itemStyle: {color: 'rgba(223, 175, 53, 0)'}}, {xAxis: '19'}],
                    [{name: '🌙 Nighttime',xAxis: '00',itemStyle: {
                        color: { type: 'linear',x:0.5,colorStops: [{offset: 0, color: 'DarkGray'},{offset: 1, color: 'rgba(255, 255, 255, 0)'}],}
                    },}, {xAxis: '08'}],
                    [{name: '🌙 Nighttime',xAxis: '15',itemStyle: {
                        color: { type: 'linear',x:0.1,colorStops: [{offset: 0, color: 'rgba(255, 255, 255, 0)'},{offset: 1, color: 'DarkGray'}],}
                    },}, {xAxis: '23'}]]
        },
        smooth: true,
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