<template>
    <div class="container-lg main-container">
        <div class="row" style="margin-top:200px">
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center card-col" >
                <div class="card d-flex flex-column justify-content-end" 
                    :style="'background-position:1rem 10px;background-image:url('+require('@/assets/imgs/resume.png')+');background-color: #ece092;'">
                    <div class="card-title-board" style="background: linear-gradient(0deg,#c5b12e,#ece09200);">
                        <div class="card-title">{{ $t("homepage.resume.title") }} 📝</div>
                        <div class="card-title2">{{ $t("homepage.resume.detail") }}</div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center card-col">
                <div class="card d-flex flex-column justify-content-end" 
                    :style="'background-position:2px 5px;background-image:url('+require('@/assets/imgs/arduino-UNO.png')+');background-color: #7fcbcd;'">
                    <div class="card-title-board" style="background: linear-gradient(0deg,#028085,#7fcacd1f)">
                        <div class="card-title">{{ $t("homepage.hamsterCare.title") }}🐹</div>
                        <div class="card-title2">{{ $t("homepage.hamsterCare.detail") }}</div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center card-col">
                <div class="card d-flex flex-column justify-content-end" 
                    :style="'background-position:-20px 20px;background-image:url('+require('@/assets/imgs/guitar.png')+');background-color: #c59387;'">
                    <div class="card-title-board" style="background: linear-gradient(0deg,#8a665d,#c4928605)">
                        <div class="card-title">{{ $t("homepage.ukulele.title") }}🎶</div>
                        <div class="card-title2">{{ $t("homepage.ukulele.detail") }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from 'vue';
export default {
    name: 'Container',
    components: {},
    props: {
    },
    setup() {
        onMounted(() => {
            console.log('mounted!')
        })
    },
    data(){
        return {
            name:"",
            drawer:false,
            direction: 'ltr',
            dateTimeRange:[],
            value1:"",
            value2:""
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
.main-container{
  min-height: 1000px;
}
.card{
    width: 15rem;
    height: 20rem;
    padding-top: 20px;
    transform: skewX(-10deg);
    background-repeat:no-repeat;
    box-shadow: 5px 5px 10px #c5c3c3;
    border-radius: 10px;
    cursor:pointer;
    transition: 0.3s ease-in-out;
    background-color: #c4928605;
}
.card-col{
    padding-bottom: 20px;
}
.card-col:last-child{
    padding-bottom: 60px;
}
.card:hover{
    transform: skewX(-10deg) scale(1.1);
    background-position:50px 10px !important;
}

.card-title{
    padding-left: 15px;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
}
.card-title2{
    padding-left: 15px;
    font-size: 0.85rem;
    white-space: pre-wrap;
    color: white;
    padding-bottom: 10px;
}
.card-title-board{
    min-height: 9rem;
    border-radius: 5px;
}
</style>