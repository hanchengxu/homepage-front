<template>
    <div class="menuCalendar">
        <MenuHeader :date="date" ref="MenuHeader" :dateOperatetion="dateOperatetion"></MenuHeader>
        <MenuContent  ref="MenuContent" :show="show" :dayList = "dayList" 
        :weeks = "weeks" :date="date" :countDay = "countDay"></MenuContent>
        <MenuFooter></MenuFooter>
     </div>
</template>
<script>
import MenuHeader from './MenuHeader.vue'
import MenuContent from './MenuContent.vue'
import MenuFooter from './MenuFooter.vue'
//import emitter from '@/eventBus.js';
import { formatTime } from '@/utils.js';
import { ref } from 'vue';
import dayjs from 'dayjs';
export default {
    name: 'MainMenuNew',
    components:{
        MenuHeader,
        MenuContent,
        MenuFooter
    },
    setup() {
        // 切换日期选择
        const show = ref("date");
        // 第一天是周几
        const weeks = ref(0);
        // 年列表
        const yearList = ref([]);
        // 天列表
        const dayList = ref([]);
        const methodsList = ref([]);

        const date = ref([
            dayjs().year(),
            formatTime(dayjs().month() + 1),
            formatTime(dayjs().date())
        ]);

        // //vue3全局时间总线
        // emitter.on("sentDate",(val) => {
        // date.value = val.value
        // });
        return {
            show,
            weeks,
            yearList,
            dayList,
            date,
            methodsList
        };
  },
    mounted() {
    //     // 接收数据
    //   this.$bus.$on('eventDate', data => {
    //         console.log("data:::::::::::::::::::"+data)  // 传递的参数
    //     })
    //     //this.countDay();

    //设置当前日期
    // this.date.push(
    //     dayjs().year(),
    //     formatTime(dayjs().month() + 1),
    //     formatTime(dayjs().date())
    //     );
    this.countDay();
    },

    // data() {
    //     return {
    //         // 切换日期选择
    //         show: "date",
    //         // 第一天是周几
    //         weeks: 0,
    //          // 年列表
    //         yearList: [],
    //         // 天列表
    //         dayList: [],
    //     } 
    // },
    methods: {
        // 计算显示的天数据
        countDay() {
            console.log("chufa");
            let [y, m, d] = this.date;
            // 获取第一天是周几
            let week = new Date(`${y}/${m}/1`).getDay(),
                // 获取当前月的上个月多少天
                lastDays = this.getDays(y, m - 1),
                // 获取这个月有多少天
                days = this.getDays(y, m);
            // 计算这个月有多少周
            this.weeks = Math.ceil((days - (7 - week)) / 7) + 1;
            // 将当前月份的天数生成数组
            this.dayList = Array.from({ length: this.getDays(y, m) }, (v, k) => {
                return {
                day: formatTime(k + 1),
                month: m,
                year: y,
                };
            });
            // 将本月1日前的数据补齐
            for (let i = lastDays; i > lastDays - week; i--) {
                this.dayList.unshift({
                day: i,
                // 如果当前日期是1月补齐的是去年12月的数据
                month: +m - 1 === 0 ? 12 : formatTime(+m - 1),
                year: +m - 1 === 0 ? y - 1 : y,
                });
            }
            // 计算需要补齐多少天
            let length = this.weeks * 7 - this.dayList.length;
            console.log("length", week, lastDays, days, this.weeks);
            // 将本月最后一天的数据补齐
            for (let i = 1; i <= length; i++) {
                this.dayList.push({
                day: i,
                // 如果当前日期是12月补齐的是明年年1月的数据
                month: +m + 1 > 12 ? 1 : formatTime(+m + 1),
                year: +m + 1 > 12 ? y + 1 : y,
                });
            }
        
            console.log(this.dayList);
        },
        // 获取某个月有多少天
        getDays(year, month) {
            // 一年中每个月的天数
            let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // 判断是不是闰年 2月29天
            if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
                days[1] = 29;
            }
            return days[month - 1];
        },
        checkDay() {
            // 获取选择的年月有多少天 防止这年不是闰年 就将日期跳转到28号,或者有的月份没有31号就跳到30号
            let num = this.getDays(this.date[0], this.date[1]);
            if (num < this.date[2]) {
                this.date.splice(2, 1, num);
            }
        },
        // 年份选择切换
        changeYear(type) {
            // 清空每页显示的年份数据
            this.yearList.length = 0;
            if (type === "right") {
                // 计算页面显示的年份数据 每页显示12条数据
                for (let i = this.move.lNum + 1; i < this.move.lNum + 13; i++) {
                this.yearList.push(i);
                }
            } else {
                for (let i = this.move.fNum - 12; i < this.move.fNum; i++) {
                this.yearList.push(i);
                }
            }
        },
        // 左右按钮点击事件
        dateOperatetion(type) {
            let [y, m, d] = this.date;
            // 如果是向后翻
            if (type === "up") {
                // 日期向后翻 切换月份
                if (this.show === "date") {
                if (+m === 12) {
                    this.date.splice(0, 1, y + 1);
                    this.date.splice(1, 1, "01");
                } else {
                    this.date.splice(1, 1, formatTime(+m + 1));
                }
                // 月份向后翻 切换年份
                } else if (this.show === "month") {
                this.date.splice(0, 1, y + 1);
                // 年份向后翻 重组数据
                } else {
                this.changeYear("right");
                }
        
                // 如果是前后翻
            } else {
                // 日期向前翻 切换月份
                if (this.show === "date") {
                if (+m === 1) {
                    this.date.splice(0, 1, y - 1);
                    this.date.splice(1, 1, 12);
                } else {
                    this.date.splice(1, 1, formatTime(+m - 1));
                }
                // 月份向前翻 切换年份
                } else if (this.show === "month") {
                this.date.splice(0, 1, y - 1);
                // 年份向前翻 重组数据
                } else {
                this.changeYear("left");
                }
            }

            this.countDay();
            this.checkDay();
        }

    },
}
</script>
<style scoped>
.menuCalendar {
    margin: 0 auto;
    margin-top: 30px;
    max-width: 500px;
    background-image: url("../../../assets/imgs/dundun.jpg");
    background-size: cover;
    opacity: 0.8;
  }
</style>