import { createApp } from 'vue'
import App from './App.vue'
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';


// import 'dayjs/locale/zh-cn'
// import locale from 'element-plus/lib/locale/lang/zh-cn';


import "@/assets/imgs/index.js";
import SvgIcon from '@/components/svgIcon' // svg组件
// import 'bootstrap-icons/font/bootstrap-icons.css'//bootstrap icon式样
// import '@/css/bootstrap.min.css';//bootstrap UI
import '@/css/main.css'//项目css
import 'viewerjs/dist/viewer.css'//v-viewer图片展示插件css
import { createI18n } from 'vue-i18n'//国际化
import { createRouter,createWebHashHistory } from 'vue-router'
import {routes} from '@/routes';//←←路由在此配置
import LazyShow from '@/components/Common/LazyShow.vue'//延迟加载组件，放到全局
import VueViewer from 'v-viewer'
import Cookies from 'js-cookie'
import lo from 'lodash'

//浏览器设定的地区
let browser_locale = navigator.language.substring(0,2);
console.log(browser_locale);

//通过nginx传过来的cookie判断区域
let nginx_locale ;
//cookie区域不为空，且localStorage没有用户指定的i18n
if(!lo.isNull(Cookies.get('locale')) && !lo.isUndefined(Cookies.get('locale'))){
    //根据cookie初始化语言
    if(Cookies.get('locale') === "CN"){
        nginx_locale = 'zh';
    }else if(Cookies.get('locale') === "JP"){
        nginx_locale = 'ja';
    }else {
        nginx_locale = 'en';
    }
}

//设置html页面的地区，防止浏览器弹出自动翻译
document.getElementById('root-html').lang=localStorage.getItem('locale') || browser_locale || nginx_locale || 'zh';

//国际化配置
const i18n = createI18n({
    locale: localStorage.getItem('locale') || browser_locale || nginx_locale || 'zh',//i18n Priority: user setting > browser setting >cookie > default
    globalInjection:true,
    messages: {
        'zh': require('./i18n/zh'),
        'ja': require('./i18n/ja'),
        'en': require('./i18n/en')
    }
})


//路由配置
const router = createRouter({
    // history: createWebHistory(),
    //为了发布到github page，引起跳转无法找到资源，所以切换成hash路由
    history: createWebHashHistory(),
    routes, 
  })

//路由后置
router.afterEach(() => {
    //滚动条回归顶部
    window.scrollTo(0,0);
    document.getElementById("screenLock").removeAttribute("class","screenLock");
    document.getElementById("screenLock").setAttribute("class","screenLock-hidden");
});

//路由前置处理器
router.beforeEach((to,from,next)=>{
    //由于vue-router params刷新页面会丢失
    //所以暂时采用在前置路有里面
    //固定某个页面传递github地址参数
    if(to.name === 'messageCard'){
        to.params.githubURL='message-card';
    }

    //每个路由页面设定各自title
    // console.log(i18n.global);
    if(to.meta.title){
        document.title = to.meta.title;
    }else{
        document.title = '云雀之丘的时光';
    }

    //全局增加遮罩
    document.getElementById("screenLock").removeAttribute("class","screenLock-hidden");
    document.getElementById("screenLock").setAttribute("class","screenLock");
    
    if(to.matched.length == 0){
        next({path:'/'})
    }else{
        next();
    }
});

// 注册到全局
const app = createApp(App);

// app.use(Antd);
// app.use(ElementPlus, { locale });
app.use(i18n);
app.use(router);

app.use(VueViewer)

app.component('LazyShow', LazyShow);

app.component('svg-icon', SvgIcon).mount("#app");

app.config.devtools = true;
app.config.productionTip = false;

// console.log(app.config);