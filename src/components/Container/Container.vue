<template>
    <div class="container-lg">
        <div class="row" style="margin-top:200px">
                <ProtalCard v-for="card in cards" :key="card.key" v-bind="card" :lazy="card.key*50"/>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue';
import ProtalCard from './PortalCard.vue';
export default {
    name: 'Container',
    components:{
        ProtalCard
    },
    props: {
    },
    setup() {
        onMounted(() => {
            console.log('mounted!')
        })
    },
    data(){
        return {
            cards:[
                {key:1,bgImage:"resume.png", bgColor:"#ece092", cardTitleColorFrom:"#c5b12e", cardTitleColorTo:"#ece09200", 
                cardTitle:"homepage.resume.title", cardTitleIcon:"📝", cardDetail:"homepage.resume.detail"},
                {key:2,bgImage:"arduino-UNO.png", bgColor:"#7fcbcd", cardTitleColorFrom:"#028085", cardTitleColorTo:"#7fcacd1f", 
                cardTitle:"homepage.hamsterCare.title", cardTitleIcon:"🐹", cardDetail:"homepage.hamsterCare.detail"},
                {key:3,bgImage:"guitar.png", bgColor:"#c59387", cardTitleColorFrom:"#8a665d", cardTitleColorTo:"#c4928605", 
                cardTitle:"homepage.ukulele.title", cardTitleIcon:"🎶", cardDetail:"homepage.ukulele.detail"},
            ]
        }
    },
    methods:{
        handleDrawer(){
            this.drawer=true;
        },
        elDatePickerOnFocus:function(){
            document.activeElement.blur();
            this.$nextTick(() => {
            let inputTime = document.querySelectorAll('.el-input__inner')
            inputTime.forEach(item => {
            item.addEventListener('focus', () => {
                    document.activeElement.blur()
                })
                })
            })
        }
    },
    computed:{
        drawerSize(){
            return window.innerWidth<1000?'70%':'30%';
        }
        
    }
}
</script>
<style>
</style>