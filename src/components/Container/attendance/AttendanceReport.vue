<template>
    <div>
        <div class="pt-3 px-5 d-flex justify-content-between align-items-center">
            <div class="">月报({{ now }})</div>
            <i class="menu bi bi-arrow-return-left" style="font-size: 2rem;" @click="backAttendance"></i>
        </div>
        <div class="px-xxl-5 px-xl-5 px-lg-5 d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column" >
           
        </div>
        <div class="px-5 ms-1" @click="addingMaster"><i class="bi bi-plus-square add-icon"></i></div>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted } from "vue";
import { getAPI, postAPI, isNull } from '@/utils.js';
import moment from 'moment';
import { find, findIndex } from 'lodash'
export default {
    name: "AttendanceReport",
    components:{
    },
    data() {
        return { 
            now: moment().format('YYYY-MM-DD')
        }
    },
    setup() {
        const masterList= ref([])

        const getScollHeight = () => {
            return window.innerHeight;
        };
        const getScollWidth = () => {
            return window.innerWidth;
        };
        const scollHeight = ref(getScollHeight());
        const width = ref(getScollWidth());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
            width.value = getScollWidth();
        };
        onMounted( () => {
            window.addEventListener("resize", windowResize);
            getAPI('/hamster/api/noauth/getMasterList').then((resp)=>{
                masterList.value = resp.data.data
            })
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });
        return {
            scollHeight,
            width,
            masterList
        };
    },
    methods: {
        backAttendance(){
            this.$router.push({ path: 'attendance'});
        }
    }
};
</script>
<style scoped>
.menu {
    cursor:pointer;
    transform:scale(1);
    transition: 0.3s;
}
.menu:hover{
    transform:scale(1.2);
    transition: 0.3s;
    color:#0d6efd;
}
.menu:active{
    transform:scale(1.1);
    transition: 0.1s;
    color:#0d6efd;
}
.add-icon{
    cursor:pointer;
    transition: 0.3s;
}
.add-icon:hover{
    font-size: 1.6rem;
    color:#0d6efd;
}
.add-icon:active{
    font-size: 1.4rem;
    color:#0d6efd;
}
</style>