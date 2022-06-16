import * as echarts from 'echarts';
import { onMounted, onUnmounted } from "vue";

//画面size变更再刷新图表
export default function resizeChart(chartDomIdList){
     
     const windowResize = () => {
        chartDomIdList.map((chartDomId)=>{
            let chart = echarts.getInstanceByDom(document.getElementById(chartDomId));
            chart.resize();
        });
    };

    onMounted(() => {
        window.addEventListener("resize", windowResize);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", windowResize);
    });
}