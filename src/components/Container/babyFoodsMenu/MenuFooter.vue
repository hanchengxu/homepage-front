<template>
    <!-- 底部操作栏 -->
    <div class="date-bottom">
        <div class="b-left">    
            <div class="m-report" @click="changeWeekReport">看周报</div>
        </div>
        <div class="b-right">
            <div class="m-report" @click="changeMonthReport">看月报</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MenuFooter',
    // data() {
    //     return {
    //   }
    // },
    methods: {
        // cancel() {
        //     console.log("cancel");
        // },
        changeWeekReport() {
            console.log("changeWeekReport");
        },
        changeMonthReport() {
            console.log("changeMonthReport");
        },
    }
}
</script>
<style lang="scss" scoped>
 .date-bottom {
    width: calc(100% - 80px);
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px;
    margin: 0 auto;
    border-top: 1px solid #eee;
    .b-left,
    .b-right {
      display: flex;
      align-items: center;
    }
    // .b-left {
    //   .tab {
    //     width: 27px;
    //     height: 26px;
    //     background: #dcf4f3;
    //     border-radius: 13px;
    //   }
    //   .totip {
    //     font-size: 24px;
    //     font-weight: 400;
    //     color: #363636;
    //     margin-left: 20px;
    //   }
    // }
    .b-left,
    .b-right {
      .m-report {
        width: 195px;
        line-height: 70px;
        color: #fff;
        font-size: 26px;
        background: linear-gradient(196deg, #50dcdc, #18b6b7);
        border-radius: 20px;
        margin-left: 10px;
        text-align: center;
      }
    }
  }
</style>