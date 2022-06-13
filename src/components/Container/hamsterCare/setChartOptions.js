import * as echarts from 'echarts';
import axios from 'axios';
import { onMounted, watch, ref, reactive} from 'vue';
import { isNull } from '@/utils.js';
import moment from 'moment';
/**
 * 
 * @param {String} chartDomId 图表真实dom ID
 * @param {boolean} showChart 是否出现在浏览器可视区域
 * @param {object} chartOption 图标表设定option
 */
export default function setChartOptions(chartDomId, showChart, chartOption) {


    let chart = null;
    let chartData = {};
    //近日 运动增量柱状图,由于保存了近几日数据，需要返回给组件存储以供选择。
    let hourChartDatas = reactive({});
    let selectedHourChartDate = ref(moment(new Date()).format('yyyy-MM-DD'));

    //dayChart 显示一周范围的数据
    let dayChartStartDate = moment().subtract(1, "weeks").format("yyyy-MM-DD");

    //mounted call API 第一次加载请求后台数据
    onMounted(() => {

        chart = echarts.init(document.getElementById(chartDomId));
        chart.showLoading();

        let api = '';

        if (chartDomId.startsWith('dayChart')) {
            api = process.env.VUE_APP_API_HOST + '/hamster/getLapCountByDay/1';
            //不同chart 的个别option设定:
            chartOption.dataZoom[0].startValue = dayChartStartDate;
        }
        if (chartDomId.startsWith('hourAvgChart')) {
            api = process.env.VUE_APP_API_HOST + '/hamster/getHourAvgChart/1';
        }
        if (chartDomId.startsWith('hourChart')) {
            api = process.env.VUE_APP_API_HOST + '/hamster/getHourChart/1';
        }

        axios.get(api)
            .then(function (response) {
                //如果加载后就在可视区域，立即显示chart
                if (chartDomId.startsWith('hourChart')) {
                    //针对柱状图的特殊处理
                    if(!isNull(response.data)){
                        chartData.series = JSON.parse(response.data["2022-06-13"]).series;
                        chartData.xAxis = JSON.parse(response.data["2022-06-13"]).xAxis;
                        hourChartDatas.value = response.data;
                    }
                    if (showChart) {
                        let optionTemp = {
                            series: [{ data: chartData.series }],
                            xAxis: { data: chartData.xAxis },
                        }
                        chart.setOption(chartOption);
                        chart.setOption(optionTemp);
                        chart.hideLoading();
                    }
                }else {
                    if (showChart) {
                        let optionTemp = {
                            series: [{ data: response.data.series }],
                            xAxis: { data: response.data.xAxis },
                        }
                        chart.setOption(chartOption);
                        chart.setOption(optionTemp);
                        chart.hideLoading();
                    }
                    chartData = response.data;
                }

            })
            .catch(function (error) {
                console.log(error);
                chart.hideLoading();
            });

    });

    watch(showChart, () => {
        //dom出现在可视区域
        if (showChart && !isNull(chartData)) {

            //判断是否已经存在图表对象，如果有 则clear再次渲染
            chart = echarts.getInstanceByDom(document.getElementById(chartDomId));

            if (!isNull(chart)) {
                chart.clear();
            } else {
                chart = echarts.init(document.getElementById(chartDomId));
            }

            //存在API数据的话，更新图表
            if (!isNull(chartData)) {
                let optionTemp = {
                    series: [{ data: chartData.series }],
                    xAxis: { data: chartData.xAxis }
                }
                chart.setOption(chartOption);
                chart.setOption(optionTemp);
            }

        }

    });

    //针对页面选择的日期，切换运动增量柱状图数据
    watch(selectedHourChartDate,()=>{
        if (showChart && !isNull(chartData)) {
            
            //从datas取出目标日期的数据
            chartData.series = JSON.parse(hourChartDatas.value[selectedHourChartDate.value]).series;
            chartData.xAxis = JSON.parse(hourChartDatas.value[selectedHourChartDate.value]).xAxis;

            //判断是否已经存在图表对象，如果有 则clear再次渲染
            chart = echarts.getInstanceByDom(document.getElementById(chartDomId));

            if (!isNull(chart)) {
                chart.clear();
            } else {
                chart = echarts.init(document.getElementById(chartDomId));
            }

            //存在API数据的话，更新图表
            if (!isNull(chartData)) {
                let optionTemp = {
                    series: [{ data: chartData.series }],
                    xAxis: { data: chartData.xAxis }
                }
                chart.setOption(chartOption);
                chart.setOption(optionTemp);
            }
        }
    })
    
    return {hourChartDatas,selectedHourChartDate};
}