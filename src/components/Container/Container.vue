<template>
    <div class="container-fluid portal-container" :style="{minHeight:(scollHeight-42)+'px'}">
    <!-- :style="'background-image: url('+require('@/assets/imgs/238.jpg')+')'" -->
        <div class="row portal-row">
                <ProtalCard v-for="card in cards" :key="card.key" v-bind="card" :lazy="card.key*50"/>
        </div>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
import ProtalCard from './PortalCard.vue';
export default {
    name: 'Container',
    components:{
        ProtalCard
    },
    props: {
    },
    setup() {
        const getScollHeight = () => {
            return window.innerHeight;
        };
        //使用ref得到响应式对象
        const scollHeight = ref(getScollHeight());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
        };
        //注册事件
        onMounted(() => {
            window.addEventListener("resize", windowResize);
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });

        //返回响应式对象供页面使用
        return {
            scollHeight
        };
    },
    data(){
        return {
            cards:[
                {key:1,bgImage:"resume.png", bgColor:"#ece092", cardTitleColorFrom:"#c5b12e", cardTitleColorTo:"#ece09200", 
                cardTitle:"homepage.resume.title", cardTitleIcon:"📝", cardDetail:"homepage.resume.detail",destination:"/resume"},
                {key:2,bgImage:"arduino-UNO.png", bgColor:"#7fcbcd", cardTitleColorFrom:"#028085", cardTitleColorTo:"#7fcacd1f", 
                cardTitle:"homepage.hamsterCare.title", cardTitleIcon:"🐹", cardDetail:"homepage.hamsterCare.detail",destination:"/hCare"},
                {key:3,bgImage:"messageCard.png", bgColor:"#b1ea7359", cardTitleColorFrom:"#3cb969", cardTitleColorTo:"#b1ea7300", 
                cardTitle:"homepage.messageCard.title", cardTitleIcon:"📜", cardDetail:"homepage.messageCard.detail",destination:"/messageCard"},
                // 租车数据面板：独立静态页，nginx 托管（部署目录: https://hanchengxu.com/timescar/），新标签打开
                {key:4,bgImage:"times.jpg",bgImageSize:"70% auto",bgColor:"#fccf00", cardTitleColorFrom:"#d4a017", cardTitleColorTo:"#ffd54a00", 
                cardTitle:"homepage.timescar.title", cardTitleIcon:"🚗", cardDetail:"homepage.timescar.detail",destination:"https://hanchengxu.com/timescar/index.html"},
                {key:5,bgImage:"guitar.png", bgColor:"#c59387", cardTitleColorFrom:"#8a665d", cardTitleColorTo:"#c4928605", 
                cardTitle:"homepage.ukulele.title", cardTitleIcon:"🎶", cardDetail:"homepage.ukulele.detail",destination:"/ukulele"}
            ]
        }
    },
    methods:{
        handleDrawer(){
            this.drawer=true;
        }
    },
    computed:{
        drawerSize(){
            return window.innerWidth<1000?'70%':'30%';
        }
        
    }
}
</script>
<style scoped>
.portal-container{
    background-position:center;
    background-size:cover;
    padding-left: 10rem !important;
    padding-right: 10rem !important;
    background: #2bbfe4af;  /* fallback for old browsers */
    background: -webkit-linear-gradient(160deg, #EAECC6, #2bbfe4af);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(160deg, #EAECC6, #2bbfe4af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
}

.portal-row{
    padding-top:200px;
}
@media screen and (max-width: 1500px) {
.portal-container{
    padding-left: 5rem !important;
    padding-right: 5rem !important;
}
}
@media screen and (max-width: 900px) {
    .portal-container {
        padding-left: 20px !important;
        padding-right: 20px !important;
    }
    .portal-row{
        padding-top:9rem;
    }
}

</style>