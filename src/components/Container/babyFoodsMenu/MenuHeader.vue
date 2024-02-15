<template>
    <div class="date-top">
      <div class="left" @click="dateOperate('down')">
        <div></div>
      </div>
      <div class="time" @click="selectDate">{{ date.join("/") }}</div>
      <div class="right" @click="dateOperate('up')">
        <div></div>
      </div>
    </div>
</template>
<script>
//import { formatTime } from '@/utils.js';
//import emitter from '@/eventBus.js';
import { ref } from 'vue'
export default {
    name: 'MenuHeader',
    components:{
    },
    props: {
        date: Array,
        dateOperatetion: {
            type: Function,
            dafault: null
        }
    },
    setup() {
        // const date = ref([]);
        // const time = new Date();
        // date.value.push(
        //     time.getFullYear(),
        //     formatTime(time.getMonth() + 1),
        //     formatTime(time.getDate())
        // );
        // emitter.emit("sentDate", date);
        // 返回值会暴露给模板和其他的选项式 API 钩子
        // return {
        //     date
        // }
    },
    // data() {
    //     return {
    //         // 选择日期
    //         date: [],
    //     } 
    // },
    // mounted() {
    //     // let time = new Date();
    //     // this.date.push(
    //     //     time.getFullYear(),
    //     //     formatTime(time.getMonth() + 1),
    //     //     formatTime(time.getDate())
    //     // );
    //     // // 发送数据
    //     // this.$bus.$emit('eventDate', this.date);
    //     // //this.date = time;
    //     // console.log("show------------   " + this.show);
    //     //this.countDay();
    // },
    methods: {

        // // 顶部时间点击事件
        // selectDate() {
        //     let type = {
        //         month: "year",
        //         date: "month",
        //     };
        //     // 判断点击事件选择月份还是年份
        //     if (this.show !== "year") {
        //         this.show = type[this.show];
        //     }
        //     // 如果是月份就计算dateList数据
        //     if (this.show === "month") {
        //         // 清空每页显示的年份数据
        //         this.yearList.length = 0;
        //         // 计算页面显示的年份数据 每页显示12条数据
        //         for (let i = this.date[0] - 4; i <= this.date[0] + 7; i++) {
        //         this.yearList.push(i);
        //         }
        //     }
        // },

        //左右按钮点击事件
        dateOperate(type) {
            
            this.dateOperatetion(type);
        },
    },
    
}
</script>
<style>
  .date-top {
    /* border: blue solid 2px; */
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left,
    .right {
      width: 100px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        width: 20px;
        height: 20px;
        background-color: #0086b7;
      }
    }
    .left > div {
      clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
    }
 
    .right > div {
      clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
    }
 
    .time {
      font-size: 38px;
      font-weight: 500;
      color: #333333;
    }
  }
</style>