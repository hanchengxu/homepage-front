import * as echarts from 'echarts';
import axios from 'axios';
import { onMounted, watch } from 'vue';
import { isNull } from '@/utils.js';
/**
 * 
 * @param {String} chartDomId 图表真实dom ID
 * @param {boolean} showChart 是否出现在浏览器可视区域
 * @param {object} chartOption 图标表设定option
 */
export default function setChartOptions(chartDomId, showChart, chartOption) {

    let chart = null;
    let chartData = {}
    //mounted call API 第一次加载请求后台数据
    onMounted(() => {

        chart = echarts.init(document.getElementById(chartDomId));
        chart.showLoading();

        let api = '';
        if (chartDomId.startsWith('dayChart')) {
            api = 'https://hanchengxu.com/hamster/getLapCountByDay';
        }
        if (chartDomId.startsWith('hourChart')) {
            api = 'https://hanchengxu.com/hamster/getScatterByHour';
        }

        axios.get(api)
            .then(function (response) {
                //如果加载后就在可视区域，立即显示chart
                if (showChart) {
                    let optionTemp = {
                        series: [{ data: response.data.series }],
                        xAxis: { data: response.data.xAxis }
                    }
                    chart.setOption(chartOption);
                    chart.setOption(optionTemp);
                    chart.hideLoading();
                }
                chartData = response.data;
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

}