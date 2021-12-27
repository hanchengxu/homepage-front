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
                            It's My blog, I will share my code, idea <br>and life at here.<br> Welcome to my blog</div>
                    </div>
                    <div class="row my-4">
                        <div class="col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-11 offset-sm-1 ps-lg-0 ps-sm-5 ps-5">
                           <button type="button" class="btn btn-primary"><i class="bi-github" role="img" aria-label="GitHub"></i> GITHUB</button>
                        </div>
                    </div>
                    <div class="row my-3">
                        <div class="col-lg-10 offset-lg-2 col-md-11 offset-md-1 col-sm-11 offset-sm-1 ps-lg-0 ps-sm-5 ps-5">
                            <span id="footer-span">
                                <a href="https://beian.miit.gov.cn/" target="_blank" style="color:rgb(163, 80, 231);" class="fs-08rem">辽ICP备2021003076</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-12 ps-md-5 col-sm-12 pt-4 ps-lg-0 ps-sm-5 ps-5">
                    <div class="row">
                        <div class="col">
                            <div class="row"><div class="col"><b>DIY项目</b></div></div>
                            <div class="row my-3"><div class="col">HamsterCare</div></div>
                            <div class="row my-3"><div class="col">MessageCard</div></div>
                            
                        </div>
                        <div class="col">
                            <div class="row"><div class="col"><b>博客</b></div></div>
                            <div class="row my-3"><div class="col">博客地址</div></div>
                            <div class="row my-3"><div class="col">尤克里里</div></div>
                        </div>
                        <div class="col">
                            <div class="row"><div class="col"><b>简历</b></div></div>
                            <div class="row my-3"><div class="col">简历</div></div>
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

</style>