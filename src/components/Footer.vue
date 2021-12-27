<template>
    <div class="footer">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-11 offset-sm-1 ps-lg-0 ps-sm-5 ps-5">
                            <img src="@/assets/imgs/mylogo.png" alt="" width="240" class="d-inline-block align-text-top">
                        </div>
                    </div>
                    <div class="row my-4">
                        <div class="col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-11 offset-sm-1 fs-1rem ps-lg-0 ps-sm-5 ps-5">
                            My blog, I will share my code, idea <br>and life at here.<br> Welcome to my blog</div>
                    </div>
                    <div class="row my-4">
                        <div class="col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-11 offset-sm-1 ps-lg-0 ps-sm-5 ps-5">
                           <a class="github-btn" :href="'https://github.com/hanchengxu/'" target="_blank">
                                <i class="bi-github" role="img" aria-label="GitHub"></i> GITHUB
                            </a>
                        </div>
                    </div>
                    <div class="row my-3">
                        <div class="col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-11 offset-sm-1 ps-lg-0 ps-sm-5 ps-5">
                            <span class="footer-span">
                                <a href="https://beian.miit.gov.cn/" target="_blank" class="fs-08rem">辽ICP备2021003076</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-12 ps-md-5 col-sm-12 offset-lg-0 offset-md-2 offset-sm-2 pt-lg-0 pt-md-5 pt-sm-5 pt-5 ps-lg-0 ps-5">
                    <div class="row">
                        <div class="col list-col">
                            <div class="row"><div class="col"><b>DIY项目</b></div></div>
                            <div class="row mt-3">
                                <div class="col">
                                    <router-link class="router-link" to="/hCare">{{ $t("header.menu.hamsterCare") }} 🐹</router-link>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col">
                                    <router-link class="router-link" :to="{name:'messageCard'}" >MessageCard 📜</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="col list-col">
                            <div class="row"><div class="col"><b>博客</b></div></div>
                            <div class="row mt-3">
                                <div class="col">
                                    <router-link  class="router-link" to="/ukulele">{{ $t("header.menu.ukulele") }} 🎶</router-link >
                                </div>
                            </div>
                        </div>
                        <div class="col list-col">
                            <div class="row"><div class="col"><b>简历</b></div></div>
                            <div class="row mt-3">
                                <div class="col">
                                    <router-link class="router-link" :to="{name:'resume'}" >{{ $t("header.menu.resume") }} 📝</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Fotter'
}
</script>
<style scoped>
.fs-08rem{
    font-size: 0.8rem;
}
.fs-09rem{
    font-size: 0.9rem;
}
.foot-span > a {
    color:rgb(121, 121, 121);
    font-size:11px
}
.footer {
    background-color: #f5f5f5;
    text-decoration-color: rgb(129, 128, 128);
}
.footer-span > a{
    color:rgb(0, 0, 0);
    text-decoration:none;
}
.footer-span > a:hover{
    cursor: pointer;
    color: #6356E5;
}
.list-col > .row:first-child{
    font-size: 1.1rem;
}
.router-link{
    color:black;
    text-decoration:none;
    font-size: 0.95rem;
}
.router-link:hover{
    color: #6356E5;
    cursor: pointer;
}
.github-btn{
    color: white;
    text-decoration:none;
    padding: 0.6rem 1rem 0.6rem 1rem;
    border: #6356E5;
    background: rgb(99, 86, 229);
    border-radius: 5px;
}

.github-btn:hover{
    background: #4a3fc5;
}
.github-btn:focus{
    box-shadow: 0 0 0 0.25rem rgb(99 86 229 / 50%);
}
</style>