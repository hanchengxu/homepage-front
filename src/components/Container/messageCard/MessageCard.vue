<template>
  <div class="container-fluid" style="min-height: 1000px">
    <div class="row row-top align-items-center justify-content-center">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-5">
        <div style="position: relative;min-height: 700px">
          <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/messageCard/p3.png" id="p3" />
          <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/messageCard/p1.png" id="p1" />
          <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/messageCard/p2.png" id="p2" />
          <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/messageCard/p4.png" id="p4" />
          <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/messageCard/p5.png" id="p5" />
          <div class="box3">
            <div class="border3">
              <div>{{ $t("messageCard.pageOne.s1") }}</div>
              <div>{{ $t("messageCard.pageOne.s2") }}</div>
              <div>{{ $t("messageCard.pageOne.s3") }}</div>
              <div>{{ $t("messageCard.pageOne.s4") }}</div>
              <div>{{ $t("messageCard.pageOne.s5") }}</div>
              <div></div>
              <div>{{ $t("messageCard.pageOne.s6") }}</div>
              <div>{{ $t("messageCard.pageOne.s7") }}</div>
              <div>{{ $t("messageCard.pageOne.s8") }}</div>
              <div>{{ $t("messageCard.pageOne.s9") }}</div>
              <div>{{ $t("messageCard.pageOne.s10") }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-5 ms-lg-5 col-xl-4 ms-xl-0 pb-4">
        <LazyShow time="100" transName="topslip">
          <div class="intro-div">
            <h2>MessageCard 📜</h2>
            <h5>{{ $t("messageCard.pageOne.title2") }}</h5>
            <p class="mt-4">{{ $t("messageCard.pageOne.p1") }}</p>
            <p>{{ $t("messageCard.pageOne.p2") }}</p>
            <p v-html="$tc('messageCard.pageOne.p3',{usb:'<strong> Micro USB</strong>⚡'})"></p>
          </div>
        </LazyShow>
      </div>
    </div>
     <LazyShow time="100" transName="topslip">
        <div class="row justify-content-center" style="margin-top:150px ;margin-bottom:100px">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-2 more-div">
                <h2>{{ $t("messageCard.pageTwo.title") }}👉</h2>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-2">
                <a class="nav-link p-2" href="https://github.com/hanchengxu/message-card" target="_blank">
                    <img src="https://raw.githubusercontent.com/hanchengxu/picture-host/master/messageCard/GitHub-logo.gif" />
                </a>
            </div>
        </div>
    </LazyShow>
  </div>
</template>
<script>
export default {
  name: "MessageCard",
  setup() {
  },
};
</script>
<style scoped>
.row-top {
  /* background-color: #7fac4f60; */
  background-image: linear-gradient(#7fac4f33, #7fac4f81);
  /* min-height: 700px; */
  -webkit-clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));
  color: black;
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
.more-div{
  margin-top: 100px ;
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

  font-size: 8px !important;
  color: rgb(255, 255, 255);
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

@media screen and (max-width: 900px) {
  .intro-div {
    margin-top: -100px !important;
  }
  #p1 {
    position: absolute;
    bottom: 108px;
    left: -20px;
    animation: p1 1s ease-in-out;
  }
  #p2 {
    position: absolute;
    bottom: 200px;
    left:118px;
    animation: p2 1.2s ease-in-out;
  }
  #p3 {
    position: absolute;
    bottom: 198px;
    left: -100px;
    animation: p3 1s ease-in-out;
  }
  #p4 {
    position: absolute;
    bottom: 295px;
    left: -85px;
    animation: p4 1.7s ease-in-out;
  }
  #p5 {
    position: absolute;
    bottom: 293px;
    left: 90px;
    animation: p4 1.4s ease-in-out;
  }
  .box3 {
    position: absolute;
    bottom: 265px;
    left: 185px;
    width: 104px;
    height: 35px;
    overflow: hidden;
    /* border:1px solid rgb(204, 22, 22); */

    font-size: 5px;
    color: rgb(255, 255, 255);
    letter-spacing: 2px;
    animation: box-a 3s ease-in-out;
    transform: skew(60deg, -30deg);
  }
  .more-div{
      margin-top: 50px;
  }
}
</style>