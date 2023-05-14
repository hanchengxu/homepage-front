<template>
  <div class="greetings">
    <div class="green">{{ msg }}</div>
    <div>
        <span class="pe-1">{{ newTime }}</span>{{ nowWeek }}
    </div>
  </div>
</template>
<script>

export default {
  name: 'TitleWork',
  props: {
    msg: String
  },

  data() {
    return {
      newTime: '',
      nowWeek: ''
    }
  },
  mounted() {
    this.getNowTime();//进入页面调用该方法获取当前时间
    clearInterval(myTimeDisplay);//销毁之前定时器
    var myTimeDisplay = setInterval(() => {
      this.getNowTime(); //每秒更新一次时间
    }, 1000);
  },
  methods: {
    getNowTime() {
        let date = new Date();
        let wk = date.getDay();
        let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let week = weeks[wk];
        this.newTime = time;
        this.nowWeek = week;
    },
    //根据自己的需求，看要不要在时间不大于10的时候在前面补0，如果需要直接this.addZero(date.getMinutes()),其它与之相同，如果不需要删掉addZero（）方法即可。
    //小于10的拼接上0字符串
    addZero(s) {
      return s < 10 ? ('0' + s) : s;
    },
  },

}
</script>
<style scoped>
.greetings .green {
  text-align: left;
}
.greetings {
    font-size: 1rem;
  }
  .green {
    font-size: 1.4rem;
  }
/* 宽度小于500 的屏幕*/
@media screen and (max-width: 500px) {
  .greetings {
    font-size: 0.8rem;
  }
  .green {
    font-size: 1rem;
  }
}
</style>
  