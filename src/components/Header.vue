<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top nav-top border-bottom">
        <div class="container-fluid">
            <a class="navbar-brand" href="./">
                <img src="@/assets/imgs/mylogo.png" alt="" width="100" height="48" class="d-inline-block align-text-top">
            </a>
                <button class="navbar-toggler" @click="toggleMenu" type="button" data-bs-toggle="collapse"  aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="['header-menu','collapse','navbar-collapse',{show: showMenu}]" >
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./">{{ $t("header.menu.topPage") }}</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">{{ $t("header.menu.resume") }}📝</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">{{ $t("header.menu.hamsterCare") }}🐹</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">{{ $t("header.menu.ukulele") }}🎶</a>
                    </li>
                </ul>
                <hr class="d-md-none text-dark">
                <ul class="right-header navbar-nav flex-row flex-wrap ms-md-auto">
                    <li class="nav-item col-6 col-md-auto">
                        <div class="btn-group dropstart">
                            <a  class="nav-link p-2" target="_blank" @click="translateDropdown" data-bs-toggle="dropdown">
                            <i class="bi bi-translate"></i>
                                <i class="bi bi-caret-down-fill"></i>
                            </a>
                            <ul :class="['dropdown-menu',{show:showTranslateDropdown}]" id="translate-dropdown-menu" @mouseleave="translateDropdown" >
                                <li><a class="dropdown-item" @click="changeLanguage('zh')">中文</a></li>
                                <li><a class="dropdown-item" @click="changeLanguage('ja')">日本語</a></li>
                                <li><a class="dropdown-item" @click="changeLanguage('en')">English</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item col-6 col-md-auto">
                        <a class="nav-link p-2" href="https://github.com/a2181745" target="_blank">
                            <i class="bi-github" role="img" aria-label="GitHub"></i>
                            <small class="d-md-none ms-2">GitHub</small>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return {
            showMenu:false,
            showTranslateDropdown:false,
            language:['zh-CN','简体中文']
        }
    },
    methods:{
        toggleMenu(){
            this.showMenu= !this.showMenu;
        },
        translateDropdown(){
            this.showTranslateDropdown = !this.showTranslateDropdown;
        },
        changeLanguage(type){
            localStorage.setItem('locale', type);
            this.$i18n.locale = type;
        }
    }
}
</script>
<style>
#translate-dropdown-menu{
    top: 50px;
    left: -120px;
}
.right-header{
    margin-right: 50px;
}
.right-header a[class~="nav-link"]{
    font-size: 1.4rem;
}
.right-header .dropdown-menu .dropdown-item{
    font-size: 1rem;
}
</style>