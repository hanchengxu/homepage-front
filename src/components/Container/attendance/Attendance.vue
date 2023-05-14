<template>
    <div>
        <div class="py-3 my-2 my-lg-5 my-xl-5 my-xxl-5 mx-1 mx-xxl-5 px-4 d-flex justify-content-end align-items-center title rounded-pill">
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
import { onMounted, ref, onUnmounted } from "vue";
import TitleWork  from './TitleWork.vue';
import ButtonGoToWork  from './ButtonGoToWork';
import ButtonOffWork  from './ButtonOffWork';
import FeiCalendar  from './FeiCalendar';
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
            selectedDate: new Date(),
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
        onMounted(() => {
            window.addEventListener("resize", windowResize);
        });
        onUnmounted(() => {
            window.removeEventListener("resize", windowResize);
        });
        return {
            scollHeight,
        };
    },
    methods: {
        toReport() {
            this.$router.push({ path: 'attendanceReport' });
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
.title {
    background-color: rgba(241, 239, 239, 0.986);
}
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