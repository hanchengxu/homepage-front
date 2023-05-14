<template>
    <div class="greetings">
      <h2 class="green">{{ msg }}</h2>
      <h3>
          当前时间: {{newTime}}
      </h3>
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
          newTime: ""
      }
      },
      mounted(){
          this.getNowTime();//进入页面调用该方法获取当前时间
          clearInterval(myTimeDisplay );//销毁之前定时器
          var myTimeDisplay = setInterval(() => {
             this.getNowTime(); //每秒更新一次时间
          }, 1000);    
  },
    methods: {
          getNowTime() {
              var date = new Date();
              var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
              this.newTime = time;
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
  h3 {
    font-size: 1.0rem;
  }
  
  @media (min-width: 1024px) {
    .greetings h2,
    .greetings h3 {
      text-align: left;
    }
  }
  h2 ,h3{ 
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  </style>
  