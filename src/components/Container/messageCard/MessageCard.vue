<template>
  <div class="container-fluid" style="min-height: 1300px">
    <div class="row row-top align-items-center justify-content-center " >
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-4" >
            <div style="position: relative;min-height: 700px">
                <img src="../../../assets/imgs/messageCard/p3.png" id="p3" />
                <img src="../../../assets/imgs/messageCard/p1.png" id="p1" />
                <img src="../../../assets/imgs/messageCard/p2.png" id="p2" />
                <img src="../../../assets/imgs/messageCard/p4.png" id="p4" />
                <img src="../../../assets/imgs/messageCard/p5.png" id="p5" />
                <div class="box3">
                    <div class="border3">
                        <div>从前有座山</div>
                        <div>山上有座庙</div>
                        <div>庙里有个老和尚</div>
                        <div>在给小和尚讲故事</div>
                        <div>讲的什么故事呢？</div>
                        <div></div>
                        <div>从前有座山</div>
                        <div>山上有座庙</div>
                        <div>庙里有个老和尚</div>
                        <div>在给小和尚讲故事</div>
                        <div>讲的什么故事呢？</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 pb-4">
            <LazyShow time="100" transName="topslip">
            <div class="intro-div">
                <h2>MessageCard 📜</h2>
                <h5>基于Esp8266制作的超简易文本显示卡片</h5>
                <p class="mt-4">
                    两块面包板，一块0.96OLED屏幕(I2C),一片Esp8266,即可组装出这精美小巧的MessageCard。
                </p>
                <p>
                    将需要显示的文本同程序一起烧写进去，即可滚动循环显示文本内容。
                </p>
                <p>本体不包含电源模块，使用<b>Micro USB</b>即可供电。</p>
            </div>
            </LazyShow>
        </div>
    </div>
    <div class="row align-items-center justify-content-center" style="">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 intro-div">
            <h2>了解更多</h2>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageCard",
  setup() {},
};
</script>
<style scoped>

.row-top{
    background-color: #1b335f5d;
    /* min-height: 700px; */
    -webkit-clip-path: polygon(0 0,100% 0,100% calc(100% - 6vw),0 100%);
    clip-path: polygon(0 0,100% 0,100% 100%,0 calc(100% - 6vw));
    color: white
}

#p1 {
  position: absolute;
  bottom: 8px;
  left: 155px;
  animation: p1 1s ease-in-out;
}
#p2 {
  position: absolute;
  bottom: 100px;
  left: 290px;
  animation: p2 1.2s ease-in-out;
}
#p3 {
  position: absolute;
  bottom: 98px;
  left: 75px;
  animation: p3 1s ease-in-out;
}
#p4 {
  position: absolute;
  bottom: 195px;
  left: 85px;
  animation: p4 1.7s ease-in-out;
}
#p5 {
  position: absolute;
  bottom: 193px;
  left: 265px;
  animation: p4 1.4s ease-in-out;
}
@keyframes p4 {
  from {
    transform: translateY(-500px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes p2 {
  from {
    transform: translateY(-500px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes p3 {
  from {
    transform: translate(-400px, -400px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes p1 {
  from {
    transform: translate(400px, -400px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.intro-div {
  margin-top: 150px !important;
}
@media screen and (max-width: 900px) {
  .intro-div {
    margin-top: 50px !important;
  }
}

@-webkit-keyframes scrollText1 {
  0% {
    -webkit-transform: translateY(0px);
  }
  20% {
    -webkit-transform: translateY(-30px);
  }
  40% {
    -webkit-transform: translateY(-60px);
  }
  60% {
    -webkit-transform: translateY(-90px);
  }
  80% {
    -webkit-transform: translateY(-120px);
  }
  100% {
    -webkit-transform: translateY(-150px);
  }
}

@keyframes scrollText1 {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-30px);
  }
  40% {
    transform: translateY(-60px);
  }
  60% {
    transform: translateY(-90px);
  }
  80% {
    transform: translateY(-120px);
  }
  100% {
    transform: translateY(-150px);
  }
}

.box3 {
  position: absolute;
  bottom: 165px;
  left: 350px;
  width: 104px;
  height: 35px;
  overflow: hidden;
  /* border:1px solid rgb(204, 22, 22); */

  font-size: 10px;
  color: rgb(255, 255, 255);
  letter-spacing: 2px;
  animation: box-a 3s ease-in-out;
  transform: skew(60deg, -30deg);
}
@keyframes box-a {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.border3 {
  top: 0px;
  -webkit-animation: scrollText1 8s infinite cubic-bezier(1, 0, 0.5, 0);
  animation: scrollText1 8s infinite cubic-bezier(1, 0, 0.5, 0);
}

.border3 div {
  height: 14px;
  margin-left: 5px;
}

.border3:hover {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}
</style>