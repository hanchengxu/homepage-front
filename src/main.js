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


//通过nginx传过来的cookie判断区域
let locale_l ;
//cookie区域不为空，且localStorage没有用户指定的i18n
if(!lo.isNull(Cookies.get('locale')) && !lo.isUndefined(Cookies.get('locale'))){
    //根据cookie初始化语言
    if(Cookies.get('locale') === "CN"){
        locale_l = 'zh';
    }else if(Cookies.get('locale') === "JP"){
        locale_l = 'ja';
    }else {
        locale_l = 'en';
    }
}

document.getElementById('root-html').lang=localStorage.getItem('locale') || locale_l || 'ja';

//国际化配置
const i18n = createI18n({
    locale: localStorage.getItem('locale') || locale_l || 'ja',//i18n Priority: user setting > cookie > default
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

// console.log(app.config);