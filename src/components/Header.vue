<template>
    <nav v-if="showHeader()" class="navbar navbar-expand-lg navbar-light bg-light fixed-top nav-top border-bottom portal-header">
        <div class="container-fluid">
            <a class="navbar-brand" href="./">
                <img src="@/assets/imgs/mylogo.png" alt="" width="100" height="48" class="d-inline-block align-text-top">
            </a>
                <button class="navbar-toggler" @click="toggleMenu" type="button" data-bs-toggle="collapse"  aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="['header-menu','collapse','navbar-collapse',{show: showMenu}]">
                <ul class="left-header navbar-nav me-auto mb-2 mb-lg-0" @click="toggleMenu">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">{{ $t("header.menu.topPage") }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'resume'}" >{{ $t("header.menu.resume") }} 📝</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/hCare">{{ $t("header.menu.hamsterCare") }} 🐹</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/messageCard">MessageCard 📜</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link  class="nav-link" to="/ukulele">{{ $t("header.menu.ukulele") }} 🎶</router-link >
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'blog'}">{{ $t("header.menu.blog") }} ✍️</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://github.com/hanchengxu/PC-dashboard" target="_blank">PC-dashboard ⏱️</a>
                    </li>
                </ul>
                <hr class="d-md-none text-dark">
                <ul class="right-header navbar-nav flex-row flex-wrap ms-md-auto">
                    <li class="nav-item col-6 col-md-auto">
                        <div class="btn-group dropstart">
                            <a  class="nav-link p-2" target="_blank" @click="translateDropdown" data-bs-toggle="dropdown">
                                <i class="bi bi-translate"></i>
                                <span id="language-name" class="pl-1">{{ $t("header.languageName") }}</span>
                                <i class="bi bi-caret-down-fill"></i>
                            </a>
                            <ul :class="['dropdown-menu',{show:showTranslateDropdown}]" id="translate-dropdown-menu">
                                <li><a class="dropdown-item" @click="changeLanguage('zh')">简体中文</a></li>
                                <li><a class="dropdown-item" @click="changeLanguage('ja')">日本語</a></li>
                                <li><a class="dropdown-item" @click="changeLanguage('en')">English</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item col-6 col-md-auto">
                        <a class="nav-link p-2" :href="'https://github.com/hanchengxu/'+ getGithubURL()" target="_blank">
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
import lo from 'lodash';
export default {
    name: 'Header',
    data(){
        return {
            showMenu:false,
            showTranslateDropdown:false
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
            this.showTranslateDropdown = false;
            this.showMenu = false;
            //修改html lang属性 来应对浏览器自动翻译弹出
            document.getElementById('root-html').lang=type;
        },
        getGithubURL(){
            //接受来自路由的 params，动态替换github URL
            return lo.isUndefined(this.$route.params.githubURL)?'':this.$route.params.githubURL;
        },
        showHeader(){
            return undefined === this.$route.meta.showHeaderAndFooer ? true : this.$route.meta.showHeaderAndFooer;
        }

    }
    
}
</script>
<style scoped>

/*大于900px的情况下 */
@media screen and (min-width: 900px) {
    .portal-header{
        opacity: 0.75;
    }
    #translate-dropdown-menu{
        position: absolute;
        top: 50px;
        left: -50px; 
    }
}
#translate-dropdown-menu{
    position: absolute;
    top: 50px;
    left: 50px; 
}

.left-header a[class~="nav-link"]:hover{
    font-weight: 500;
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
#language-name {
    font-size: 1.2rem;
}

.dropdown-item,
a[class~="nav-link"] i,
a[class~="nav-link"] span{
    cursor:pointer
}
</style>