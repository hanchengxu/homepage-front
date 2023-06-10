<template>
    <div class="attendance-main pt-2 pt-lg-5 pt-xl-5 pt-xxl-5">
        <div class="py-3 mx-1 mx-xxl-5 px-4 d-flex justify-content-end align-items-center attendance-title rounded-pill">
            <div class="me-auto"><TitleWork msg="出勤小助手" /></div>
            <i class="menu bi bi-file-earmark-ruled pe-4" style="font-size: 2rem;" @click="toReport"></i>
            <i class="menu bi bi-justify" style="font-size: 2rem;" @click="toMaster"></i>
        </div>
        <div class="d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column flex-column 
            justify-content-evenly align-items-center" :style="{ minHeight: scollHeight - 300 + 'px' }">
            <div><ButtonGoToWork /></div>
            <div><ButtonOffWork /></div>
            <!-- <div><FeiCalendar :selectedDate="selectedDate" @update:selectedDate="onSelectedDateUpdated" /></div> -->
        </div>
    </div>
</template>
<script>
import { onMounted, ref, onUnmounted,toRaw ,onActivated,onDeactivated } from "vue";
import TitleWork  from './TitleWork.vue';
import ButtonGoToWork  from './ButtonGoToWork';
import ButtonOffWork  from './ButtonOffWork';
import FeiCalendar  from './FeiCalendar';
import { getAPI, postAPI } from '@/utils.js';
export default {
    components: {
        TitleWork,
        ButtonGoToWork,
        ButtonOffWork,
        FeiCalendar,
    },
    name: "Attendance",
    data() {
        return {
            startWorkcommitting: false,
            endWorkCommitting: false,
            selectedDate: new Date()
        };
    },
    watch: {
      selectedDate(nv) {
        console.log("nv", nv);
      },
    },
    setup() {
        const getScollHeight = () => {
            return window.innerHeight;
        };
        const scollHeight = ref(getScollHeight());
        const windowResize = () => {
            scollHeight.value = getScollHeight();
        };
        const masterList = ref([]);
        onMounted(() => {
            window.addEventListener("resize", windowResize);
            getAPI('/hamster/api/noauth/getMasterList').then((resp) => {
                masterList.value = resp.data.data;
            });
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });
        return {
            scollHeight,
            masterList
        };
    },
    methods: {
        toReport() {
            this.$router.push({ 
                // path: 'attendanceReport',
                name:'attendanceReport',
                params:{
                        masterData: JSON.stringify(this.masterList)
                    }
         });
        },
        toMaster() {
            this.$router.push({ path: 'attendanceMaster' });
        },
        startWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}
            
            postAPI('/hamster/api/noauth/saveStartWorkTime', requestBody).then(function (response) {
                console.log(response)
            })
        },
        endWork() {
            let requestBody = {workDay: moment().format('YYYY-MM-DD'), workUserName: "Yang"}

            postAPI('/hamster/api/noauth/saveEndWorkTime',requestBody)
            .then(function (response) {
                console.log(response)
            })
        },
        onSelectedDateUpdated(selectedDate) {
            this.selectedDate = selectedDate;
        },
    }
};
</script>
<style scoped>
.menu {
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
}

.menu:hover {
    transform: scale(1.2);
    transition: 0.3s;
    color: #0d6efd;
}

.menu:active {
    transform: scale(1.1);
    transition: 0.1s;
    color: #0d6efd;
}
</style>