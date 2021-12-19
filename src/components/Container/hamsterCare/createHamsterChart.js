
// import lo from 'lodash';
import * as echarts from 'echarts';
import axios from 'axios';
import {onMounted, reactive} from 'vue';

export default function createHamsterChart(chartDomId,showDayChart,url,chartOption){

    let chartData = {};
    chartData = reactive(chartData);

    let chart = null;

    //mounted call API 第一次加载请求后台数据
    onMounted(() => {

        chart = echarts.init(document.getElementById(chartDomId));
        chart.showLoading();

        axios.get(url)
            .then(function (response) {
                //如果加载后就在可视区域，立即显示chart
                if (showDayChart) {
                    let optionTemp = {
                        series: [{ data: response.data.series }],
                        xAxis: { data: response.data.xAxis }
                    }
                    chart.setOption(chartOption);
                    chart.setOption(optionTemp);
                    chart.hideLoading();
                }
                chartData.value = response.data;
            })
            .catch(function (error) {
                console.log(error);
                chart.hideLoading();
            });

        //画面size变更再刷新图表
        window.onresize = function () {
            chart.resize();
        };
    });


    return {chartData};
}