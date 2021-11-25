import { onMounted, onUnmounted, ref } from 'vue';
export default function showElementByScroll(props) {

    const showDayChart = ref(false);
    const showTimeChart = ref(false);

    //使用ref得到响应式对象
    const getScollHeight = () => { return window.innerHeight; }

    const scollHeight = ref(getScollHeight());

    const windowResize = () => {
        scollHeight.value = getScollHeight();
    };

    onMounted(() => {
        //注册事件
        window.addEventListener("resize", windowResize);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", windowResize);
    });

    window.onscroll = function () {

        let dayChart = document.getElementById(props.dayChartId);
        let dayChartHeight = dayChart.offsetTop - document.documentElement.scrollTop;
        // console.log(scollHeight.value + ':'+chartHeight);
        //元素出现在窗口中
        if (scollHeight.value >= dayChartHeight) {
            showDayChart.value = true;
        } else {
            showDayChart.value = false;
        }

        let timeChart = document.getElementById(props.timeChartId);
        let timeChartHeight = timeChart.offsetTop - document.documentElement.scrollTop;
        if (scollHeight.value >= timeChartHeight) {
            showTimeChart.value = true;
        } else {
            showTimeChart.value = false;
        }
    }

    return {
        showTimeChart,
        showDayChart
    }
}