<template>
    <div class="container" :style="{minHeight:(scollHeight-42)+'px',marginTop:'100px'}">
        <LazyShow time="500" transName="topslip">
        <div class="row d-flex justify-content-center my-5 text-secondary">
            <div class="col-sm-12 col-md-12 col-lg-10 col-xl-10 mt-3 shadow rounded">
                <div class="row">
                    <div class="col text-center"><h2 class="fw-bold pt-4 pb-4">About me</h2></div>
                    <div class="col-12 mb-3 px-5 pb-4">
                        <p>👨‍💻 {{ $t("resume.introduce.in1") }}</p>
                        <p>💡 {{ $t("resume.introduce.in2") }}</p>
                        <p>🔨 {{ $t("resume.introduce.in3") }}</p>
                        <p>🐹 {{ $t("resume.introduce.in4") }}👉<a href="http://localhost:8033/#/hCare" target="_blank">HamsterCare</a></p>
                        <br>
                        💬 <span class="fs-5 fw-bold">{{ $t("resume.language")}}</span><br>
                        <div class="tech-shields">
                            <a href="https://cet.neea.edu.cn/html1/folder/1608/1178-1.htm" target="_blank">
                                <img loading="lazy" src="https://img.shields.io/badge/CET-4-green?'style'=flat"/>
                            </a>
                            <a href="https://www.jlpt.jp/about/levelsummary.html" target="_blank">
                                <img loading="lazy" src="https://img.shields.io/badge/JLPT-N1-green?'style'=flat"/>
                            </a>
                        </div><br><br>

                        🛠️ <span class="fs-5 fw-bold">{{ $t("resume.techStack")}}</span><br>
                        <div class="tech-shields">
                            <img loading="lazy" src="https://img.shields.io/badge/-JavaScript-352e9b?'style'=flat&logo=javascript"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-React-352e9b?'style'=flat&logo=React"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Redux-352e9b?'style'=flat&logo=Redux"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Bootstrap-352e9b?'style'=flat&logo=Bootstrap"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Spring Boot-352e9b?'style'=flat&logo=Spring Boot"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Github-352e9b?'style'=flat&logo=Github"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-GitHub Actions-352e9b?'style'=flat&logo=GitHub Actions"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Git-352e9b?'style'=flat&logo=Git"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Linux-352e9b?'style'=flat&logo=Linux"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Alibaba Cloud-352e9b?'style'=flat&logo=Alibaba Cloud"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Arduino-352e9b?'style'=flat&logo=Arduino"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Jenkins-ededed?'style'=flat&logo=Jenkins"/>
                        </div><br><br>

                        🧐 <span class="fs-5 fw-bold">{{ $t("resume.learnling")}}</span><br>
                        <div class="tech-shields">
                            <img loading="lazy" src="https://img.shields.io/badge/-Vue-352e9b?'style'=flat&logo=Vue.js"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Three.js-352e9b?'style'=flat&logo=Three.js"/>
                            <img loading="lazy" src="https://img.shields.io/badge/-Espressif-352e9b?'style'=flat&logo=Espressif"/>
                        </div><br>

                        <i class="bi-github fs-5" role="img" aria-label="GitHub"></i> <span class="fs-5 fw-bold">Github</span><br>
                        <div class="row github-msg pe-4 ps-2">
                            <div class="col-12 border rounded">
                                <img class="github-msg-child" 
                                src="https://raw.githubusercontent.com/hanchengxu/hanchengxu/main/profile-3d-contrib/profile-season-animate.svg"/>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2 ps-0">
                                <img class="github-msg-child" 
                                :src="`https://github-readme-stats.vercel.app/api?username=hanchengxu&show_icons=true&locale=${getLocale}&layout=compact`"/>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-2 ps-0">
                                <img class="github-msg-child" 
                                :src="`https://github-readme-stats.vercel.app/api/top-langs?username=hanchengxu&show_icons=true&locale=${getLocale}&layout=compact`"/>
                            </div>
                        </div>
                        <br>

                        📬 <span class="fs-5 fw-bold">{{ $t("resume.contact.title")}}</span><br>
                        <div class="pt-2">📧 {{ $t("resume.contact.mail")}}: <a href="mailto:hanchengxu@hanchengxu.com" target="_blank">hanchengxu@hanchengxu.com</a></div>
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
            scollHeight
        };
    },
    computed:{
        getLocale(){
            return this.$i18n.locale=== 'zh' ? 'cn':this.$i18n.locale;
        }
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
.tech-shields img{
    margin-right: 0.5rem;
    height: 27px;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
}

.github-msg {
    position: relative;
}
.github-msg-child{
    position: relative;
    width: 100%;
}
</style>