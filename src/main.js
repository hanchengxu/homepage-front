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
import 'bootstrap-icons/font/bootstrap-icons.css'//bootstrap icon式样
import '@/css/bootstrap.min.css';//bootstrap UI
import '@/css/main.css'//项目css
import { createI18n } from 'vue-i18n'//国际化
import { createRouter,createWebHistory  } from 'vue-router'
import {routes} from '@/routes';//←←路由在此配置
import LazyShow from '@/components/Common/LazyShow.vue'//延迟加载组件，放到全局


//国际化配置
const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'ja',//
    globalInjection:true,
    messages: {
        'zh': require('./i18n/zh'),
        'ja': require('./i18n/ja'),
        'en': require('./i18n/en')
    }
})

//路由配置
const router = createRouter({
    history: createWebHistory(),
    routes, 
  })
//路由前置处理器
// router.beforeEach((to,from,next)=>{
//     if(to.matched.length == 0){
//         next({path:'/'})
//     }else{
//         next();
//     }
// });

// 注册到全局
const app = createApp(App);

// app.use(Antd);
// app.use(ElementPlus, { locale });
app.use(i18n);
app.use(router);

app.component('LazyShow', LazyShow);

app.component('svg-icon', SvgIcon).mount("#app");

app.config.devtools = true;

// console.log(app.config);