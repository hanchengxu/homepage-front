<template>
    <div class="container" :style="{minHeight:(scollHeight-42)+'px',marginTop:'100px'}">
        <LazyShow time="500" transName="topslip">
        <div class="row d-flex justify-content-center my-5 text-secondary px-3">
            <div class="col-10 mt-3 shadow rounded">
                <div class="row">
                    <div class="col text-center"><h2 class="fw-bold pt-4 pb-2">About me</h2></div>
                     <div class="col-12 mb-3 ps-5 pb-4">
                        👨‍💻 你好，我是Hanchengxu。一名从业7年的Web软件开发工程师。<br><br>
                        💡 作为一名代码爱好者，编程不仅仅是一份工作，更是我的业余爱好。<br><br>
                        🛠️ <span class="fs-5 fw-bold">技术栈</span><br>
                        <div class="tech-shields">
                            <img loading="lazy" src="https://img.shields.io/badge/-JavaScript-352e9b?style=flat&logo=javascript"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-React-352e9b?style=flat&logo=React"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Redux-352e9b?style=flat&logo=Redux"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Bootstrap-352e9b?style=flat&logo=Bootstrap"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Spring Boot-352e9b?style=flat&logo=Spring Boot"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Github-352e9b?style=flat&logo=Github"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-GitHub Actions-352e9b?style=flat&logo=GitHub Actions"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Git-352e9b?style=flat&logo=Git"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Linux-352e9b?style=flat&logo=Linux"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Alibaba Cloud-352e9b?style=flat&logo=Alibaba Cloud"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Arduino-352e9b?style=flat&logo=Arduino"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Jenkins-ededed?style=flat&logo=Jenkins"/>
                        </div><br>
                        🧐 <span class="fs-5 fw-bold">学习中</span><br>
                        <div class="tech-shields">
                            <img loading="lazy" src="https://img.shields.io/badge/-Vue-352e9b?style=flat&logo=Vue.js"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Three.js-352e9b?style=flat&logo=Three.js"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Espressif-352e9b?style=flat&logo=Espressif"/>
                        </div><br>
                        <i class="bi-github fs-5" role="img" aria-label="GitHub"></i> <span class="fs-5 fw-bold">Github</span><br>
                        <div class="mt-3 mb-2 text-center border rounded"><img width="800" src="https://raw.githubusercontent.com/hanchengxu/hanchengxu/main/profile-3d-contrib/profile-season-animate.svg"/></div>
                        <div class="mb-2 d-flex justify-content-start">
                            <img class="align-self-start me-4" src="https://github-readme-stats.vercel.app/api?username=hanchengxu&show_icons=true&locale=cn&layout=compact"/>
                            <img class="align-self-start " src="https://github-readme-stats.vercel.app/api/top-langs?username=hanchengxu&show_icons=true&locale=cn&layout=compact"/>
                        </div><br>
                        💬 <span class="fs-5 fw-bold">联系我</span><br>
                        <div class="pt-2">📧 邮箱: <a href="mailto:hanchengxu@hanchengxu.com" target="_blank">hanchengxu@hanchengxu.com</a></div>
                    </div>
                </div>
            </div>
           
        </div>
        </LazyShow>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
export default {
    name: 'Resume',
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
}
</script>
<style scoped>
@media screen and (max-width: 1200px) {
    .constr-icon{
        height: 450px;
    }
}
@media screen and (max-width: 900px) {
    .constr-icon{
        height: 300px;
    }
}
.tech-shields > img{
    margin-right: 0.5rem;
    height: 27px;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
}
</style>