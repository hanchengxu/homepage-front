<template>
  <div class="container-fluid ukulele-div" :style="{minHeight:(scollHeight-42)+'px'}">
    <LazyShow :time="500" transName="sideslip">
        <div>
            <viewer :images="images" >
                <div class="row-div d-flex flex-wrap align-content-center justify-content-center align-items-center" style="">
                    <div class="align-self-center" v-for="src in images" :key="src" >
                        <img :src="'https://raw.githubusercontent.com/hanchengxu/picture-host/master/ukulele/'+src" class="ukulele-img mx-3" style="cursor:pointer;" >
                    </div >
                </div>
            </viewer>
        </div>
    </LazyShow>
  </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
export default {
  name: "Ukulele",
  data() {
      return {
        images: [
          "chuchuwen1.jpg",
          "chuchuwen2.jpg",
          "qilixiang.jpg",
          "xiaoshouladashou.jpg",
          "xiaoshouladashou2.jpg",
          "reai105deni.png",
        ]
      };
    },
  setup() {
    const getScollHeight = () => {
      return window.innerHeight;
    };
    const scollHeight = ref(getScollHeight());
    const windowResize = () => {
      scollHeight.value = getScollHeight();
    };
    onMounted(() => {
      window.addEventListener("resize", windowResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", windowResize);
    });
    return {
      scollHeight,
    };
  },
};
</script>
<style scoped>
.row-div{
    padding-top:200px
}
.ukulele-div{
    background-color: #ffffff;
}
.ukulele-img{
    width:200px;
    max-height: 280px;
    border-radius: 5px;
    box-shadow: 10px 10px 10px #afafaf81;
    transition: all 0.3s ease-in-out;
    margin-bottom: 50px;
}
.ukulele-img:hover{
     transform: scale(1.1);
}
@media screen and (max-width: 1200px) {
  .constr-icon {
    height: 450px;
  }
}
@media screen and (max-width: 900px) {
  .constr-icon {
    height: 300px;
  }
}
</style>